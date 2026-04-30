# 플바(+알바) 프로젝트 컨텍스트

## 프로젝트 기본 정보
- **프로젝트명**: 플바 (+알바)
- **위치**: `/Users/daniel/Desktop/플바/plusalba`
- **서비스 정의**: 오프라인 매장의 무료 근태관리 + 알바생을 활용한 로컬 리워드 마케팅 B2B2C 웹앱

## 기술 스택
- **Frontend**: Next.js 14 (App Router) + Vercel
- **DB/Auth**: Supabase (PostgreSQL + RLS + Edge Functions)
- **외부 API**: Solapi (SMS), 토스페이먼츠
- **UI**: Tailwind CSS + shadcn/ui
- **상태관리**: Zustand + React Query

## 절대 제약
1. GPS/지도 API 금지 → 지역 텍스트 매칭만
2. POS 연동 금지 → QR 스캔 또는 버튼 클릭만
3. 자동 송금 금지 → DB 상태값 + 관리자 엑셀 다운로드
4. 포인트 0 또는 건수 도달 → 캠페인 자동 블라인드
5. 자정 미퇴근 → pg_cron 자동 퇴근 + 점주 SMS

## 디자인 시스템
- max-width: 390px (모바일 우선)
- 배경: #0A0A0F / 카드: #16161E
- 메인: #5B5BD6 / 민트: #00C896
- 텍스트: #F0F0F5 / 보조: #8888A0
- 폰트: Pretendard(한글) + Inter(숫자)

## 유저 플로우 (이미지 기반)
- 시작 → 로그인 → 서비스 이동 → 역할 선택
- **점주 대시보드**: 매장 생성/관리/직원관리/근무시간/급여 → 매장 정보 수정/QR 생성/SMS 발송
- **리워드 관리**: 포인트 충전/캠페인 관리/목록/상세 → 캠페인 수정/리워드 승인/QR 스캔
- **알바생 흐름**: QR 입력/캠페인 둘러보기/출근·퇴근 기록 → 홈타임 QR/알바 상세/포인트·출금 신청
- **관리자 대시보드**: 가입자 리스트/매장 리스트/출금 내역 → 상태 변경/엑셀 다운로드

## 완료된 Step
- [x] **Step 1**: Supabase 마이그레이션 SQL (`supabase/migrations/20260427000001_initial_schema.sql`)
- [x] **Step 2**: Next.js 14 세팅 + Tailwind + shadcn/ui 설치
- [x] **Step 3**: 로그인 화면
  - `src/app/(auth)/login/page.tsx`
  - `src/components/auth/LoginForm.tsx`
  - `src/app/(auth)/login/actions.ts`
- [x] **Step 4**: 알바생 메인 대시보드
  - `src/components/layout/BottomNav.tsx`
  - `src/components/worker/WorkerOnboarding.tsx`
  - `src/components/worker/WageCounter.tsx`
  - `src/app/(dashboard)/worker/page.tsx`
  - `src/app/(dashboard)/layout.tsx`

## 남은 Step
- [ ] **Step 5**: 점주 대시보드 + 리워드 승인 화면
- [ ] **Step 6**: QR 출퇴근 기능 (알바생 스캔 + 점주 QR 생성)
- [ ] **Step 7**: 캠페인 생성·탐색·홍보 QR
- [ ] **Step 8**: 토스페이먼츠 포인트 충전
- [ ] **Step 9**: 출금 신청 + pg_cron 자정 자동 퇴근
- [ ] **Step 10**: 관리자 페이지 (/admin)

## 알려진 버그 / 수정 사항
- layout.tsx에 globals.css import 누락 → 수정 필요
- LoginForm.tsx import 경로 수정 완료 (`./actions` → `@/app/(auth)/login/actions`)

## 핵심 DB 테이블
users / stores / store_members / schedules / work_logs / campaigns / reward_logs / store_points / point_charges / withdrawal_requests / notices

## 환경변수 (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co  ← 실제 값으로 교체 필요
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SOLAPI_API_KEY=your_solapi_api_key
SOLAPI_API_SECRET=your_solapi_api_secret
SOLAPI_SENDER_PHONE=your_sender_phone
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_toss_client_key
TOSS_SECRET_KEY=your_toss_secret_key
```
