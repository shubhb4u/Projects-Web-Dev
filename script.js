let recordBtn = document.querySelector(".record-btn");
let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let timerCont = document.querySelector(".timer-cont");
let timer = document.querySelector(".timer");

/*Case 1 --> Start recording animation of record button */

let isRecording = false;
recordBtnCont.addEventListener("click", function () {

    if (!isRecording) {
        //we have to record 
        recordBtn.classList.add("scale-record");
        timer.style.display = flex;
    } else {
        //stop the recording 
        recordBtn.classList.remove("scale-record");
        timer.style.display = none;

    }
    
    isRecording = !isRecording;
  
});

// Browser navigator - https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices