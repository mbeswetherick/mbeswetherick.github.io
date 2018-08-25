const handleNoteClick = function () {
  const keyNumber = this.id;
  const key = document.getElementById(`key${keyNumber}`);
  if (key.paused) {
    key.play();
  } else {
    key.pause();
  }
};

const KEY_NUMS = [1, 2, 3, 4, 5, 6, 7];


document.addEventListener("DOMContentLoaded", function(event) { 
  //do work

  KEY_NUMS.forEach(keyNum => document.getElementById(keyNum).onclick = handleNoteClick);
  // document.getElementById('1').onclick = handleNoteClick;

  // document.getElementById('2').onclick = function () {
  //   const key = document.getElementById('key2');
  //   if (key.paused) {
  //     key.play();
  //   } else {
  //     key.pause();
  //   }

  // };
});
