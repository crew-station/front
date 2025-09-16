document.addEventListener("DOMContentLoaded", () => {
    function qs(selector) {
        const el = document.querySelector(selector);
        return el;
    }

    function qsa(selector) {
        const els = document.querySelectorAll(selector);
        return els;
    }

    // 신고하기 버튼
    const replyReportBtn = qs(".reply-report-button");
    const reportModal = qs(".report-modal");

    if (replyReportBtn && reportModal) {
        replyReportBtn.addEventListener("click", () => {
            reportModal.classList.add("active");
        });
    }

    // 일기 공개/비공개 설정
    const secretCheckbox = qs(".secret-checkbox");
    const secretToggle = qs(".secret-toggle");
    const lockIcon = qs(".lock");
    const unlockIcon = qs(".unlock");

    if (secretToggle && secretCheckbox && lockIcon && unlockIcon) {
        secretToggle.addEventListener("click", () => {
            secretCheckbox.checked = secretToggle.classList.toggle("active");
            if (secretCheckbox.checked) {
                lockIcon.classList.remove("hidden");
                unlockIcon.classList.add("hidden");
            } else {
                lockIcon.classList.add("hidden");
                unlockIcon.classList.remove("hidden");
            }
        });
    }

    // 신고하기 창 닫기
    const reportCloseBtn = qs(".close-button");
    if (reportCloseBtn && reportModal) {
        reportCloseBtn.addEventListener("click", () => {
            reportModal.classList.remove("active");
            selectFirstReportRadio();
        });
    }

    // 신고하기 창 신고 종류 고르기
    const reportOptions = qsa(".report-content");
    const radioBtns = qsa(".radio-button");

    if (reportOptions.length > 0 && radioBtns.length > 0) {
        reportOptions.forEach((reportOption) => {
            reportOption.addEventListener("click", () => {
                radioBtns.forEach((radioBtn) => {
                    radioBtn.classList.remove("active");
                    const btn = radioBtn.querySelector(".radio");
                    if (btn) btn.checked = false;
                });

                const btn = reportOption.querySelector(".radio");
                if (btn) btn.checked = true;
                const radioButton = reportOption.querySelector(".radio-button");
                if (radioButton) radioButton.classList.add("active");
            });
        });
    }

    // 신고하기 제출
    const submitReportBtn = qs(".report-button-send");
    if (submitReportBtn && reportModal) {
        submitReportBtn.addEventListener("click", () => {
            reportModal.classList.remove("active");
            selectFirstReportRadio();
        });
    }

    // 신고하기 첫번째 라디오 버튼 기본 선택
    function selectFirstReportRadio() {
        radioBtns.forEach((radioBtn, idx) => {
            const btn = radioBtn.querySelector(".radio");
            if (!btn) return;
            if (idx === 0) {
                radioBtn.classList.add("active");
                btn.checked = true;
            } else {
                radioBtn.classList.remove("active");
                btn.checked = false;
            }
        });
    }

    // 댓글 입력 버튼 활성화/비활성화
    const input = qs(".input");
    const enterButton = qs(".enter-button");

    if (input && enterButton) {
        input.addEventListener("input", (e) => {
            if (e.target.value.length > 0) {
                enterButton.classList.add("active");
                enterButton.disabled = false;
            } else {
                enterButton.classList.remove("active");
                enterButton.disabled = true;
            }
        });

        enterButton.addEventListener("click", () => {
            input.value = "";
            enterButton.classList.remove("active");
            enterButton.disabled = true;
        });
    }

    // 페이지 클릭
    const numberButtons = qsa(".number-button");
    if (numberButtons.length > 0) {
        numberButtons.forEach((numberButton) => {
            numberButton.addEventListener("click", () => {
                numberButtons.forEach((btn) => btn.classList.remove("active"));
                numberButton.classList.add("active");
            });
        });
    }

    // 좋아요 버튼
    const likeButton = qs(".sticky-like-button");
    if (likeButton) {
        likeButton.addEventListener("click", () => {
            const likeIcon = likeButton.querySelector(".like-before");
            if (likeIcon) likeIcon.classList.toggle("active");
        });
    }

    // 댓글로 가기 버튼
    const goToCommentButton = qs(".go-reply");
    if (goToCommentButton) {
        goToCommentButton.addEventListener("click", () => {
            const commentSection = qs(".reply-container");
            if (commentSection) {
                commentSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // 공유하기 버튼
    const shareButton = qs(".sticky-share-button");
    const toast = qs(".toast");

    if (shareButton && toast) {
        shareButton.addEventListener("click", () => {
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
            copyToClipboard();
        });
    }

    function copyToClipboard() {
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        textarea.value = window.location.href;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
});
