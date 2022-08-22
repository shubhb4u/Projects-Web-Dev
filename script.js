let recordBtn = document.querySelector(".record-btn");
let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let timerCont = document.querySelector(".timer-cont");
let timer = document.querySelector(".timer");


// Browser navigator - https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices

// 1. The Navigator.mediaDevices read-only property returns a MediaDevices object,
//  which provides access to connected media input devices like cameras 
// and microphones, as well as screen sharing.

// 2. The MediaDevices.getUserMedia() method prompts the user for permission
//  to use a media input which produces a MediaStream with tracks containing 
//  the requested types of media.

// 3. The constraints parameter is an object with two members: video and audio, 
// describing the media types requested. Either or both must be specified.

// getUserMedia({
//     audio: true,
//     video: true
//   })


const constraints = {
    video: true,
    audio: true
}

let mediaRecorder;
//this will store the video mediastream 
let chunks = [];

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

    //1. This displays the video in frontend through video HTML element.
    video.srcObject = stream; 

    //2. Now we need to save the video.
    mediaRecorder = new MediaRecorder(stream);

    //will be called from below start function at line 74. to indicate start event
    mediaRecorder.addEventListener("start", () => {
        console.log("rec started");
    });
    mediaRecorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data); 
        //single blob of video created
        
    });

    //will be called from below stop function at line 74. to indicate stop event
    mediaRecorder.addEventListener("stop", () => {
        console.log("rec stopped");
        //Stitch all the elements in chunk to form a blob.
        let blob = new Blob(chunks, { type: "video/mp4" });
        let videoURL = URL.createObjectURL(blob);
        console.log(videoURL);

         let a = document.createElement("a");
         a.href = videoURL;
         a.download="myVideo.mp4"
         a.click();
    
    })
});


/*Case 1 --> Start recording animation of record button */

let isRecording = false;
recordBtnCont.addEventListener("click", function () {

    if (!isRecording) {
        //we have to record 
        mediaRecorder.start();
        startTimer();
        recordBtn.classList.add("scale-record");
        timer.style.display = "flex";
    } else {
        //stop the recording 
        mediaRecorder.stop();
        stopTimer();
        recordBtn.classList.remove("scale-record");
        timer.style.display = "none";

    }
    
    isRecording = !isRecording;
  
});

// Display timer using set Interval fuction - 

let counter = 0;
let timerID;

function startTimer(){

    timer.style.display = "block";

    function displayTimer (){

        let totalSeconds = counter;

        // Consider by taking example of 3800 seconds
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 60;
        // Remaining seconds  = 200

        let minutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;

        let seconds = totalSeconds;

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;

        timerID=setInterval(displayTimer, 1000);	
    }	

}
    
function stopTimer() {	
        clearInterval(timerID);	
        timer.innerText = "00:00:00";	
        timer.style.display = "none";	
}