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

