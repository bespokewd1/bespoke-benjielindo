document.addEventListener("DOMContentLoaded", function() {
   const gallery = document.getElementById("promotion-gallery");
   if (!gallery) return;

   const promoImages = gallery.querySelectorAll(".promo-img");

   promoImages.forEach(img => {
      const measuringImg = new Image();
      measuringImg.src = img.src;
      measuringImg.onload = function() {
         const width = measuringImg.naturalWidth;
         const height = measuringImg.naturalHeight;
         const layout = width > height ? "landscape" : "portrait";

         const parentItem = img.closest(".cs-item");
         if (parentItem) {
            parentItem.setAttribute("data-pswp-width", width);
            parentItem.setAttribute("data-pswp-height", height);
            parentItem.setAttribute("data-layout", layout);
         }
      };
      measuringImg.onerror = function() {
         console.error(`Failed to load image: ${img.src}`);
      };
   });
});
