window.addEventListener("load", () => {
 const modal = document.getElementById("modal");
 const closeModalBtn = document.getElementById("closeModalBtn");
 const youtubeVideo = document.getElementById("youtubeVideo");
 const videoDescription = document.getElementById("videoDescription");
 const cardContainer = document.getElementById("cardContainer");

 // JSON 파일을 연동하여 카드 목록 생성
 fetch("data/video.json")
  .then((response) => response.json())
  .then((data) => {
   cardList(data);
  })
  .catch((error) => {
   console.error(error);
  });

 // 카드 생성 함수
 const cardList = (data) => {
  const videos = data.videos;
  let tags = "";

  videos.forEach((video) => {
   let tempTag = "";
   // 카드 생성
   tempTag = `
        <div class="card" data-video-id="${video.videoId}" data-description="${video.description}">
            <img
            class="thumbnail"
            src="${video.thumbnail}"
            alt="${video.title}"
            />
            <h2>${video.title}</h2>
            <p>${video.description}</p>
        </div>`;
   tags += tempTag;
  });

  cardContainer.innerHTML = tags;

  // 카드 클릭 시 모달 열기
  const cards = document.querySelectorAll(".card");
  //   console.log(cards);

  cards.forEach((card) => {
   card.addEventListener("click", () => {
    // console.log("클릭했지롱");
    const videoId = card.getAttribute("data-video-id");
    const description = card.getAttribute("data-description");

    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    videoDescription.textContent = description;

    // 모달 표시
    modal.style.display = "block";
   });
  });
 };

 // 모달 닫기 버튼 클릭 시 모달 닫기
 closeModalBtn.onclick = () => {
  modal.style.display = "none";
  // 동영상 중지
  youtubeVideo.src = "";
 };

 // 모달 외부 배경 클릭 시 모달 닫기
 window.onclick = (event) => {
  if (event.target === modal) {
   modal.style.display = "none";
   // 동영상 중지
   youtubeVideo.src = "";
  }
 };
});
