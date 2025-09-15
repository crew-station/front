// 글쓰기 버튼 팝업 부분
const stickyContainer = document.querySelector("div.sticky-container");
const postRegBtn = document.querySelector("button.post-reg-btn");
// popup.classList.add("active");
const popup = document.querySelector("div.btn-click-slide-container");
console.log(popup);
postRegBtn.addEventListener("click", (e) => {});

document.querySelector("body").addEventListener("click", (e) => {
    console.log(e.target);

    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    }
    if (e.target.closest("button.post-reg-btn") === postRegBtn) {
        console.log("일치");
        popup.classList.add("active");
    }
});

// 스크롤 시 헤더 내려가게
let lastScrollY = 0;
const header = document.getElementById("header");
const subHeader = document.querySelector("div.layout-navigation-secondary");

stickyContainer.addEventListener("mouseenter", (e) => {
    subHeader.classList.add("sticky-sub-container");
    subHeader.classList.add("layout-navigation-secondary");
});

stickyContainer.addEventListener("mouseleave", (e) => {
    subHeader.classList.remove("sticky-sub-container");
    subHeader.classList.remove("layout-navigation-secondary");
});

window.addEventListener("wheel", (e) => {
    // console.log(lastScrollY);
    // console.log(window.screenY);

    if (e.wheelDeltaY < 0) {
        subHeader.classList.remove("sticky-sub-container");
        subHeader.classList.remove("layout-navigation-secondary");
    } else {
        subHeader.classList.add("sticky-sub-container");
        subHeader.classList.add("layout-navigation-secondary");
    }
});
