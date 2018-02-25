function musicPlay(){

    let $play = document.querySelector('#player');
    let $angle_up = $play.querySelector('.fa-angle-up');

    $play.addEventListener('click',function(event){
        let target = event.target; 

        switch(true){
            case target.matches('.fa.fa-angle-up'):console.log(target)
                $play.classList.remove('show');
                break;
            case target.matches('.icon-play'):
                target.classList.add('icon-pause');
                target.classList.remove('icon-play');
                break;
            case target.matches('.icon-pause'):
                target.classList.add('icon-play');
                target.classList.remove('icon-pause');
                break;
        }
    })

    
}