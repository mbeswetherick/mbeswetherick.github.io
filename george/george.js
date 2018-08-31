const PHOTOS = [
  {
    image: 'photos/mountain.JPG',
    opacity: 1,
    background: 'white', 
  }, 
  {
    image: 'photos/07120027.JPG',
    opacity: 0,
    background: '#121212',
  },
  {
    image: 'photos/07120027.JPG',
    opacity: 1,
    background: 'white',
  },
  {
    image: 'photos/07120019.JPG',
    opacity: 1,
    background: 'white',
    class: 'tiny-frame',
  },
]

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work

  const myImgs = document.querySelectorAll('.text');
  const coverImage = document.getElementById('coverImage');
  const body = document.getElementById('body');
  const holder = document.getElementById('holder');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const slide = PHOTOS[parseInt(entry.target.id, 10)];
        console.log('in the view', entry);
        //entry.target.style.color = 'pink';
        coverImage.style.opacity = 0;
        body.style.background = slide.background;
        if (slide.class) {
          holder.classList.add(slide.class);
        } else {
          holder.classList.remove('tiny-frame');
        }
        window.setTimeout(function () {
          coverImage.src = slide.image;
          window.setTimeout(function () {
            coverImage.style.opacity = slide.opacity;
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
