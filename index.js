var musicList = [{
        src: 'http://m10.music.126.net/20190211230030/45263ce95c9633c96d51bfadbd9f4fa4/ymusic/50ea/1db2/4ba2/06db8ee0f4ec63be85ba6c43ec17daba.mp3',
        title: '1376',
        auther: 'ANU'
    }, {
        src: 'http://m10.music.126.net/20190211225920/cc032b366a07bf5637c2bf0df9786fae/ymusic/5605/07fd/b516/a10d9e248c19d9ac2d40d2b0596fc09b.mp3',
        title: '像我这样的人',
        auther: '毛不易'
    }, {
        src: 'http://m10.music.126.net/20190211225638/2cb4e55aba7ed895e85a380bcbacde4a/ymusic/5358/5509/005b/d2fb70a010bc1fae167571fcd50bb18e.mp3',
        title: 'Way Back Home',
        auther: 'SHAUN'
    }, {
        src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
        title: '玫瑰',
        auther: '贰佰'
    },
    {
        src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
        title: 'IF YOU',
        auther: 'Big Bang'
    }, {
        src: 'http://m8.music.126.net/20190211223653/39dd1ab48ef244c30ed21020b1e491e9/ymusic/5b06/2890/55c0/b4201bcf1f6135427ad0cf1b667c6451.mp3',
        title: '生僻字',
        auther: '陈柯宇'
    }
]

var left = document.querySelector('.music-box .left')
var centent = document.querySelector('.music-box .centent')
var right = document.querySelector('.music-box .right')
var h1 = document.querySelector('.music-box h1')
var p = document.querySelector('.music-box p')
var time = document.querySelector('.music-box .time')
var bar = document.querySelector('.music-box .progress .bar')
var progressTow = document.querySelector('.music-box .progress-tow')

var timer

var music = new Audio()
music.autoplay = true
var musicIndex = 0

loadMusic(musicList[musicIndex])

centent.onclick = function() {
    var icon = this.querySelector('.fa')
    if (icon.classList.contains('fa-pause')) {
        music.pause()
    } else {
        music.play()
    }
    icon.classList.toggle('fa-pause')
    icon.classList.toggle('fa-play')
}

right.onclick = loadNextMusic
left.onclick = loadLastMusic
music.onended = loadNextMusic
music.shouldUpdate = true

music.onplaying = function() {
    timer = setInterval(function() {
        updateProgress()
    }, 1000)
    console.log('pause')
}
music.onpause = function() {
    console.log('play')
    clearInterval(timer)
}
bar.onclick = function(e) {
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    music.currentTime = percent * music.duration
    progressTow.style.width = percent * 100 + "% "
}


function loadMusic(songObj) {
    music.src = songObj.src
    h1.innerText = songObj.title
    p.innerText = songObj.auther
}

function loadNextMusic() {
    musicIndex++
    musicIndex = musicIndex % musicList.length
    loadMusic(musicList[musicIndex])
}

function loadLastMusic() {
    musicIndex--
    musicIndex = (musicIndex + musicList.length) % musicList.length
    loadMusic(musicList[musicIndex])
}

function updateProgress() {
    var percent = (music.currentTime / music.duration) * 100 + '%'
    progressTow.style.width = percent

    var minutes = parseInt(music.currentTime / 60)
    var seconds = parseInt(music.currentTime % 60) + ''
    seconds = seconds.length == 2 ? seconds : '0' + seconds
    time.innerText = minutes + ':' + seconds
}
