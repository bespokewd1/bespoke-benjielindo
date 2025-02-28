document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll('.slider .list .item');
   const next = document.getElementById('next');
   const prev = document.getElementById('prev');
   const thumbnails = document.querySelectorAll('.thumbnail .item');
   const heroSliderSection = document.getElementById('hero-slider');

   //  config param
   const countItem = items.length;
   let itemActive = 0;
   let refreshInterval;
   let isAutoSliding = false;

   function startAutoSlide() {
      if (!isAutoSliding) {
         isAutoSliding = true;
         refreshInterval = setInterval(() => {
            next.click();
         }, 3000);
         console.log("Auto-slide started");
      }
   }

   function stopAutoSlide() {
      if (isAutoSliding) {
         isAutoSliding = false;
         clearInterval(refreshInterval);
         console.log("Auto-slide stopped");
      }
   }

   function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
   }

   next.onclick = function () {
      itemActive = itemActive + 1;
      if (itemActive >= countItem) {
         itemActive = 0;
      }
      showSlider();
      resetAutoSlide();
   };

   prev.onclick = function () {
      itemActive = itemActive - 1;
      if (itemActive < 0) {
         itemActive = countItem - 1;
      }
      showSlider();
      resetAutoSlide();
   };

   function showSlider() {
      const itemActiveOld = document.querySelector('.slider .list .item.active');
      const thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

      itemActiveOld.classList.remove('active');
      thumbnailActiveOld.classList.remove('active');

      items[itemActive].classList.add('active');
      thumbnails[itemActive].classList.add('active');

      const thumbnailContainer = document.querySelector('.thumbnail');
      const activeThumbnail = thumbnails[itemActive];

      if (thumbnailContainer && activeThumbnail) {
         const containerRect = thumbnailContainer.getBoundingClientRect();
         const thumbnailRect = activeThumbnail.getBoundingClientRect();

         const isFullyVisible = (
            thumbnailRect.left >= containerRect.left &&
            thumbnailRect.right <= containerRect.right
         );

         if (!isFullyVisible) {
            console.log("Thumbnail already fully visible, skipping scrollIntoView");
         } else {
            // thumbnails[itemActive].scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });
         }
      }
   }

   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         itemActive = index;
         showSlider();
         resetAutoSlide();
      });
   });

   const observerOptions = {
      root: null,
      threshold: 0.2
   };

   const heroSectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            startAutoSlide();
         } else {
            stopAutoSlide();
         }
      });
   }, observerOptions);

   heroSectionObserver.observe(heroSliderSection);

   if (heroSliderSection.getBoundingClientRect().top < window.innerHeight) {
      startAutoSlide();
   }
});
