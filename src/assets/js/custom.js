

document.addEventListener('DOMContentLoaded', function () {

   // Get carousel elements
   const carousel = document.querySelector('#gallery-45 .cs-image-group');
   const prevBtn = document.querySelector('#gallery-45 .cs-prev');
   const nextBtn = document.querySelector('#gallery-45 .cs-next');

   if (carousel && prevBtn && nextBtn) {
      // Calculate scroll amount (approximately one item width)
      const scrollAmount = carousel.offsetWidth * 0.3; // 30% of viewport

      // Add click handlers for navigation
      prevBtn.addEventListener('click', function () {
         carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
         });
      });

      nextBtn.addEventListener('click', function () {
         carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
         });
      });
   }
});
