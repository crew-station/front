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

// 댓글로 가기 버튼

const goReplyBtn = document.querySelector(".menu-reply-container");
const replySection = document.querySelector(".reply-section-container");

if (goReplyBtn && replySection) {
    goReplyBtn.addEventListener("click", () => {
        replySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

// 공유하기 버튼

const shareButton = document.querySelector(".menu-share-container");
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
