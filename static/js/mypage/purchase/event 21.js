// 개수 조회

const purchases = document.querySelectorAll(".purchase-list-wrapper");
const requestNumber = document.querySelector(".request-number");
const wattingNumber = document.querySelector(".watting-number");
const paymentOkNumber = document.querySelector(".payment-ok");
const receiveNumber = document.querySelector(".receive-number");

let request = 0;
let paymentOk = 0;
let watting = 0;
let receive = 0;

purchases.forEach((purchase) => {
    const title = purchase.querySelector(".title-status");

    let text = title.innerText;

    if (text === "승락대기") {
        request++;
    } else if (text === "결제완료") {
        paymentOk++;
    } else if (text === "결제대기") {
        watting++;
    } else if (text === "수령완료") {
        receive++;
    } else {
        return;
    }

    requestNumber.innerText = request;
    wattingNumber.innerText = watting;
    paymentOkNumber.innerText = paymentOk;
    receiveNumber.innerText = receive;
});

//  검색 드롭다운

const dropDownButtons = document.querySelectorAll(".drop-down-button");

dropDownButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const list = btn.nextElementSibling;
        list.classList.toggle("active");
    });
});

// 문서 전체 클릭 시 active 제거
document.addEventListener("click", () => {
    const activeLists = document.querySelectorAll(".drop-down-list.active");
    activeLists.forEach((list) => {
        list.classList.remove("active");
    });
});

//  선택 항목 button에 담기

const listContents = document.querySelectorAll(".list-content");

listContents.forEach((content) => {
    content.addEventListener("click", (e) => {
        const dropDown = content.closest(".drop-down-wrapper");
        const text = dropDown.querySelector(".drop-down-text");
        const list = dropDown.querySelector(".drop-down-list");
        let word = content.innerText;

        text.innerText = word;
        list.classList.remove("active");
    });
});

// 주문 취소 버튼

const cancelButtons = document.querySelectorAll(".purchase-cancel");

cancelButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const confirmed = confirm("정말 주문 취소 하시겠습니까?");
        if (confirmed) {
            // 상태 변경
        }
    });
});

// 수령 완료 버튼

const receiveButtons = document.querySelectorAll(".receive-button");

receiveButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const confirmed = confirm("제품을 수령하셨나요?");
        if (confirmed) {
            // 상태 변경
        }
    });
});

// 별점 남기기

const stars = document.querySelectorAll("label.star");
const hiddenInput = document.querySelector("input[type='hidden']#star");

let data = 0;

stars.forEach((star) => {
    star.addEventListener("click", (e) => {
        data = star.dataset.point;
        stars.forEach((star, i) => {
            if (data >= i + 1) {
                star.closest(".star").classList.add("full");
            } else if (data < i + 1) {
                star.closest(".star").classList.remove("full");
            }
        });
    });
});

// 모달 켜기

const modal = document.querySelector(".modal-wrapper");
const starButtons = document.querySelectorAll(".star-button");

starButtons.forEach((starButton) => {
    starButton.addEventListener("click", (e) => {
        modal.style.display = "flex";
    });
});

// 모달 끄기

const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", (e) => {
    modal.style.display = "none";
});
