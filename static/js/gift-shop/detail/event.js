document.addEventListener("DOMContentLoaded", () => {
    const carouselList = document.querySelector(".carousel-list");
    const slides = document.querySelectorAll(".carousel-list-entry");
    const dots = document.querySelectorAll(".carousel-paginator-page");
  
    let count = 0;
    const total = slides.length; 
    let autoSlideInterval;
  
    function goTo(index) {
      count = index;
      if (count < 0) count = total - 1;
      if (count >= total) count = 0;
  
      carouselList.style.transform = `translateX(-${count * 100}%)`;
      carouselList.style.transition = `transform 0.5s`;
  
      dots.forEach(dot => dot.classList.remove("selected"));
      dots[count].classList.add("selected");
    }
  
    function autoSlide() { goTo(count + 1); }
    function startAuto() { autoSlideInterval = setInterval(autoSlide, 3000); }
    function stopAuto() { clearInterval(autoSlideInterval); }
  
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        stopAuto();
        goTo(i);
        startAuto();
      });
    });
  
    goTo(0);
    startAuto();
  });