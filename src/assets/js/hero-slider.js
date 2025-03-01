document.addEventListener("DOMContentLoaded", function() {

   // Cache the hero slider section.
   const heroSliderSection = document.getElementById("hero-slider");

   // Scope all queries to heroSliderSection.
   const items = heroSliderSection.querySelectorAll(".slider .list .item");
   const nextButton = heroSliderSection.querySelector("#next");
   const prevButton = heroSliderSection.querySelector("#prev");
   const thumbnails = heroSliderSection.querySelectorAll(".thumbnail .item");
   const thumbnailContainer = heroSliderSection.querySelector(".thumbnail");

   // Configuration parameters.
   const countItem = items.length;
   let itemActive = 0;
   let refreshInterval;
   let isAutoSliding = false;

   // -------------------------------------------------------
   // Auto-slide functions.
   // -------------------------------------------------------
   function startAutoSlide() {
      if (!isAutoSliding) {
         isAutoSliding = true;
         refreshInterval = setInterval(() => nextButton.click(), 3000);
      }
   }

   function resetAutoSlide() {
      clearInterval(refreshInterval);
      isAutoSliding = false;
      startAutoSlide();
   }

   // -------------------------------------------------------
   // Next/prev event listeners and Keyboard Navigation
   // -------------------------------------------------------
   nextButton.addEventListener("click", showNextSlide);
   prevButton.addEventListener("click", showPrevSlide);

   function showNextSlide() {
      itemActive = (itemActive + 1) % countItem;
      showSlider();
      resetAutoSlide();
   }

   function showPrevSlide() {
      itemActive = (itemActive - 1 + countItem) % countItem;
      showSlider();
      resetAutoSlide();
   }

   // Keyboard navigation for arrow buttons (using tabIndex and keydown)
   nextButton.setAttribute('tabindex', '0');
   prevButton.setAttribute('tabindex', '0');

   nextButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         showNextSlide();
      }
   });

   prevButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         showPrevSlide();
      }
   });


   // -------------------------------------------------------
   // Update the active slider item and active thumbnail.
   // -------------------------------------------------------
   function showSlider() {
      const activeSliderItem = heroSliderSection.querySelector(
         ".slider .list .item.active"
      );
      const activeThumbnail = heroSliderSection.querySelector(
         ".thumbnail .item.active"
      );

      if (activeSliderItem) activeSliderItem.classList.remove("active");
      if (activeThumbnail) {
         activeThumbnail.classList.remove("active");
         activeThumbnail.setAttribute("aria-selected", "false"); // ARIA update
      }

      items[itemActive].classList.add("active");
      thumbnails[itemActive].classList.add("active");
      thumbnails[itemActive].setAttribute("aria-selected", "true"); // ARIA update


      // Manually control the horizontal scroll of thumbnailContainer.
      const containerRect = thumbnailContainer.getBoundingClientRect();
      const thumbRect = thumbnails[itemActive].getBoundingClientRect();

      if (thumbRect.left < containerRect.left) {
         thumbnailContainer.scrollBy({
            left: thumbRect.left - containerRect.left,
            behavior: "smooth",
         });
      } else if (thumbRect.right > containerRect.right) {
         thumbnailContainer.scrollBy({
            left: thumbRect.right - containerRect.right,
            behavior: "smooth",
         });
      }
   }

   // -------------------------------------------------------
   // Clicking on a thumbnail jumps to that slider item and Keyboard Navigation
   // -------------------------------------------------------
   thumbnails.forEach((thumbnail, index) => {
      thumbnail.setAttribute('tabindex', '0'); // Make thumbnails focusable

      thumbnail.addEventListener("click", () => {
         itemActive = index;
         showSlider();
         resetAutoSlide();
      });

      thumbnail.addEventListener('keydown', function(event) {
         if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            itemActive = index;
            showSlider();
            resetAutoSlide();
         }
      });
   });

   // -------------------------------------------------------
   // Pause Auto-slide on Hover
   // -------------------------------------------------------
   heroSliderSection.addEventListener('mouseenter', () => {
      clearInterval(refreshInterval);
      isAutoSliding = false;
   });

   heroSliderSection.addEventListener('mouseleave', () => {
      startAutoSlide();
      isAutoSliding = true; // Ensure isAutoSliding is set back to true on mouseleave
   });


   // -------------------------------------------------------
   // Basic Touch/Swipe Support (Mobile)
   // -------------------------------------------------------
   let touchStartX = 0;
   let touchEndX = 0;

   heroSliderSection.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
   }, false);

   heroSliderSection.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
   }, false);

   function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX + swipeThreshold < touchStartX) {
         showNextSlide();
      } else if (touchEndX - swipeThreshold > touchStartX) {
         showPrevSlide();
      }
   }


   // -------------------------------------------------------
   // Start the auto sliding on initial load
   // -------------------------------------------------------
   startAutoSlide();

});
