const animationTags = document.querySelectorAll(
    "div.index-page-info-first div.slide-up"
);

const animationCrewTags = document.querySelectorAll(
    "div.index-page-info.crew div.slide-up.crew"
);
const animationGiftTags = document.querySelectorAll(
    "div.index-page-info.gift div.slide-up.gift"
);

const animationAction = (cnt) => {
    tags.forEach((tag, index) => {
        let ms = 300;
        tag.classList.add("active");
        tag.style.animationDelay = `${ms * (index + 1)}ms`;
        tag.style.animationDuration = "500ms";
    });
};

animationTags.forEach((tag, index) => {
    tag.classList.add("active");

    index === 2
        ? (tag.style.animationDelay = "800ms")
        : (tag.style.animationDelay = "550ms");
    tag.style.animationDuration = "500ms";
});

const slideAnimation = document.querySelectorAll(
    "div.marquee-images-wrap-lists"
);

slideAnimation.forEach((tag, index) => {
    tag.style.animationDuration = "100s";
});

const height = window.innerHeight;
let wheelCheck = true;
let currentY = 0;
let cnt = 0;
const scroll = document.querySelector("div.scroll");
window.addEventListener("beforeunload", (e) => {
    document.querySelector(
        "main.index-page"
    ).style.transform = `translateY(0px)`;
    currentY = 0;
    window.scrollTo(0, 0);
});
window.addEventListener("wheel", (e) => {
    if (!wheelCheck) return;
    wheelCheck = false;
    if (e.wheelDeltaY < 0) {
        // 내려가는 부분

        console.log("내려갑니다");
        if (Math.abs(currentY) === height * 3) {
            console.log("그만 내려가");

            setTimeout(() => {
                wheelCheck = true;
            }, 1000);
            return;
        }
        currentY -= height;
        scroll.style.transform = `translateY(${currentY}px)`;
    } else {
        // 올라가는 부분
        console.log("올라갑니다");
        if (Math.abs(currentY) === 0) {
            console.log("그만 올라가");

            setTimeout(() => {
                wheelCheck = true;
            }, 1000);
            return;
        }
        currentY += height;
        scroll.style.transform = `translateY(${currentY}px)`;
        console.log(currentY);
    }
    console.log(height);
    setTimeout(() => {
        wheelCheck = true;
    }, 1000);
});
