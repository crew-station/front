document.addEventListener("DOMContentLoaded", () => {
  // 서브 카테고리 클릭 시 active 클래스 추가
  const items = document.querySelectorAll(".header-category");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      items.forEach((e) => e.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // 정렬 버튼 드롭다운
  const toggleBtn = document.getElementById("filterToggle");
  const dropdown = document.getElementById("filterDropdown");

  if (toggleBtn && dropdown) {
    // 버튼 클릭 시 드롭다운 열고 닫기
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // 메뉴 클릭 시 버튼 텍스트 변경
    dropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        toggleBtn.childNodes[0].nodeValue = item.textContent + " ";
        dropdown.style.display = "none";
      });
    });

    // 외부 클릭 시 닫힘
    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
  }

  // 좋아요 버튼 + 토스트 메시지
  const likeBtns = document.querySelectorAll("button.card-item-action-btn.like");
  const toast = document.querySelector("div.toast");
  const toastText = document.querySelector("p.toast-text");

  let likeClickable = true; // 광클 방지용 플래그

  likeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener("click", () => {
      if (!likeClickable) return;
      likeClickable = false;
      console.log("클릭됨");

      toast.style.display = "block";
      toast.classList.remove("hide");
      toast.classList.add("show");

      const svg = likeBtn.querySelector("svg");
      if (svg.classList.contains("active")) {
        svg.classList.remove("active");
        toastText.textContent = "좋아요가 취소되었습니다.";
      } else {
        svg.classList.add("active");
        toastText.textContent = "좋아요가 추가되었습니다.";
      }

      // 토스트 애니메이션 처리
      setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");

        setTimeout(() => {
          toast.style.display = "none";
          likeClickable = true;
        }, 1000);
      }, 2000);
    });
  });
});