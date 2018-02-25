
fetch('https://qq-music-api.now.sh/top')
    .then(res => res.json())
    .then(json => {
        renderRank(json.data.topList);
        lazyload();
    });

function renderRank(ranks){
    document.querySelector('.rank-wrap .toplist').innerHTML = ranks.map(rank => `
        <li class='top-item' data-id='${rank.id}'>
            <div class='top-item-media'>
                <a href='#'><img class='lazyload' data-src='${rank.picUrl}'></a>
            </div>
            <div class='top-item-info'>
                <h3 class='top-item-title'>${rank.topTitle}</h3>
                <ul class='top-item-list'>${renderList(rank.songList)}</ul>
            </div>
        </li>
    `).join('');
}

function renderList(songs){
    return songs.map((song,i) => 
      `<li class='top-item-song'>
        <i class='song-index'>${i+1}</i>
        <span class='song-name'>${song.songname}</span> - ${song.singername}
      </li>`).join('');
}