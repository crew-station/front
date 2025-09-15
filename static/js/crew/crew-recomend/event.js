// 서브 카테고리 클릭 시 active 클래스 추가
const items = document.querySelectorAll(".header-category");

items.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();

        items.forEach((e) => e.classList.remove("active"));
        item.classList.add("active");
    });
});
