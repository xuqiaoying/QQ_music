
const RECOMMEND_URL = 'https://qq-music-api.now.sh';

fetch(RECOMMEND_URL)
    .then(res => res.json())
    .then(json => {
        renderSlider(json.data.slider);
    })

function renderSlider(sliders) {
    document.querySelector('.slider #slider-group').innerHTML = sliders.map(slider =>
        `<li><a href="${slider.linkUrl}"><img src="${slider.picUrl}" alt=""></a></li>`).join('');
}

var $slider = document.getElementById('slider'),
    $group = document.getElementById('slider-group').getElementsByTagName("li"),
    $dot = document.getElementById('dot').getElementsByTagName('li'),
    index = 0,
    timer = null;

// 定义并调用自动播放函数
timer = setInterval(autoPlay, 2000);

// 鼠标划过整个容器时停止自动播放
$slider.onmouseover = function () {
    clearInterval(timer);
}

// 鼠标离开整个容器时继续播放至下一张
// $slider.onmouseout = function () {
//     timer = setInterval(autoPlay, 3000);
// }
// 遍历所有数字导航实现划过切换至对应的图片
for (var i = 0; i < $dot.length; i++) {
    $dot[i].onmouseover = function () {
        clearInterval(timer);
        index = this.innerText - 1;
        changePic(index);
    };
};

function autoPlay() {
    if (++index >= $group.length) index = 0;
    changePic(index);
}

// 定义图片切换函数 i在事件触发的时候已经是4了，$group[curIndex]就成了undefined，undefined当然就没有style属性。可以使用闭包来实现。
// function changePic(curIndex) {
//     for (var i = 0; i < $group.length; i++) {
//         $group[i].style.display = "none";
//         $dot[i].className = "";
//     }
//     $group[curIndex].style.display = "block";
//     $dot[curIndex].className = "on";
// }

function changePic(curIndex) {
    for (var i = 0; i < $group.length; i++) {
        for (var j = 0; j < $dot.length; j++) {
            $group[i].style.display = 'none';
            $dot[i].className = '';
        }
        $group[curIndex].style.display = 'block';
        $dot[curIndex].className = 'on';
    }
}










