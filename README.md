# MBTI-Dating-Coach
Chat GPT의 OpenAPI와 Python으로 만든 api를 연결해서 만든 프로젝트로 나와 상대방의 MBTI, 상황, 관계를 입력하면 연애 코칭을 해주는 봇입니다.

[구현 페이지 주소](https://web-dating-coach-7xwyjq992llj52r53k.sel4.cloudtype.app/)

[블로그 주소](https://velog.io/@tnfkachzh/%EB%82%98%EB%A7%8C%EC%9D%98-%EC%97%B0%EC%95%A0%EC%BD%94%EC%B9%98-%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0%ED%94%84%EB%A1%A0%ED%8A%B8)

# 💌 나만의 연애코치 앱(프론트)

🎮 토이 프로젝트
주제 : MBTI 기반 연애 코치 봇

인원 : 프론트엔드 1명, 백엔드 1명

기간 : 23.05.25 ~ 23.05.26

📚 프론트 기술스택
- HTML
- CSS
- JavaScript

📚 백엔드 기술스택
- GPT open API
- Python
- Fast API
- <br>

- **나와 상대방 mbti, 상황, 관계를 입력하는 폼 페이지 구현**
    - form, input, button을 활용하여 폼 구현
    - fetch를 사용하여 post요청
    - 폼 입력 시 채팅페이지로 이동
    
- **연애 코치와 대화할 수 있는 채팅 페이지 구현**
    - 채팅 목록을 표시할 컨테이너와 입력창, 메시지 표시 영역 등으로 구성
    - 사용자가 입력한 메시지를 서버로 전송하여 대화 기록을 업데이트하고, 서버에서 응답을 받아 채팅 목록에 추가
    - 메시지 정렬 방향에 따라 오른쪽(사용자) 또는 왼쪽(코치)으로 표시
    - 채팅 입력값에 따른 버튼 활성화 및 색상 업데이트와 코치에게 응답이 오기까지 로딩 구현
    - 채팅 내용은 스크롤 가능하도록 하고 자동으로 스크롤되어 가장 최근 대화가 보이도록 설정
    
- **반응형 구현**
    - 미디어 쿼리를 사용하여 화면 크기에 따른 레이아웃 변경
    - 작은 화면에서는 헤더를 상단에, 채팅바는 하단에 고정
