//  답변 전체보기

const answers = document.querySelectorAll(".answer");

answers.forEach((answer) => {
    const moreBtn = answer.querySelector(".more-button");
    const closeBtn = answer.querySelector(".close-button");

    moreBtn.addEventListener("click", (e) => {
        answer.classList.add("active");
    });

    closeBtn.addEventListener("click", (e) => {
        answer.classList.remove("active");
    });
});
