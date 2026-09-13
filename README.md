<div align="center">

# 북작북작

**우리 동네 도서관에서 이웃과 책을 나누고 데려가는 순환 서비스**
<br />
🔗 https://bookjakbookjak.netlify.app/

<img width="7680" height="4320" alt="표지" src="https://github.com/user-attachments/assets/5af319ab-6188-4d7e-a3a2-2b129115412b" />

</div>

## 🎙️ Introduction

### (1) 문제 인식

> 멋쟁이사자처럼 대학 13기 해커톤 주제 "AI로 다시 뛰는 우리 동네: 지역 경제와 삶을 AI로 연결해 보세요" 안에서, 동작구는 대학 2곳과 노량진 학원가가 밀집해 책 직접 구입 인구만 13만 명이고 신간 도서 평균가도 4년새 약 3,000원 오르며 중고 수요가 늘고 있다는 걸 확인했습니다. 인터뷰에서는 "직접 보고 고르고 싶은데 온라인 거래는 상태를 알기 어렵다", "집에 책이 많아 보관할 곳이 부족하다"는 응답이 반복됐습니다.
<img width="7680" height="4320" alt="데스크리서치" src="https://github.com/user-attachments/assets/62c80fde-0afc-4a1e-a172-7846b95e597e" />
<img width="7680" height="4320" alt="필드리서치  _ 인터뷰" src="https://github.com/user-attachments/assets/eac8206d-3c2e-4276-846a-c103814d8951" />


### (2) 솔루션

> '개인 대 개인 직접 거래'를 동네 도서관 중심 순환 구조로 바꿔, 시간 약속이나 대면 없이 책을 나누고 데려갈 수 있게 했습니다. AI 큐레이션으로 원하는 책을 계속 찾아봐야 하는 불편도 줄였습니다.
<img width="7680" height="4320" alt="솔루션 _ 서비스 소개" src="https://github.com/user-attachments/assets/a07f1d92-2f72-449a-9600-fbdfe494e20f" />


## ✨ Key Features

- **나눔하기/데려가기**: 도서관 선택 → 등록 → 정보확인 → 완료 전체 플로우
- **AI 취향 큐레이션**: 온보딩 설문·이용기록 기반 추천, 실시간 알림

<br />

## 📸 DEMO

### (1) 나눔하기/데려가기
<img width="7680" height="4320" alt="핵심기능1" src="https://github.com/user-attachments/assets/52a1bbee-7c68-4442-a24b-28ff3d779f94" />

### (2) AI 취향 큐레이션
<img width="1005" height="564" alt="핵심기능2" src="https://github.com/user-attachments/assets/876f0c70-193e-444f-b319-059cae2daece" />

<br />
<br />

## 💡 Tech Stack

| Category | Technology |
|---|---|
| Frontend | React, JavaScript |
| State Management | Recoil |
| Styling | styled-components |
| HTTP | axios |
| Barcode | @zxing-library/html5-qrcode |

<br />

## 📂 Directory Structure

```
src/
 ├── Globalstyles/
 ├── assets/                    # 아이콘, 이미지 리소스
 │    ├── icons/
 │    └── images/
 ├── components/
 │    ├── Layout/
 │    ├── barcodeComponents/    # CameraScan, ImageUpload, InputNumber 등
 │    │    └── Panel/
 │    ├── mapComponents/        # 도서관 위치 관련
 │    ├── mypageComponents/
 │    └── style/
 ├── hooks/
 ├── lib/                       # axios 인스턴스 등 API 클라이언트
 ├── pages/
 │    ├── AiPage/               # AI 도서 추천
 │    ├── BarcodePage/          # 책 등록·나눔·데려가기 플로우
 │    ├── LibraryPage/
 │    ├── LoginPage/
 │    └── RegisterPage/
 └── store/                     # Recoil 전역 상태
```

## 🚀 시작하기

```bash
npm install
npm run dev
```

<br />

## 👥 팀원 소개 (TEAM 동작그만.dev)

| 김아연 | 권정주 | 이은지 | 진호영 | 이채연 | 천재홍 |
|---|---|---|---|---|---|
| PM | DE | FE | FE | BE | BE |
