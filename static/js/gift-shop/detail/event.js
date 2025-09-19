document.addEventListener("DOMContentLoaded", () => {
  // 슬라이드 관련
  const carouselList = document.querySelector(".carousel-list");
  const slides = document.querySelectorAll(".carousel-list-entry");
  const dots = document.querySelectorAll(".carousel-paginator-page");
  const thumbnails = document.querySelectorAll(".product-cover-image-list .image");

  // 모달 관련 (공통)
function setupModal(modalId, openSelector, closeSelector, onClose) {
  const modal = document.getElementById(modalId);
  const openBtns = document.querySelectorAll(openSelector);
  const closeBtn = modal ? modal.querySelector(closeSelector) : null;

  if (!modal || openBtns.length === 0 || !closeBtn) {
    console.warn("모달 요소를 찾을 수 없음:", modalId, openSelector, closeSelector);
    return;
  }

  // 열기 버튼들
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.classList.add("active"); 
    });
  });

  // 닫기 버튼
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    if (onClose) onClose();
  });

  // 바깥 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      if (onClose) onClose();
    }
  });
}

setupModal("myModal", "#openBuyingModalBtn", ".close");
setupModal("reportModal", ".gift-shop-post-report-btn", ".close-button", () => selectFirstReportRadio());

  // 신고하기 라디오 선택
  const reportOptions = document.querySelectorAll(".report-content");
  const radioBtns = document.querySelectorAll(".radio-button");

  if (reportOptions.length > 0 && radioBtns.length > 0) {
    reportOptions.forEach((reportOption) => {
      reportOption.addEventListener("click", () => {
        // 기존 선택 해제
        radioBtns.forEach((radioBtn) => {
          radioBtn.classList.remove("active");
          const btn = radioBtn.querySelector(".radio");
          if (btn) btn.checked = false;
        });

        // 새 선택 적용
        const btn = reportOption.querySelector(".radio");
        if (btn) btn.checked = true;
        const radioButton = reportOption.querySelector(".radio-button");
        if (radioButton) radioButton.classList.add("active");
      });
    });
  }

  // 신고하기 제출
  const submitReportBtn = document.querySelector(".report-button-send");
  const reportModal = document.getElementById("reportModal");
if (submitReportBtn && reportModal) {
  submitReportBtn.addEventListener("click", () => {
    reportModal.classList.remove("active");
    selectFirstReportRadio();
    alert("신고가 접수되었습니다.");
  });
}

  // 신고하기 첫번째 라디오 버튼 기본 선택
  function selectFirstReportRadio() {
    radioBtns.forEach((radioBtn, idx) => {
      const btn = radioBtn.querySelector(".radio");
      if (!btn) return;
      if (idx === 0) {
        radioBtn.classList.add("active");
        btn.checked = true;
      } else {
        radioBtn.classList.remove("active");
        btn.checked = false;
      }
    });
  }

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
      const zipCode = document.getElementById("zipCode");

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

      // 우편번호 입력 체크
      if (!zipCode.value || zipCode.value.trim() === "") {
        alert("우편번호를 입력해주세요.");
        zipCode.focus();
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

    // 숫자만 입력되게 제약 추가
    const phoneInput = document.getElementById("phone");
    const zipCodeInput = document.getElementById("zipCode");

    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
      });
    }

    if (zipCodeInput) {
      zipCodeInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
      });
    }

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
  document.getElementById("searchAddressBtn").addEventListener("click", function () {
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

  // 공유하기 버튼 클릭 이벤트
  const shareButton = document.querySelector(".product-detail-header-share-btn-wrapper");
  const toast = document.querySelector(".toast");

  shareButton.addEventListener("click", (e) => {
    toast.style.display = "block";
    toast.classList.remove("hide");
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => {
        toast.style.display = "none";
      }, 500);
    }, 3000);
    clip();
  });

  function clip() {
    var url = "";
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.location.href; // 현재 URL
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

document.addEventListener("DOMContentLoaded", startCountdown);
