// 나라 자동완성
const countries = [
    "가나",
    "가봉",
    "가이아나",
    "감비아",
    "과테말라",
    "그레나다",
    "그리스",
    "기니",
    "기니비사우",
    "나미비아",
    "나우루",
    "나이지리아",
    "남수단",
    "남아프리카공화국",
    "네덜란드",
    "네팔",
    "노르웨이",
    "뉴질랜드",
    "니카라과",
    "니제르",
    "대한민국",
    "덴마크",
    "도미니카공화국",
    "도미니카연방",
    "독일",
    "동티모르",
    "라오스",
    "라이베리아",
    "라트비아",
    "러시아",
    "레바논",
    "레소토",
    "루마니아",
    "룩셈부르크",
    "르완다",
    "리비아",
    "리투아니아",
    "리히텐슈타인",
    "마다가스카르",
    "마셜제도",
    "말라위",
    "말레이시아",
    "말리",
    "멕시코",
    "모나코",
    "모로코",
    "모리셔스",
    "모리타니",
    "모잠비크",
    "몬테네그로",
    "몰도바",
    "몰디브",
    "몰타",
    "몽골",
    "미국",
    "미얀마",
    "미크로네시아",
    "바누아투",
    "바레인",
    "바베이도스",
    "바하마",
    "방글라데시",
    "베냉",
    "베네수엘라",
    "베트남",
    "벨기에",
    "벨라루스",
    "벨리즈",
    "보스니아헤르체고비나",
    "보츠와나",
    "볼리비아",
    "부룬디",
    "부르키나파소",
    "부탄",
    "북마케도니아",
    "북한",
    "불가리아",
    "브라질",
    "브루나이",
    "사모아",
    "사우디아라비아",
    "사이프러스",
    "산마리노",
    "상투메프린시페",
    "세네갈",
    "세르비아",
    "세이셸",
    "세인트루시아",
    "세인트빈센트그레나딘",
    "세인트키츠네비스",
    "소말리아",
    "솔로몬제도",
    "수단",
    "수리남",
    "스리랑카",
    "스웨덴",
    "스위스",
    "스페인",
    "슬로바키아",
    "슬로베니아",
    "시리아",
    "시에라리온",
    "싱가포르",
    "아랍에미리트",
    "아르메니아",
    "아르헨티나",
    "아이슬란드",
    "아이티",
    "아일랜드",
    "아제르바이잔",
    "아프가니스탄",
    "안도라",
    "알바니아",
    "알제리",
    "앙골라",
    "앤티가바부다",
    "에콰도르",
    "에스와티니",
    "에스토니아",
    "에티오피아",
    "엘살바도르",
    "영국",
    "예멘",
    "오만",
    "오스트리아",
    "온두라스",
    "요르단",
    "우간다",
    "우루과이",
    "우즈베키스탄",
    "우크라이나",
    "이라크",
    "이란",
    "이스라엘",
    "이집트",
    "이탈리아",
    "인도",
    "인도네시아",
    "일본",
    "잠비아",
    "적도기니",
    "조지아",
    "중앙아프리카공화국",
    "중국",
    "지부티",
    "짐바브웨",
    "체코",
    "칠레",
    "카메룬",
    "카보베르데",
    "카자흐스탄",
    "카타르",
    "캄보디아",
    "캐나다",
    "케냐",
    "코모로",
    "코스타리카",
    "코트디부아르",
    "콜롬비아",
    "콩고공화국",
    "콩고민주공화국",
    "쿠바",
    "쿠웨이트",
    "쿡제도",
    "크로아티아",
    "키르기스스탄",
    "키리바시",
    "타지키스탄",
    "탄자니아",
    "태국",
    "토고",
    "통가",
    "투르크메니스탄",
    "투발루",
    "튀니지",
    "튀르키예",
    "트리니다드토바고",
    "파나마",
    "파라과이",
    "파키스탄",
    "파푸아뉴기니",
    "팔라우",
    "팔레스타인",
    "페루",
    "포르투갈",
    "폴란드",
    "프랑스",
    "피지",
    "핀란드",
    "필리핀",
];

const countryInput = document.querySelector(".input-tag-wrap");
const countryDropdown = document.getElementById("countryDropdown");

if (countryInput && countryDropdown) {
    countryInput.addEventListener("input", () => {
        console.log("들어옴");
        const value = countryInput.value.trim();
        countryDropdown.innerHTML = "";

        if (!value) {
            countryDropdown.style.display = "none";
            return;
        }

        const filtered = countries.filter((c) => c.includes(value));

        if (filtered.length) {
            filtered.forEach((country) => {
                const li = document.createElement("li");
                li.textContent = country;
                li.addEventListener("click", () => {
                    countryInput.value = country;
                    countryDropdown.style.display = "none";
                });
                countryDropdown.appendChild(li);
            });
            countryDropdown.style.display = "block";
        } else {
            countryDropdown.style.display = "none";
        }
    });

    // 바깥 클릭 시 닫기
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".autocomplete")) {
            countryDropdown.style.display = "none";
        }
    });
}

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
    btn.textContent = "+ 맨션 태그 추가";
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

    const btn = block.querySelector(".edit-button");
    if (btn) btn.textContent = "+ 상품 태그 추가";

    const ta = block.querySelector(".post-input");
    if (ta) ta.value = "";

    block.dataset.armed = "0";
    block.dataset.tx = "";
    block.dataset.ty = "";
};

const previewIn = (block, url) => {
    const box = block.querySelector(".img-container");
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

const imgPlusBtn = document.querySelector(".sub-img-plus-btn-container");
const postContainer = document.querySelector(".post-img-content-container");

imgPlusBtn.addEventListener("click", (e) => {
    postContainer.innerHTML += `
        <li class="post-img-content-wrapper">
            <div class="post-img-content">
            <div class="post-img">
                <div class="img-add-container" style="position:relative; padding-bottom:100%;">
                <!-- 초기 드롭존 -->
                <div class="dropzone">
                    <!-- <div class="dz-title">사진을 드래그해서 놓으세요</div>
                    <div class="dz-sub">10장까지 올릴 수 있어요.</div> -->
                    <button type="button" class="pc-upload-btn">사진 불러오기</button>
                </div>
                <!-- 하단 오버레이/파란+ 는 처음엔 hidden -->
                <div class="post-img-bottom" hidden>
                    <button class="return-img" type="button" title="다시 올리기" aria-label="다시 올리기">
                        <svg class="icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                        <path d="M17.9 10a6.4 6.4 0 0 0-6-4.5c-3.6 0-6.4 2.9-6.4 6.5s2.8 6.5 6.3 6.5c2.2 0 4.1-1 5.3-2.9a.7.7 0 1 1 1.2.8 7.8 7.8 0 0 1-6.5 3.6C7.5 20 4 16.4 4 12s3.5-8 7.8-8c3.4 0 6.3 2.2 7.4 5.3l.7-1.4a.7.7 0 1 1 1.3.7l-1.8 3.1a.7.7 0 0 1-1 .3l-3-1.8a.7.7 0 1 1 .7-1.3l1.8 1z"></path>
                        </svg>
                    </button>
                    
                    <button class="delete-img" type="button" title="삭제" aria-label="삭제">
                        <svg class="icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                        <path d="M6 19V7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM19 4v2H5V4h3.5l1-1h5l1 1H19z"></path>
                        </svg>
                    </button>
                    
                    <button class="edit-button" type="button">맨션 편집 완료</button>
                    </div>
                    <div class="tags-container">
                    <div class="img-tag-container tag" hidden>
                        <button class="tag-add-btn" type="button">
                        <svg width="18" height="18" viewBox="0 0 24 24" class="plus-img">
                            <circle cx="12" cy="12" r="12" fill="#647FBC"></circle>
                            <path stroke="#FFF" stroke-width="2" d="M12 16V8m-4 4h8"></path>
                        </svg>
                        </button>
                        <div class="mention-window">
                        <div class="triangle"></div>
                        <div class="mention-profile">
                            <a class="profile-a">
                                <div class="mention-profile-img">
                                    <img src="/static/images/crew-station-icon-profile.png">
                                </div>
                                <span id="mention-name">CREW2</span>
                            </a>
                        </div>
                    </div>
                    </div>
                    <div class="img-tag-container tag" hidden>
                        <button class="tag-add-btn" type="button">
                        <svg width="18" height="18" viewBox="0 0 24 24" class="plus-img">
                            <circle cx="12" cy="12" r="12" fill="#647FBC"></circle>
                            <path stroke="#FFF" stroke-width="2" d="M12 16V8m-4 4h8"></path>
                        </svg>
                        </button>
                        <div class="mention-window">
                        <div class="triangle"></div>
                        <div class="mention-profile">
                            <a class="profile-a">
                                <div class="mention-profile-img">
                                    <img src="/static/images/crew-station-icon-profile.png">
                                </div>
                                <span id="mention-name">CREW2</span>
                            </a>
                        </div>
                    </div>
                    </div>
                    <div class="img-tag-container tag" hidden>
                        <button class="tag-add-btn" type="button">
                        <svg width="18" height="18" viewBox="0 0 24 24" class="plus-img">
                            <circle cx="12" cy="12" r="12" fill="#647FBC"></circle>
                            <path stroke="#FFF" stroke-width="2" d="M12 16V8m-4 4h8"></path>
                        </svg>
                        </button>
                        <div class="mention-window">
                        <div class="triangle"></div>
                        <div class="mention-profile">
                            <a class="profile-a">
                                <div class="mention-profile-img">
                                    <img src="/static/images/crew-station-icon-profile.png">
                                </div>
                                <span id="mention-name">CREW2</span>
                            </a>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class="img-container"></div>
                </div>
            </div>
            <div class="img-post-term">
                <div class="post-write-container">
                <div class="post-write-wrapper">
                    <textarea placeholder="일기를 작성해 주세요." rows="6" class="post-input"></textarea>
                </div>
                </div>
            </div>
            </div>
        </li>
    `;
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
        btn.textContent = armed ? "+ 맨션 태그 추가" : "맨션 편집 완료";
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

const tagsContainer = document.querySelector(".tags-container");

tagModal?.addEventListener("click", (e) => {
    // 바깥 클릭 → 닫기
    if (!e.target.closest(".modal-view")) {
        tagModal.style.display = "none";
        return;
    }

    // "선택" 버튼 눌렀을 때
    if (e.target.closest(".tag-select-btn")) {
        if (currentBlock) {
            const { tx, ty } = currentBlock.dataset;
            if (tx && ty) {
                // 아직 숨겨져 있는 태그 찾기
                const hiddenPin = currentBlock.querySelector(
                    ".img-tag-container[hidden]"
                );
                if (hiddenPin) {
                    hiddenPin.style.left = `${tx}%`;
                    hiddenPin.style.top = `${ty}%`;
                    hiddenPin.hidden = false; // 보여주기

                    // 버튼 호버 했을 때 멘션한 사람 보이게

                    const mentionProfile = e.target.closest(
                        ".tag-profile-container"
                    );

                    const profileImg =
                        mentionProfile.querySelector(".ymDK1").src;
                    const profileName =
                        mentionProfile.querySelector(".member-name").innerText;

                    hiddenPin.querySelector(".mention-profile-img img").src =
                        profileImg;
                    hiddenPin.querySelector("#mention-name").innerText =
                        profileName;
                } else {
                    alert("태그는 최대 3개까지만 추가할 수 있어요!");
                }
            }
        }
        tagModal.style.display = "none";
    }
});

// 태그 클릭하면 다시 숨기기
tagsContainer.addEventListener("click", (e) => {
    const pin = e.target.closest(".img-tag-container");
    if (pin && !pin.hidden) {
        pin.hidden = true;
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

    form.addEventListener("click", (e) => {
        addChip();
    });
    btn?.addEventListener("click", (e) => {
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
