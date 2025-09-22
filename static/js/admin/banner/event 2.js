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

//  배너 등록/삭제/교체/정렬 + 순서 저장
(() => {
    const STORAGE_KEY = "registered_banners_v1";
    const bannerFile = document.getElementById("banner-file");
    const listEl = document.getElementById("registered-banner-list");

    const uid = () => Math.random().toString(36).slice(2, 10);
    const load = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    };
    const save = (data) =>
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    const itemHTML = (b) => `
      <li class="registered-item" data-id="${b.id}" draggable="true"
          style="display:grid;grid-template-columns:120px 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #f1f1f1;">
        <div class="reg-thumb" style="width:120px;height:64px;border:1px solid #eaeaea;border-radius:6px;overflow:hidden;background:#f7f7f7;display:flex;align-items:center;justify-content:center;">
          <img src="${b.imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="reg-empty"></div>
        <div class="reg-actions" style="display:flex;gap:6px;align-items:center;">
          <button class="reg-btn" data-action="replace" style="padding:8px 12px;border-radius:6px;border:1px solid #e2e2e2;background:#fff;cursor:pointer;font-size:13px;">
            이미지교체
          </button>
          <button class="reg-btn" data-action="delete" style="padding:8px 12px;border-radius:6px;border:1px solid #e2e2e2;background:#fff;cursor:pointer;font-size:13px;">
            삭제
          </button>
          <span class="reg-handle" title="드래그로 순서 변경" style="cursor:grab;user-select:none;padding:0 6px;font-size:18px;opacity:.6;">⋮⋮</span>
        </div>
      </li>
    `;

    const render = () => {
        if (!listEl) return;
        const data = load()
            .slice()
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        listEl.innerHTML = data.map(itemHTML).join("");
    };

    // 업로드 → 즉시 목록 추가
    if (bannerFile && listEl) {
        bannerFile.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
                const data = load();
                data.push({
                    id: uid(),
                    imageUrl: ev.target.result,
                    sortOrder: data.length,
                });
                save(data);
                render();
            };
            reader.readAsDataURL(file);
            e.target.value = ""; // 같은 파일 재업로드 허용
        });
    }

    // 삭제 / 교체 / 순서 저장
    document.addEventListener("click", (e) => {
        // 순서 저장 버튼
        if (e.target.id === "save-order-btn" && listEl) {
            const items = [...listEl.querySelectorAll(".registered-item")];
            const data = load();
            items.forEach((el, idx) => {
                const id = el.dataset.id;
                const row = data.find((d) => d.id === id);
                if (row) row.sortOrder = idx;
            });
            save(data);
            alert("순서를 저장했습니다.");
            return;
        }

        const li = e.target.closest(".registered-item");
        if (!li || !listEl || !listEl.contains(li)) return;

        const id = li.dataset.id;
        const data = load();
        const row = data.find((d) => d.id === id);
        if (!row) return;

        // 삭제
        if (e.target.matches('[data-action="delete"]')) {
            if (!confirm("삭제할까요?")) return;
            const next = data
                .filter((d) => d.id !== id)
                .map((d, idx) => ({ ...d, sortOrder: idx }));
            save(next);
            render();
            return;
        }

        // 이미지 교체
        if (e.target.matches('[data-action="replace"]')) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = () => {
                const file = input.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    row.imageUrl = ev.target.result;
                    save(data);
                    render();
                };
                reader.readAsDataURL(file);
            };
            input.click();
            return;
        }
    });

    // 드래그 정렬
    (() => {
        const list = document.getElementById("registered-banner-list");
        if (!list) return;

        let draggingEl = null;

        list.addEventListener("dragstart", (e) => {
            const item = e.target.closest(".registered-item");
            if (!item) return;
            draggingEl = item;
            item.classList.add("dragging");
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", item.dataset.id);
        });

        list.addEventListener("dragover", (e) => {
            e.preventDefault(); // drop 허용 필수
            if (!draggingEl) return;

            const after = getDragAfterElement(list, e.clientY);
            if (after == null) list.appendChild(draggingEl);
            else list.insertBefore(draggingEl, after);
        });

        list.addEventListener("dragend", () => {
            draggingEl?.classList.remove("dragging");
            draggingEl = null;
        });

        function getDragAfterElement(container, y) {
            const items = [
                ...container.querySelectorAll(
                    ".registered-item:not(.dragging)"
                ),
            ];
            return items.reduce(
                (closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - (box.top + box.height / 2); // 음수면 child 위
                    if (offset < 0 && offset > closest.offset)
                        return { offset, element: child };
                    return closest;
                },
                { offset: Number.NEGATIVE_INFINITY, element: null }
            ).element;
        }
    })();

    render();
})();
