(function () {
    const RECOMMEND_URL = 'https://qq-music-api.now.sh';
    // const json = {"code":0,"data":{"slider":[{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2275292&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001r1hnR1EHKrb.jpg","id":12421},{"linkUrl":"http://y.qq.com/w/album.html?albummid=0022Njet2LUn6R","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000000JMVic3j67Zl.jpg","id":12433},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2265691&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000002PDHRL2Mq89m.jpg","id":12352},{"linkUrl":"http://y.qq.com/w/album.html?albummid=004K3ngh3WZwMV","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000002cK5mi4XdHvM.jpg","id":12431},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2258907&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001IWkf03SKVCI.jpg","id":12349}],"radioList":[{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg","Ftitle":"一人一首招牌歌","radioid":307},{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg","Ftitle":"热歌","radioid":199}],"songList":[{"songListDesc":"催泪大杀器！盘点演唱会经典万人大合唱","picUrl":"http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1","id":"2646688496","accessnum":5436236,"songListAuthor":"Harry"},{"songListDesc":"纳尼？这些华语歌手竟然会唱日语歌！","picUrl":"http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1","id":"1144416825","accessnum":605370,"songListAuthor":"风吹草地"},{"songListDesc":"精选内地十大民谣歌手代表作","picUrl":"http://p.qpic.cn/music_cover/hVUsfUFG2DV466URqw7PT7X66OknPIhic2mKDgicawN4qThIR7yhYY1w/300?n=1","id":"2043041547","accessnum":742401,"songListAuthor":"１'s   ヽ"},{"songListDesc":"2016Billboard嘻哈榜精选","picUrl":"http://p.qpic.cn/music_cover/tkduvk4dwqBxwzZhsNe0nwkwyiaLHVkxtla7REsX0yNkhibOH3Bdb2og/300?n=1","id":"2040362185","accessnum":1152655,"songListAuthor":"　"},{"songListDesc":"浮光掠影：ACG纯音乐赏析合辑","picUrl":"http://p.qpic.cn/music_cover/XMPAjfs5uwGZdWII3osvAvCRyNWx8Pqy5Yice41OCZlBhLtk0p0icNvg/300?n=1","id":"1723063372","accessnum":859387,"songListAuthor":"肥喵"},{"songListDesc":"trip-hop单曲大推荐","picUrl":"http://y.gtimg.cn/music/photo_new/T005R600x600M000002CJKAY1LKpcz.jpg?n=1","id":"3482605622","accessnum":356610,"songListAuthor":"哑忍"}]}}
    // renderRadio(json.data.radioList);
    // renderSongList(json.data.songList);
    // lazyload()
    fetch(RECOMMEND_URL)
        .then(res => res.json())
        .then(json => {
            renderRadio(json.data.radioList);
            renderSongList(json.data.songList);
            lazyload()
        })

    // fetch(RECOMMEND_URL)
    //     .then(res => res.json())
    //     .then(json => this.json = json)
    //     .then(function(){
    //         renderRadio(this.json.data.radioList);
    //     })
        
    function renderRadio(radios) {
        document.querySelector('.radios .list').innerHTML = radios.map(radio => `
            <div class="list-item">
                <div class="list-media">
                    <img class='lazyload' data-src='${radio.picUrl}' alt="图片">
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-detail">
                    <h3 class="list-title">${radio.Ftitle}</h3>
                </div>
            </div>
            `).join('');
    }


    function renderSongList(songs){
        document.querySelector('.popular-list .list').innerHTML = songs.map(song => `
            <div class="list-item">
                <div class="list-media">
                    <img class='lazyload' data-src="${song.picUrl}" alt="图片">
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-detail">
                    <h3 class="list-title">${song.songListDesc}</h3>
                    <div class="list-text">${song.songListAuthor}</div>
                </div>
            </div>
        `).join('');
    }


})();