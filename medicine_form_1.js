const inputMedName = document.getElementById('input-med-name');
const btnsMedType = document.querySelectorAll('#div-med-kind a');
const inputMedDose = document.getElementById('input-med-dose');
const btnsMedDoseType = document.querySelectorAll('#div-med-dose-unit a');
const btnGoNext = document.querySelector('.go-next-button');
const btnCancel = document.querySelector('.right-button');

let medName = '';
let medKind = '';
let medDose = '';
let medDoseUnit = '';

btnsMedType.forEach(button => {
  button.addEventListener('click', (event) => {
    event.target.style.backgroundColor = '#8e8e93';
    event.target.style.color = '#FFFFFF';

    btnsMedType.forEach(button => {
      if (button !== event.target) {
        button.style.backgroundColor = '#F2F2F7';
        button.style.color = '#000000';
      }
    });

    medKind = event.target.innerText;
  });
});

btnsMedDoseType.forEach(button => {
  button.addEventListener('click', (event) => {
    event.target.style.backgroundColor = '#8e8e93';
    event.target.style.color = '#FFFFFF';

    btnsMedDoseType.forEach(button => {
      if (button !== event.target) {
        button.style.backgroundColor = '#F2F2F7';
        button.style.color = '#000000';
      }
    });

    medDoseUnit = event.target.innerText;
  });
});

btnGoNext.addEventListener('click', () => {
  medName = inputMedName.value;
  medDose = inputMedDose.value;

  if (medName === '') {
    alert('약 이름을 입력해주세요.');
    return;
  }

  if (medKind === '') {
    alert('약 종류를 선택해주세요.');
    return;
  }

  if (medDose === '') {
    alert('복용량을 입력해주세요.');
    return;
  }

  if (medDoseUnit === '') {
    alert('복용 단위를 선택해주세요.');
    return;
  }

  if (isNaN(medDose)) {
    alert('복용량은 숫자만 입력해주세요.');
    return;
  }

  while (medDose.includes(' ')) {
    medDose = medDose.replace(' ', '');
  }

  let id = 1;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    if (value.name === medName && key !== 'tempStore') {
      alert('이미 등록된 이름입니다.');
      return;
    }
  }

  localStorage.setItem('tempStore', JSON.stringify({
    name: medName,
    dosage_form: medKind,
    dosage: medDose,
    dosage_unit: medDoseUnit,
  }));

  location.href = 'medicine_form_2.html';
});

btnCancel.addEventListener('click', () => {
  localStorage.removeItem('tempStore');
  location.href = './index.html';
});

if (localStorage.getItem('tempStore')) {
  const data = JSON.parse(localStorage.getItem('tempStore'));

  inputMedName.value = data.name;
  inputMedDose.value = data.dosage;

  btnsMedType.forEach(button => {
    if (button.innerText === data.dosage_form) {
      button.click();
    }
  });

  btnsMedDoseType.forEach(button => {
    if (button.innerText === data.dosage_unit) {
      button.click();
    }
  });
}
