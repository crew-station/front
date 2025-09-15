// 이메일 입력 줄 추가/삭제
const getRows = () => document.querySelectorAll(".invite-email-input");
const refreshMinus = () => {
    const many = getRows().length > 1;
    document
        .querySelectorAll(".invite-email-input .minus-btn")
        .forEach((btn) => (btn.disabled = !many));
};
document.addEventListener("click", (e) => {
    const plus = e.target.closest(".plus-btn");
    const minus = e.target.closest(".minus-btn");
    if (!plus && !minus) return;

    const row = e.target.closest(".invite-email-input");
    if (!row) return;
    const list = row.parentElement;

    if (plus) {
        const clone = row.cloneNode(true);
        const input = clone.querySelector("input");
        if (input) input.value = "";

        // 복제된 줄의 - 버튼은 일단 켜두기(disabled 제거)
        const cMinus = clone.querySelector(".minus-btn");
        if (cMinus) cMinus.disabled = false;
        row.after(clone);
        refreshMinus();
    }

    if (minus) {
        const rows = getRows();
        if (rows.length > 1) {
            row.remove();
            refreshMinus();
        }
    }
});
refreshMinus();

// 제목 글자 수 카운트
const titleInput = document.querySelector(".input-title");
const titleCount = document.querySelector(".text-max-count");

if (titleInput && titleCount) {
    const updateCount = (e) => {
        titleCount.textContent = `${titleInput.value.length} / 80`;
    };
    titleInput.addEventListener("input", updateCount);
    updateCount();
}

// 본문 입력

const content = document.querySelector(".input-content");
if (content) {
    const placeholder = "내용을 입력하세요.";
    content.setAttribute("contenteditable", "true");

    if (content.innerText.trim() === placeholder || !content.innerText.trim()) {
        content.classList.add("placeholder");
        content.innerText = placeholder;
        content.computedStyleMap.color = "#cccccc";
    }

    content.addEventListener("focus", (e) => {
        if (content.innerText.trim() === placeholder) {
            content.innerText = "";
            content.computedStyleMap.color = "#292929";
        }
    });

    content.addEventListener("blur", (e) => {
        if (!content.innerText.trim()) {
            content.innerText = placeholder;
            content.computedStyleMap.color = "#cccccc";
        }
    });

    content.addEventListener("input", (e) => {
        const empty = !content.textContent.trim();
        content.style.color = empty ? "#cccccc" : "#292929";
    });
}

// 사진 첨부 버튼 클릭 이벤트

const crewImgBtn = document.querySelector(".cover-img-border");
crewImgBtn.addEventListener("click", (e) => {
    console.log(1111);
});

// 크루 개설하기 완료 버튼 클릭 이벤트

const createBtn = document.querySelector(".new-crew");
createBtn.addEventListener("click", (e) => {
    console.log(2222);
});
