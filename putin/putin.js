const PHOTOS = [
  {
    image: 'photos/bolton.jpg',
    opacity: 1,
    background: 'white',
    answer: 'John Bolton', 
  }, 
  {
    image: 'photos/xi.jpg',
    opacity: 1,
    background: '#121212',
    //  class: 'tiny-frame-vertical',
  },
  {
    image: 'photos/trump.jpg',
    opacity: 1,
    background: 'white',
  },
  {
    image: 'photos/07120019.JPG',
    opacity: 1,
    background: 'white',
    textColor: 'black-text',
    class: 'tiny-frame',
  },
  {
    image: 'photos/vertical.png',
    opacity: 1,
    background: 'white',
    textColor: 'vertical-text',
    class: 'vertical-frame',
  },
  {
    image: 'photos/churchSky.JPG',
    opacity: 1,
    background: 'white',
  },
];

const handleQuestionClickBolton = function () {
  //alert(this.innerHTML.includes('John Bolton'));
  if (this.innerHTML.includes('John Bolton')) {
    this.style.background = 'gold';
    document.getElementById('mask').style.opacity = '0';
    document.getElementById('audio-correct').play();
    document.getElementById('correct-0').classList.toggle('showing');

    const leQuestion = document.getElementById('question-0');
    leQuestion.classList.toggle('hide');
    leQuestion.dataset.correct = 'yes';

  } else {
    this.style.background = 'pink';
    this.childNodes[1].style.textDecoration = 'line-through';
    document.getElementById('audio-wrong').play();
  }
}

const handleQuestionClickXi = function () {
  //alert(this.innerHTML.includes('John Bolton'));
  if (this.innerHTML.includes('Xi Jingping')) {
    this.style.background = 'gold';
    document.getElementById('mask').style.opacity = '0';
    document.getElementById('audio-correct').play();

    document.getElementById('correct-1').classList.toggle('showing');
    const leQuestion = document.getElementById('question-1');
    leQuestion.classList.toggle('hide');
    leQuestion.dataset.correct = 'yes';
  } else {
    this.style.background = 'pink';
    this.childNodes[1].style.textDecoration = 'line-through';
    document.getElementById('audio-wrong').play();
  }
}

const handleQuestionClickTrump = function () {
  //alert(this.innerHTML.includes('John Bolton'));
  if (this.innerHTML.includes('Donald Trump')) {
    this.style.background = 'gold';
    document.getElementById('mask').style.opacity = '0';
    document.getElementById('audio-correct').play();

    document.getElementById('correct-2').classList.toggle('showing');
    const leQuestion = document.getElementById('question-2');
    leQuestion.classList.toggle('hide');
    leQuestion.dataset.correct = 'yes';
  } else {
    this.style.background = 'pink';
    this.childNodes[1].style.textDecoration = 'line-through';
    document.getElementById('audio-wrong').play();
  }
}

const setupQuiz = function () {
  const questions = document.querySelectorAll('.question-possibility-0');
  questions.forEach(question => {
    question.onclick = handleQuestionClickBolton;
  });

  const questionsXi = document.querySelectorAll('.question-possibility-1');
  questionsXi.forEach(question => {
    question.onclick = handleQuestionClickXi;
  });

  const questionsTrump = document.querySelectorAll('.question-possibility-2');
  questionsTrump.forEach(question => {
    question.onclick = handleQuestionClickTrump;
  });
};

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work

  const myImgs = document.querySelectorAll('.question-wrapper');
  const coverImage = document.getElementById('coverImage');
  const body = document.getElementById('body');
  const holder = document.getElementById('holder');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        // only if we are wrong do we want the mask to block out the answer
        const leMask = document.getElementById('mask');
        const questionWrapper = document.getElementById('question-' + entry.target.id);
        console.log('correct?', questionWrapper)
        if (questionWrapper && questionWrapper.dataset.correct == 'yes') {
          leMask.style.opacity = '0';
        } else {
          leMask.style.opacity = '1';
        }
        const slide = PHOTOS[parseInt(entry.target.id, 10)];
        const textDom = document.getElementById(entry.target.id);
        console.log('in the view', entry);
        //entry.target.style.color = 'pink';
        coverImage.style.opacity = 0;
        window.setTimeout(function () {
          body.style.background = slide.background;
          if (slide.textColor) {
            textDom.classList.add(slide.textColor);
          } else {
            textDom.classList.remove(slide.textColor);
          }
          if (slide.class) {
            holder.classList.remove('tiny-frame');
            holder.classList.remove('vertical-frame');
            holder.classList.remove('tiny-frame-vertical');
            holder.classList.add(slide.class);
          } else {
            holder.classList.remove('tiny-frame');
            holder.classList.remove('vertical-frame');
            holder.classList.remove('tiny-frame-vertical');
          }
          window.setTimeout(function () {
            coverImage.src = slide.image;
            window.setTimeout(function () {
              coverImage.style.opacity = slide.opacity;
            }, 200)
          }, 200)
        }, 200)
      } else {
        console.log('out of view');
      }
    });
  });

  myImgs.forEach(image => {
    observer.observe(image);
  });

  titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        //alert('title in view');
        document.getElementById('mask').style.opacity = '1';
      }
    });
  });

  titleObserver.observe(document.getElementById('lede-holder'));

  setupQuiz();

});
