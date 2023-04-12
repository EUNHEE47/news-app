let news = [];
let searchBtn = document.getElementById("search-button");

const getLatestNews = async () => {
  let url = new URL(
    `https://api.currentsapi.services/v1/latest-news?language=ko&page_number=1&page_size=5&apiKey=wc_NY1pnlhB3Dkf5Sf6lzh2hJ_1bJFcEDgtaPT7QtaEOvnRu`
  );

  let response = await fetch(url);
  let data = await response.json();
  news = data.news;
  console.log(news);

  render();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;

  let url = new URL(
    `https://api.currentsapi.services/v1/search?keywords=${keyword}&page_number=1&page_size=5&language=ko&apiKey=wc_NY1pnlhB3Dkf5Sf6lzh2hJ_1bJFcEDgtaPT7QtaEOvnRu`
  );

  let response = await fetch(url);
  let data = await response.json();
  news = data.news;

  render();
};

getNewsByKeyword();

const render = () => {
  let newsHTML = "";
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

searchBtn.addEventListener("click", getNewsByKeyword);
getLatestNews();
