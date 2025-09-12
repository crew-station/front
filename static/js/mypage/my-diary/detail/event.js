// 일기 공개/비공개 설정

const secretCheckbox = document.querySelector(".secret-checkbox");
const secretToggle = document.querySelector(".secret-toggle");
const lockIcon = document.querySelector(".lock");
const unlockIcon = document.querySelector(".unlock");

secretToggle.addEventListener("click", (e) => {
    secretCheckbox.checked = secretToggle.classList.toggle("active");
    if (secretCheckbox.checked) {
        lockIcon.classList.remove("hidden");
        unlockIcon.classList.add("hidden");
    } else {
        lockIcon.classList.add("hidden");
        unlockIcon.classList.remove("hidden");
    }
});

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

// 댓글 입력 버튼 활성화/비활성화

const input = document.querySelector(".input");
const enterButton = document.querySelector(".enter-button");

input.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
        enterButton.classList.add("active");
        enterButton.disabled = false;
    } else {
        enterButton.classList.remove("active");
        enterButton.disabled = true;
    }
});

// 댓글 입력 버튼 클릭 시 댓글 추가

enterButton.addEventListener("click", (e) => {
    input.value = "";
    enterButton.classList.remove("active");
    enterButton.disabled = true;
});

// 페이지 클릭

const numberButtons = document.querySelectorAll(".number-button");

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", (e) => {
        numberButtons.forEach((btn) => btn.classList.remove("active"));
        numberButton.classList.add("active");
    });
});

// 게시물 좋아요 버튼

const likeButton = document.querySelector(".sticky-like-button");

likeButton.addEventListener("click", (e) => {
    const likeIcon = likeButton.querySelector(".like-before");
    likeIcon.classList.toggle("active");
});

// 댓글로가기 버튼

const goToCommentButton = document.querySelector(".go-reply");

goToCommentButton.addEventListener("click", (e) => {
    const commentSection = document.querySelector(".reply-container");
    commentSection.scrollIntoView({ behavior: "smooth" });
});

// 공유하기 버튼 클릭 이벤트

const shareButton = document.querySelector(".sticky-share-button");
const toast = document.querySelector(".toast");

shareButton.addEventListener("click", (e) => {
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
});
