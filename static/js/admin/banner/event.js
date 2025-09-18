(() => {
    const side = document.querySelector("#bootpay-side");
    if (!side) return;

    const topButtons = side.querySelectorAll(".menu-item > .menu-btn");
    const subLists = side.querySelectorAll(".menu-item > .menu-sub-list");
    const subLinks = side.querySelectorAll(".menu-sub-list .boot-link");

    const hasExplicit =
        side.querySelector(
            ".menu-btn.active, .menu-btn.current, .menu-sub-list.show, .menu-sub-list .boot-link.active"
        ) !== null;

    const syncDisplay = () => {
        // 'show' 또는 내부에 active 링크가 있으면 펼쳐진 상태로 동기화
        subLists.forEach((ul) => {
            const linkActiveInside = !!ul.querySelector(".boot-link.active");
            const opened = ul.classList.contains("show") || linkActiveInside;
            ul.style.display = opened ? "block" : "none";
            if (opened)
                ul.previousElementSibling?.classList.add("active", "current");
        });
    };

    const closeAll = () => {
        subLists.forEach((ul) => {
            ul.classList.remove("show");
            ul.style.display = "none";
        });
        topButtons.forEach((btn) => btn.classList.remove("active", "current"));
        subLinks.forEach((a) => a.classList.remove("active"));
    };

    // 1) 페이지가 상태를 지정했으면 그걸 존중해서 동기화만
    if (hasExplicit) {
        syncDisplay();
    } else {
        // 2) 아무 지정이 없을 때만 전체 초기화 후 선택적 기본 열기
        closeAll();
        const defaultBtn = side.querySelector(".menu-btn[data-open-default]");
        if (defaultBtn) {
            const panel = defaultBtn.nextElementSibling;
            if (panel?.classList.contains("menu-sub-list")) {
                panel.classList.add("show");
                panel.style.display = "block";
                defaultBtn.classList.add("active", "current");
            }
        }
    }

    // 클릭 이벤트 (동일)
    side.addEventListener("click", (e) => {
        const subLink = e.target.closest(".menu-sub-list .boot-link");
        if (subLink) {
            e.preventDefault();
            subLinks.forEach((a) => a.classList.remove("active"));
            subLink.classList.add("active");

            closeAll();
            const ul = subLink.closest(".menu-sub-list");
            if (ul) {
                ul.classList.add("show");
                ul.style.display = "block";
                ul.previousElementSibling?.classList.add("active", "current");
            }
            return;
        }

        const btn = e.target.closest(".menu-item > .menu-btn");
        if (!btn) return;
        e.preventDefault();

        const panel = btn.nextElementSibling;
        const hasPane = panel && panel.classList.contains("menu-sub-list");
        const wasOpen = hasPane && panel.classList.contains("show");

        closeAll();
        btn.classList.add("active");
        if (hasPane && !wasOpen) {
            panel.classList.add("show");
            panel.style.display = "block";
            btn.classList.add("current");
        }
    });
})();

/* =========================
       배너 등록/삭제/교체/정렬 
    ========================= */
const STORAGE_KEY = "registered_banners_v1";
const bannerFile = document.getElementById("banner-file");
const listEl = document.getElementById("registered-banner-list");
const saveOrderBtn = document.getElementById("save-order-btn");

const uid = () => Math.random().toString(36).slice(2, 10);
const loadRaw = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
};
const load = () =>
    loadRaw()
        .map((d, i) => ({
            id: d.id || uid(),
            imageUrl: d.imageUrl,
            sortOrder: typeof d.sortOrder === "number" ? d.sortOrder : i,
        }))
        .filter((d) => !!d.imageUrl);
const save = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

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
    const data = load().sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    listEl.innerHTML = data.map(itemHTML).join("");
};

// 업로드 → 목록 추가
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

// 삭제 / 이미지 교체 / 순서 저장
document.addEventListener("click", (e) => {
    // 순서 저장
    if (e.target.id === "save-order-btn" && listEl) {
        const items = [...listEl.querySelectorAll(".registered-item")];
        const data = load();
        items.forEach((el, idx) => {
            const row = data.find((d) => d.id === el.dataset.id);
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
    }
});

// ===== 드래그 정렬 =====
(() => {
    const list = document.getElementById("registered-banner-list");
    if (!list) return;

    let draggingEl = null;

    list.addEventListener("dragstart", (e) => {
        const item = e.target.closest(".registered-item");
        if (!item) return;

        draggingEl = item;
        item.classList.add("dragging");

        // Firefox용 안전빵
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", item.dataset.id);
    });

    list.addEventListener("dragover", (e) => {
        // drop 허용 필수
        e.preventDefault();
        if (!draggingEl) return;

        const after = getDragAfterElement(list, e.clientY);
        if (after == null) {
            list.appendChild(draggingEl);
        } else {
            list.insertBefore(draggingEl, after);
        }
    });

    list.addEventListener("dragend", () => {
        draggingEl?.classList.remove("dragging");
        draggingEl = null;
    });

    function getDragAfterElement(container, y) {
        const items = [
            ...container.querySelectorAll(".registered-item:not(.dragging)"),
        ];
        return items.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - (box.top + box.height / 2); // 음수면 child 위
                if (offset < 0 && offset > closest.offset) {
                    return { offset, element: child };
                }
                return closest;
            },
            { offset: Number.NEGATIVE_INFINITY, element: null }
        ).element;
    }
})();

// 초기 렌더
render();
