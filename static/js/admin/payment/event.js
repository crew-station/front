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
