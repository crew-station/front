document.addEventListener("DOMContentLoaded", () => {
  const carouselList = document.querySelector(".carousel-list");
  const slides = document.querySelectorAll(".carousel-list-entry");
  const dots = document.querySelectorAll(".carousel-paginator-page");
  const thumbnails = document.querySelectorAll('.product-cover-image-list .image');

  let count = 0;
  const total = slides.length;
  let autoSlideInterval;

  function goTo(index) {
    count = index;
    if (count < 0) count = total - 1;
    if (count >= total) count = 0;

    carouselList.style.transform = `translateX(-${count * 100}%)`;

    dots.forEach(dot => dot.classList.remove("selected"));
    if (dots[count]) dots[count].classList.add("selected");
  }

  function autoSlide() {
    goTo(count + 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // dot 클릭
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      resetAutoSlide();
    });
  });

  // 썸네일 클릭
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      goTo(i);
      resetAutoSlide();
    });
  });

  goTo(0);
  startAutoSlide();
});
