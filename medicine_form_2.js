const mainShapeImg = document.querySelector('.med-graphic-container img');
const mainBg = document.querySelector('.med-graphic-container');

document.getElementById('circle').addEventListener('click', () => {
  mainShapeImg.src = './medicine-images/1.png';
});
document.getElementById('pentagon').addEventListener('click', () => {
  mainShapeImg.src = './medicine-images/2.png';
});
document.getElementById('oval').addEventListener('click', () => {
  mainShapeImg.src = './medicine-images/3.png';
});
document.getElementById('square').addEventListener('click', () => {
  mainShapeImg.src = './medicine-images/4.png';
});
document.getElementById('triangle').addEventListener('click', () => {
  mainShapeImg.src = './medicine-images/5.png';
});

const colors = ['red', 'orange', 'yellow', 'green', 'deepGreen', 'turquoise', 'skyBlue', 'deepBlue', 'purple', 'redViolet', 'pink', 'brown', 'gray'];

colors.forEach((color, idx) => {
  document.getElementById(color).addEventListener('click', () => {
    const currentShapeNumber = mainShapeImg.src.split('/')[4].split('')[0];
    if (color === 'gray') {
      mainShapeImg.src = `./medicine-images/${currentShapeNumber}.png`;
      return;
    }
    mainShapeImg.src = `./medicine-images/${currentShapeNumber}_${idx + 1}.png`;
  });
});

colors.forEach((color) => {
  document.getElementById(`${color}Bg`).addEventListener('click', (event) => {
    mainBg.style.backgroundColor = getComputedStyle(event.target).backgroundColor;
  });
});

document.querySelector('.go-next-button').addEventListener('click', () => {
  let maxKeyNumber = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('manual_')) {
      const keyNumber = Number(key.split('_')[1]);
      if (keyNumber > maxKeyNumber) {
        maxKeyNumber = keyNumber;
      }
    }
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === 'tempStore') {
      let medData = JSON.parse(localStorage.getItem(key));
      medData.image = mainShapeImg.src.split('/')[4].split('.')[0];
      medData.bg_color = getComputedStyle(mainBg).backgroundColor;
      localStorage.setItem(`manual_${maxKeyNumber + 1}`, JSON.stringify(medData));
      localStorage.removeItem(key);
      break;
    }
  }
  location.href = './main.html';
});

document.querySelector('.right-button').addEventListener('click', () => {
  localStorage.removeItem('tempStore');
  location.href = './main.html';
});