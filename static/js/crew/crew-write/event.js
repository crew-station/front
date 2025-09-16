// 모달 창
const postImg = document.querySelector(".post-img-floor");
const modal = document.querySelector(".modal-popout");

// 이미지 클릭 시 모달창 열기
postImg.addEventListener("click", () => {
    modal.style.display = "block";
});

// 모달창 외부 클릭 시 닫기
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
