# 통신사 통합 계산기 시스템 (Telecom Calculator Dashboard)

프리미엄 React + Node.js 기반의 8개 통신사 계산기 통합 뷰어 및 비교 도구

## 🚀 주요 기능

### 📊 통합 대시보드
- 8개 통신사 계산기 (KT, LG U+, SK, LG소호, 헬로비전, SKY/HCN, SK팝, 템플릿)
- 반응형 프리미엄 UI/UX 디자인
- 다크 모드 지원
- 즐겨찾기 및 최근 사용 탭 관리

### 🧮 고급 계산기 기능
- **KT**: 8가지 할인 유형, 복잡한 결합 할인 계산
- **LG U+**: 인터넷, TV, 모바일 결합 할인
- **SK브로드밴드**: B tv 결합 상품 계산
- **소호/비즈니스**: 전용 요금제 계산
- **케이블**: 헬로비전, SKY/HCN 지역 케이블
- **상담원 도구**: 메모 자동 생성, 고객 안내 스크립트

### 💼 상담원 전용 기능
- 백메가 전산 메모 자동 생성
- 고객 안내 문자 스크립트
- 사은품 계산 및 정책 안내
- 본인인증 링크 연동

## 🛠 기술 스택

### Frontend
- **React 18** + TypeScript
- **Wouter** 라우팅
- **TanStack Query** 상태 관리
- **Tailwind CSS** + **shadcn/ui** 컴포넌트
- **Lucide React** 아이콘
- **Framer Motion** 애니메이션

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Drizzle ORM** + **Zod** 검증
- **In-memory Storage** (데모용)

### 개발 도구
- **Vite** 빌드 도구
- **ESLint** + **Prettier**
- **PostCSS** + **Autoprefixer**

## 📁 프로젝트 구조

```
├── client/               # React 프론트엔드
│   ├── src/
│   │   ├── components/   # UI 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── context/      # React Context
│   │   ├── hooks/        # 커스텀 훅
│   │   └── lib/          # 유틸리티
├── server/               # Node.js 백엔드
│   ├── original/         # 원본 HTML 계산기들
│   ├── routes.ts         # API 라우트
│   ├── storage.ts        # 데이터 저장소
│   └── index.ts          # 서버 엔트리
├── shared/               # 공유 타입 정의
└── components.json       # shadcn/ui 설정
```

## 🚀 빠른 시작

### 1. 환경 설정
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 📋 주요 계산기

### 🔥 KT 계산기
- **총액결합**: 인터넷+TV+모바일 통합 할인
- **프리미엄 가족결합**: 최대 5회선 결합
- **프리미엄 싱글결합**: 개인 최적화 상품
- **MVNO결합**: 알뜰폰 결합 할인
- **선택형결합**: 맞춤형 조합
- **광대역결합**: 초고속 인터넷 전용
- **New아우라**: 프리미엄 패키지
- **기타결합**: 특수 상품군

### 🌟 LG U+ 계산기
- 인터넷 + U+tv 결합 할인
- 5G 모바일 결합 상품
- 소호 비즈니스 전용 요금제

### ⚡ SK브로드밴드 계산기
- 인터넷 + B tv 결합
- SK텔레콤 모바일 연동
- 프리미엄 멀티미디어 서비스

## 🎯 상담원 도구

### 📝 자동 메모 생성
- 선택한 상품 정보 자동 정리
- 할인 내역 상세 계산
- 고객 맞춤 상담 스크립트

### 📱 고객 안내
- 본인인증 링크 자동 생성
- SMS 발송용 텍스트 템플릿
- 약관 및 정책 안내 자료

### 🎁 사은품 관리
- 상품별 사은품 정책
- 프로모션 기간 자동 확인
- 조건별 혜택 계산

## 🔧 설정 및 커스터마이징

### 환경 변수
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url  # 선택사항
```

### Tailwind CSS 커스터마이징
`tailwind.config.ts`에서 테마 및 색상 수정 가능

### API 엔드포인트
- `GET /api/calculators` - 계산기 목록
- `GET /api/preferences` - 사용자 설정
- `POST /api/preferences` - 설정 업데이트
- `GET /calculator/:telecom` - 계산기 페이지

## 📱 반응형 디자인

- **Desktop**: 1200px+ 최적화
- **Tablet**: 768px-1199px 적응형 레이아웃
- **Mobile**: 320px-767px 모바일 최적화

## 🔒 보안 및 검증

- Zod 스키마 기반 데이터 검증
- XSS 방지 HTML sanitization
- CORS 설정 및 보안 헤더

## 📈 성능 최적화

- React.memo 기반 컴포넌트 최적화
- TanStack Query 캐싱
- Lazy loading 및 코드 분할
- 이미지 최적화

## 🚀 배포

### Replit 배포
```bash
# 자동 배포 설정됨
npm run dev
```

### 다른 플랫폼 배포
1. 환경 변수 설정
2. `npm run build`
3. `dist/` 폴더 배포

## 🤝 기여 방법

1. Fork 프로젝트
2. Feature 브랜치 생성
3. 변경사항 커밋
4. Pull Request 제출

## 📄 라이선스

MIT License - 자세한 내용은 LICENSE 파일 참조

## 📞 지원 및 문의

- 기술 문의: 개발팀
- 기능 요청: Issue 등록
- 버그 리포트: GitHub Issues

---

**© 2024 통신사 통합 계산기 시스템. All rights reserved.**