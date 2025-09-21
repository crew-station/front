// 프로필 이미지
const input = document.querySelector(".img-input");
const profileImg = document.querySelector(".profile-img");

input.addEventListener("change", (e) => {
    const file = e.target.files[0]; // 업로드한 첫 번째 파일
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        input.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        profileImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 휴대전화 인증 체크 부분
const inputPhone = document.querySelector("input.phone");
const codeSendBtn = document.querySelector("button.phone-certification");
const codeCheckBtn = document.querySelector("button.code-check");
const code = document.querySelector("input.essential.code");
let codeSendCheck = true;
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
        mailSendCheck = true;
        clearInterval(timer); // 0초가 되면 멈춤
    }
}

const codeInputWrap = document.querySelector("div.phone-check");
inputPhone.addEventListener("input", (e) => {
    if (inputPhone.value.trim() === "") {
        codeSendBtn.disabled = true;
    } else {
        codeSendBtn.disabled = false;
    }
});

codeSendBtn.addEventListener("click", (e) => {
    if (!codeSendCheck) return;

    codeSendCheck = false;
    codeInputWrap.style.display = "block";
    timer = setInterval(updateTimer, 1000);
    updateTimer(timer);
});

code.addEventListener("input", (e) => {
    if (code.value.trim() === "") {
        codeCheckBtn.disabled = true;
    } else {
        codeCheckBtn.disabled = false;
    }
});

codeCheckBtn.addEventListener("click", (e) => {
    //코드 체크 성공 시
    if (!true) {
        inputPhone.readOnly = true;

        clearInterval(timer);
        codeInputWrap.style.display = "none";
    } else {
        codeSendCheck = true;
        code.classList.add("error");
        const errorTag = document.querySelector("div.error-text-phone");
        errorTag.style.display = "block";
        errorTag.firstElementChild.textContent = "에러문구에 맞게";
    }
});

// 성별 선택

const genderRadioes = document.querySelectorAll(".gender-radio");

genderRadioes.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        document.querySelectorAll(".gender-label").forEach((label) => {
            label.classList.remove("active");
        });

        const parentLabel = e.target.closest(".gender-label");
        if (parentLabel) {
            parentLabel.classList.add("active");
        }
        const parent = radio.closest(".input-title");

        error = parent.lastElementChild;
        error.style.display = "none";
    });
});

// 빈 값 유효성
const inputTags = document.querySelectorAll(".input-input");

inputTags.forEach((inputTag) => {
    inputTag.addEventListener("blur", (e) => {
        const parent = inputTag.closest(".input-title"); // input을 감싸는 .input-title 찾기
        const error = parent.querySelector(".error-text-wrap"); // 에러 메시지 요소

        if (!inputTag.value.trim()) {
            // 값이 비어있으면
            error.style.display = "block";
        } else {
            // 값이 있으면
            error.style.display = "none";
        }
    });
});

// 비밀번호 확인 유효성

const passwordInput = document.querySelector(".password");
const passwordCheckInput = document.querySelector(".password-check");
const passwordError = document.querySelector("div.error-text-password");
const passwordCheckError = document.querySelector(
    "div.error-text-password-check"
);

passwordInput.addEventListener("blur", (e) => {
    if (passwordInput.value.trim() === "") {
        passwordError.style.display = "block";
        passwordError.firstElementChild.textContent = "필수 입력 항목입니다.";
    } else if (passwordInput.value.trim() !== passwordCheckInput.value.trim()) {
        passwordCheckError.style.display = "block";
        passwordCheckError.firstElementChild.textContent =
            "비밀번호가 다릅니다.";
    } else if (passwordInput.value.trim() === passwordCheckInput.value.trim()) {
        passwordCheckError.style.display = "none";
        // errorTags[1].firstElementChild.textContent = "필수 입력 항목입니다.";
    } else {
        passwordError.style.display = "none";
    }
});

passwordCheckInput.addEventListener("blur", (e) => {
    if (passwordCheckInput.value.trim() === "") {
        passwordCheckError.style.display = "block";
        passwordCheckError.firstElementChild.textContent =
            "필수 입력 항목입니다.";
    } else if (passwordInput.value.trim() !== passwordCheckInput.value.trim()) {
        passwordCheckError.style.display = "block";
        passwordCheckError.firstElementChild.textContent =
            "비밀번호가 다릅니다.";
    } else if (passwordInput.value.trim() === passwordCheckInput.value.trim()) {
        passwordCheckError.style.display = "none";
        // errorTags[1].firstElementChild.textContent = "필수 입력 항목입니다.";
    }
});
