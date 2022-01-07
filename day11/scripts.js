/*Get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Build our functions*/
function togglePlay(){
    // if(video.paused) video.play();
    // else video.paused();
    const method = video.paused? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('updateButton')
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
    
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function space(e){
    // if(video.paused) video.play();
    // else video.paused();
    const method = video.paused? 'play' : 'pause';
    if(e.keycode === 32) {
        video[method]();
        console.log('holaaaaaa');
    }
}
/*Hook up the event listeners*/
video.addEventListener('click', togglePlay);
document.body.onkeyup = function(e){
    const method = video.paused? 'play' : 'pause';
    if (e.keyCode === 32) video[method]();
}
// window.addEventListener('keydown', space);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; //para que se actualice a medida q me desplazo en la barra y solo cuando mantengo apretado click
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


//intentar agregarle el boton fullScreen
