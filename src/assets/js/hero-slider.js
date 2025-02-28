document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll('.slider .list .item');
   const next = document.getElementById('next');
   const prev = document.getElementById('prev');
   const thumbnails = document.querySelectorAll('.thumbnail .item');
   const heroSliderSection = document.getElementById('hero-slider'); // Get the hero section

   //  config param
   const countItem = items.length;
   let itemActive = 0;
   let refreshInterval; // Declare refreshInterval outside for scope
   let isAutoSliding = false; // Track if auto-sliding is currently active

   // Function to start auto-slide
   function startAutoSlide() {
      if (!isAutoSliding) { // Prevent starting multiple intervals
         isAutoSliding = true;
         refreshInterval = setInterval(() => {
            next.click();
         }, 5000);
         console.log("Auto-slide started"); // For debugging
      }
   }

   // Function to stop auto-slide
   function stopAutoSlide() {
      if (isAutoSliding) { // Prevent clearing if not active
         isAutoSliding = false;
         clearInterval(refreshInterval);
         console.log("Auto-slide stopped"); // For debugging
      }
   }

   // Function to reset auto-slide (restart timer on user interaction)
   function resetAutoSlide() {
      stopAutoSlide(); // First stop any existing interval
      startAutoSlide(); // Then restart a new interval
   }

   // event next click
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
      thumbnails[itemActive].scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });
   }

   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         itemActive = index;
         showSlider();
         resetAutoSlide(); // Reset on thumbnail click as well
      });
   });

   // Intersection Observer setup
   const observerOptions = {
      root: null, // Use the viewport as the root
      threshold: 0.2  // Trigger when 20% of the section is visible (adjust as needed)
   };

   const heroSectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            startAutoSlide(); // Start auto-slide when section is in view
         } else {
            stopAutoSlide();  // Stop auto-slide when section is out of view
         }
      });
   }, observerOptions);

   heroSectionObserver.observe(heroSliderSection); // Start observing the hero section

   // Initial check in case the section is in view on page load (optional, but good practice)
   if (heroSliderSection.getBoundingClientRect().top < window.innerHeight) {
      startAutoSlide();
   }
});
