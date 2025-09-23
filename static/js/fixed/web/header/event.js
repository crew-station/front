// 글쓰기 버튼 팝업 부분
const stickyContainer = document.querySelector("div.sticky-container");
const postRegBtn = document.querySelector("button.post-reg-btn");
// popup.classList.add("active");
const popup = document.querySelector("div.btn-click-slide-container");
console.log(popup);

// 프로필 팝업 부분
const profilePopup = document.querySelector("div.profile-popup-btn");

document.querySelector("body").addEventListener("click", (e) => {
    console.log(e.target);
    console.log(e.target.closest("button.mebmer-profile-btn"));

    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    }
    if (profilePopup?.classList.contains("active")) {
        profilePopup.classList.remove("active");
    }
    if (e.target.closest("button.post-reg-btn") === postRegBtn) {
        console.log("일치");
        popup.classList.add("active");
    } else if (e.target.closest("button.mebmer-profile-btn")) {
        profilePopup.classList.add("active");
    }
});

// 헤더 버튼에 따른 서브 헤더 보이는거 다르게
let currentPage = "home"; // 이거 나중에 서버에서 받와야합니다 지금은 임시로 해놓은 부분
const stickyBtns = document.querySelectorAll("a.sticky-btn");
stickyBtns.forEach((stickyBtn) => {
    // 헤더 버튼 글씨 색깔 바꿔주기
    stickyBtn.addEventListener("click", (e) => {
        stickyBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
        stickyBtn.classList.add("active");
        const subHeader = stickyBtn.classList[1];
        currentPage = subHeader;
        const headers = document.querySelectorAll(
            `div.sticky-container.sticky-sub-container`
        );
        headers.forEach((header) => {
            console.log(header.classList.contains(subHeader));
            if (header.classList.contains(subHeader)) {
                header.classList.add("active");
                header.firstElementChild.style.zIndex = 1000;
            } else {
                header.classList.remove("active");
                header.firstElementChild.style.zIndex = 1200;
            }
        });

        // 서브헤더 선택 초기화 해주기
        const initActives = document.querySelectorAll(
            `div.sticky-container.sticky-sub-container.${subHeader} a.header-category`
        );
        initActives.forEach((init, index) => {
            if (index === 0) {
                init.classList.add("active");
                init.firstElementChild.firstElementChild.classList.replace(
                    "header-name",
                    "header-name-check"
                );
            } else {
                init.classList.remove("active");
                init.firstElementChild.firstElementChild.classList.replace(
                    "header-name-check",
                    "header-name"
                );
            }
        });
    });
});

// 서브 헤더 버튼 클릭 이벤트
const subHeaders = document.querySelectorAll(
    "div.sticky-container.sticky-sub-container"
);
// 클릭하면 해당 부분 색깔과 밑줄 옮겨주기
subHeaders.forEach((subHeader) => {
    subHeader.addEventListener("click", (e) => {
        const activeBtn = e.target.closest("a.header-category");
        if (activeBtn) {
            if (!activeBtn.classList.contains("active")) {
                subHeader
                    .querySelector("a.header-category.active")
                    .classList.remove("active");
                subHeader
                    .querySelector("p.header-name-check")
                    .classList.replace("header-name-check", "header-name");

                activeBtn.classList.add("active");
                activeBtn.firstElementChild.firstElementChild.classList.replace(
                    "header-name",
                    "header-name-check"
                );
            }
        }
    });
});

// 마우스 호버 및 아웃할 때 서브 헤더 보여주기 없애주기
const crewSubHeader = document.querySelector(
    "div.sticky-container.sticky-sub-container.crew"
);
const diarySubHeader = document.querySelector(
    "div.sticky-container.sticky-sub-container.diary"
);
let prevBtn = null;
// 헤더 버튼에 마우스 출입 이벤트 부분
stickyBtns.forEach((stickyBtn) => {
    let category = null;
    let subHeader = null;
    stickyBtn.addEventListener("mouseenter", (e) => {
        const category = stickyBtn.classList[1];
        if (category === "crew") {
            subHeader = crewSubHeader;
            console.log(subHeader);
        } else if (category === "diary") {
            subHeader = diarySubHeader;
        }
        if (subHeader) {
            console.log(subHeader);

            console.log("마우스 엔터 이벤트 체크" + subHeader);
            console.log(subHeader.firstElementChild.style);

            subHeader.firstElementChild.style.top = "81px";
            subHeader.classList.add("active");
        }
    });

    stickyBtn.addEventListener("mouseleave", (e) => {
        category = stickyBtn.classList[1];
        if (currentPage === category) return;
        if (category === "crew") {
            subHeader = crewSubHeader;
        } else if (category === "diary") {
            subHeader = diarySubHeader;
        }
        prevBtn = stickyBtn; // 이전 버튼 저장해놓기
        // 서브, 버튼에 둘 다 마우스 없으면 100ms후에 바로 서브해더 닫기
        setTimeout(() => {
            if (!stickyBtn.matches(":hover") && !subHeader.matches(":hover")) {
                subHeader?.classList.remove("active");
                subHeader.firstElementChild.style.top = "29px;";
            }
        }, 100);
    });
});

// 서브헤더에 각각 마우스 출입 이벤트
crewSubHeader.addEventListener("mouseleave", (e) => {
    if (currentPage === "crew") return;
    // 서브, 버튼에 둘 다 마우스 없으면 100ms후에 바로 서브해더 닫기
    setTimeout(() => {
        if (!prevBtn.matches(":hover") && !crewSubHeader.matches(":hover")) {
            crewSubHeader.classList.remove("active");
        }
    }, 100);
});

diarySubHeader.addEventListener("mouseleave", (e) => {
    if (currentPage === "diary") return;
    // 서브, 버튼에 둘 다 마우스 없으면 100ms후에 바로 서브해더 닫기
    setTimeout(() => {
        if (!prevBtn.matches(":hover") && !diarySubHeader.matches(":hover")) {
            diarySubHeader.classList.remove("active");
        }
    }, 100);
});

// 스크롤 시 헤더 내려가게
// let lastScrollY = 0;
const header = document.getElementById("header");
const secondaryHeaders = document.querySelectorAll(
    "div.layout-navigation-secondary"
);

window.addEventListener("wheel", (e) => {
    if (e.wheelDeltaY < 0) {
        secondaryHeaders.forEach((secondaryHeader) => {
            console.log(secondaryHeader);

            secondaryHeader.classList.add("scroll-down");
            secondaryHeader.style.top = "29px";
        });
    } else {
        secondaryHeaders.forEach((secondaryHeader) => {
            secondaryHeader.classList.remove("scroll-down");
            secondaryHeader.style.top = "81px";
        });
    }
});
