document.addEventListener("DOMContentLoaded", function() {
   // Cache elements
   const heroSliderSection = document.getElementById("hero-slider");
   const thumbnailsElement = heroSliderSection.querySelector(".thumbnail"); // Select the thumbnail UL
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
         activeThumbnail.setAttribute("aria-selected", "false");
      }

      items[itemActive].classList.add("active");
      thumbnails[itemActive].classList.add("active");
      thumbnails[itemActive].setAttribute("aria-selected", "true");

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
      thumbnail.setAttribute('tabindex', '0');

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
      isAutoSliding = true;
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
   // "into-view" class logic based on scroll
   // -------------------------------------------------------
   let lastScrollY = window.scrollY; // Track previous scroll position

   window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const heroSliderBottom = heroSliderSection.getBoundingClientRect().bottom;
      const viewportMiddle = window.innerHeight / 2;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isScrollingDown && (heroSliderBottom - 200) <= viewportMiddle) {
         thumbnailsElement.classList.add('into-view'); // Add class when scrolling down and bottom reaches middle
      } else if (!isScrollingDown && heroSliderBottom > viewportMiddle) {
         thumbnailsElement.classList.remove('into-view'); // Remove class when scrolling up and bottom goes above middle
      }
      lastScrollY = currentScrollY; // Update previous scroll position
   });


   // -------------------------------------------------------
   // Start the auto sliding on initial load
   // -------------------------------------------------------
   startAutoSlide();
});
