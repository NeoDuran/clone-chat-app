# 카카오톡 스타일 AI 채팅봇

카카오톡과 동일한 UI를 가진 AI 채팅 애플리케이션입니다. Google Gemini API를 활용하여 자연스러운 대화가 가능합니다.

## 🔒 보안 특징

- **API 키 보호**: 서버리스 함수를 통해 API 키가 클라이언트에 노출되지 않음
- **안전한 배포**: Vercel 환경변수로 민감한 정보 관리
- **CORS 보안**: 적절한 CORS 헤더 설정

## 기능

- 📱 카카오톡과 동일한 UI/UX
- 🤖 Google Gemini AI와의 실시간 대화
- ⚡ 빠른 응답 및 타이핑 인디케이터
- 📱 반응형 디자인 (모바일 최적화)
- 🔒 서버리스 함수를 통한 안전한 API 호출

## 로컬 개발

1. **의존성 설치**
```bash
npm install
```

2. **환경변수 설정**
로컬 테스트를 위해 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **개발 서버 실행**
```bash
npm run dev
```

## Vercel 배포 (안전한 방법)

### 1단계: GitHub에 코드 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kakao-chat-app.git
git push -u origin main
```

### 2단계: Vercel에 배포
1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택 및 Import
4. **Environment Variables** 섹션에서 다음 추가:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: 실제 Gemini API 키
   - **Environment**: Production, Preview, Development 모두 체크
5. "Deploy" 클릭

### 3단계: API 키 발급
[Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 발급

## 보안 아키텍처

```
클라이언트 (브라우저)
       ↓
    /api/chat (Vercel Serverless Function)
       ↓
   Gemini API (Google)
```

- **클라이언트**: API 키에 접근 불가
- **서버리스 함수**: 환경변수로 안전하게 API 키 관리
- **Google API**: 서버에서만 호출

## 추가 보안 설정 (선택사항)

### 1. API 키 사용량 제한
Google Cloud Console에서 API 키 할당량 설정:
- 일일 요청 수 제한
- 도메인 제한 (배포된 URL만 허용)

### 2. 요청 제한
서버리스 함수에 rate limiting 추가 (추후 업데이트 예정)

## 프로젝트 구조

```
kakao/
├── api/
│   ├── chat.js          # Gemini API 호출 서버리스 함수
│   └── package.json     # 서버리스 함수 의존성
├── src/
│   ├── App.jsx          # 메인 애플리케이션
│   ├── App.css          # 카카오톡 스타일
│   ├── main.jsx         # React 엔트리 포인트
│   └── index.css        # 글로벌 스타일
├── vercel.json          # Vercel 배포 설정
├── package.json         # 클라이언트 의존성
└── README.md           # 프로젝트 문서
```

## 기술 스택

- **Frontend**: React 18, Vite
- **Backend**: Vercel Serverless Functions
- **AI**: Google Gemini API
- **Styling**: CSS3
- **Icons**: Lucide React
- **Deploy**: Vercel

## 문제 해결

### API 오류 발생 시
1. Vercel 대시보드에서 환경변수 `GEMINI_API_KEY` 확인
2. Google AI Studio에서 API 키 유효성 확인
3. Vercel Functions 로그 확인

### 배포 실패 시
1. `vercel.json` 설정 확인
2. `api/package.json` 의존성 확인
3. GitHub 저장소 동기화 확인

## 라이선스

MIT License 