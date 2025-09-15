// 신고하기 버튼

const reportBtn = document.querySelector(".report-button");
const reportModal = document.querySelector(".report-modal");
const replyReporyBtn = document.querySelector(".reply-report-button");

replyReporyBtn.addEventListener("click", (e) => {
    reportModal.classList.add("active");
});

// 신고하기 창 끄기

const reportCloseBtn = document.querySelector(".close-button");

reportCloseBtn.addEventListener("click", (e) => {
    reportModal.classList.remove("active");
    selectFirstReportRadio();
});

// 신고하기 창 신고 종류 고르기

const reportOptions = document.querySelectorAll(".report-content");
const radioBtns = document.querySelectorAll(".radio-button");

reportOptions.forEach((reportOption) => {
    reportOption.addEventListener("click", (e) => {
        radioBtns.forEach((radioBtn) => {
            radioBtn.classList.remove("active");
            const btn = radioBtn.querySelector(".radio");
            btn.checked = false;
        });

        const btn = reportOption.querySelector(".radio");

        btn.checked = true;
        const radioButton = reportOption.querySelector(".radio-button");
        radioButton.classList.add("active");
    });
});

// 신고하기 창 제출 버튼

const submitReportBtn = document.querySelector(".report-button-send");

submitReportBtn.addEventListener("click", (e) => {
    reportModal.classList.remove("active");
    selectFirstReportRadio();
});

// 신고하기 창 제출/끄기 후 첫번째 라디오 버튼 선택
function selectFirstReportRadio() {
    const radioBtns = document.querySelectorAll(".radio-button");
    radioBtns.forEach((radioBtn, idx) => {
        const btn = radioBtn.querySelector(".radio");
        if (idx === 0) {
            radioBtn.classList.add("active");
            if (btn) btn.checked = true;
        } else {
            radioBtn.classList.remove("active");
            if (btn) btn.checked = false;
        }
    });
}

// 링크 주소 복사 및 토스트 메시지

const shareButton = document.querySelector(".menu-share-container");
const toast = document.querySelector(".toast");

shareButton.addEventListener("click", (e) => {
    function clip() {
        console.log("클립보드 복사");
        var url = "";
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.location.href; // 현재 URL을 가져옵니다.
        textarea.value = url;
        textarea.select(); // 텍스트 영역의 내용을 선택합니다.
        document.execCommand("copy"); // 선택된 내용을 클립보드에 복사합니다.
        document.body.removeChild(textarea); // 텍스트 영역을 제거합니다.

        toast.style.display = "block";
        toast.classList.remove("hide");
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("hide");
            setTimeout(() => {
                toast.style.display = "none";
            }, 500);
        }, 3000);
    }
    clip();
});
