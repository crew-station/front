// 빈 값 유효성
const inputTags = document.querySelectorAll("input.form-control.essential");
console.log(inputTags);

inputTags.forEach((inputTag) => {
    inputTag.addEventListener("blur", (e) => {
        if (inputTag.value.trim() === "") {
            inputTag.classList.add("error");
            inputTag.parentElement.parentElement.nextElementSibling.style.display =
                "block";
        } else {
            inputTag.classList.remove("error");
            inputTag.parentElement.parentElement.nextElementSibling.style.display =
                "none";
        }
    });
});

// 성별 체크
const genderBtn = document.querySelectorAll("button.gender");
const genderInput = document.querySelector(
    "input[type=hidden][name=memberGender]"
);

genderBtn.forEach((gender) => {
    gender.addEventListener("click", (e) => {
        genderInput.value = gender.dataset.gender;
        gender.classList.add("active");
        if (gender.dataset.gender === "male") {
            genderBtn[1].classList.remove("active");
        } else {
            genderBtn[0].classList.remove("active");
        }
    });
});

// 휴대전화 인증 체크 부분
const inputPhone = document.querySelector("input.phone");
const 
