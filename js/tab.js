// document.addEventListener('click',function(event){
//     let target = event.target;

//     if(target.dataset.role !== 'tab') return;

//     [].forEach.call(target.parentElement.children,tab => {
//         tab.classList.remove('active');
//     })
//     target.classList.add('active');

//     //为什么是[]
//     let content = document.querySelector(target.dataset.wrap);

//     if(content){
//         [].forEach.call(content.parentElement.children,child => {
//             child.style.display = 'none';
//         })
//         content.style.display = 'block';
//     }
//     dispatchEvent(new Event('scroll'))
// });

function tab() {
    let $nav = document.querySelectorAll('.nav ul .nav_item');
    let $content = document.querySelectorAll('.content>.tab-content');
    let $recom_wrap = document.querySelector('.recom-wrap');
    let $rank_wrap = document.querySelector('.rank-wrap');
    let $search_wrap = document.querySelector('.search-wrap');


    document.querySelector('.nav').addEventListener('click', function (event) {
        let target = event.target;
        switch (true) {
            case target.dataset.wrap === 'recom-wrap':
                active(target, $recom_wrap);
                break;
            case target.dataset.wrap === 'rank-wrap':
                active(target, $rank_wrap);
                break;
            case target.dataset.wrap === 'search-wrap':
                active(target, $search_wrap);
                break;
        }
    })

    function active(a, b) {
        $nav.forEach(item => item.classList.remove('active')); a.classList.add('active');
        $content.forEach(item => item.classList.remove('show')); b.classList.add('show');
    }
    // for (var i = 0; i < $nav.length; i++) {
    //     $nav[i].index = $content[i].index = i;
    //     $nav[i].onclick = function () {
    //         for (var i = 0; i < $nav.length; i++) {
    //             $nav[i].classList.remove('active');
    //             $content[i].classList.remove('show');
    //         }
    //         this.classList.add('active');
    //         $content[this.index].classList.add('show');
    //     }

    // }
    dispatchEvent(new Event('scroll'));

}
tab();
