const handleNoteClick = function () {
  const keyNumber = this.id;
  const key = document.getElementById(`key${keyNumber}`);
  const keyWrapper = document.getElementById(keyNumber);
  if (key.paused) {
    key.play();
    keyWrapper.classList.add('playing');
  } else {
    key.pause();
    keyWrapper.classList.remove('playing');
  }
};

const KEY_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


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

  //Make the DIV element draggagle:
  dragElement(document.getElementById("info"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
