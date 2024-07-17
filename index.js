//openAPI사이트에서 가져옴
const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1";
const container = document.getElementById('container');

//할당하고 싶은 값은 "" 여기서 만 가져가면 됨.
const option = {
    serviceKey:
      "a1WLx0OCx%2BEA0snfpuhTYza7XXvedm1tCk8129OXUf17dc2l%2FUkysWyiU6hBUc9NleeWN6XyRMicweBpVBRrCQ%3D%3D",
    numofRows: 5,
    MobileApp: "test",
    MobileOS: "ETC",
    arrange: "A",
    _type: "json",
    pageNo: 1
  };

  let count = -1; //계속해서 변화하는 값이기 때문

async function getData(){

    //pageNO random
    const random = Math.floor(Math.random()*100+1);

    const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${random}&serviceKey=${option.serviceKey}`;    
    //parameter로 사용 ? query parameter여러개 쓰고 싶으면 뒤에 & 붙이면 됨

    count ++;
    const fetchData = await fetch(url);
    console.log(fetchData);

    const toJson = await fetchData.json();
    console.log(toJson);

    const datas = await toJson.response.body.items.item;
    console.log(datas);

    datas.map((data, i)=>{
        //dom요소를 만듦
        const list = document.createElement('div');
        list.id = 'list';

        const image = document.createElement('img');
        image.src = data.galWebImageUrl; //??

        const info = document.createElement('span');
        info.innerText = `
            📌 ${i+1 + 5*count}번째 사진
            제목 : ${data.galTitle}
            장소 : ${data.galPhotographyLocation}`

        const button = document.createElement('button');
        button.innerText = "더보기";

                //상세보기 페이지로 이동
                button.addEventListener("click", function() {
                  const queryParams = `image=${encodeURIComponent(data.galWebImageUrl)}&title=${encodeURIComponent(data.galTitle)}&location=${encodeURIComponent(data.galPhotographyLocation)}&createdTime=${encodeURIComponent(data.galCreatedtime)}&photographer=${encodeURIComponent(data.galPhotographer)}&keyword=${encodeURIComponent(data.galSearchKeyword)}`;
                  window.location.href = `상세보기.html?${queryParams}`;
                });

        list.appendChild(image);
        list.appendChild(info);
        list.appendChild(button);

        container.appendChild(list);
});
}


//const ddd = async() => {}