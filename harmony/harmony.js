

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  document.getElementById('1').onclick = () => {
    const key = document.getElementById('key1');
    if (key.paused) {
      key.play();
    } else {
      key.pause();
    }

  };

  document.getElementById('2').onclick = () => {
    const key = document.getElementById('key2');
    if (key.paused) {
      key.play();
    } else {
      key.pause();
    }

  };
});