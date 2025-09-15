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


// 스크롤 탑 버튼 (클릭시 목록 최상단)
const scrollTopBtn = document.getElementById("scrollTopBtn");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});


// 마감 시각 표시
function startCountdown() {
    const timers = document.querySelectorAll(".product-limit-time-wrapper");
  
    timers.forEach(timer => {
      const endTime = new Date(timer.dataset.endtime);
  
      function updateTimer() {
        const now = new Date();
        const diff = endTime - now;
  
        if (diff <= 0) {
          timer.textContent = "마감";
          return;
        }
  
        const totalSeconds = Math.floor(diff / 1000);
  
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = String(Math.floor((totalSeconds % (3600 * 24)) / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
  
        if (days > 0) {
          timer.textContent = `${days}일 ${hours}:${minutes}:${seconds} 남음`;
        } else {
          timer.textContent = `${hours}:${minutes}:${seconds} 남음`;
        }
      }
  
      updateTimer();
      setInterval(updateTimer, 1000);
    });
  }
  
  document.addEventListener("DOMContentLoaded", startCountdown);
