const pickFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.hidden = true;
    document.body.appendChild(input);
    return input;
};
const show = (el) => el && (el.hidden = false);
const hide = (el) => el && (el.hidden = true);

const leftList = document.querySelector(".left-img-add-container");
const contentList = document.querySelector(".post-img-content-container");
const thumbTpl = document.querySelector("#thumb-tpl");
const sampleBlock = document.querySelector(".post-img-content-wrapper");
const tagModal = document.querySelector(".modal-popout");
const closeModalBtn = document.querySelector(".close-btn");
let currentBlock = null;

// 편집 버튼 초기 라벨 통일
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((btn) => {
    btn.textContent = "+ 상품 태그 추가";
});

// 왼쪽 + 는 하나만 남기기
if (leftList) {
    const plusItems = leftList.querySelectorAll(".post-sub-img.add");
    for (let i = 1; i < plusItems.length; i++) plusItems[i].remove();
}

//  블록 초기화/미리보기/인덱스
const resetBlock = (block) => {
    block.dataset.idx = "";
    block.querySelector(".img-add-container img")?.remove();

    show(block.querySelector(".dropzone"));
    hide(block.querySelector(".post-img-bottom"));
    hide(block.querySelector(".img-tag-container"));

    const btn = block.querySelector(".edit-button");
    if (btn) btn.textContent = "+ 상품 태그 추가";

    const ta = block.querySelector(".post-input");
    if (ta) ta.value = "";

    block.dataset.armed = "0";
    block.dataset.tx = "";
    block.dataset.ty = "";
};

const previewIn = (block, url) => {
    const box = block.querySelector(".img-add-container");
    let img = box.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        img.className = "css-n9shyu";
        box.appendChild(img);
    }
    img.src = url;
    hide(block.querySelector(".dropzone"));
    show(block.querySelector(".post-img-bottom"));
};

// 인덱스: 빈 슬롯 먼저 사용
let nextIdx = 0;
const freeIdx = [];
const takeIdx = () => (freeIdx.length ? freeIdx.shift() : nextIdx++);
const giveIdx = (i) => {
    const pos = freeIdx.findIndex((v) => v > i);
    if (pos === -1) freeIdx.push(i);
    else freeIdx.splice(pos, 0, i);
};

// 삽입 위치(오름차순 유지)
const findThumbBefore = (idx) => {
    const list = leftList.querySelectorAll(".post-sub-img:not(.add)");
    for (const li of list) if (+li.dataset.idx > idx) return li;
    return leftList.querySelector(".post-sub-img.add");
};
const findBlockBefore = (idx) => {
    const list = contentList.querySelectorAll(
        ".post-img-content-wrapper[data-idx]"
    );
    for (const li of list) if (+li.dataset.idx > idx) return li;
    return null;
};

// 파일로 한 쌍 만들기 (왼쪽 썸네일 + 오른쪽 블록)
const addPairWithFile = (file) => {
    if (!file || !file.type?.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const idx = takeIdx();

    // 블록: 첫 템플릿이 비어있고 idx==0이면 재사용, 아니면 복제
    let block;
    const firstIsEmpty =
        sampleBlock &&
        !sampleBlock.dataset.idx &&
        !sampleBlock.querySelector(".img-add-container img");
    if (firstIsEmpty && idx === 0) {
        block = sampleBlock;
    } else {
        block = sampleBlock.cloneNode(true);
        resetBlock(block);
    }
    block.dataset.idx = String(idx);
    previewIn(block, url);

    const beforeBlk = findBlockBefore(idx);
    beforeBlk
        ? contentList.insertBefore(block, beforeBlk)
        : contentList.appendChild(block);

    // 왼쪽 썸네일
    const thumb = document.importNode(thumbTpl.content, true).firstElementChild;
    thumb.dataset.idx = String(idx);
    thumb.querySelector(".img-view").src = url;

    const beforeThumb = findThumbBefore(idx);
    leftList.insertBefore(thumb, beforeThumb);
};

// 왼쪽 영역 (추가/삭제/스크롤)
// + 버튼 → 파일 선택 → 쌍 추가
leftList?.addEventListener("click", (e) => {
    if (!e.target.closest(".sub-img-plus-btn-container")) return;
    const input = pickFile();
    input.onchange = () => {
        const f = input.files?.[0];
        if (f) addPairWithFile(f);
        input.remove();
    };
    input.click();
});

// 썸네일 삭제
leftList?.addEventListener("click", (e) => {
    const del = e.target.closest(".delete-sub-img");
    if (!del) return;

    const li = del.closest(".post-sub-img");
    const idx = +li.dataset.idx;
    li.remove();

    contentList
        .querySelector(`.post-img-content-wrapper[data-idx="${idx}"]`)
        ?.remove();
    giveIdx(idx);

    // 모두 지워졌으면 초기화
    if (!leftList.querySelector(".post-sub-img:not(.add)")) {
        if (!sampleBlock.isConnected) contentList.appendChild(sampleBlock);
        resetBlock(sampleBlock);
    }
});

// 썸네일 클릭 → 해당 블록으로 스크롤
leftList?.addEventListener("click", (e) => {
    const thumb = e.target.closest(".post-sub-img:not(.add)");
    if (!thumb || e.target.closest(".delete-sub-img")) return;
    const block = contentList.querySelector(
        `.post-img-content-wrapper[data-idx="${thumb.dataset.idx}"]`
    );
    block?.scrollIntoView({ behavior: "smooth", block: "center" });
});

// 오른쪽 블록 내부 (업로드/삭제/태그)

contentList?.addEventListener("click", (e) => {
    const block = e.target.closest(".post-img-content-wrapper");
    if (!block) return;
    const idx = block.dataset.idx;

    // PC에서 불러오기 / 다시 올리기
    if (e.target.closest(".pc-upload-btn") || e.target.closest(".return-img")) {
        const input = pickFile();
        input.onchange = () => {
            const f = input.files?.[0];
            if (!f?.type?.startsWith("image/")) {
                input.remove();
                return;
            }

            const url = URL.createObjectURL(f);
            previewIn(block, url);

            // 처음 업로드면 인덱스 배정 + 썸네일 생성
            if (!block.dataset.idx) {
                const i = takeIdx();
                block.dataset.idx = String(i);

                const thumb = document.importNode(
                    thumbTpl.content,
                    true
                ).firstElementChild;
                thumb.dataset.idx = String(i);
                thumb.querySelector(".img-view").src = url;

                const beforeThumb = findThumbBefore(i);
                leftList.insertBefore(thumb, beforeThumb);
            } else {
                // 이미 idx 있으면 기존 썸네일만 갱신
                const iv = leftList?.querySelector(
                    `.post-sub-img[data-idx="${block.dataset.idx}"] .img-view`
                );
                if (iv) iv.src = url;
            }

            input.remove();
        };
        input.click();
        return;
    }

    // 삭제(오른쪽)
    if (e.target.closest(".delete-img")) {
        const i = +idx;
        leftList?.querySelector(`.post-sub-img[data-idx="${i}"]`)?.remove();
        block.remove();
        giveIdx(i);

        if (!leftList?.querySelector(".post-sub-img:not(.add)")) {
            if (!sampleBlock.isConnected) contentList.appendChild(sampleBlock);
            resetBlock(sampleBlock);
        }
        return;
    }

    // 태그 편집 토글
    if (e.target.closest(".edit-button")) {
        const btn = e.target.closest(".edit-button");
        const armed = block.dataset.armed === "1";
        block.dataset.armed = armed ? "0" : "1";
        btn.textContent = armed ? "+ 상품 태그 추가" : "태그 편집 완료";
        return;
    }

    // 이미지 클릭 → 편집 중일 때만 좌표 저장 + 모달
    const box = e.target.closest(".img-add-container");
    if (box && box.querySelector("img") && block.dataset.armed === "1") {
        const r = box.getBoundingClientRect();
        const relY = (e.clientY - r.top) / r.height;
        if (relY > 0.85) return; // 하단 영역 무시

        const xPct = ((e.clientX - r.left) / r.width) * 100;
        const yPct = ((e.clientY - r.top) / r.height) * 100;
        block.dataset.tx = xPct.toFixed(2);
        block.dataset.ty = yPct.toFixed(2);

        currentBlock = block;
        openModalAt(e.pageX, e.pageY);
        return;
    }

    //  파란 + 클릭 → 모달
    if (e.target.closest(".tag-add-btn")) {
        const b = e.target.closest(".tag-add-btn").getBoundingClientRect();
        currentBlock = block;
        openModalAt(
            b.left + b.width / 2 + window.scrollX,
            b.bottom + window.scrollY
        );
        return;
    }
});

// 태그 모달
const openModalAt = (x, y) => {
    if (!tagModal) return;
    Object.assign(tagModal.style, {
        display: "block",
        position: "absolute",
        left: `${x}px`,
        top: `${y + 12}px`,
        transform: "translate(-50%,0)",
    });
};

closeModalBtn?.addEventListener(
    "click",
    (e) => (tagModal.style.display = "none")
);

tagModal?.addEventListener("click", (e) => {
    // 바깥 클릭 → 닫기
    if (!e.target.closest(".modal-view")) {
        tagModal.style.display = "none";
        return;
    }

    // "선택" → 현재 블록에 파란 + 고정
    if (e.target.closest(".tag-select-btn")) {
        if (currentBlock) {
            const { tx, ty } = currentBlock.dataset;
            if (tx && ty) {
                const pin = currentBlock.querySelector(".img-tag-container");
                pin.style.left = `${tx}%`;
                pin.style.top = `${ty}%`;
                show(pin);
            }
        }
        tagModal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tagModal && (tagModal.style.display = "none");
});

// 상단 태그 입력(칩 생성)
(() => {
    const form = document.querySelector(".input-tag-container");
    if (!form) return;

    const input = form.querySelector(".input-tag-wrap");
    const btn = form.querySelector(".input-tag-btn");
    let list = form.parentElement.querySelector(".tag-list");

    if (!list) {
        list = document.createElement("div");
        list.className = "tag-list";
        form.parentElement.appendChild(list);
    }

    const addChip = () => {
        const v = (input.value || "").trim();
        if (!v) return;
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "tag-chip";
        chip.textContent = v;

        chip.addEventListener("click", (e) => chip.remove());

        list.appendChild(chip);
        input.value = "";
    };

    form.addEventListener("submit", (e) => {
        ev.preventDefault();
        addChip();
    });
    btn?.addEventListener("click", (e) => {
        ev.preventDefault();
        addChip();
    });

    input?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.isComposing) {
            e.preventDefault();
            addChip();
        }
    });
})();

// 작성(트리거만)
const complteBtn = document.querySelector(".complete-btn");
complteBtn.addEventListener("click", (e) => {
    console.log("작성 클릭");
});
