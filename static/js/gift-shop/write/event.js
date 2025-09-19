document.addEventListener("DOMContentLoaded", () => {
    // 공통 드롭다운 (배송방법, 개수 선택 등)
    document.querySelectorAll(".write-content-select-wrap").forEach(selectWrap => {
      const input = selectWrap.querySelector(".write-content-select");
      const dropdown = selectWrap.querySelector(".write-content-select-dropdown");
  
      if (!input || !dropdown) return;
  
      // input 클릭 → 드롭다운 토글
      input.addEventListener("click", () => {
        document.querySelectorAll(".write-content-select-dropdown").forEach(d => {
          if (d !== dropdown) d.style.display = "none";
        });
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });
  
      // 옵션 클릭 → input에 값 넣고 닫기
      dropdown.addEventListener("click", e => {
        if (e.target.tagName === "LI") {
          input.value = e.target.textContent;
          dropdown.style.display = "none";
  
          if (input.id === "quantityInput") {
            validateTotal();
          }
        }
      });
  
      // 바깥 클릭 시 닫기
      document.addEventListener("click", e => {
        if (!selectWrap.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    });
  
    // 가격, 개수, 시간 관련 처리
    const priceInput = document.getElementById("priceInput");
    const quantityInput = document.getElementById("quantityInput");
    const timeInput = document.getElementById("timeInput");
    const form = document.querySelector("form");
  
    // 숫자 포맷
    const formatWithCommas = (str) =>
      str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    const getNumericValue = (str) =>
      Number(str.replace(/\D/g, "")) || 0;
  
    // 가격 입력 처리 (콤마 유지)
    const reformatAndRestoreCaret = () => {
      const prev = priceInput.value;
      const sel = priceInput.selectionStart;
  
      const digitsLeft = prev.slice(0, sel).replace(/\D/g, "").length;
  
      const formatted = formatWithCommas(prev);
      priceInput.value = formatted;
  
      let pos = 0, seen = 0;
      while (pos < formatted.length && seen < digitsLeft) {
        if (/\d/.test(formatted[pos])) seen++;
        pos++;
      }
      priceInput.setSelectionRange(pos, pos);
  
      validateTotal();
    };
  
    if (priceInput) {
        // 입력 중에는 콤마 포맷만
        priceInput.addEventListener("input", reformatAndRestoreCaret);
      
        // 입력창에서 벗어났을 때 최소 금액 확인
        priceInput.addEventListener("blur", () => {
          reformatAndRestoreCaret();
      
          let value = getNumericValue(priceInput.value);
          if (value > 0 && value < 1000) {
            alert("최소 입력 금액은 1,000원입니다.");
            value = 1000;
          }
          if (value > 0) {
            priceInput.value = formatWithCommas(String(value));
          }
        });
      }
  
    // 시간 입력 검사 (최대 72시간 제한)
    if (timeInput) {
      timeInput.addEventListener("input", () => {
        const time = getNumericValue(timeInput.value);
        if (time > 72) {
          alert("남은 시간은 최대 72시간까지 가능합니다.");
          timeInput.value = 72;
        }
      });
    }
  
    // 총 금액 검사 (가격 × 개수 → 최대 100,000원)
    function validateTotal() {
      const price = getNumericValue(priceInput.value);
      const qty = getNumericValue(quantityInput.value) || 1;
  
      const maxPrice = Math.floor(100000 / qty);
  
      if (price > maxPrice) {
        alert(`가격은 최대 100,000원까지만 입력할 수 있습니다.`);
        priceInput.value = formatWithCommas(String(maxPrice));
      } 
    }
  
    // 나라 자동완성
    const countries = [
      "가나","가봉","가이아나","감비아","과테말라","그레나다","그리스","기니","기니비사우","나미비아",
      "나우루","나이지리아","남수단","남아프리카공화국","네덜란드","네팔","노르웨이","뉴질랜드","니카라과","니제르",
      "대한민국","덴마크","도미니카공화국","도미니카연방","독일","동티모르","라오스","라이베리아","라트비아","러시아",
      "레바논","레소토","루마니아","룩셈부르크","르완다","리비아","리투아니아","리히텐슈타인","마다가스카르","마셜제도",
      "말라위","말레이시아","말리","멕시코","모나코","모로코","모리셔스","모리타니","모잠비크","몬테네그로",
      "몰도바","몰디브","몰타","몽골","미국","미얀마","미크로네시아","바누아투","바레인","바베이도스",
      "바하마","방글라데시","베냉","베네수엘라","베트남","벨기에","벨라루스","벨리즈","보스니아헤르체고비나","보츠와나",
      "볼리비아","부룬디","부르키나파소","부탄","북마케도니아","북한","불가리아","브라질","브루나이","사모아",
      "사우디아라비아","사이프러스","산마리노","상투메프린시페","세네갈","세르비아","세이셸","세인트루시아","세인트빈센트그레나딘","세인트키츠네비스",
      "소말리아","솔로몬제도","수단","수리남","스리랑카","스웨덴","스위스","스페인","슬로바키아","슬로베니아",
      "시리아","시에라리온","싱가포르","아랍에미리트","아르메니아","아르헨티나","아이슬란드","아이티","아일랜드","아제르바이잔",
      "아프가니스탄","안도라","알바니아","알제리","앙골라","앤티가바부다","에콰도르","에스와티니","에스토니아","에티오피아",
      "엘살바도르","영국","예멘","오만","오스트리아","온두라스","요르단","우간다","우루과이","우즈베키스탄",
      "우크라이나","이라크","이란","이스라엘","이집트","이탈리아","인도","인도네시아","일본","잠비아",
      "적도기니","조지아","중앙아프리카공화국","중국","지부티","짐바브웨","체코","칠레","카메룬","카보베르데",
      "카자흐스탄","카타르","캄보디아","캐나다","케냐","코모로","코스타리카","코트디부아르","콜롬비아","콩고공화국",
      "콩고민주공화국","쿠바","쿠웨이트","쿡제도","크로아티아","키르기스스탄","키리바시","타지키스탄","탄자니아","태국",
      "토고","통가","투르크메니스탄","투발루","튀니지","튀르키예","트리니다드토바고","파나마","파라과이","파키스탄",
      "파푸아뉴기니","팔라우","팔레스타인","페루","포르투갈","폴란드","프랑스","피지","핀란드","필리핀"
    ];
  
    const countryInput = document.getElementById("countryInput");
    const countryDropdown = document.getElementById("countryDropdown");
  
    if (countryInput && countryDropdown) {
      countryInput.addEventListener("input", () => {
        const value = countryInput.value.trim();
        countryDropdown.innerHTML = "";
  
        if (!value) {
          countryDropdown.style.display = "none";
          return;
        }
  
        const filtered = countries.filter(c => c.includes(value));
  
        if (filtered.length) {
          filtered.forEach(country => {
            const li = document.createElement("li");
            li.textContent = country;
            li.addEventListener("click", () => {
              countryInput.value = country;
              countryDropdown.style.display = "none";
            });
            countryDropdown.appendChild(li);
          });
          countryDropdown.style.display = "block";
        } else {
          countryDropdown.style.display = "none";
        }
      });
  
      // 바깥 클릭 시 닫기
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".autocomplete")) {
          countryDropdown.style.display = "none";
        }
      });
    }
  
    // 폼 제출 전 유효성 검사 + hiddenContent 동기화
    if (form) {
      form.addEventListener("submit", (e) => {
        const coverImg = document.querySelector(".write-content-cover-img-wrapper .write-content-cover-img img");
        const deliveryInput = document.querySelector(".write-content-select[placeholder*='전달']");
        const titleInput = document.querySelector("input.write-content-input[placeholder='제목을 입력해주세요.']");
        const contentDiv = document.querySelector(".write-content-field-text");
        const hiddenContent = document.getElementById("hiddenContent");
  
        // 본문 textarea에 복사
        hiddenContent.value = contentDiv.innerHTML.trim();

        if (!coverImg) {
            alert("대표 이미지를 등록해주세요.");
            e.preventDefault();
            return;
          }
  
        if (!deliveryInput.value.trim()) {
          alert("전달 방법을 선택해주세요.");
          deliveryInput.focus();
          e.preventDefault();
          return;
        }
        if (!quantityInput.value.trim()) {
          alert("판매 가능 수량을 선택해주세요.");
          quantityInput.focus();
          e.preventDefault();
          return;
        }
        if (!priceInput.value.trim()) {
          alert("판매 가격을 입력해주세요.");
          priceInput.focus();
          e.preventDefault();
          return;
        }
        if (!timeInput.value.trim()) {
          alert("요청 마감 시간을 입력해주세요.");
          timeInput.focus();
          e.preventDefault();
          return;
        }
        if (!countryInput.value.trim()) {
          alert("나라 이름을 입력해주세요.");
          countryInput.focus();
          e.preventDefault();
          return;
        }
        if (!titleInput.value.trim()) {
          alert("제목을 입력해주세요.");
          titleInput.focus();
          e.preventDefault();
          return;
        }
        if (!contentDiv.textContent.trim()) {
          alert("내용을 입력해주세요.");
          contentDiv.focus(); 
          e.preventDefault();
          return;
        }
  
        priceInput.value = getNumericValue(priceInput.value);
        timeInput.value = getNumericValue(timeInput.value);
        const qty = getNumericValue(quantityInput.value);
        if (qty) quantityInput.value = qty;
      });
    }
  });
  