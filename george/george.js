const PHOTOS = ['photos/mountain.JPG', 'photos/07120027.JPG']

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work

  const myImgs = document.querySelectorAll('.text');
  const coverImage = document.getElementById('coverImage');

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        console.log('in the view', entry);
        //entry.target.style.color = 'pink';
        coverImage.style.opacity = 0;
        window.setTimeout(function () {
          coverImage.src = PHOTOS[parseInt(entry.target.id, 10)];
          window.setTimeout(function () {
            coverImage.style.opacity = 1;
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
