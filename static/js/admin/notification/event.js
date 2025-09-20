// =============== 사이드바 ===============
(() => {
    const side = document.querySelector("#bootpay-side");
    if (!side) return;

    const topButtons = side.querySelectorAll(".menu-item > .menu-btn");
    const subLists = side.querySelectorAll(".menu-item > .menu-sub-list");

    const closeAllMenus = () => {
        subLists.forEach((ul) => {
            ul.classList.remove("show");
            ul.style.display = "none";
        });
        topButtons.forEach((btn) => btn.classList.remove("active", "current"));
        side.querySelectorAll(".menu-list > li").forEach((li) =>
            li.classList.remove("open")
        );
    };

    const syncFromDOM = () => {
        // 서브링크 .active 가 있는 패널들은 펼친다
        subLists.forEach((ul) => {
            const hasActiveChild = !!ul.querySelector(".boot-link.active");
            const markedShow = ul.classList.contains("show");
            if (hasActiveChild || markedShow) {
                ul.classList.add("show");
                ul.style.display = "block";
                const btn = ul.previousElementSibling; // 상위 메뉴 버튼
                const li = ul.closest("li");
                btn && btn.classList.add("active", "current");
                li && li.classList.add("open");
            }
        });

        //  최상위 버튼이 .active 라면 그 다음 패널도 열어준다
        side.querySelectorAll(".menu-item > .menu-btn.active").forEach(
            (btn) => {
                const panel = btn.nextElementSibling;
                if (panel && panel.classList.contains("menu-sub-list")) {
                    panel.classList.add("show");
                    panel.style.display = "block";
                    btn.classList.add("current");
                    btn.closest("li")?.classList.add("open");
                }
            }
        );
    };

    // 초기 처리: active/show 가 하나라도 있으면 그 상태를 살리고,
    // 없으면(아무 지정도 없으면) 전체 닫기
    const hasExplicit = !!side.querySelector(
        ".menu-btn.active, .menu-btn.current, .menu-sub-list.show, .menu-sub-list .boot-link.active"
    );

    if (hasExplicit) {
        syncFromDOM();
    } else {
        closeAllMenus();
    }

    // 이하 클릭 위임 로직은 그대로 유지
    side.addEventListener("click", (e) => {
        const subLink = e.target.closest(".menu-sub-list .boot-link");
        if (subLink && side.contains(subLink)) {
            e.preventDefault();
            const ul = subLink.closest(".menu-sub-list");
            ul.querySelectorAll(".boot-link.active").forEach((a) =>
                a.classList.remove("active")
            );
            subLink.classList.add("active");

            closeAllMenus();
            ul.classList.add("show");
            ul.style.display = "block";
            const btn = ul.previousElementSibling;
            const li = ul.closest("li");
            btn && btn.classList.add("active", "current");
            li && li.classList.add("open");
            return;
        }

        const btnTop = e.target.closest(".menu-item > .menu-btn");
        if (!btnTop || !side.contains(btnTop)) return;
        e.preventDefault();

        const panel = btnTop.nextElementSibling;
        const hasPane = panel && panel.classList.contains("menu-sub-list");
        const wasOpen = hasPane && panel.classList.contains("show");

        closeAllMenus();
        btnTop.classList.add("active");

        if (hasPane && !wasOpen) {
            panel.classList.add("show");
            panel.style.display = "block";
            btnTop.classList.add("current");
            btnTop.closest("li")?.classList.add("open");
        }
    });
})();

// =============== 우측 상단 유저 메뉴 ===============
(() => {
    const btn = document.getElementById("usermenubtn");
    const menu = document.getElementById("usermenu");
    if (!btn || !menu) return;

    const hide = () => {
        menu.classList.remove("show");
        menu.style.display = "none";
    };

    const toggle = () => {
        const willShow = !menu.classList.contains("show");
        menu.classList.toggle("show", willShow);
        menu.style.display = willShow ? "block" : "none";
    };

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggle();
    });

    document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) hide();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") hide();
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

// 모달 열기/닫기
(() => {
    const modal = document.getElementById("modal");
    if (!modal) return;

    const body = document.body;

    // 열기 트리거: #modal-open 이 있으면 사용, 없으면 .action-btn 도 허용(선택)
    const openers = document.querySelectorAll("#save-order-btn");

    // 닫기 트리거
    const closer = document.getElementById("close");
    const footerClose = modal.querySelector(".btn-close"); // "답변하기" 버튼이 닫기가 아니면 삭제해도 됨

    const openModal = () => {
        modal.style.display = "block";
        // 다음 프레임에서 show 붙여 트랜지션 자연스럽게
        requestAnimationFrame(() => {
            modal.classList.add("show");
            modal.style.background = "rgba(0,0,0,0.5)";
            body.classList.add("modal-open");
        });
    };

    const closeModal = () => {
        modal.classList.remove("show");
        body.classList.remove("modal-open");
        setTimeout(() => {
            modal.style.display = "none";
            modal.style.background = "";
        }, 150);
    };

    // 열기
    openers.forEach((el) =>
        el?.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        })
    );

    // 닫기 (X 버튼 / 푸터 버튼)
    closer?.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });
    footerClose?.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });

    // 오버레이 클릭으로 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC 로 닫기
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show"))
            closeModal();
    });
})();
