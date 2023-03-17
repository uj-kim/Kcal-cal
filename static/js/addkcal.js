let addCvalue = 0;
let addPvalue = 0;
let addFvalue = 0;
let addKvalue = 0;

const kcalTotal = 1700;
let cpRecommend = (kcalTotal * 0.4) / 4;
let fRecommend = (kcalTotal * 0.4) / 9;

let eatenKcal = 0;
let eatenCarbs = 0;
let eatenProtein = 0;
let eatenFat = 0;

function addKcal(kcal, carbs, protein, fat) {
  if (event.target.parentNode.classList.contains("select")) {
    const isEmpty = document.querySelector("#list-isEmpty");
    isEmpty.classList.add("none");
    const utensils = event.target.parentNode;
    utensils.classList.add("none");
    const plus = utensils.nextSibling.nextSibling;
    plus.classList.remove("none");
    const minus = plus.nextSibling.nextSibling;
    minus.classList.remove("none");
    const eatContainer = document.querySelector(".eat ul");
    const eatenList = document.createElement("li");
    const divideLine = document.createElement("hr");
    const eatenFood = document.createTextNode(
      `${event.target.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.textContent}`
    );
    const eatenCount = document.createElement("span");
    eatenList.classList.add("eaten-list");
    eatenList.appendChild(eatenFood);
    eatenList.appendChild(eatenCount);
    eatenCount.innerText = 1;
    eatContainer.appendChild(eatenList);
    eatContainer.appendChild(divideLine);
  } else {
    const eatenFood =
      event.target.parentNode.parentNode.parentNode.firstChild.nextSibling
        .firstChild.nextSibling.textContent;
    const eatenList = document.querySelectorAll(".eaten-list");
    const eatenCount = document.querySelectorAll(".eaten-list span");
    for (let i = 0; i < eatenList.length; i++) {
      if (eatenFood === eatenList[i].childNodes[0].data) {
        eatenCount[i].innerText = +eatenCount[i].textContent + 1;
      }
    }
  }

  let kcalPercent = parseInt((kcal / kcalTotal) * 100);
  let kcalBar = document.querySelector(".kcal-bar");
  let kcalValue = document.querySelector(".kcal-value");

  let cValue = parseInt((carbs / cpRecommend) * 100);
  let pValue = parseInt((protein / cpRecommend) * 100);
  let fValue = parseInt((fat / fRecommend) * 100);

  let cGraph = document.querySelector(".carbs");
  let pGraph = document.querySelector(".protein");
  let fGraph = document.querySelector(".fat");

  addKvalue = addKvalue + kcalPercent;
  addCvalue = addCvalue + cValue;
  addPvalue = addPvalue + pValue;
  addFvalue = addFvalue + fValue;

  if (addKvalue >= 100) {
    kcalBar.style = `width: 100%`;
  } else {
    kcalBar.style = `width: ${addKvalue}%`;
    kcalBar.classList.add("bar-animate");
    setTimeout(() => {
      kcalBar.classList.remove("bar-animate");
    }, 1500);
  }

  cGraph.style = `--p:${addCvalue}`;
  pGraph.style = `--p:${addPvalue}`;
  fGraph.style = `--p:${addFvalue}`;

  let carbsValue = document.querySelector(".carbs-value");
  let proteinValue = document.querySelector(".protein-value");
  let fatValue = document.querySelector(".fat-value");

  kcalValue.innerText = `${addKvalue}%`;
  carbsValue.innerText = `${addCvalue}%`;
  proteinValue.innerText = `${addPvalue}%`;
  fatValue.innerText = `${addFvalue}%`;

  cGraph.classList.add("cAnimation");
  pGraph.classList.add("pAnimation");
  fGraph.classList.add("fAnimation");

  const BKeyFrames = document.createElement("style");
  BKeyFrames.innerHTML = `@keyframes bar{
    from {
      width: ${addKvalue - kcalPercent}%;
    }
  }`;

  const CkeyFrames = document.createElement("style");
  CkeyFrames.innerHTML = `@keyframes cAnimation {
    from{--p:${addCvalue - cValue}}
  }`;
  const FkeyFrames = document.createElement("style");
  FkeyFrames.innerHTML = `@keyframes fAnimation {
    from{--p:${addFvalue - fValue}}
  }`;
  const PkeyFrames = document.createElement("style");
  PkeyFrames.innerHTML = `@keyframes pAnimation {
    from{--p:${addPvalue - pValue}}
  }`;

  kcalBar.appendChild(BKeyFrames);
  cGraph.appendChild(CkeyFrames);
  pGraph.appendChild(PkeyFrames);
  fGraph.appendChild(FkeyFrames);

  const isDisabled = false;
  function doubleSubmitCheck() {
    if (isDisabled) {
      return isDisabled;
    } else {
      isDisabled = true;
      return false;
    }
  }
  $(".plus").addClass("pointer-none");
  $(".minus").addClass("pointer-none");

  setTimeout(() => {
    $(".plus").removeClass("pointer-none");
    $(".minus").removeClass("pointer-none");
    cGraph.classList.remove("cAnimation");
    pGraph.classList.remove("pAnimation");
    fGraph.classList.remove("fAnimation");
  }, 1500);
}
