//Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build out functions
function togglePlay(){
	//fancy way:
	const method = video.paused ? 'play' : 'pause';
	video[method]();

	/*
	if(video.paused){ //paused is a built-in property; there is no playing property
		video.play();
	}else{
		video.pause();
	}
	*/
}
function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}
function skip(){
	//console.log(this.dataset.skip) //dataset property used for custom attributes
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
	video[this.name] = this.value; //this.name is either playback rate or volume
}
function handleProgress(){
	const percent = (video.currentTime/video.duration)*100;
	progressBar.style.flexBasis = `${percent}%`
}
function scrub(e){
	const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration; //offset referenced from left edge of progress bar
	video.currentTime = scrubTime;
}
//Hook up event listeners
video.addEventListener('click', togglePlay); //play/pause when user clicks video
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay); //"                 "  clicks play button

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)) //for volume and playback rate
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

//progress bar
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
//on mousemove, test if mousedown is true then move on to executing scrub function; scrub not run if false