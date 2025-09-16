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
});