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
    } else if (text === "전달완료") {
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

// 승락하기 버튼

const acceptButtons = document.querySelectorAll(".accept");

acceptButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const confirmed = confirm("주문을 승락 하시겠습니까?");
        if (confirmed) {
            // 상태 변경
        }
    });
});

// 거절하기 버튼

const cancelButtons = document.querySelectorAll(".purchase-cancel");

cancelButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const confirmed = confirm("정말 주문을 거절 하시겠습니까?");
        if (confirmed) {
            // 상태 변경
        }
    });
});
