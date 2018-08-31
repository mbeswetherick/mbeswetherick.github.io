const F = [
  {
    name: 'F1',
    color: '#0e263c',
    interval: 0,
  },
  {
    name: 'G1',
    color: '#253d79',
    interval: 1,
  },
  {
    name: 'A1',
    color: '#2d488e',
    interval: 2,
  },
  {
    name: 'Bb1',
    color: '#3452a0',
    interval: 3,
  },
  {
    name: 'C1',
    color: '#3f61b7',
    interval: 4,
  },
  {
    name: 'D1',
    color: '#4d6dc7',
    interval: 5,
  },
  {
    name: 'E1',
    color: '#5f7fd8',
    interval: 6,
  },
  {
    name: 'F2',
    color: '#3e0c0e',
    interval: 7,
  },
  {
    name: 'G2',
    color: '#4d2a8e',
    interval: 8,
  },
  {
    name: 'A2',
    color: '#fafb3d',
    interval: 9,
  },
  {
    name: 'Bb2',
    color: '#f87825',
    interval: 10,
  },
  {
    name: 'C2',
    color: '#56b4ac',
    interval: 11,
  },
  {
    name: 'D2',
    color: '#fbc0dc',
    interval: 12,
  },
  {
    name: 'E2',
    color: '#f1faeb',
    interval: 13,
  },
];



handleKeyPlay = function (keyNum) {
  const keyBox = document.createElement('div');
  const currentInterval = F[keyNum - 1].interval;
  const percentage = keyNum * 4;

  keyBox.dataset.interval = currentInterval;
  //keyBox.innerHTML = F[keyNum - 1].name;
  keyBox.style.background = F[keyNum - 1].color;
  keyBox.style.width = (100 - percentage) + '%';
  keyBox.style.height = (100 - percentage) + '%';
  keyBox.style.top = (percentage / 2) + '%';
  keyBox.style.left = (percentage / 2) + '%';
  keyBox.className = 'note-box';
  keyBox.id = 'note-box' + keyNum;

  const noteHolder = document.getElementById('note-holder');

  //parentElement.insertBefore(newElement, parentElement.children[2]);
  let indexToAppend = 0;
  if (noteHolder.children.length) {
    console.log('trying to append at correct spot')
    for (let i = 0; i < noteHolder.children.length; i += 1) {
      if (parseInt(noteHolder.children[i].dataset.interval, 10) >= currentInterval) {
        indexToAppend = i;
      }
    }
    if (indexToAppend === 0) {
      document.getElementById('note-holder').appendChild(keyBox);
    } else {
      noteHolder.insertBefore(keyBox, noteHolder.children[indexToAppend]);
    }
  } else {
    console.log('just appending bro')
    document.getElementById('note-holder').appendChild(keyBox);
  }
  



  window.setTimeout(function() {
    keyBox.style.opacity = '1';
  }, 100)
  //keyBox.style.opacity = '1';
};

handleKeyPause = function (keyNum) {
  
  const keyBox = document.getElementById('note-box' + keyNum);
  keyBox.style.opacity = 0;

  window.setTimeout(function() {
    keyBox.parentNode.removeChild(keyBox);
  }, 100);
};

const handleNoteClick = function () {
  const keyNumber = this.id;
  const key = document.getElementById(`key${keyNumber}`);
  const keyWrapper = document.getElementById(keyNumber);
  if (key.paused) {
    key.play();
    keyWrapper.classList.add('playing');
    handleKeyPlay(keyNumber);
  } else {
    key.pause();
    keyWrapper.classList.remove('playing');
    handleKeyPause(keyNumber);
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
  dragElement(document.getElementById("info-circle"));

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
