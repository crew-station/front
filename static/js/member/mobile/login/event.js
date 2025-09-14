// 일반 회원, 게스트 회원 구분 버튼에 따라 폼 태그 바꿔주기
const memberDivision = document.querySelector("div.login-part-btn");

memberDivision.addEventListener("click", (e) => {
    e.target.classList.add("active");
    if (e.target.classList[0] === "normal") {
        document.querySelector("form.member-login").style.display = "block";
        document.querySelector("form.guest-login").style.display = "none";
        document.querySelector("button.guest").classList.remove("active");
        document.querySelector("button.normal").classList.add("active");
    } else {
        document.querySelector("form.member-login").style.display = "none";
        document.querySelector("form.guest-login").style.display = "block";
        document.querySelector("button.normal").classList.remove("active");
        document.querySelector("button.guest").classList.add("active");
    }
});

// 입력 창에 빈 값이면 에러 표시해주기

const inputTags = document.querySelectorAll("input");

inputTags.forEach((input) => {
    input.addEventListener("blur", (e) => {
        if (input.value === "") {
            input.classList.add("error");
        }
    });
});
