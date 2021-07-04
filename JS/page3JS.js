score = 0;

function go(x){
  $({score: 0}).animate({score: x},{
    duration: 1000,
    easing:"linear",
    step: function(now, fx){
      $("#score").html(score + Math.floor(now));
    },
    queue:false,
    complete: function(now, fx){
      score += x;
    }
  });
  $("#tag").fadeIn({
    duration:700,
    easing:"linear",
    step:function(now, fx){
      $(this).css("top", -55 * now  +"px");
    }
  }).fadeOut({
    duration:300,
    step:function(now, fx){
      $(this).css("top",-55 * ( 2 - now) + "px");
    }
  });

}

/*======================================================================================== STOPWATCH=============================================================================================*/
// Variables holding time integers:
let seconds = 0;
let minutes = 0;

// Variables holding the actual display value:
let seconds_display = 0;
let minutes_display = 0;

//variables to hold setInterval function and stopwatch status:
let start_timer = null;
let stopwatch_started = false;

// The main stopwatch function:
function stopWatch() {
    seconds++
    let display = document.getElementById('stopwatch');

// When to increment mins/hrs:
    if (seconds > 59) {
        seconds = 0
        minutes++
    }
    if (minutes == 59 && seconds == 59) {
      (() => {    
        alert('You ran out of time')
        clearInterval(start_timer);
        stopwatch_started = false;
  })()
    }

// When to display 0 before the number:
    if (seconds < 10) {
        seconds_display = '0' + seconds;
    } else {
        seconds_display = seconds
    }
    if (minutes < 10) {
        minutes_display = '0' + minutes;
    } else {
        minutes_display = minutes
    }    
    display.innerHTML = minutes_display + ':' + seconds_display;    
}

// starting and stoping the stopwatch when clicking the start/stop button:
let start_stop = document.getElementById('start_stop');
  start_stop.addEventListener('click', (event) => {
    if (stopwatch_started == false) {
      start_timer = window.setInterval(stopWatch, 1000); 
      stopwatch_started = true;
    } else {
      clearInterval(start_timer);
      stopwatch_started = false;
    }  
})  


// sending user details and game details in next page url:
let scoreTableLink = document.getElementById("score-table-link")
// storing the current values on click and changing the link accordingly:
scoreTableLink.addEventListener('click', (event) => {
  let userScore = document.getElementById('score').innerText;
  let userTime = document.getElementById('stopwatch').innerText;
  scoreTableLink.href = '../HTML/4thPage.html' + window.location.search + '&score=' + userScore + '&time=' + userTime
})


