// 서브헤더 클릭 이벤트
const subHeaders = document.querySelectorAll(
    "div.sticky-container.sticky-sub-container"
);
subHeaders.forEach((subHeader) => {
    subHeader.addEventListener("click", (e) => {
        console.log(subHeader);

        const activeLink = e.target.closest("a.item-link.navigation-item-link");
        if (activeLink) {
            const aLinks = subHeader.querySelectorAll(
                "a.item-link.navigation-item-link"
            );
            aLinks.forEach((aLink) => {
                aLink.classList.remove("active");
            });
            activeLink.classList.add("active");
        }
    });
});

// 스크롤 이벤트
const header = document.getElementById("header");
const secondaryHeaders = document.querySelectorAll(
    "div.layout-navigation-secondary"
);

window.addEventListener("wheel", (e) => {
    if (e.wheelDeltaY < 0) {
        secondaryHeaders.forEach((secondaryHeader) => {
            console.log(secondaryHeader);

            secondaryHeader.classList.add("scroll-down");
            // secondaryHeader.style.top = "-41px";
        });
    } else {
        secondaryHeaders.forEach((secondaryHeader) => {
            secondaryHeader.classList.remove("scroll-down");
            // secondaryHeader.style.top = "51px";
        });
    }
});

// 검색 아이콘 클릭 이벤트

const searchIcon = document.querySelector("button.search-icon");
const searchModal = document.querySelector("div.search-icon-modal");
const closeSearchModal = document.querySelector("button.search-cancle");
searchIcon.addEventListener("click", (e) => {
    !searchModal.classList.contains("open") &&
        searchModal.classList.add("open");
});

closeSearchModal.addEventListener("click", (e) => {
    searchModal.classList.contains("open") &&
        searchModal.classList.remove("open");
});

// 메뉴 리스트에서 버튼 클릭 이벤트
const menuBtns = document.querySelectorAll("button.menu-item-btn");
const crewBtn = document.querySelector("div.menu-list-crew");
const diaryBtn = document.querySelector("div.menu-list-diary");
let clickCheck = document.querySelector("button.menu-item-btn.gift");
menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(12312);
        console.log(clickCheck);
        if (clickCheck) {
            // clickCheck.removeAttribute("style");
            clickCheck.lastElementChild.classList.remove("active");
        }

        if (clickCheck === menuBtn) {
            menuBtn.nextElementSibling &&
                (menuBtn.nextElementSibling.style.height = "0px");
            clickCheck = null;
            return;
        }
        clickCheck = menuBtn;
        console.log(clickCheck);
        menuBtn.lastElementChild.classList.add("active");
        if (menuBtn.classList.contains("crew")) {
            crewBtn.style.height = "172px";
            diaryBtn.style.height = "0px";
        } else if (menuBtn.classList.contains("diary")) {
            diaryBtn.style.height = "129px";
            crewBtn.style.height = "0px";
        } else {
            crewBtn.style.height = "0px";
            diaryBtn.style.height = "0px";
        }
    });
});

const detailBtns = document.querySelectorAll("li.detail-link-item");
let clickDetailBtn = null;
detailBtns.forEach((detailBtn) => {
    detailBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(detailBtn);

        console.log(clickDetailBtn);
        if (clickDetailBtn) {
            console.log(clickDetailBtn);
            clickDetailBtn.removeAttribute("style");
            console.log(detailBtn);
        }
        menuBtns.forEach((menuBtn) => {
            if (menuBtn.hasAttribute("style")) {
                menuBtn.removeAttribute("style");
            }
        });

        modalDown.classList.remove("open");
        clickDetailBtn = detailBtn;
        const target = e.target.closest("li.menu-item-wrap");
        console.log(target.firstElementChild);

        target.firstElementChild.style.backgroundColor = "rgb(247, 249, 250)";

        console.log(target.firstElementChild.nextElementSibling);

        target.firstElementChild.lastElementChild.classList.remove("active");
        if (target.firstElementChild.nextElementSibling.hasAttribute("style")) {
            target.firstElementChild.nextElementSibling.style.height = "0px";
        }
        detailBtn.style.backgroundColor = "rgb(247, 249, 250)";
        const category = target.firstElementChild.classList[1];
        console.log(category);

        let subHeader = null;
        const subCategories = document.querySelectorAll("div.sub");
        if (category === "crew") {
            subHeader = subCategories[0];
            subCategories[0].style.top = "51px";
            subCategories[1].style.top = "-41px";
        } else if (category === "diary") {
            subHeader = subCategories[1];
            subCategories[0].style.top = "-41px";
            subCategories[1].style.top = "51px";
        }

        subHeader.querySelectorAll("a.navigation-item-link").forEach((a) => {
            if (a.classList.contains("active")) {
                a.classList.remove("active");
                console.log(a.textContent.trim());
            } else {
                console.log(123);
                console.log(
                    a.textContent.trim() === detailBtn.textContent.trim()
                );

                a.textContent.trim() === detailBtn.textContent.trim() &&
                    a.classList.add("active");
            }
        });
    });
});

// 메뉴 모달 열기
const modalUp = document.querySelector("button.list-action-btn");
modalUp.addEventListener("click", (e) => {
    modalDown.classList.add("open");
});
// 메뉴 모달 닫기
const modalDown = document.querySelector("div.menu-list-modal");
modalDown.addEventListener("click", (e) => {
    console.log(123);

    modalDown.classList.remove("open");
});
