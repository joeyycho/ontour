const container = document.getElementById("container");

// URL에서 데이터 추출
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const photoLocation = urlParams.get('location');
const createdTime = urlParams.get('createdTime');
const photographer = urlParams.get('photographer');
const keyword = urlParams.get('keyword');
const imageUrl = urlParams.get('image');


// 날짜 형식 변환 함수
function formatDate(dateString) {
    // "yyyymmddhhmmss" 형식의 날짜를 Date 객체로 변환
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    
    // 날짜를 "yy/mm/dd" 형식으로 출력
    const formattedDate = `${String(date.getFullYear()).substring(2)}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
}

// 데이터 출력
const image = document.createElement("img");
image.src = decodeURIComponent(imageUrl);
container.appendChild(image);

const info = document.createElement("div");
info.innerText = `
    제목 : ${decodeURIComponent(title)}
    장소 : ${decodeURIComponent(photoLocation)}
    날짜 : ${formatDate(createdTime)}
    촬영자 : ${decodeURIComponent(photographer)}
    키워드 : ${decodeURIComponent(keyword)}
`;
container.appendChild(info);

//돌아가기
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function() {
    history.back(); // 이전 페이지로 이동
});