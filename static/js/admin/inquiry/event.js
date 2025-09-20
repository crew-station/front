const menubtn1 = document.getElementById("menubtn1");
const sublist1 = document.getElementById("sublist1");
const menubtn2 = document.getElementById("menubtn2");
const sublist2 = document.getElementById("sublist2");
const menubtn3 = document.getElementById("menubtn3");
const sublist3 = document.getElementById("sublist3");
const menubtn4 = document.getElementById("menubtn4");
const sublist4 = document.getElementById("sublist4");
const submenus = document.querySelectorAll(".boot-link");
const btnfilterstatus = document.getElementById("btn-filter-status");
const allchecked1 = document.getElementById("allchecked1");
const allflasechecked1 = document.getElementById("allflasechecked1");
const allchecked2 = document.getElementById("allchecked2");
const allflasechecked2 = document.getElementById("allflasechecked2");
const checkboxactive1 = document.getElementById("checkboxactive1");
const checkboxactive2 = document.getElementById("checkboxactive2");
const bootpopbtn1 = document.getElementById("btn-filter-pm");
const popmenubt1 = document.getElementById("pop-menu-bt1");
const popmenubt2 = document.getElementById("pop-menu-bt2");
const modalclose = document.getElementById("close");
const body = document.getElementById("body");
const modal = document.getElementById("modal");
const modalopen = document.getElementById("modal-open");
const usermenubtn = document.getElementById("usermenubtn");
const usermenu = document.getElementById("usermenu");
const checkBtn = document.querySelector(".btn-outline-primary");

// 체크박스 토글
if (checkboxactive1) {
    checkboxactive1.addEventListener("click", () => {
        checkboxactive1.classList.toggle("active");
    });
}
if (checkboxactive2) {
    checkboxactive2.addEventListener("click", () => {
        checkboxactive2.classList.toggle("active");
    });
}

// 전체 선택 / 해제
if (allchecked1) {
    allchecked1.addEventListener("click", () => {
        checkboxactive1?.classList.add("active");
        checkboxactive2?.classList.add("active");
    });
}
if (allflasechecked1) {
    allflasechecked1.addEventListener("click", () => {
        checkboxactive1?.classList.remove("active");
        checkboxactive2?.classList.remove("active");
    });
}

// 필터 팝업 토글
if (btnfilterstatus && popmenubt2) {
    btnfilterstatus.addEventListener("click", () => {
        popmenubt2.classList.toggle("show");
    });
}

// 확인 버튼
if (checkBtn) {
    checkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popmenubt2.classList.remove("show");
    });
}

// 모달 열기/닫기
(() => {
    const modal = document.getElementById("modal");
    if (!modal) return;

    const body = document.body;

    // 열기 트리거: #modal-open 이 있으면 사용, 없으면 .action-btn 도 허용(선택)
    const openers = document.querySelectorAll("#modal-open, .action-btn");

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
