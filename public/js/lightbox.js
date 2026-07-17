/* Grimsley Mineral Co. — specimen image lightbox.
   Click the main photo to open it full-screen with a zoom toggle. Vanilla, no
   deps. Only wires up when a zoomable image is present (skips placeholders). */
(function () {
  var img = document.querySelector(".detail .gallery .main img.zoomable");
  if (!img) return;

  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML =
    '<button class="lb-close" aria-label="Close">×</button>' +
    '<img alt="">' +
    '<div class="lb-hint">Click image to zoom · Esc to close</div>';
  document.body.appendChild(overlay);
  var lbImg = overlay.querySelector("img");

  function open() {
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    lbImg.classList.remove("zoomed");
    overlay.classList.add("on");
    document.body.style.overflow = "hidden";
  }
  function close() {
    overlay.classList.remove("on");
    document.body.style.overflow = "";
  }

  img.style.cursor = "zoom-in";
  img.addEventListener("click", open);
  overlay.querySelector(".lb-close").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  lbImg.addEventListener("click", function (e) {
    e.stopPropagation();
    lbImg.classList.toggle("zoomed");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
