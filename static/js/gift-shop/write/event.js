// === 이미지 업로드 ===
const coverInput = document.getElementById("coverImageInput");            // 대표(커버) 이미지 파일 input 요소 가져오기
const coverAdd = document.getElementById("coverAdd");                     // 커버 영역의 큰 + 버튼(전체 래퍼) 가져오기
const coverPreview = document.getElementById("coverPreview");             // 대표 이미지가 크게 보일 영역
const thumbnailInput = document.getElementById("thumbnailInput");         // 썸네일용 파일 input 요소
const thumbnailContainer = document.getElementById("thumbnailContainer"); // 썸네일들을 담는 컨테이너
const thumbAddBtn = thumbnailContainer.querySelector(".write-content-img-add-btn"); // 썸네일 영역의 작은 + 버튼

let hasCover = false;                         // 대표 이미지가 설정되었는지 여부
let currentCoverThumb = null;                 // 현재 대표로 선택된 썸네일 DOM 참조
thumbAddBtn.style.display = "none";           // 초기에는 썸네일 작은 + 버튼을 숨김

// 전체 이미지 개수 (대표는 썸네일 중 하나이므로 썸네일만 카운트)
function getTotalImageCount() {
  return document.querySelectorAll(".write-content-thumbnail").length;    // 썸네일 개수를 리턴
}

// + 버튼 보임/숨김 갱신
function updateThumbAddBtn() {
  const count = getTotalImageCount();                                     // 현재 썸네일 개수 확인

  if (count === 0) {                                                      // 썸네일이 하나도 없으면
    // ✅ 모든 이미지가 없을 때는 작은 + 숨김
    thumbAddBtn.style.display = "none";                                   // 작은 + 버튼 숨김
    return;                                                               // 함수 종료
  }

  if (count >= 8) {                                                       // 썸네일이 8장(최대) 이상이면
    thumbAddBtn.style.display = "none";                                   // 작은 + 버튼 숨김
  } else {                                                                // 1~7장이라면
    thumbAddBtn.style.display = "flex";                                   // 작은 + 버튼 표시
  }
}

// 대표 이미지 설정
function setAsCover(src, fromThumb) {                                     // src: 이미지 url, fromThumb: 대표로 지정할 썸네일 DOM
  // 대표 미리보기 갱신
  coverAdd.style.display = "none";                                        // 커버 큰 + 영역 숨김
  coverPreview.innerHTML = `                                              // 대표 영역에 이미지와 삭제 버튼 표시
    <div class="write-content-cover-img">
      <div class="cover-img-label">대표 이미지</div>
      <img src="${src}" alt="대표 이미지">
      <div class="write-content-img-btn-wrapper">
        <button type="button" class="write-content-img-delete-btn">
          <svg class="icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19V7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM19 4v2H5V4h3.5l1-1h5l1 1H19z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  // 썸네일 라벨 갱신
  thumbnailContainer.querySelectorAll(".cover-img-label").forEach(label => label.remove()); // 모든 썸네일의 '대표' 라벨 제거
  if (fromThumb) {                                                         // 특정 썸네일에서 대표로 승격된 경우
    fromThumb.insertAdjacentHTML("beforeend", `<div class="cover-img-label">대표</div>`); // 그 썸네일에 '대표' 라벨 부착
    currentCoverThumb = fromThumb;                                         // 현재 대표 썸네일로 저장
  }

  hasCover = true;                                                         // 대표가 존재함으로 표시
  updateThumbAddBtn();                                                     // 작은 + 버튼 표시/숨김 갱신

  // 대표 삭제 버튼 이벤트
  coverPreview.querySelector(".write-content-img-delete-btn").addEventListener("click", () => {
    coverInput.value = "";                                                 // 커버 파일 input 리셋(같은 파일 재업로드 가능)
    coverPreview.innerHTML = "";                                           // 대표 영역 비우기

    // 현재 대표 썸네일까지 삭제
    if (currentCoverThumb && currentCoverThumb.isConnected) {              // 대표로 표시된 썸네일이 실제 DOM에 아직 존재하면
      currentCoverThumb.remove();                                          // 그 썸네일 DOM 제거(=해당 이미지 완전 삭제)
      currentCoverThumb = null;                                            // 참조 초기화
    }

    // 다음 승격할 썸네일 찾기
    const nextThumb = thumbnailContainer.querySelector(".write-content-thumbnail"); // 남은 썸네일 중 첫 번째 찾기
    if (nextThumb) {                                                       // 남아있는 썸네일이 있으면
      const nextSrc = nextThumb.querySelector("img").src;                  // 그 썸네일의 이미지 주소 가져오고
      setAsCover(nextSrc, nextThumb);                                      // 자동으로 대표로 승격
    } else {                                                               // 썸네일이 하나도 남지 않았다면
      coverAdd.style.display = "flex";                                     // 커버 큰 + 표시(초기 상태)
      hasCover = false;                                                    // 대표 없음 상태로 갱신
    }

    updateThumbAddBtn();                                                   // 작은 + 버튼 상태 최종 갱신
  }, { once: true });                                                      // 이벤트는 한 번만 실행되도록 등록
}

// 썸네일 생성
function createThumbnail(src, isFirst = false) {                           // src: 썸네일 이미지, isFirst: 첫 업로드 여부
  const thumbDiv = document.createElement("div");                          // 썸네일 래퍼 div 생성
  thumbDiv.classList.add("write-content-thumbnail");                       // 썸네일 스타일 클래스 부여
  thumbDiv.innerHTML = `<img class="write-content-thumbnail-img" src="${src}">`; // 썸네일 이미지 삽입

  // 클릭 시 대표 승격
  thumbDiv.addEventListener("click", () => {                               // 썸네일 클릭하면
    setAsCover(src, thumbDiv);                                             // 해당 썸네일을 대표로 설정
  });

  thumbnailContainer.insertBefore(thumbDiv, thumbAddBtn);                  // 작은 + 버튼 앞에 새 썸네일 삽입(=항상 +는 맨 오른쪽)

  // 첫 썸네일이면 자동 대표 설정
  if (isFirst && !hasCover) {                                              // 첫 업로드이면서 아직 대표가 없다면
    setAsCover(src, thumbDiv);                                             // 자동으로 대표로 지정
  }

  updateThumbAddBtn();                                                     // 썸네일 추가 후 작은 + 버튼 상태 갱신
  return thumbDiv;                                                         // 생성한 썸네일 DOM 반환
}

// 대표 이미지 업로드 (첫 번째 파일은 자동 대표)
if (coverInput && coverAdd) {                                              // 커버 관련 요소들이 존재할 때만
  coverAdd.addEventListener("click", () => coverInput.click());            // 커버 큰 + 클릭 시 숨겨진 파일 input 열기

  coverInput.addEventListener("change", (e) => {                           // 파일 선택이 완료되면
    const files = Array.from(e.target.files);                              // 선택된 파일목록을 배열로
    if (!files.length) return;                                             // 파일이 없으면 종료

    // 업로드 전에 전체 개수 체크
    if (getTotalImageCount() + files.length > 8) {                         // 현재 썸네일 수 + 이번에 올릴 수 > 8 이면
      alert("이미지는 대표 포함 최대 8장까지 등록할 수 있습니다.");         // 경고 표시
      e.target.value = "";                                                 // 같은 파일 다시 선택 가능하도록 리셋
      return;                                                              // 업로드 중단
    }

    files.forEach((file, idx) => {                                         // 파일들을 순회하며
      const reader = new FileReader();                                     // FileReader 생성(이미지 미리보기 위해)
      reader.onload = (ev) => {                                            // 파일 읽기 완료 시
        createThumbnail(ev.target.result, idx === 0);                      // 썸네일 생성(첫 파일이면 자동 대표)
      };
      reader.readAsDataURL(file);                                          // 파일을 DataURL(이미지)로 읽기 시작
    });

    e.target.value = "";                                                   // 같은 파일 재업로드 가능하도록 input 리셋
  });
}

// 썸네일 업로드
if (thumbnailInput) {                                                      // 썸네일 파일 input이 존재할 때만
  thumbnailInput.addEventListener("change", (e) => {                       // 파일 선택 완료 시
    const files = Array.from(e.target.files);                              // 선택 파일을 배열로
    if (!files.length) return;                                             // 없으면 종료

    // 업로드 전에 전체 개수 체크
    if (getTotalImageCount() + files.length > 8) {                         // 현재 썸네일 수 + 추가 수 > 8 이면
      alert("이미지는 대표 포함 최대 8장까지 등록할 수 있습니다.");         // 경고 표시
      e.target.value = "";                                                 // input 리셋
      return;                                                              // 업로드 중단
    }

    files.forEach((file) => {                                              // 파일들 순회
      const reader = new FileReader();                                     // FileReader 생성
      reader.onload = (ev) => {                                            // 읽기 완료 시
        createThumbnail(ev.target.result, false);                          // 썸네일 생성(대표 자동 지정 안 함)
      };
      reader.readAsDataURL(file);                                          // 파일을 DataURL로 읽기
    });

    e.target.value = "";                                                   // input 리셋(같은 파일 재선택 허용)
  });
}
