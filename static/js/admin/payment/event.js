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

// 결제 상태 선택 토글
const paySelectBtn = document.getElementById("btn-filter-status");
const paySelect = document.querySelector(".bt-pop-menu-context");

paySelectBtn.addEventListener("click", () => {
    paySelect.classList.toggle("show");
});

// 전체 선택  전체 해제
const selectAllBtn = document.getElementById("btn-select-all");
const deselectAllBtn = document.getElementById("btn-deselect-all");
const checkBoxes = document.querySelectorAll(".boot-check-box");

selectAllBtn.addEventListener("click", () => {
    checkBoxes.forEach((box) => {
        const icon = box.querySelector("i.mdi-check");
        if (icon) {
            icon.style.display = "inline-block";
            box.classList.add("active");
        }
        box.classList.add("flash");
        box.addEventListener(
            "animationend",
            () => {
                box.classList.remove("flash");
            },
            { once: true }
        );
    });
    selectAllBtn.classList.add("flash");
    selectAllBtn.addEventListener(
        "animationend",
        () => {
            selectAllBtn.classList.remove("flash");
        },
        { once: true }
    );

    selectAllBtn.classList.add("active");
});

deselectAllBtn.addEventListener("click", () => {
    checkBoxes.forEach((box) => {
        const icon = box.querySelector("i.mdi-check");
        if (icon) {
            icon.style.display = "none";
            box.classList.remove("active");
        }
    });
    selectAllBtn.classList.remove("active");
});

// 그룹별 상위 체크박스 관련 변수
const checkAll = document.querySelectorAll(".all-check-btn");
const pays = ["collapse_payloading", "collapse_payFail", "collapse_cancel"];

const paySections = pays.map((id) => document.getElementById(id));

// 그룹별 전체 선택 버튼 클릭 시
checkAll.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const section = paySections[index];
        const icons = section.querySelectorAll("i.mdi-check");

        const isAnyUnchecked = Array.from(icons).some(
            (icon) => icon.style.display !== "inline-block"
        );

        icons.forEach((icon) => {
            icon.style.display = isAnyUnchecked ? "inline-block" : "none";
            const box = icon.closest(".boot-check-box");
            box?.classList.toggle("active", isAnyUnchecked);
        });

        const parentIcon = btn.querySelector("i.mdi-check");
        if (parentIcon) {
            parentIcon.style.display = isAnyUnchecked ? "inline-block" : "none";
            btn.classList.toggle("active", isAnyUnchecked);
        }
    });
});

// 개별 체크박스 클릭 시 - 상위 체크 상태 자동 갱신
document.querySelectorAll(".boot-check-box").forEach((box) => {
    box.addEventListener("click", () => {
        const icon = box.querySelector("i.mdi-check");
        const isChecked = icon.style.display === "inline-block";

        icon.style.display = isChecked ? "none" : "inline-block";
        box.classList.toggle("active", !isChecked);

        // 🔁 상위 체크 상태 갱신
        paySections.forEach((section, index) => {
            if (section.contains(box)) {
                const icons = section.querySelectorAll(
                    ".boot-check-box i.mdi-check"
                );
                const allChecked = Array.from(icons).every(
                    (i) => i.style.display === "inline-block"
                );

                const parentIcon = checkAll[index].querySelector("i.mdi-check");
                if (parentIcon) {
                    parentIcon.style.display = allChecked
                        ? "inline-block"
                        : "none";
                    checkAll[index].classList.toggle("active", allChecked);
                }
            }
        });
    });
});

// 결제 상세 선택 - +버튼 토글
const payBtnIcons = document.querySelectorAll(".mdi.mdi-plus");

payBtnIcons[0].addEventListener("click", () => {
    paySections[0].classList.toggle("show");
});
payBtnIcons[1].addEventListener("click", () => {
    paySections[1].classList.toggle("show");
});
payBtnIcons[2].addEventListener("click", () => {
    paySections[2].classList.toggle("show");
});

// ===== 모달 열기/닫기 =====
(() => {
    const modal = document.querySelector(".member-modal");
    if (!modal) return;

    const closeBtns = modal.querySelectorAll(".close, .btn-close");
    const table = document.querySelector(".table-layout");

    // 가운데 정렬 보장 (부트스트랩 없이 CSS 유사 적용)
    const dialog = modal.querySelector(".modal-dialog");
    if (dialog) dialog.style.margin = "1.75rem auto";

    // 상세 버튼(동적 포함) - 이벤트 위임
    if (table) {
        table.addEventListener("click", (e) => {
            const btn = e.target.closest(".action-btn");
            if (!btn) return;

            modal.style.display = "block";
            requestAnimationFrame(() => {
                modal.classList.add("show");
                modal.style.background = "rgba(0,0,0,0.5)";
                document.body.classList.add("modal-open");
            });
        });
    }

    const closeModal = () => {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
        setTimeout(() => {
            modal.style.display = "none";
        }, 100);
    };

    closeBtns.forEach((b) => b.addEventListener("click", closeModal));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show"))
            closeModal();
    });
})();
