const container = document.querySelector('.medicines-section');

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  const medData = JSON.parse(localStorage.getItem(key));

  // 새로운 약 정보를 담을 div 요소 생성
  var medicineContainer = document.createElement("div");
  medicineContainer.className = "medicine-container";

  // 약 이미지 컨테이너 생성
  var imageContainer = document.createElement("div");
  imageContainer.className = "medicine-image-container";
  imageContainer.style.backgroundColor = medData.bg_color;
  var image = document.createElement("img");
  image.className = "medicine-image";
  image.src = `./medicine-images/${medData.image}.png`;
  imageContainer.appendChild(image);

  // 약 텍스트 컨테이너 생성
  var textContainer = document.createElement("div");
  textContainer.className = "medicine-text-container";
  var title = document.createElement("h1");
  title.className = "medicine-title";
  title.textContent = medData.name;
  var type = document.createElement("p");
  type.className = "medicine-type";
  type.textContent = medData.dosage_form;
  var dose = document.createElement("p");
  dose.className = "medicine-dose";
  dose.textContent = medData.dosage + medData.dosage_unit;
  textContainer.appendChild(title);
  textContainer.appendChild(type);
  textContainer.appendChild(dose);

  // 각각의 컨테이너를 medicineContainer에 추가
  medicineContainer.appendChild(imageContainer);
  medicineContainer.appendChild(textContainer);

  // 생성한 medicineContainer를 문서의 원하는 위치에 추가
  container.appendChild(medicineContainer);
}