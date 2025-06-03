# GitHub 마이그레이션 가이드

## 📋 준비사항

### 1. GitHub 계정 및 리포지토리 생성
1. GitHub.com에 로그인
2. 새 리포지토리 생성: "telecom-calculator-dashboard"
3. Description: "Premium React + Node.js integrated viewer for 8 telecom calculators"
4. Public/Private 선택
5. README, .gitignore, License 체크 해제 (이미 생성됨)

### 2. 로컬 Git 설정
```bash
# Git 사용자 정보 설정 (최초 1회)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 프로젝트 폴더에서 실행
cd your-project-folder

# Git 초기화 (이미 되어있다면 건너뛰기)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Premium telecom calculator dashboard"

# GitHub 리포지토리 연결
git remote add origin https://github.com/YOUR_USERNAME/telecom-calculator-dashboard.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 📦 파일 다운로드 방법

### 방법 1: 전체 프로젝트 ZIP 다운로드
Replit에서 다운로드하는 방법:
1. Replit 좌측 파일 패널에서 점 3개 메뉴 클릭
2. "Download as zip" 선택
3. 전체 프로젝트가 ZIP 파일로 다운로드됨

### 방법 2: 개별 파일 다운로드
중요 파일들을 개별적으로 백업:

**핵심 설정 파일들:**
- `package.json` - 의존성 관리
- `package-lock.json` - 의존성 버전 고정
- `tsconfig.json` - TypeScript 설정
- `vite.config.ts` - Vite 빌드 설정
- `tailwind.config.ts` - Tailwind CSS 설정
- `components.json` - shadcn/ui 설정

**소스 코드:**
- `client/` 폴더 전체 (React 프론트엔드)
- `server/` 폴더 전체 (Node.js 백엔드)
- `shared/` 폴더 전체 (공유 타입)

**계산기 원본 파일들:**
- `server/original/kt.html`
- `server/original/lg.html`
- `server/original/sk.html`
- `server/original/lgsoho.html`
- `server/original/hellovision.html`
- `server/original/skyhcn.html`
- `server/original/skpop.html`
- `server/original/smile_template.html`

## 🔄 GitHub 연동 단계별 가이드

### 1단계: 로컬 환경 준비
```bash
# 다운로드한 프로젝트 폴더로 이동
cd telecom-calculator-dashboard

# Git 초기화
git init

# 모든 파일 스테이징
git add .

# .gitignore 확인 및 수정 (필요시)
echo "node_modules/
.env
.env.local
dist/
.DS_Store
*.log" > .gitignore
```

### 2단계: 첫 커밋 생성
```bash
git commit -m "feat: Initial commit

- Premium React + Node.js telecom calculator dashboard
- 8 integrated calculators (KT, LG, SK, etc.)
- Same-window navigation with back button
- Complete original HTML calculator functionality
- Professional UI with dark mode support"
```

### 3단계: GitHub 연결
```bash
# GitHub 리포지토리 URL 연결
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 메인 브랜치 설정 및 푸시
git branch -M main
git push -u origin main
```

### 4단계: GitHub Actions 설정 (선택사항)
`.github/workflows/deploy.yml` 생성:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Build
      run: npm run build
    - name: Deploy
      run: echo "Deploy to your hosting service"
```

## 🛠 환경 설정

### 개발 환경 재구성
새 환경에서 프로젝트 설정:
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build
```

### 환경 변수 설정
`.env` 파일 생성:
```env
NODE_ENV=development
PORT=5000
```

## 📝 추가 권장사항

### 1. 브랜치 전략
```bash
# 개발용 브랜치 생성
git checkout -b develop

# 기능별 브랜치
git checkout -b feature/calculator-enhancements
git checkout -b feature/ui-improvements
```

### 2. 커밋 컨벤션
```bash
git commit -m "feat: Add new calculator feature"
git commit -m "fix: Resolve navigation bug"
git commit -m "docs: Update README"
git commit -m "style: Improve CSS styling"
```

### 3. 이슈 및 PR 템플릿
GitHub에서 Issue 및 Pull Request 템플릿 설정 권장

## 🚀 배포 옵션

### Vercel 배포
```bash
npm i -g vercel
vercel --prod
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

### Railway 배포
```bash
railway login
railway init
railway up
```

이 가이드를 따라하시면 프로젝트를 성공적으로 GitHub로 마이그레이션할 수 있습니다.