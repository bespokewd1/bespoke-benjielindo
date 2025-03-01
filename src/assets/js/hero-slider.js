document.addEventListener("DOMContentLoaded", function () {

   // Cache elements
   const heroSliderSection = document.getElementById("hero-slider");
   const thumbnailsElement = heroSliderSection.querySelector(".thumbnail");
   const arrowsElement = heroSliderSection.querySelector(".arrows");
   const contentElements = heroSliderSection.querySelectorAll(".content"); // Select all .content elements
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

   nextButton.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         showNextSlide();
      }
   });

   prevButton.addEventListener('keydown', function (event) {
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

      thumbnail.addEventListener('keydown', function (event) {
         if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            itemActive = index;
            showSlider();
            resetAutoSlide();
         }
      });
   });

   // -------------------------------------------------------
   // Refined Pause Auto-slide on Hover (Content, Thumbnail, Arrows)
   // -------------------------------------------------------
   const pauseAutoSlide = () => {
      clearInterval(refreshInterval);
      isAutoSliding = false;
   };

   const resumeAutoSlide = () => {
      startAutoSlide();
      isAutoSliding = true;
   };


   // Attach hover listeners to .content elements
   contentElements.forEach(content => {
      content.addEventListener('mouseenter', pauseAutoSlide);
      content.addEventListener('mouseleave', resumeAutoSlide);
   });

   // Attach hover listeners to .thumbnail element
   thumbnailsElement.addEventListener('mouseenter', pauseAutoSlide);
   thumbnailsElement.addEventListener('mouseleave', resumeAutoSlide);

   // Attach hover listeners to .arrows element
   arrowsElement.addEventListener('mouseenter', pauseAutoSlide);
   arrowsElement.addEventListener('mouseleave', resumeAutoSlide);




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
   // "into-view" class logic based on scroll (No changes needed here)
   // -------------------------------------------------------
   let lastScrollY = window.scrollY;

   window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const heroSliderBottom = heroSliderSection.getBoundingClientRect().bottom;
      const viewportMiddle = window.innerHeight / 2;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isScrollingDown && heroSliderBottom <= viewportMiddle) {
         thumbnailsElement.classList.add('into-view');
      } else if (!isScrollingDown && heroSliderBottom > viewportMiddle) {
         thumbnailsElement.classList.remove('into-view');
      }
      lastScrollY = currentScrollY;
   });


   // -------------------------------------------------------
   // Start the auto sliding on initial load
   // -------------------------------------------------------
   startAutoSlide();
});
