const animationTags = document.querySelectorAll("div.slide-up");
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
