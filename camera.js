const videoElement = document.getElementById('camera');
const captureButton = document.getElementById('captureButton');

// 미디어 장치에 액세스하여 카메라 영상 표시
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, facingMode: 'environment' });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('카메라 액세스 에러:', error);
  }
}

// 페이지 로드 시 카메라 영상 시작
window.addEventListener('load', startCamera);

// 이미지 캡처 이벤트 처리
captureButton.addEventListener('click', async () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  // 원본 이미지의 중앙 부분 좌표 계산
  const centerX = (videoElement.videoWidth - canvas.width) / 2;
  const centerY = (videoElement.videoHeight - canvas.height) / 2;

  context.drawImage(videoElement, centerX, centerY, 256, 256, 0, 0, 256, 256);

  // 이미지 데이터를 JavaScript 변수에 저장 (이미지를 base64로 인코딩하여 저장)
  const mimeString = 'data:image/png;base64';
  const dataUrl = canvas.toDataURL('image/png');
  const content = dataUrl.replace(/^data:image\/png;base64,/,'');
  const byteString = atob(content);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], {type: mimeString});
  const file = new File([blob], 'captured.png')

  const formData = new FormData();

  formData.append('raw_image', file);

  fetch('http://ec2-43-202-152-189.ap-northeast-2.compute.amazonaws.com/api/v1/predict/', {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
    processData: false,
    contentType: false,
  }).then(response => {
    if (response.ok) {
      console.log(response);
      return response.json();
    } else if (response.status === 204) {
      alert('약을 찾을 수 없습니다. 다시 시도하거나, 직접 입력해주세요.');
      throw new Error('검색 실패');
    } else {
      throw new Error('에러');
    }
  }).then(data => {
    localStorage.setItem('resData', JSON.stringify(data));
    window.location.href = './results.html';
  }).catch(error => {
    console.error('Error:', error);
  });
});