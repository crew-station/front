document.addEventListener("DOMContentLoaded", () => {
    // 드롭다운 처리
    document.querySelectorAll(".write-content-select-wrap").forEach(selectWrap => {
      const input = selectWrap.querySelector(".write-content-select");
      const dropdown = selectWrap.querySelector(".write-content-select-dropdown");
  
      // input 클릭 → 드롭다운 토글
      input.addEventListener("click", () => {
        document.querySelectorAll(".write-content-select-dropdown").forEach(d => {
          if (d !== dropdown) d.style.display = "none";
        });
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });
  
      // 옵션 클릭 → input에 값 넣고 닫기
      dropdown.querySelectorAll("li").forEach(option => {
        option.addEventListener("click", () => {
          input.value = option.textContent;
          dropdown.style.display = "none";
  
          // 개수 선택 바뀔 때도 총 금액 검사
          if (input.id === "quantityInput") {
            validateTotal();
          }
        });
      });
  
      // 바깥 클릭 시 닫기
      document.addEventListener("click", e => {
        if (!selectWrap.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    });
  
    const priceInput = document.getElementById("priceInput");
    const quantityInput = document.getElementById("quantityInput");
    const timeInput = document.getElementById("timeInput");
    const form = document.querySelector("form");
  
    // 가격 콤마 처리
    const formatWithCommas = (str) =>
      str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    const getNumericValue = (str) =>
      Number(str.replace(/\D/g, "")) || 0;
  
    // 가격 입력 처리
    const reformatAndRestoreCaret = () => {
      const prev = priceInput.value;
      const sel = priceInput.selectionStart;
  
      // 커서 왼쪽 숫자 개수
      const digitsLeft = prev.slice(0, sel).replace(/\D/g, "").length;
  
      // 포맷팅
      const formatted = formatWithCommas(prev);
      priceInput.value = formatted;
  
      // 커서 위치 복원
      let pos = 0, seen = 0;
      while (pos < formatted.length && seen < digitsLeft) {
        if (/\d/.test(formatted[pos])) seen++;
        pos++;
      }
      priceInput.setSelectionRange(pos, pos);
  
      // 총 금액 검사 실행
      validateTotal();
    };
  
    if (priceInput) {
      priceInput.addEventListener("input", reformatAndRestoreCaret);
      priceInput.addEventListener("blur", reformatAndRestoreCaret);
    }
  
    // 시간 입력 검사
    if (timeInput) {
      timeInput.addEventListener("input", () => {
        const time = getNumericValue(timeInput.value);
        if (time > 120) {
          alert("남은 시간은 최대 120시간까지 가능합니다.");
          timeInput.value = 120;
        }
      });
    }
  
    // 총 금액 검사 (가격 × 개수)
    function validateTotal() {
        const price = getNumericValue(priceInput.value);
        const qty = getNumericValue(quantityInput.value) || 1; 
    
        const maxPrice = Math.floor(100000 / qty);
    
        if (price > maxPrice) {
        alert(`가격은 최대 100,000원까지만 입력할 수 있습니다.`);
    
        // 초과하면 잘라내기
        priceInput.value = formatWithCommas(String(maxPrice));
        }
    }
  
    // 폼 제출 전 정리
    if (form) {
      form.addEventListener("submit", () => {
        // 숫자만 남기고 서버 전송
        if (priceInput) priceInput.value = getNumericValue(priceInput.value);
        if (timeInput) timeInput.value = getNumericValue(timeInput.value);
  
        const qty = getNumericValue(quantityInput.value);
        if (qty) quantityInput.value = qty;
      });
    }
  });
  