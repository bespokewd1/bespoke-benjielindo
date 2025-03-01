document.addEventListener("DOMContentLoaded", function() {
   const gallery = document.getElementById("promotion-gallery");
   if (!gallery) return;

   const promoImages = gallery.querySelectorAll(".promo-img");

   promoImages.forEach((img, index) => {
      const measuringImg = new Image();
      measuringImg.src = img.src;
      measuringImg.onload = function() {
         const width = measuringImg.naturalWidth;
         const height = measuringImg.naturalHeight;
         const layout = width > height ? "landscape" : "portrait";

         // TODO: check if im the last in the index, if not,
         // check if im landscape if yes, 
         // add to tracker (this tracker will store consecutive landscape
         // until it hits the last child that is also a landscape , 
         // TRACKER will reset the moment that the current **img** 
         // is portrait >>>> clear tracker back to 0 and start again 
         // until last child.

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

   // TODO: 
   // check if tracker has a value (length)
   // return if none 
   // if tracker has a value, setAttribute "data-span" to all the children 
   //
   //
   //
   // think of something else. its a bust 
});
