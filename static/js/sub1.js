const BMIform = document.forms["bmiCheckForm"];

const btnCalc = document.querySelector(".compute #btnCalc");
const disabledInput = document.querySelectorAll(".form input");
const resetButton = document.querySelector(".reset");
const resetP = document.querySelector(".result");
const resetBox = document.querySelectorAll(".graph li li");

BMIform.addEventListener("submit", function calculateBMI(event) {
  event.preventDefault();
  const length = parseInt(document.querySelector("#length").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const resultText = document.querySelector("#resultText");
  const bmiNumber = document.querySelector("#bmiNumber");
  const graphResult = document.querySelector(".graphResult");

  const lowWeight = document.querySelector(".low-weight");
  const regular = document.querySelector(".regular");
  const overweight = document.querySelector(".overweight");
  const obesity = document.querySelector(".obesity");

  if (length === "" || isNaN(length)) {
    resultText.innerHTML = "키를 입력해 주세요!";
  } else if (weight === "" || isNaN(weight)) {
    bmiNumber.innerHTML = "몸무게를 입력해 주세요!";
  } else {
    const bmi = (weight / ((length * length) / 10000)).toFixed(2);
    bmiNumber.innerHTML = ` / BMI 지수 : ${bmi}`;
    if (bmi <= 18.5) {
      resultText.innerHTML = `저체중`;
      graphResult.innerHTML = `저체중이시네요, 건강을 위해 체중증가를 권유드려요`;
      lowWeight.style.border = "5px solid red";
      lowWeight.style.zIndex = "1000";
    } else if (bmi <= 23) {
      resultText.innerHTML = `정상`;
      graphResult.innerHTML = `건강한 체중을 가지고 계십니다`;
      regular.style.border = "5px solid red";
      regular.style.border = "5px solid red";
    } else if (bmi <= 25) {
      resultText.innerHTML = `과체중`;
      graphResult.innerHTML = `정상 체중보다 조금 더 과해요!`;
      overweight.style.border = "5px solid red";
      overweight.style.border = "5px solid red";
    } else {
      resultText.innerHTML = `비만`;
      graphResult.innerHTML = `정상 체중에 도달하기 위해 운동을 해볼까요?`;
      obesity.style.border = "5px solid red";
      obesity.style.border = "5px solid red";
    }
  }

  btnCalc.disabled = true;
  btnCalc.style.cssText =
    "background : #999; border :1px solid #eee; pointer-events: none; ";
  for (let i = 0; i < 2; i++) {
    disabledInput[i].disabled = true;
  }
});

resetButton.addEventListener("click", function () {
  window.location.href = "/sub1";
});
