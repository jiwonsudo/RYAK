const medList = JSON.parse(localStorage.getItem('resData')).drug;
const shapeList = ['circle', 'pentagon', 'oval', 'square', 'triangle'];
const colorList = ['red', 'orange', 'yellow', 'green', 'deepGreen', 'turquoise', 'skyBlue', 'deepBlue', 'purple', 'redViolet', 'pink', 'brown', 'white'];

medList.forEach(medData => {
// 새로운 약 정보를 담을 div 요소 생성
const medicineContainer = document.createElement("div");
medicineContainer.className = "medicine-container";

// 약 이미지 컨테이너 생성
const imageContainer = document.createElement("div");
imageContainer.style.backgroundColor = 'gray';
imageContainer.className = "medicine-image-container";
const image = document.createElement("img");
image.className = "medicine-image";

let medShapeSrc = '';
shapeList.forEach((shape, idx) => {
  if (medData.shape === shape) {
    medShapeSrc = (idx + 1).toString();
    console.log(medShapeSrc);
  }
});

let medColorSrc = '';
colorList.forEach((color, idx) => {
  if (medData.color === color) {
    if (color === 'white') {
      medColorSrc = '';
      return;
    }

    medColorSrc = (idx + 1).toString();
    console.log(medColorSrc);
  }
});

image.src = `./medicine-images/${medShapeSrc}${medColorSrc || medColorSrc !== '' ? '_' : ''}${medColorSrc ? medColorSrc : ''}.png`;
imageContainer.appendChild(image);

// 약 텍스트 컨테이너 생성
const textContainer = document.createElement("div");
textContainer.className = "medicine-text-container";
const title = document.createElement("h1");
title.className = "medicine-title";

if (medData.name) {
  if (medData.name.split('(').length > 1) {
    title.textContent = medData.name.split('(')[0];
  } else title.textContent = medData.name;
} else title.textContent = '';

const typeDose = document.createElement("p");
typeDose.className = "medicine-type-dose";
typeDose.textContent = `${medData.dosage_form ? medData.dosage_form : ''}${medData.dosage_form && medData.dosage_unit ? ',' : ''} ${medData.dosage ? medData.dosage : ''}${medData.dosage_unit ? medData.dosage_unit : ''}`; // 여기에 약 유형과 용량 설정
textContainer.appendChild(title);
textContainer.appendChild(typeDose);

// 삭제 버튼 생성
const addButton = document.createElement("button");
addButton.className = "add-button";
const addIcon = document.createElement("img");
addIcon.src = "./icons/plus.svg";
addButton.appendChild(addIcon);

addButton.addEventListener("click", () => {
  const medData = {
    name: title.textContent,
    dosage_form: typeDose.textContent.split(',')[0],
    dosage: typeDose.textContent.split(',')[1] ? typeDose.textContent.split(',')[1].trim().split(' ')[0] : '',
    dosage_unit: typeDose.textContent.split(',')[1] ? typeDose.textContent.split(',')[1].trim().split(' ')[1] : '',
    image: `${medShapeSrc}${medColorSrc || medColorSrc !== '' ? '_' : ''}${medColorSrc ? medColorSrc : ''}`,
    bg_color: 'gray',
  }

  let id = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('auto_')) id++;
  }

  localStorage.setItem(`auto_${id}`, JSON.stringify(medData));
  localStorage.removeItem('resData');
  window.location.href = './index.html';
});

// medicineContainer에 이미지, 텍스트, 추가 버튼 추가
medicineContainer.appendChild(imageContainer);
medicineContainer.appendChild(textContainer);
medicineContainer.appendChild(addButton);

// medicineContainer를 .medicines-section에 추가
const medicinesSection = document.querySelector(".medicines-section");
medicinesSection.appendChild(medicineContainer);
});

document.querySelector('.manual-input-section').addEventListener('click', () => {
  localStorage.removeItem('resData');
  window.location.href = './medicine_form_1.html';
});

document.querySelector('.left-button').addEventListener('click', () => {
  localStorage.removeItem('resData');
  window.location.href = './camera.html';
});

document.querySelector('.right-button').addEventListener('click', () => {
  localStorage.removeItem('resData');
  window.location.href = './index.html';
});