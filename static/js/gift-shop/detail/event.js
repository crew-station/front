document.addEventListener("DOMContentLoaded", () => {
  // 슬라이드 관련
  const carouselList = document.querySelector(".carousel-list");
  const slides = document.querySelectorAll(".carousel-list-entry");
  const dots = document.querySelectorAll(".carousel-paginator-page");
  const thumbnails = document.querySelectorAll(".product-cover-image-list .image");

  // 모달 관련 (공통)
  function setupModal(modalId, openSelector, closeSelector) {
    const modal = document.getElementById(modalId);
    const openBtn = document.querySelector(openSelector);
    const closeBtn = modal ? modal.querySelector(closeSelector) : null;

    if (!modal || !openBtn || !closeBtn) return;

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => (modal.style.display = "none"));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // 구매 요청 모달
  setupModal("myModal", ".product-buying-btn", ".close");

  // 확인 모달 제어
  const form = document.getElementById("requestForm");
  const confirmModal = document.getElementById("confirmModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  if (form && confirmModal) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const addressInput = document.getElementById("addressInput");
      const detailAddress = document.getElementById("detailAddress");
      const phone = document.getElementById("phone");

      // 배송지 입력 체크
      if (!addressInput.value || addressInput.value.trim() === "") {
        alert("배송지를 입력해주세요.");
        addressInput.focus();
        return;
      }

      // 상세주소 입력 체크
      if (!detailAddress.value || detailAddress.value.trim() === "") {
        alert("상세주소를 입력해주세요.");
        detailAddress.focus();
        return;
      }

      // 핸드폰 번호 입력 체크
      if (!phone.value || phone.value.trim() === "") {
        alert("핸드폰 번호를 입력해주세요.");
        phone.focus();
        return;
      }

      // 핸드폰 번호 형식 체크 (숫자 10~11자리)
      const phonePattern = /^[0-9]{10,11}$/;
      if (!phonePattern.test(phone.value.trim())) {
        alert("핸드폰 번호 형식이 올바르지 않습니다. (숫자만 입력)");
        phone.focus();
        return;
      }

      confirmModal.style.display = "block";
    });

    if (confirmYes) {
      confirmYes.addEventListener("click", () => {
        confirmModal.style.display = "none";
        document.getElementById("myModal").style.display = "none";
        alert("요청이 전송되었습니다. 임시 주문번호는 입력하신 휴대폰 번호로 발송됩니다.");
      });
    }

    if (confirmNo) {
      confirmNo.addEventListener("click", () => {
        confirmModal.style.display = "none";
      });
    }

    confirmModal.addEventListener("click", (e) => {
      if (e.target === confirmModal) confirmModal.style.display = "none";
    });
  }

  // 툴팁 관련
  const chemInfoBtn = document.querySelector(".openChemistryInfo");
  const chemTooltip = document.querySelector(".chemistryTooltip");

  if (chemInfoBtn && chemTooltip) {
    chemInfoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      chemTooltip.style.display =
        chemTooltip.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!chemTooltip.contains(e.target) && e.target !== chemInfoBtn) {
        chemTooltip.style.display = "none";
      }
    });
  }

  // 주소 검색 버튼 클릭 이벤트
  document
    .getElementById("searchAddressBtn")
    .addEventListener("click", function () {
      alert("주소 검색 API 연동 예정");
    });

  // 슬라이드 로직
  let count = 0;
  const total = slides.length;
  let autoSlideInterval;

  function goTo(index) {
    count = index;
    if (count < 0) count = total - 1;
    if (count >= total) count = 0;

    carouselList.style.transform = `translateX(-${count * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("selected"));
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

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      resetAutoSlide();
    });
  });

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      goTo(i);
      resetAutoSlide();
    });
  });

  goTo(0);
  startAutoSlide();
});

// 스크롤 탑 버튼
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
  const timers = document.querySelectorAll(
    ".product-limit-time-wrapper, .product-limit-timer-time"
  );

  timers.forEach((timer) => {
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
      const hours = String(
        Math.floor((totalSeconds % (3600 * 24)) / 3600)
      ).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
      );
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