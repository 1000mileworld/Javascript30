let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	//clear any existing timers to prevent problems that arise when multiple buttons clicked to set a timer
	clearInterval(countdown);

	const now = Date.now(); //milliseconds elapsed since 1/1/1970
	const then = now + seconds*1000; //now in ms; value in the future
	displayTimeLeft(seconds); //setInterval doesn't run until 1s elapses
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now())/1000); 
		//Date.now() keeps increasing with time so secondsLeft will count down

		//check when to stop
		if(secondsLeft<0){
			clearInterval(countdown); //stops timer
			return; //cannot just return as timer will still keep going, just not display anything
		}

		//display time
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const remainderSeconds = seconds%60;
	const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`; //add padded zero
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	//timestamp is in ms which returns from Date.now(); this creates a date object from that, which is the reverse
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${hour>12? hour-12: hour}:${minutes<10 ? '0':''}${minutes}`;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
//if HTML tag has name attribute, can directly call using document.NameAttributeValue
document.customForm.addEventListener('submit',function(e){
	e.preventDefault(); //prevent page from reloading when submitting a form
	const mins = this.minutes.value; //this refers to the form
	timer(mins*60);
	this.reset();
});