const audioElement = document.getElementById('alarm-tone');
audioElement.style.display = 'none';

// array for timers
const timers=[];
let seconds;
let setTimer=0;
const  notify= document.getElementById("currentTimers");

const setBtn= document.getElementById("set-btn");

// clickevent

setBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    let hours= parseInt(document.getElementById('hours').value);
    let minutes = parseInt(document.getElementById('minutes').value);
    let sec = parseInt(document.getElementById('seconds').value);
    console.log(hours,minutes,sec);
    seconds = hours * 60 * 60 + minutes * 60 + sec;
    ValidTimer(event, minutes, sec);
})


//  function to check time is valid or not
function ValidTimer(event, minutes, sec) {
    console.log('if valid timer func run');
    // startCountdown();

    if (minutes >= 0 && minutes < 60 && sec >= 0 && sec < 60) {
        // valid time
        console.log(event);
        // Call this function to start the countdown
        // startCountdown();
        timers.push({name:timers.length + 1, duration: seconds});
        console.log(timers);
        initializeTimers(timers[timers.length - 1]);
    }
    else {alert('Please enter valid time!!!! ex -> 00:00:05');
}
}

// function  to start timers
const timersList= document.getElementById("timers");

function initializeTimers(timer){

   
    var timerBox = document.createElement('div');
    timerBox.setAttribute('id', timer.name);
    timerBox.className = 'timer-div';

    timerBox.innerHTML = `
    `;

    timersList.appendChild(timerBox);
    handleTimer(timer);

    setTimer++;
}

// function to update timer display
function updateTimerDisplay(timer) {
    if (document.getElementById(timer.name)) {
        const timerElement = document.getElementById(timer.name);
        timerElement.innerHTML = `
    <div class="setTimer">
                <p>Set Time:</p>
                <input type="number" value="${Math.floor(timer.duration / 3600).toString().padStart(2, '0')}" placeholder="" id="hours"> :
                <input type="number" value="${Math.floor((timer.duration % 3600) / 60).toString().padStart(2, '0')}" placeholder="" id="minutes"> :
                <input type="number" value="${Math.floor(timer.duration % 60).toString().padStart(2, '0')}" placeholder="" id="seconds"> 
                <button id="set-btn" onClick="deleteAlarm(${timer.name})" class="set-btn" type="submit">Stop</button>
            </div>
        `;
    }
}

// function to handle timers
function handleTimer(timer) {
    updateTimerDisplay(timer);
    timer.interval = setInterval(function() {
        timer.duration--;
        updateTimerDisplay(timer);
        if (timer.duration <= 0) {
            clearInterval(timer.interval);
            // alert(timer.alarmMessage);
            if (document.getElementById(timer.name)) {
                const timerElement = document.getElementById(timer.name);
                timerElement.className = 'timer-div-finished';
                timerElement.innerHTML = `
            <div class="setTimer">
            <p>Timer is Up!</p>
             <button id="set-btn" onClick="deleteAlarm(${timer.name})" class="set-btn" type="submit">Delete</button>
        </div>
        `
                ;

                playMusic();
            }
        }
    }, 1000);
}

// function to delete timeup

function deleteAlarm(elementId){

    timersList.removeChild(document.getElementById(`${elementId}`))
    timers.splice(elementId-1,1);
    setTimer--;
    stopMusic();

}


// function to hide 0 timer
function notifyon(){
    if(setTimer===0){
        notify.style.display='block';
    }
    else{
        notify.style.display='none';
    }
}

// function for alertmusic
function playMusic() {
    console.log('music played');
    audioElement.play();
}

function stopMusic() {
    console.log('music stopped');
    audioElement.pause();
    audioElement.currentTime = 0;
}

setInterval(notifyon, 100);