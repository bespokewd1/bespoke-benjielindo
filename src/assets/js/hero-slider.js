
document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll(".slider .list .item");
   const next = document.getElementById("next");
   const prev = document.getElementById("prev");
   const thumbnails = document.querySelectorAll(".thumbnail .item");
   const heroSliderSection = document.getElementById("hero-slider");

   // config parameters
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
      // Remove the active class from the previously active slider item and thumbnail
      const itemActiveOld = document.querySelector(".slider .list .item.active");
      const thumbnailActiveOld = document.querySelector(
         ".thumbnail .item.active"
      );

      if (itemActiveOld) {
         itemActiveOld.classList.remove("active");
      }
      if (thumbnailActiveOld) {
         thumbnailActiveOld.classList.remove("active");
      }

      // Add active class to the current slider item and its corresponding thumbnail
      items[itemActive].classList.add("active");
      thumbnails[itemActive].classList.add("active");

      // Adjust the thumbnail container horizontally so that the active thumbnail 
      // is fully visible without affecting vertical scrolling
      const thumbnailContainer = document.querySelector(".thumbnail");
      const activeThumbnail = thumbnails[itemActive];

      if (thumbnailContainer && activeThumbnail) {
         const containerRect = thumbnailContainer.getBoundingClientRect();
         const thumbRect = activeThumbnail.getBoundingClientRect();

         // If the thumbnail is partially off-screen on the left:
         if (thumbRect.left < containerRect.left) {
            thumbnailContainer.scrollBy({
               left: thumbRect.left - containerRect.left,
               behavior: "smooth"
            });
         }
         // If the thumbnail is partially off-screen on the right:
         else if (thumbRect.right > containerRect.right) {
            thumbnailContainer.scrollBy({
               left: thumbRect.right - containerRect.right,
               behavior: "smooth"
            });
         }
      }
   }

   // Clicking on a thumbnail switches the slider to the corresponding item.
   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
         itemActive = index;
         showSlider();
         resetAutoSlide();
      });
   });

   // Observer to start/stop auto sliding based on the slider's visibility
   const observerOptions = {
      root: null,
      threshold: 0.2
   };

   const heroSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            startAutoSlide();
         } else {
            stopAutoSlide();
         }
      });
   }, observerOptions);

   heroSectionObserver.observe(heroSliderSection);

   // Start auto sliding if the slider is initially in the viewport
   if (heroSliderSection.getBoundingClientRect().top < window.innerHeight) {
      startAutoSlide();
   }
});
