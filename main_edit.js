const container = document.querySelector('.medicines-section');

const medToDelete = [];

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  const medData = JSON.parse(localStorage.getItem(key));

  // 새로운 약 정보를 담을 div 요소 생성
  const medicineContainer = document.createElement("div");
  medicineContainer.className = "medicine-container";

  // 약 이미지 컨테이너 생성
  const imageContainer = document.createElement("div");
  imageContainer.style.backgroundColor = medData.bg_color;
  imageContainer.className = "medicine-image-container";
  const image = document.createElement("img");
  image.className = "medicine-image";
  image.src = `./medicine-images/${medData.image}.png`;
  imageContainer.appendChild(image);

  // 약 텍스트 컨테이너 생성
  const textContainer = document.createElement("div");
  textContainer.className = "medicine-text-container";
  const title = document.createElement("h1");
  title.className = "medicine-title";
  title.textContent = medData.name; // 여기에 약 이름 설정
  const typeDose = document.createElement("p");
  typeDose.className = "medicine-type-dose";
  typeDose.textContent = `${medData.dosage_form}, ${medData.dosage + medData.dosage_unit}`; // 여기에 약 유형과 용량 설정
  textContainer.appendChild(title);
  textContainer.appendChild(typeDose);

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./icons/delete_white.svg";
  deleteButton.appendChild(deleteIcon);

  deleteButton.addEventListener("click", () => {
    medToDelete.push(key);
    // 삭제 버튼을 누르면 해당 약 정보를 화면에서 삭제
    container.removeChild(medicineContainer);
  });

  // medicineContainer에 이미지, 텍스트, 삭제 버튼 추가
  medicineContainer.appendChild(imageContainer);
  medicineContainer.appendChild(textContainer);
  medicineContainer.appendChild(deleteButton);

  // medicineContainer를 .medicines-section에 추가
  const medicinesSection = document.querySelector(".medicines-section");
  medicinesSection.appendChild(medicineContainer);

}

document.querySelector('.left-button').addEventListener('click', () => {
  window.location.href = './main.html';
});

document.querySelector('.right-button').addEventListener('click', () => {
  medToDelete.forEach((medKey) => {
    localStorage.removeItem(medKey);
  });
  window.location.href = './main.html';
});
