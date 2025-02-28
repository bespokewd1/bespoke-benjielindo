document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll('.slider .list .item')
   const next = document.getElementById('next')
   const prev = document.getElementById('prev')
   const thumbnails = document.querySelectorAll('.thumbnail .item')

   //  config param
   const countItem = items.length
   let itemActive = 0
   let refreshInterval; // Declare refreshInterval outside the setInterval for scope

   // Function to start/reset the interval
   function startAutoSlide() {
      refreshInterval = setInterval(() => {
         next.click();
      }, 3000);
   }

   // event next click
   next.onclick = function () {
      itemActive = itemActive + 1

      if (itemActive >= countItem) {
         itemActive = 0
      }

      showSlider()
      resetAutoSlide(); // Reset the auto-slide timer on next click
   }

   prev.onclick = function () {
      itemActive = itemActive - 1
      if (itemActive < 0) {
         itemActive = countItem - 1
      }
      showSlider()
      resetAutoSlide(); // Reset the auto-slide timer on prev click
   }

   function resetAutoSlide() {
      clearInterval(refreshInterval); // Clear the existing interval
      startAutoSlide();             // Start a new interval
   }


   function showSlider() {
      const itemActiveOld = document.querySelector('.slider .list .item.active')
      const thumbnailActiveOld = document.querySelector('.thumbnail .item.active')

      itemActiveOld.classList.remove('active')
      thumbnailActiveOld.classList.remove('active')

      items[itemActive].classList.add('active')
      thumbnails[itemActive].classList.add('active')
      thumbnails[itemActive].scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });

      // clearInterval(refreshInterval)  <- REMOVED THIS LINE (Correctly removed from here)
   }


   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         itemActive = index
         showSlider()
         resetAutoSlide(); // Reset auto-slide on thumbnail click too if you want
      })
   })

   startAutoSlide(); // Initial start of auto-slide
})
