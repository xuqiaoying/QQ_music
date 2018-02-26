// $(document).ready(function(){
//     $('.search-input').click(function(){
//         $('.cancel-wrap').css('display','block');
//         $('.hot-search').css('display','none');
//     });

//     $('.cancel-wrap').click(function(){
//         $('.cancel-wrap').css('display','none');
//         $('.hot-search').css('display','block');
//     });

//     $('.search-input').on('keyup',function(){
//         $('.icon-delete').css('display','block');
//         if(document.querySelector('.search-input').value === ''){
//             $('.icon-delete').css('display','none');
//         }
//     });

//     $('.icon-delete').on('click',function(){
//         document.querySelector('.search-input').value === '';
//         $('.icon-delete').css('display','none');
//     });
// });

function searchs() {


    let $search_wrap = document.querySelector('.search-wrap');
    let $search_input = $search_wrap.querySelector('.search-input');
    let $cancel_wrap = $search_wrap.querySelector('.cancel-wrap');
    let $icon_delete = $search_wrap.querySelector('.icon-delete');
    let $hot_search = $search_wrap.querySelector('.hot-search');
    let $search_songs = $search_wrap.querySelector('.search-songs');
    let $search_records = $search_wrap.querySelector('.search-record');
    let $search_record = $search_wrap.querySelector('.search-record ul');
    let $record_clear = $search_wrap.querySelector('.record-clear');
    let $loading = $search_wrap.querySelector('.loading');
    // var keyword = '';
    var page = 1;

    $search_wrap.addEventListener('click', function (event) {
        let target = event.target;

        switch (true) {
            case target.matches('.search-input'):
                $cancel_wrap.style.display = 'block';
                $hot_search.style.display = 'none';
                // let getkeyword = JSON.parse(localStorage.getItem('search_record')) || [];
                // if(getkeyword.length === 0){
                //     $record_clear.style.display = 'none';
                // }else{
                //     $record_clear.style.display = 'block';
                // }
                if ($search_songs.innerHTML !== '') {
                    $search_records.style.display = 'none';
                } else {
                    $search_records.style.display = 'block';
                }

                renderRecord();
                break;
            case target.matches('.cancel-wrap'):
                $cancel_wrap.style.display = 'none';
                $hot_search.style.display = 'block';
                $search_songs.style.display = 'none';
                $search_songs.innerHTML = '';
                $icon_delete.style.display = 'none';
                $search_records.style.display = 'none';
                $loading.style.display = 'none';
                $search_input.value = '';
                break;
            case target.matches('.icon-delete'):
                $search_input.value = '';
                $icon_delete.style.display = 'none';
                $search_songs.style.display = 'none';
                $search_records.style.display = 'block';
                $loading.style.display = 'none';
                break;
            case target.matches('.record-clear a'):                      //或者target.parentElement.matches('.record-clear')
                // $search_record.innerHTML = '';
                $search_records.style.display = 'none';
                clearRecord();
                renderRecord();
                break;
            case target.matches('.fa-remove'):
                deleteRecord(target);
                renderRecord();
                break;
            case target.matches('.search-record ul li .keyword-record p'):
                $search_records.style.display = 'none';
                $search_songs.style.display = 'block';
                let keyword = target.innerHTML.trim();
                if (!keyword) return;
                $search_input.value = keyword;
                $loading.style.display = 'block';
                searchOne(keyword, page);
                save(keyword);
                renderRecord();
                break;
            default:
                break;
        }
    })


    $search_input.addEventListener('keyup', function (event) {
        let keyword = event.target.value.trim();
        $icon_delete.style.display = 'block';
        if ($search_input.value === '') {
            $icon_delete.style.display = 'none';
        };

        if (event.keyCode !== 13) return;
        $search_records.style.display = 'none';
        $search_songs.style.display = 'block';
        $loading.style.display = 'block';
        searchOne(keyword, page);
        save(keyword);
        renderRecord();
    });



    function searchOne(keyword, page) {
        fetch(`https://qq-music-api.now.sh/search?keyword=${keyword}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                // page = json.data.song.curpage;
                //if (page === 1) {
                searchAlbum(json.data);
                searchList(json.data);
                addEventListener('scroll', onScroll);
                // searchAlbum(json.data.zhida);
                //}
            });
    }


    function onScroll() {
        let keyword = $search_input.value.trim();
        if (document.documentElement.clientHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 50) {
            fetch(`https://qq-music-api.now.sh/search?keyword=${keyword}&page=${++page}`)
                .then(res => res.json())
                .then(json => {
                    searchList(json.data);
                    if (json.message === 'no results') {
                        window.removeEventListener('scroll', onScroll);
                        document.querySelector('.loading-all').style.display = 'block';
                        $loading.style.display = 'none';
                    }
                })
        }
    }

    function searchAlbum(songs) {
        $search_songs.innerHTML =
            `<li data-singerid='${songs.zhida.singerid}'>
            <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${songs.zhida.singermid}.jpg?max_age=2592000">
            <h6>${songs.zhida.singername}</h6>
            <p><span>单曲：${songs.zhida.songnum}</span><span>专辑：${songs.zhida.albumnum}</span></p>
        </li>`;
    }

    function searchList(songs) {
        songs.song.list.map(song => {
            let singer = song.singer.map(item => item.name).join('/');
            $search_songs.innerHTML += `<li data-albummid='${song.albummid}' data-songid='${song.songid}'>
                <a class='song-list' href='#player?singer=${singer}&song=${song.songname}&albumid=${song.albumid}&duration=${song.interval}'>
                <i class='icon icon-music'></i>
                <h4>${song.songname}</h4>
                <p>${singer}</p>
                </a>
            </li>`
        }).join('');
        playList(songs);
    }


    function playList(listsongs) {
        console.log(listsongs)
        let $list = $search_songs.querySelectorAll('li');
        $list.forEach(item => {
            item.addEventListener('click', function (event) {
                if (item.dataset.singerid) return;
                document.querySelector('#player').classList.add('show');
                // document.querySelector('#player').style.transform = 'tranlateY(0)'
                document.querySelector('#audio-play').src = `http://ws.stream.qqmusic.qq.com/${item.dataset.songid}.m4a?fromtag=46`; console.log(item.dataset.songid);
                document.querySelector('.album-cover').src = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.dataset.albummid}.jpg`;  //为什么直接item.albumid不行
                document.querySelector('.player-background').style.backgroundImage = `URL(https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.dataset.albummid}.jpg)`;
                document.querySelector('#player .song-name').innerHTML = `${item.children[0].children[1].innerText}`;
                document.querySelector('#player .singer-name').innerHTML = `${item.children[0].children[2].innerText}`;  //换个fetch json 那个可以?

                fetch(`https://qq-music-api.now.sh/lyrics?id=${item.dataset.songid}`)
                    .then(res => res.json())
                    .then(json => json.lyric)
                // listsongs.song.list.map((item,i) => {
                //     let singer = item.singer.map(item => item.name).join('/');
                //     item[i].addEventListener('click', function (event) {
                //         if (item.dataset.singerid) return;
                //         document.querySelector('#player').classList.add('show');
                //         // document.querySelector('#player').style.transform = 'tranlateY(0)'
                //         document.querySelector('#audio-play').src = `http://ws.stream.qqmusic.qq.com/${item.songid}.m4a?fromtag=46`; console.log(item.songid);
                //         document.querySelector('.album-cover').src = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.albummid}.jpg`;  //为什么直接item.albumid不行
                //         document.querySelector('.player-background').style.backgroundImage = `URL(https://y.gtimg.cn/music/photo_new/T002R150x150M000${item.albummid}.jpg)`;
                //         document.querySelector('#player .song-name').innerHTML = `${item.songname}`;
                //         document.querySelector('#player .singer-name').innerHTML = `${singer}`;
                //     })
                    
                // });

                musicPlay();
            })
        })
    }

    function save(key) {
        if (!localStorage.getItem('search_record')) { localStorage.setItem('search_record', '[]') };//处理本地数据为空等异常情况
        let getkeyword = JSON.parse(localStorage.getItem('search_record')) || [];
        getkeyword.unshift(key);
        if (getkeyword[getkeyword.indexOf(key, 1)] === key) {
            getkeyword.splice(getkeyword.indexOf(key, 1), 1);
        }
        localStorage.setItem('search_record', JSON.stringify(getkeyword));
    }

    function renderRecord(keyword) {
        let getkeyword = JSON.parse(localStorage.getItem('search_record')) || [];
        $search_record.innerHTML = getkeyword.map(item => `<li>
            <a href="#" class="keyword-record">
                <img src="images/clock_ic.png" class="icon-clock">
                <p>${item}</p>
                <i class="fa fa-remove"></i>
            </a>
        </li>`
        ).join('');
        isRecord();
    }

    function clearRecord() {
        let getkeyword = [];
        localStorage.setItem('search_record', JSON.stringify(getkeyword));

    }

    function deleteRecord(i) {
        let getkeyword = JSON.parse(localStorage.getItem('search_record')) || [];
        getkeyword.splice(i, 1);
        localStorage.setItem('search_record', JSON.stringify(getkeyword));
    }

    function isRecord() {
        let recordArr = document.querySelectorAll('.search-record ul li');
        if (recordArr.length === 0) {
            $record_clear.style.display = 'none';
        } else {
            $record_clear.style.display = 'block';
        }
    }


}
searchs();
