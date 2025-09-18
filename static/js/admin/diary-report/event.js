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

    // ✅ HTML에 미리 넣어둔 active/show 상태를 반영해서 펼치기
    const syncFromDOM = () => {
        // 1) 서브링크 .active 가 있는 패널들은 펼친다
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

        // 2) 최상위 버튼이 .active 라면 그 다음 패널도 열어준다
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

    // 🔁 초기 처리: active/show 가 하나라도 있으면 그 상태를 살리고,
    // 없으면(아무 지정도 없으면) 전체 닫기
    const hasExplicit = !!side.querySelector(
        ".menu-btn.active, .menu-btn.current, .menu-sub-list.show, .menu-sub-list .boot-link.active"
    );

    if (hasExplicit) {
        syncFromDOM();
    } else {
        closeAllMenus();
    }

    // 이하 클릭 위임 로직은 그대로 유지 …
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

// =============== 신고 모달 (상세보기/처리/반려) ===============
(() => {
    const modal = document.querySelector(".report-modal"); // 모달 루트(.modal.report-modal)
    if (!modal) return;

    const closeBtns = modal.querySelectorAll(".btn-close, .close"); // 닫기 버튼들
    const viewBtns = document.querySelectorAll(".action-btn.view"); // 테이블의 "상세보기" 버튼들
    let currentRow = null; // 현재 선택된 tr

    // 텍스트 바인딩 헬퍼
    const bindText = (key, val) => {
        const el = modal.querySelector(`[data-bind="${key}"]`);
        if (el) el.textContent = val ?? "";
    };

    // 모달 열기
    const openModalFromRow = (row) => {
        currentRow = row;

        const title =
            row.querySelector(".post-title")?.textContent.trim() ?? "-";
        const author =
            row.querySelector(".post-meta b")?.textContent.trim() ?? "-";
        const postIdText =
            row
                .querySelector(".post-meta .meta:last-child")
                ?.textContent.trim() ?? "postId: -";
        const postId = postIdText.replace(/^postId:\s*/i, "") || "-";
        const reason =
            row.querySelector(".reason-badge")?.textContent.trim() ?? "-";
        const reporterName =
            row.querySelector("td:nth-child(3) b")?.textContent.trim() ?? "-";
        const reporterEmail =
            row
                .querySelector("td:nth-child(3) .text-muted")
                ?.textContent.trim() ?? "-";
        const reportedAt =
            row.querySelector("td:nth-child(4)")?.textContent.trim() ?? "-";
        const badgeInRow = row.querySelector(".approval-status");

        // 데이터 바인딩
        bindText("title", title);
        bindText("author", author);
        bindText("postId", postId);
        bindText("reason", reason);
        bindText("memo", ""); // 메모 초기화
        bindText("reporterName", reporterName);
        bindText("reporterEmail", reporterEmail);
        bindText("reportedAt", reportedAt);

        // 상태 배지 동기화
        const badgeInModal = modal.querySelector('[data-bind="statusBadge"]');
        if (badgeInModal) {
            badgeInModal.className = "status-badge";
            if (badgeInRow?.classList.contains("status-resolved")) {
                badgeInModal.classList.add("status-resolved");
                badgeInModal.textContent = "처리완료";
            } else if (badgeInRow?.classList.contains("status-rejected")) {
                badgeInModal.classList.add("status-rejected");
                badgeInModal.textContent = "반려";
            } else {
                badgeInModal.classList.add("status-pending");
                badgeInModal.textContent = "대기중";
            }
        }

        // 체크박스 초기화
        const cbHide = modal.querySelector(".cb-hide-post");
        const cbBlock = modal.querySelector(".cb-block-author");
        const cbWarn = modal.querySelector(".cb-warn");
        cbHide && (cbHide.checked = false);
        cbBlock && (cbBlock.checked = false);
        cbWarn && (cbWarn.checked = false);

        // 실제 열기
        modal.style.display = "block";
        requestAnimationFrame(() => {
            modal.classList.add("show");
            modal.style.background = "rgba(0,0,0,.5)";
            document.body.classList.add("modal-open");
        });
    };

    // 모달 닫기
    const closeModal = () => {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
        setTimeout(() => {
            modal.style.display = "none";
        }, 120);
    };

    // 상세보기 버튼 -> 모달 오픈
    viewBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.currentTarget.closest("tr");
            if (!row) return;
            openModalFromRow(row);
        });
    });

    // 닫기 버튼들
    closeBtns.forEach((b) => b.addEventListener("click", closeModal));

    // 오버레이 클릭 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // 처리/반려 버튼 -> 테이블 갱신 후 닫기
    const approveBtn = modal.querySelector(".btn-approve");
    const rejectBtn = modal.querySelector(".btn-reject");

    approveBtn &&
        approveBtn.addEventListener("click", () => {
            if (!currentRow) return;
            const badge = currentRow.querySelector(".approval-status");
            if (!badge) return;
            badge.textContent = "처리완료";
            badge.classList.remove("status-pending", "status-rejected");
            badge.classList.add("status-resolved");
            // TODO: 여기서 서버 API 호출(payload: 숨김/차단/경고/메모 등)
            closeModal();
        });

    rejectBtn &&
        rejectBtn.addEventListener("click", () => {
            if (!currentRow) return;
            const badge = currentRow.querySelector(".approval-status");
            if (!badge) return;
            badge.textContent = "반려";
            badge.classList.remove("status-pending", "status-resolved");
            badge.classList.add("status-rejected");
            // TODO: 여기서 서버 API 호출
            closeModal();
        });
})();
