// 배너 슬라이드 부분
const banner = document.querySelector("div.banner-slide");
const firstBanner = document.createElement("div");
const lastBanner = document.createElement("div");
const arrows = document.querySelectorAll("div.arrow");
const bannerCount = document.querySelector("span.banner-count");

let count = 1;

firstBanner.innerHTML = `<img src="../../static/images/banner1.jpg" alt="">`;
lastBanner.innerHTML = `<img src="../../static/images/banner5.jpg" alt="">`;
banner.appendChild(firstBanner);
banner.prepend(lastBanner);

banner.style.transform = `translate(-1136px)`;

const autoSlide = () => {
    count++;
    banner.style.transform = `translate(-${1136 * count}px)`;
    banner.style.transition = `transform 0.5s`;

    if (count === 6) {
        setTimeout(() => {
            banner.style.transform = `translate(-1136px)`;
            banner.style.transition = `transform 0s`;
        }, 500);
        count = 1;
    }
    console.log(count);
    bannerCount.textContent = `${count} / 5`;
};

let autoSlideInterval = setInterval(autoSlide, 2000);
let arrowCheck = true;

arrows.forEach((arrow) => {
    console.log(arrow);

    const img = arrow.firstElementChild;
    img.addEventListener("click", (e) => {
        if (!arrowCheck) {
            return;
        }
        arrowCheck = false;
        clearInterval(autoSlideInterval);

        const arrowType = e.target.parentElement.classList[2];
        console.log(arrowType + "askdasdjasdj");

        if (arrowType === "left") {
            console.log("왼쪽입니다.");

            count--;
            console.log(banner);

            banner.style.transform = `translate(-${1136 * count}px)`;
            banner.style.transition = `transform 0.5s`;
            console.log(banner);

            if (count === 0) {
                setTimeout(() => {
                    banner.style.transform = `translate(-5680px)`;
                    banner.style.transition = `transform 0s`;
                }, 500);
                count = 5;
            }
        } else {
            count++;
            console.log("오른쪽입니다.");
            console.log(banner);

            banner.style.transform = `translate(-${1136 * count}px)`;
            banner.style.transition = `transform 0.5s`;
            if (count === 6) {
                setTimeout(() => {
                    banner.style.transform = `translate(-1136px)`;
                    banner.style.transition = `transform 0s`;
                }, 500);
                count = 1;
            }
        }

        autoSlideInterval = setInterval(autoSlide, 2000);
        setTimeout(() => {
            arrowCheck = true;
        }, 500);
        bannerCount.textContent = `${count} / 5`;
    });
});

// 크루 리스트 슬라이드 부분
const crewList = document.querySelector(".crew-items");
const crewRightBtn = document.querySelector(".crew-arrow-btn-wrap-right");
const crewLeftBtn = document.querySelector(".crew-arrow-btn-wrap-left");

console.log(crewLeftBtn);
const displayBtn = (displayTag, noneTag) => {
    displayTag.style.display = "block";
    noneTag.style.display = "none";
};
crewRightBtn.addEventListener("click", (e) => {
    crewList.style.transition = `transform 0.5s`;
    crewList.style.transform = "translate(-1156px)";
    displayBtn(crewLeftBtn, crewRightBtn);
    // crewList.style.transition = `transform 0s`;
});

crewLeftBtn.addEventListener("click", (e) => {
    crewList.style.transition = `transform 0.5s`;
    crewList.style.transform = "translate(0px)";
    displayBtn(crewRightBtn, crewLeftBtn);
    // crewList.style.transition = `transform 0s`;
});
