
document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll('.slider .list .item')
   const next = document.getElementById('next')
   const prev = document.getElementById('prev')
   const thumbnails = document.querySelectorAll('.thumbnail .item')

   //  config param
   const countItem = items.length
   let itemActive = 0

   // event next click
   next.onclick = function () {
      itemActive = itemActive + 1

      if (itemActive >= countItem) {
         itemActive = 0
      }

      showSlider()
   }

   prev.onclick = function () {
      itemActive = itemActive - 1
      if (itemActive < 0) {
         itemActive = countItem - 1
      }
   }

   //auto run slider
   const refreshInterval = setInterval(() => {
      next.click();
   }, 3000)


   function showSlider() {
      const itemActiveOld = document.querySelector('.slider .list .item.active')
      const thumbnailActiveOld = document.querySelector('.thumbnail .item.active')

      itemActiveOld.classList.remove('active')
      thumbnailActiveOld.classList.remove('active')

      items[itemActive].classList.add('active')
      thumbnails[itemActive].classList.add('active')
      thumbnails[itemActive].scrollIntoView({ behavior: smooth, inline: 'start' });

      clearInterval(refreshInterval)
   }


   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         itemActive = index
         showSlider()
      })
   })
})

