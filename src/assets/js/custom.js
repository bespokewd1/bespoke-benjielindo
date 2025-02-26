document.addEventListener('DOMContentLoaded', function() {
   // Get carousel elements
   const carousel = document.querySelector('#gallery-45 .cs-image-group');
   const prevBtn = document.querySelector('#gallery-45 .cs-prev');
   const nextBtn = document.querySelector('#gallery-45 .cs-next');
   const dots = document.querySelectorAll('#gallery-45 .cs-dot');
   const items = document.querySelectorAll('#gallery-45 .cs-item');

   if (!carousel || !items.length) return;

   // Variables for autoplay
   let autoplayInterval;
   const autoplaySpeed = 3000; // 3 seconds
   let isPaused = false;

   // Calculate item width for scrolling
   const getItemWidth = () => {
      const firstItem = items[0];
      return firstItem.offsetWidth + parseInt(window.getComputedStyle(firstItem).marginRight);
   };

   // Function to scroll to a specific item
   const scrollToItem = (index) => {
      const itemWidth = getItemWidth();
      const scrollPosition = index * itemWidth;

      carousel.scrollTo({
         left: scrollPosition,
         behavior: 'smooth'
      });

      // Update active dot
      updateActiveDot(index);
   };

   // Update the active dot based on scroll position
   const updateActiveDot = (activeIndex) => {
      dots.forEach((dot, index) => {
         dot.classList.toggle('active', index === activeIndex);
      });
   };

   // Handle next slide with wrap-around
   const nextSlide = () => {
      const itemWidth = getItemWidth();
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const currentScroll = carousel.scrollLeft;

      // Check if we're near the end
      if (currentScroll >= maxScroll - 50) {
         // Wrap around to beginning
         carousel.scrollTo({
            left: 0,
            behavior: 'smooth'
         });
         updateActiveDot(0);
      } else {
         // Scroll to next item
         carousel.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
         });

         // Calculate new active dot
         const newIndex = Math.min(
            Math.floor((currentScroll + itemWidth) / itemWidth),
            dots.length - 1
         );
         updateActiveDot(newIndex);
      }
   };

   // Start autoplay
   const startAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
         if (!isPaused) nextSlide();
      }, autoplaySpeed);
   };

   // Stop autoplay
   const stopAutoplay = () => {
      clearInterval(autoplayInterval);
   };

   // Add click handlers for navigation
   if (prevBtn) {
      prevBtn.addEventListener('click', function() {
         const itemWidth = getItemWidth();
         carousel.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
         });

         // Calculate new active dot
         const newIndex = Math.max(
            Math.floor((carousel.scrollLeft - itemWidth) / itemWidth),
            0
         );
         updateActiveDot(newIndex);
      });
   }

   if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
   }

   // Add click handlers for dots
   dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
         scrollToItem(index);
      });
   });

   // Pause on hover
   items.forEach(item => {
      item.addEventListener('mouseenter', () => {
         isPaused = true;
      });

      item.addEventListener('mouseleave', () => {
         isPaused = false;
      });
   });

   // Update dots based on scroll position
   carousel.addEventListener('scroll', () => {
      const itemWidth = getItemWidth();
      const currentIndex = Math.round(carousel.scrollLeft / itemWidth);
      updateActiveDot(Math.min(currentIndex, dots.length - 1));
   });

   // Initial setup
   startAutoplay();

   // Clean up on page unload
   window.addEventListener('beforeunload', stopAutoplay);
});
