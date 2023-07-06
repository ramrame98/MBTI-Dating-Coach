function sendMessage() {
  const userInput = document.getElementById("userInput").value;

  // 입력창 빈값으로 만들기
  document.getElementById("userInput").value = "";

  // placeholder 내용 변경
  document.getElementById("userInput").placeholder =
    "답변까지 최대 1분정도 소요될 수 있습니다.";

  updateSendButtonColor();

  displayMessage(userInput, "right");

  // 입력창 비활성화
  document.getElementById("userInput").disabled = true;

  // 버튼 텍스트 대신 스피너 보여주기(로딩)
  const sendButton = document.getElementById("sendButton");
  const sendButtonText = document.getElementById("sendButtonText");
  const spinner = sendButton.querySelector(".spinner-border");
  sendButtonText.style.display = "none";
  spinner.classList.remove("d-none");

  sendButton.disabled = true;

  // 로딩 메시지 추가
  displayMessage("답변을 작성하는 중입니다", "left");

  fetch("http://127.0.0.1:8000/mbti_answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: userInput }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(() => {
      getChatList(); // chat list 업데이트
    })
    .catch((error) => {
      console.error(error);
      displayMessage("오류가 발생했습니다. 다시 시도해주세요.", "left");
    })
    .finally(() => {
      // finally는 결과에 상관없이 실행
      // 스피너 숨기고 버튼 활성화
      spinner.classList.add("d-none");
      sendButton.disabled = false;

      // 버튼의 텍스트 활성화
      sendButtonText.style.display = "inline";

      // 입력창 활성화
      document.getElementById("userInput").disabled = false;
    });
}

// 사용자와 코치의 아바타 이미지 URL
const userAvatarUrl = "./images/oz_icon.png";
const coachAvatarUrl = "./images/coach.png";

function displayMessage(message, alignment) {
  const chatList = document.getElementById("chatList");
  // 메시지를 담을 div 생성 및 class 추가
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(
    alignment === "right" ? "user-message" : "coach-message"
  ); // 메시지 정렬 방향 설정

  // 아바타 이미지를 담을 div 생성 및 class 추가
  const avatarElement = document.createElement("div");
  avatarElement.classList.add("avatar");

  // 아바타 이미지 생성
  const avatarImg = document.createElement("img");
  avatarImg.src = alignment === "right" ? userAvatarUrl : coachAvatarUrl;

  // 아바타 이미지 요소를 아바타 div에 담기
  avatarElement.appendChild(avatarImg);

  // 아바타 div 요소를 메시지 div 앞에 추가
  messageElement.appendChild(avatarElement);

  // 말풍선 생성
  const bubbleElement = document.createElement("div");
  bubbleElement.classList.add("bubble");
  bubbleElement.textContent = message;

  // 말풍선 요소를 정렬된 요소에 담기
  messageElement.appendChild(bubbleElement);
  // 마지막으로 요소를 chatList에 담아서 화면에 표시
  chatList.appendChild(messageElement);

  // 채팅목록의 가장 아래로 스크롤
  chatList.scrollTop = chatList.scrollHeight;

  // 로딩메시지에 애니메이션 추가
  if (message === "답변을 작성하는 중입니다") {
    bubbleElement.classList.add("typing-animation");
  }
}

// 입력창 내용에 따라 버튼 색 변경
function updateSendButtonColor() {
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput").value;

  sendButton.style.backgroundColor =
    userInput.trim() === "" ? "gray" : "#5398ff";
  // trim으로 앞뒤의 공백을 제거한 후 비어있는지 확인 후 색 변경
  sendButton.disabled = userInput.trim() === "";
  // 비어있을시 버튼 비활성화
}

function getChatList() {
  fetch("http://127.0.0.1:8000/mbti_answer")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      // 이전에 표시된 채팅 목록 지우기 -> 중복을 막는 용도
      const chatList = document.getElementById("chatList");
      chatList.innerHTML = "";

      // User와 AI 객체를 배열로 변환하고 결합
      const allMessages = [
        ...Object.entries(data.chat_history.User),
        ...Object.entries(data.chat_history.AI),
      ];
      // 비교함수로 정렬 순서 결정, Date함수로 숫자로 변환하여 비교
      allMessages.sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      });

      // 배열을 순회하면서 각각의 메시지를 채팅창에 표시
      allMessages.forEach(([timestamp, message]) => {
        // 구조 분해 할당으로 timestamp와 message를 개별 변수로 할당
        const alignment = data.chat_history.User.hasOwnProperty(timestamp)
          ? "right"
          : "left";
        // User message는 오른쪽, 그렇지않으면(AI) 왼쪽 표시
        displayMessage(message, alignment);
      });

      // placeholder 원래 상태로 되돌림
      document.getElementById("userInput").placeholder =
        "나만의 연애코치에게 물어보세요.";
    })
    .catch((error) => {
      console.error(error);
      displayMessage("오류가 발생했습니다. 다시 시도해주세요.", "left");
    });
}

// 이벤트가 발생했을 때 함수 호출
document
  .getElementById("userInput")
  .addEventListener("input", updateSendButtonColor);
// input에 입력값이 생기면 버튼 색상 업데이트
document.getElementById("sendButton").addEventListener("click", sendMessage);
// 버튼을 클릭하면 sendMessage 함수 호출
document
  .getElementById("userInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
// 키보드의 키를 눌렀을 때, 누른 키가 "Enter"인 경우에만 sendMessage 함수 호출

window.addEventListener("load", getChatList);
// 페이지 로드가 끝나면 getChatList 함수를 호출
// 화면이 완전히 준비된 후 채팅리스트 불러옴
