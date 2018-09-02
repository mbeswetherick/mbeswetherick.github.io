const F = [
  {
    name: 'F1',
    color: '#0e263c',
    interval: 0,
    src: 'fNotes/F1.wav',
  },
  {
    name: 'G1',
    color: '#253d79',
    interval: 1,
    src: 'fNotes/G1.wav',
  },
  {
    name: 'A1',
    color: '#2d488e',
    interval: 2,
    src: 'fNotes/A1.wav',
  },
  {
    name: 'Bb1',
    color: '#3452a0',
    interval: 3,
    src: 'fNotes/Bb1.wav',
  },
  {
    name: 'C1',
    color: '#3f61b7',
    interval: 4,
    src: 'fNotes/C1.wav',
  },
  {
    name: 'D1',
    color: '#4d6dc7',
    interval: 5,
    src: 'fNotes/D1.wav',
  },
  {
    name: 'E1',
    color: '#5f7fd8',
    interval: 6,
    src: 'fNotes/E1.wav',
  },
  {
    name: 'F2',
    color: '#3e0c0e',
    interval: 7,
    src: 'fNotes/F2.wav',
  },
  {
    name: 'G2',
    color: '#4d2a8e',
    interval: 8,
    src: 'fNotes/G2.wav',
  },
  {
    name: 'A2',
    color: '#fafb3d',
    interval: 9,
    src: 'fNotes/A2.wav',
  },
  {
    name: 'Bb2',
    color: '#f87825',
    interval: 10,
    src: 'fNotes/Bb2.wav',
  },
  {
    name: 'C2',
    color: '#56b4ac',
    interval: 11,
    src: 'fNotes/C2.wav',
  },
  {
    name: 'D2',
    color: '#fbc0dc',
    interval: 12,
    src: 'fNotes/D2.wav',
  },
  {
    name: 'E2',
    color: '#f1faeb',
    interval: 13,
    src: 'fNotes/E2.wav',
  },
  {
    name: 'F3',
    color: '#3e0c0e',
    interval: 14,
    src: 'fNotes/F3.wav',
  },
  {
    name: 'G3',
    color: '#4d2a8e',
    interval: 15,
    src: 'fNotes/G3.wav',
  },
  {
    name: 'A3',
    color: '#fafb3d',
    interval: 16,
    src: 'fNotes/A3.wav',
  },
  {
    name: 'Bb3',
    color: '#f87825',
    interval: 17,
    src: 'fNotes/Bb3.wav',
  },
  {
    name: 'C3',
    color: '#56b4ac',
    interval: 18,
    src: 'fNotes/C3.wav',
  },
  {
    name: 'D3',
    color: '#fbc0dc',
    interval: 19,
    src: 'fNotes/D3.wav',
  },
  {
    name: 'E3',
    color: '#f1faeb',
    interval: 20,
    src: 'fNotes/E3.wav',
  },
];

loadKeys = function () {

};

const KEYS_PLAYING = [];

handleCircleHover = function () {
  if (KEYS_PLAYING.length) {
    const notes = document.querySelectorAll('.circle-note-name');
    notes.forEach(note => note.classList.add('playing'))
  }
}

handleCircleLeave = function () {
  if (KEYS_PLAYING.length) {
    const notes = document.querySelectorAll('.circle-note-name');
    notes.forEach(note => note.classList.remove('playing'))
  }
}

handleKeyPlay = function (keyNum) {
  const keyBox = document.createElement('div');
  const currentInterval = F[keyNum - 1].interval;
  const percentage = keyNum * 4;
  KEYS_PLAYING.push(true);

  const noteName = document.createElement('div');
  noteName.className = 'circle-note-name';
  noteName.id = 'note-name' + keyNum;
  noteName.innerHTML = F[keyNum - 1].name;

  keyBox.dataset.interval = currentInterval;
  keyBox.appendChild(noteName);
  keyBox.style.background = F[keyNum - 1].color;
  keyBox.style.width = (100 - percentage) + '%';
  keyBox.style.height = (100 - percentage) + '%';
  keyBox.style.top = (percentage / 2) + '%';
  keyBox.style.left = (percentage / 2) + '%';
  keyBox.className = 'note-box';
  keyBox.id = 'note-box' + keyNum;
  keyBox.onclick = function () {
    handleKeyPause(keyNum)
  };

  const noteHolder = document.getElementById('note-holder');

  document.getElementById('info-holder').style.opacity = '0';

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
    keyBox.style.opacity = '0.8';
  }, 100)
  //keyBox.style.opacity = '1';
};

handleKeyPause = function (keyNum) {
  const key = document.getElementById(`key${keyNum}`);
  key.pause();
  const keyWrapper = document.getElementById(keyNum);
  keyWrapper.classList.remove('playing');
  const keyBox = document.getElementById('note-box' + keyNum);
  keyBox.style.opacity = 0;
  KEYS_PLAYING.pop();

  window.setTimeout(function() {
    const parent = keyBox.parentNode;
    console.log('how many kids ', parent.childNodes.length)
    parent.removeChild(keyBox);
    console.log('and after ', parent.childNodes.length)
    if (parent.childNodes.length === 0) {
      document.getElementById('info-holder').style.opacity = '1';
    }
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
    //  key.pause();
    //  keyWrapper.classList.remove('playing');
    handleKeyPause(keyNumber);
  }
};

const KEY_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  document.getElementById('info-circle').onmouseenter = handleCircleHover;
  document.getElementById('info-circle').onmouseleave = handleCircleLeave;

  KEY_NUMS.forEach(keyNum => {
    const key = document.getElementById(keyNum);
    key.onclick = handleNoteClick;
    const keyData = F[keyNum - 1];
    console.log('le key ', key.childNodes);
    const source = document.getElementById('source-' + keyNum);
    source.src = keyData.src;
    document.getElementById('key' + keyNum).load();
    document.getElementById('name-' + keyNum).innerHTML = keyData.name;
    // key.childNodes.forEach(node => {
    //   if (node.localName === 'audio') {
    //     console.log('audio!')
    //     console.log(node)
    //   }
    // });
    //key.innerHTML = F[keyNum - 1]
  });
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
