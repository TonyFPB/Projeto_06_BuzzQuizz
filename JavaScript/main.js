const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];
let quizz = [];

quizzList = document.querySelector(".quizz-list");
quizzPage = document.querySelector(".quizz-page");
quizzCreator = document.querySelector(".quizz-creator");

window.onload = () => {
  getQuizzes();
};

function loadQuizzes() {
  const ul = document.querySelector(".all-quizzes-list");
  ul.innerHTML = "";

  quizzes.forEach((quizz) => {
    ul.innerHTML += `<li class="quizz-box" onclick="loadPage(${quizz.id})">
    <img class="quizz-img" src="${quizz.image}" alt="Imagem do quizz">
    <p class="quizz-title">${quizz.title}</p>
</li>
        `;
  });
}

function getQuizzes() {
  const promisse = axios.get(urlQuizzes);
  promisse.then((result) => {
    quizzes = result.data;
    loadQuizzes();
  });
}

function loadPage(page) {
  quizzList = document.querySelector(".quizz-list");
  quizzPage = document.querySelector(".quizz-page");
  quizzCreator = document.querySelector(".quizz-creator");

  if (page === "quizz-list") {
    quizzList.classList.remove("hidden");
    quizzCreator.classList.add("hidden");
    quizzPage.classList.add("hidden");
  } else if (page === "quizz-creator") {
    quizzCreator.classList.remove("hidden");
    quizzPage.classList.add("hidden");
    quizzList.classList.add("hidden");
  } else {
    quizzPage.classList.remove("hidden");
    quizzCreator.classList.add("hidden");
    quizzList.classList.add("hidden");

    loadQuizz(page);
  }
}

function loadQuizz(key) {
  const quizzTitle = document.querySelector(".container-quizz span");
  const quizzImage = document.querySelector(".container-quizz img");
  const promisse = axios.get(`${urlQuizzes}/${key}`);
  
  promisse.then((result) => {
    quizz = result.data;

    quizzTitle.innerHTML = quizz.title;
    quizzImage.src = quizz.image;
    console.log(quizz);
  });
}

function reloadQuizz(){
  window.scrollTo({top: 0, behavior: "smooth"});
}