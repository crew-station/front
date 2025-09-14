// 하트 버튼 토글 이벤트

const likeBtn = document.querySelector(".right-menu-container .menu.likes");
const iconOutline = document.querySelector("._heart_outline_24");
const iconFilled = document.querySelector("._heart_24");
const likeCount = document.querySelector(".menu-count");

if (iconFilled) iconFilled.style.display = "none";

likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.classList.contains("liked");
    if (isLiked) {
        likeBtn.classList.remove("liked");
        iconOutline.style.display = "inline";
        iconFilled.style.display = "none";
        likeCount.textContent = String(
            parseInt(likeCount.textContent || "0", 10) - 1
        );
    } else {
        likeBtn.classList.add("liked");
        iconOutline.style.display = "none";
        iconFilled.style.display = "inline";
        likeCount.textContent = String(
            parseInt(likeCount.textContent || "0", 10) + 1
        );
    }
});
