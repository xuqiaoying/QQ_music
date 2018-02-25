
//     function lazyload(images) {
//         let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'));
// console.log(imgs)
//         function onscroll(){
//             if(imgs.length === 0){
//                 console.log(imgs.length)
//                 return window.removeEventListener('scroll',onscroll);  
//             }
//             console.log('show')
//             imgs = imgs.filter(img => img.classList.contains('lazyload'));
//             imgs.forEach((img, i) => {
//                 if (i < 3) {
//                     loadImage(img);
//                 }
//             })
//         }

//         function loadImage(img){
//             let image = new Image();
//             image.src = img.dataset.src;
//             image.onload = function(){
//                 img.src = image.src;
//                 img.classList.remove('lazyload');
//             }
//         }
//         onscroll();
//     }


function lazyload(images) {
    let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'));  //转换成一个数组

    addEventListener('scroll', onscroll)
    dispatchEvent(new Event('scroll'))

    function onscroll() {
        if (imgs.length === 0) {
            return window.removeEventListener('scroll', onscroll);  
        }
        imgs = imgs.filter(img => img.classList.contains('lazyload'));
        imgs.forEach(img => {
            if (inViewport(img)){                                             //如果img在视口
                loadImage(img);                                    //就加载img
            }
        })
    }

    function inViewport(img) {
        let { top, left, right, bottom } = img.getBoundingClientRect();
        //console.log(img.getBoundingClientRect());
        let vpWidth = document.documentElement.clientWidth;
        let vpHeight = document.documentElement.clientHeight;
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
            (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }

    function loadImage(img) {
        let image = new Image();
        image.src = img.dataset.src;
        image.onload = function () {
            img.src = image.src;
            img.classList.remove('lazyload');                    
        }
    }

    onscroll();
}


