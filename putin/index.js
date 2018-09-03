document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {

      photo.onclick = function () {
        this.classList.toggle('unveil')
      }
    })
});