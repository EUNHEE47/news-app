let news = [];
let searchBtn = document.getElementById("search-button");
let url;
let newsHTML = "";
let page = 1;
let total_page = 0;

const getNews = async () => {
  try {
    url.searchParams.set("page_number", page);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    news = data.news;
    total_pages = data.news.length;
    page = data.page;
    render();
    pagenation();

    if (news.length === 0) {
      newsHTML = `결과값이 없습니다.`;
      document.getElementById("news-board").innerHTML = newsHTML;
    }
  } catch (error) {
    console.log("잡힌에러는 : ", error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.currentsapi.services/v1/latest-news?language=ko&page_size=10&apiKey=wc_NY1pnlhB3Dkf5Sf6lzh2hJ_1bJFcEDgtaPT7QtaEOvnRu`
  );

  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;

  url = new URL(
    `https://api.currentsapi.services/v1/search?keywords=${keyword}&page_size=10&language=ko&apiKey=wc_NY1pnlhB3Dkf5Sf6lzh2hJ_1bJFcEDgtaPT7QtaEOvnRu`
  );

  getNews();
};

getNewsByKeyword();

const render = () => {
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img"
        src="${item.image}"
      />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <div>${item.author}</div>
      <div>${item.published}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const pagenation = () => {
  let pagenationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  let first = last - 4;

  pagenationHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${
    page - 1
  })">
    <span aria-hidden="true">&lt;</span>
  </a>
</li>`;
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${
      page === i ? "active" : ""
    }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }

  pagenationHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next"onclick="moveToPage(${
    page + 1
  })">
    <span aria-hidden="true">&gt;</span>
  </a>
</li>`;

  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
};
searchBtn.addEventListener("click", getNewsByKeyword);
getLatestNews();
