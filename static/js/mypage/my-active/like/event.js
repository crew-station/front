// 좋아요 버튼 누르면 취소

const likeButtons = document.querySelectorAll(".card-item-action-btn");

likeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const card = btn.closest(".card-feed-item-wrap");
        card.remove();
    });
});
