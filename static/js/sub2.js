function Search() {
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: result,
    },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log(msg);

    let html = "";
    console.log(msg.document.length);
    for (i = 0; i < msg.documents.length; i++) {
      html += `
        <a href="${msg.documents[i].url}">
          <div class="news">
            <p>NO&#46;&nbsp;<span>${msg.document.length - i}</span></p>
            <h4>${msg.documents[i].title}</h4>
            <p>${msg.documents[i].blogname}</p>
            <p>${msg.documents[i].contents.substr(0, 100)}...</p>
            <p>${msg.documents[i].datetime}</p>
          </div>
          <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
        </a>
      `;
    }
    search.insertAdjacentHTML("afterbegin", html);
  });
}

const form = document.forms["search"];
window.onload = (event) => {
  event.preventDefault();
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: "건강",
    },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log(msg);

    let html = "";
    for (i = 0; i < msg.documents.length; i++) {
      html += `
                    <a href="${msg.documents[i].url}">
                      <div class="news">
                        <p>NO&#46;&nbsp;<span>${
                          msg.documents.length - i
                        }</span></p>
                        <h4>${msg.documents[i].title}</h4>
                        <p>${msg.documents[i].blogname}</p>
                        <p>${msg.documents[i].contents.substr(0, 100)}</p>
                        <p>${msg.documents[i].datetime}</p>
                      </div>
                      <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
                      </a>
                  `;
    }
    search.insertAdjacentHTML("afterbegin", html);
  });
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: result,
    },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log("msg.document.parentNode>>", msg.documents.parentNode);
    let news = document.querySelectorAll(".search > a");
    console.log(news.length);
    for (i = 0; i < news.length; i++) {
      news[i].parentNode.removeChild(news[i]);
    }
    let html = "";
    for (i = 0; i < msg.documents.length; i++) {
      html += `
                    <a href="${msg.documents[i].url}">
                      <div class="news">
                        <p>NO&#46;&nbsp;<span>${
                          msg.documents.length - i
                        }</span></p>
                        <h4>${msg.documents[i].title}</h4>
                        <p>${msg.documents[i].blogname}</p>
                        <p>${msg.documents[i].contents.substr(0, 100)}</p>
                        <p>${msg.documents[i].datetime}</p>
                      </div>
                      <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
                      </a>
                  `;
    }
    search.insertAdjacentHTML("afterbegin", html);
  });
});
