// 체크박스 작동 표시
const checkbox = document.querySelector("input[type=checkbox]");
const autoCheckbox = document.getElementById("autoCheckbox");
const checkIcon = document.getElementById("check-icon");

checkbox.addEventListener("change", (e) => {
    console.log(e.target.checked);
    checkIcon.classList.toggle("active", e.target.checked);
});

// 로그인 버튼 클릭시 모달창 생성
const loginbutton = document.getElementById("login-button");
const emailinput = document.getElementById("email-input");
const passwordinput = document.getElementById("password-input");
const emailmodal = document.getElementById("email-test");
const passwordmodal = document.getElementById("password-test");
loginbutton.addEventListener("click", (e) => {
    emailmodal.style.display = "inline";
});
