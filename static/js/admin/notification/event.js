// 사이드 바
(() => {
    const side = document.querySelector("#bootpay-side");
    if (!side) return;

    const topButtons = side.querySelectorAll(".menu-item > .menu-btn");
    const subLists = side.querySelectorAll(".menu-item > .menu-sub-list");

    // 초기화: 인라인 display 정리 + 버튼 상태 동기화
    subLists.forEach((ul) => {
        const opened =
            ul.classList.contains("show") || ul.style.display === "block";
        ul.classList.toggle("show", opened);
        ul.style.display = opened ? "block" : "none";
        if (opened)
            ul.previousElementSibling?.classList.add("active", "current");
    });

    const clearAll = () => {
        // 서브 패널 닫기
        subLists.forEach((ul) => {
            ul.classList.remove("show");
            ul.style.display = "none";
        });
        // 상단 버튼 강조 해제 (active + current 둘 다)
        topButtons.forEach((btn) => btn.classList.remove("active", "current"));
    };

    side.addEventListener("click", (e) => {
        // 서브 링크 클릭
        const subLink = e.target.closest(".menu-sub-list .boot-link");
        if (subLink) {
            e.preventDefault();

            // 서브 링크 active 표시
            side.querySelectorAll(".menu-sub-list .boot-link").forEach((a) =>
                a.classList.remove("active")
            );
            subLink.classList.add("active");

            clearAll();
            const ul = subLink.closest(".menu-sub-list");
            if (ul) {
                ul.classList.add("show");
                ul.style.display = "block";
                ul.previousElementSibling?.classList.add("active", "current");
            }
            return;
        }

        // 2) 상단 버튼 클릭
        const btn = e.target.closest(".menu-item > .menu-btn");
        if (!btn) return;
        e.preventDefault();

        const panel = btn.nextElementSibling;
        const hasPane = panel && panel.classList.contains("menu-sub-list");
        const wasOpen = hasPane && panel.classList.contains("show");

        clearAll();

        // 클릭한 버튼을 active로 표시
        btn.classList.add("active");

        // 서브가 있으면 열기 (아코디언)
        if (hasPane && !wasOpen) {
            panel.classList.add("show");
            panel.style.display = "block";
            btn.classList.add("current");
        }
    });
})();

// ===== 우측 상단 유저 메뉴 =====
(() => {
    const userMenuBtn = document.querySelector(".user-menu-wrapper");
    const userMenu = document.querySelector(".user-menu-content");

    if (!userMenuBtn || !userMenu) return;

    userMenuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        userMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.remove("show");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") userMenu.classList.remove("show");
    });
})();

// 페이지 번호 클릭 이벤트(데이터를 받아와야 하는 곳이라 주석 처리)
const pageNums = document.querySelectorAll(".page-num");
const pageItemNums = document.querySelectorAll(".page-item-num");

pageItemNums.forEach((pageItemNum) => {
    pageItemNum.addEventListener("click", (e) => {
        e.preventDefault();

        pageNums.forEach((pageNum) => {
            pageNum.classList.remove("active");
        });

        pageItemNum.parentElement.classList.add("active");
    });
});

// 공지사항 클릭이벤트

const pageMoves = document.querySelectorAll(".notice-title");

pageMoves.forEach((title) => {
    console.log(title);
    title.addEventListener("click", (e) => {
        const tr = title.closest("tr");
    });
});
