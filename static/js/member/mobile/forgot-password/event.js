// input 빈 값 유효성 검사
const inputTag = document.querySelector("input.member-email");
const inputWrap = document.querySelector("div.email-input-wrap");
const errorTag = document.querySelector("div.error-text-wrap");
const errorTextWrap = document.querySelector("div.error-text-wrap");
console.log(inputTag);

inputTag.addEventListener("blur", (e) => {
    if (inputTag.value.trim() === "") {
        inputWrap.classList.add("error");
        errorTag.style.display = "block";
        errorTextWrap.firstElementChild.textContent = "인증번호가 다릅니다.";
    } else {
        inputWrap.classList.remove("error");
        errorTag.style.display = "none";
    }
});

// input에 값이 존재하면 확인 버튼 활성화
const mailCheckBtn = document.querySelector("button.mail-certification");
inputTag.addEventListener("input", (e) => {
    mailSendBtn.disabled = true;
    if (inputTag.value.trim() !== "") {
        mailCheckBtn.disabled = false;
    } else {
        mailCheckBtn.disabled = true;
    }
});

// 메일 존재 체크하고 이제 이메일로 인증코드 받기 확인하기
// 임시로 확인 부르면 바로 버튼 클릭 가능하게함 나중에 서버 맡은 분이 중복 / 존재 안함 시 관리해야됨
const mailSendBtn = document.querySelector("button.mail-send-btn");
// 메일 한 번 보내면 다시 못 보내게 체크하기
let mailSendCheck = true;
mailCheckBtn.addEventListener("click", (e) => {
    // 여기서 서버 연결해서 응답에 따라 에러 문구가 나오거나 메일 인증 보내기 버튼 활성화
    if (true) {
        mailSendBtn.disabled = false;
        inputWrap.classList.remove("error");
        errorTag.style.display = "none";
    } else {
        errorTextWrap.firstElementChild.textContent = "에러 문구에 맞게 수정";
        inputWrap.classList.add("error");
        errorTag.style.display = "block";
    }
});

// mail 보내면 5분 동안(임시) 입력 가능하게 만들기
const codeInputWrap = document.querySelector("div.code-input-wrap");
const codeLimitTime = document.querySelector("div.limit-time");
const codeError = document.querySelector("div.mail-code");
const mailSendCheckBtn = document.querySelector("button.mail-send-check");
let time = 5 * 60;
let timer;
function updateTimer(timer) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.querySelector(".limit-time").textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;

    if (time > 0) {
        time--;
    } else {
        codeError.style.display = "block";
        mailSendCheck = true;
        codeError.firstElementChild.textContent = "시간이 초과되었습니다.";
        clearInterval(timer); // 0초가 되면 멈춤
    }
}
mailSendBtn.addEventListener("click", (e) => {
    if (!mailSendCheck) return;
    codeInputWrap.style.display = "block";
    mailSendCheck = false;
    codeInputWrap.style.display = "block";
    mailSendCheckBtn.style.display = "block";
    mailSendBtn.style.display = "none";
    timer = setInterval(updateTimer, 1000);
    updateTimer(timer);
});

// 메일 재전송
const mailResendBtn = document.querySelector("button.mail-resend");
mailResendBtn.addEventListener("click", (e) => {
    if (!mailSendCheck) return;
    clearInterval(timer);
    mailSendCheck = false;
    time = 5 * 60;
    timer = setInterval(updateTimer, 1000);
    updateTimer(timer);
});

const codeInput = document.querySelector("input.code");
codeInput.addEventListener("blur", (e) => {
    if (codeInput.value.trim() === "") {
        codeInputWrap.classList.add("error");
        codeError.firstElementChild.textContent = "필수 입력 항목입니다.";
        codeError.style.display = "block";
        mailSendCheckBtn.disabled = true;
    } else {
        codeInputWrap.classList.remove("error");
        codeError.style.display = "none";
        mailSendCheckBtn.disabled = false;
    }
});

codeInput.addEventListener("input", (e) => {
    if (codeInput.value.trim() === "") {
        mailSendCheckBtn.disabled = true;
    } else {
        mailSendCheckBtn.disabled = false;
    }
});

// 인증번호 인증 버튼
mailSendCheckBtn.addEventListener("click", (e) => {
    mailSendCheck = true;
    // 성공 시 리다이렉트
    if (true) {
        clearInterval(timer);
    }
    // 실패시 에러 문구 보여주기
    else {
        codeInputWrap.classList.add("error");
        codeError.firstElementChild.textContent = "인증번호가 다릅니다.";
        codeError.style.display = "block";
    }
});
