function submitDetails(event) {
  //  기본 제출 동작 막기
  event.preventDefault();
  // 사용자 입력값 가져오기
  const myMbti = document.getElementById("myMbtiInput").value;
  const partnerMbti = document.getElementById("partnerMbtiInput").value;
  const situation = document.getElementById("situationInput").value;
  const relationship = document.getElementById("relationshipInput").value;

  // API에 데이터 전송
  fetch("http://127.0.0.1:8000/mbti_setting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_type: myMbti,
      partner_type: partnerMbti,
      situation_type: situation,
      Relationship: relationship,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // 제출이 성공적으로 이루어지면 채팅 페이지로 이동
        window.location.href = "chat.html";
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
