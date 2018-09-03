const PHOTOS = [
  {
    image: 'photos/bolton.jpg',
    opacity: 1,
    background: 'white', 
  }, 
  {
    image: 'photos/xi.jpg',
    opacity: 1,
    background: '#121212',
    //  class: 'tiny-frame-vertical',
  },
  {
    image: 'photos/closeup.JPG',
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
]

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work

  const myImgs = document.querySelectorAll('.question-wrapper');
  const coverImage = document.getElementById('coverImage');
  const body = document.getElementById('body');
  const holder = document.getElementById('holder');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
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

});
