var musicList = [{
        src: 'https://m10.music.126.net/20190213163838/7eb9418045989b3f1d3657c3b977fb57/ymusic/50ea/1db2/4ba2/06db8ee0f4ec63be85ba6c43ec17daba.mp3',
        title: '1376',
        auther: 'ANU'
    }, {
        src: 'https://m10.music.126.net/20190213163755/b3da7e84d58f572f4602cb3d397bfcf0/ymusic/5605/07fd/b516/a10d9e248c19d9ac2d40d2b0596fc09b.mp3',
        title: '像我这样的人',
        auther: '毛不易'
    }, {
        src: 'https://m10.music.126.net/20190213163449/22544d725ec99bb3eb05584019955f83/ymusic/5358/5509/005b/d2fb70a010bc1fae167571fcd50bb18e.mp3',
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
        src: 'http://m10.music.126.net/20190213163914/e8cd5c3a1505c5ab4754be37342b97e2/ymusic/2614/e5c8/2a66/95c34aff6dcce37eae00dc55761fc592.mp3',
        title: 'FLY',
        auther: 'ANU'
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
music.autoplay = true //设置为自动播放，false不自动播放
var musicIndex = 0

loadMusic(musicList[musicIndex])

centent.onclick = function() {
    var icon = this.querySelector('.fa')
    if (icon.classList.contains('fa-play')) {
        music.play()
    } else {
        music.pause()
    }
    icon.classList.toggle('fa-play')
    icon.classList.toggle('fa-pause')
}

right.onclick = loadNextMusic
left.onclick = loadLastMusic
music.onended = loadNextMusic
music.shouldUpdate = true

music.onplaying = function() {
    timer = setInterval(function() {
        updateProgress()
    }, 1000)
    console.log('play')
}
music.onpause = function() {
    console.log('pause')
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
