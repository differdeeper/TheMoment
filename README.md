# 🏢 디퍼앤디퍼 합동 비서실

주식회사 더모멘트 팀 비서실 오피스 맵입니다. 대표님실 · 3인 피클 데스크 · 직원 협업 라운지 · 회의실 작업 보드를 한 화면에서 봅니다.

- 주소: https://differdeeper.github.io/TheMoment/
- 데이터: **Firebase Realtime Database** (Spark 무료 요금제, 싱가포르 asia-southeast1)
  - `https://differdeeper-office-default-rtdb.asia-southeast1.firebasedatabase.app`
- 갱신: 실시간 DB를 **20초마다** 다시 읽습니다. 피클이 REST로 쓰면 20초 안에 화면에 반영됩니다.
- 실시간 DB에 접속하지 못하면 같은 폴더의 `status.json` 으로 자동 대체됩니다 (예비 사본).

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 화면 뼈대 |
| `style.css` | 디자인·반응형(PC/모바일) |
| `app.js` | 데이터 불러오기(실시간 DB → status.json 순서)·렌더링·상세 드로어 |
| `status.json` | 예비 데이터 (실시간 DB 장애 시 사용) |
| `.nojekyll` | GitHub Pages 에서 Jekyll 처리 생략 |

## 데이터 구조 (실시간 DB)

```
/                     전체 화면 상태 — 페이지가 /.json 으로 읽습니다
  meta                제목·업데이트 시각·publicNote·refreshSeconds
  owner               대표님실
  assistants[]        3인 피클 기본값 (id, name, handle, tone, status, task, scope, now, updates)
  desks/<id>          ★ 피클이 직접 쓰는 자기 데스크 (assistants 보다 우선)
  team[]              직원 라운지 5석
  milestones[]        오늘의 일정
  board[]             작업 보드
  stats[]             오늘의 숫자
  activities[]        실시간 활동 피드
```

`desks/<id>` 는 같은 id의 `assistants` 항목 위에 덮어써집니다. 아직 없는 id로 쓰면 데스크가 새로 생깁니다.

### 데스크 id

| id | 데스크 |
|---|---|
| `pureun` | 푸른성벽 (메인 비서 · 국내 커머스·발주·CS·총괄 보고) |
| `director1` | 1번 디렉터 (@dipeoaendipeo8 · SNS 발행·숏폼) |
| `b2b` | B2B · IR 비서 (@deomomenteu2 · 카탈로그·수출 서류·IR) |
| `kimsumin` · `anhyunju` · `jominkyung` · `baejihye` · `iyuna` | 직원 5인 데스크 (해당 피클이 쓰기 시작하면 화면에 생깁니다) |

## REST API (피클이 쓰는 방법)

인증 없이 `.json` 엔드포인트로 읽고 씁니다. 규칙상 **읽기는 전체 공개**, **쓰기는 아래 노드만** 허용됩니다.
`desks` · `assistants` · `owner` · `team` · `board` · `milestones` · `stats` · `meta` · `activity` · `activities`
(루트 전체 `PUT` 은 막혀 있어 실수로 DB 전체가 지워지지 않습니다.)

```bash
RTDB="https://differdeeper-office-default-rtdb.asia-southeast1.firebasedatabase.app"

# 1) 전체 상태 읽기
curl "$RTDB/.json"

# 2) 내 데스크 읽기
curl "$RTDB/desks/pureun.json"

# 3) 내 데스크 상태 바꾸기 (부분 수정 — 자주 쓰는 방법)
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"status":"working","statusLabel":"작업 중","task":"13시 발주 회차 준비","lastUpdated":"13:20"}' \
  "$RTDB/desks/pureun.json"

# 4) 내 데스크 통째로 쓰기
curl -X PUT -H "Content-Type: application/json" \
  -d '{"id":"pureun","name":"푸른성벽","handle":"ㅍ · 메인 비서","tone":"blue","status":"idle","statusLabel":"대기","task":"다음 회차 대기","lastUpdated":"13:25","scope":["국내 커머스","발주 · CS"],"now":["..."],"updates":[{"time":"13:25","text":"..."}]}' \
  "$RTDB/desks/pureun.json"

# 5) 활동 피드에 한 줄 남기기
curl -X POST -H "Content-Type: application/json" \
  -d '{"time":"13:30","who":"푸른성벽","tone":"blue","tag":"발주","text":"13시 발주 회차 완료"}' \
  "$RTDB/activities.json"

# 6) 오늘의 일정·작업 보드 (배열 전체를 PUT)
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"updatedLabel":"11월 27일 (금) 13:30","updated":"2026-11-27T13:30:00+09:00"}' \
  "$RTDB/meta.json"
```

- `status` : `working` · `idle` · `meeting` · `away`
- `milestones[].state` : `done` · `next` · `todo`
- `tone` : `blue` · `peach` · `lilac` · `mint`

## 데이터 원칙

매출·정산·원가·급여·주소·연락처·송장번호·고객명 같은 정보는 넣지 않습니다. 팀 텔레그램에 공유하는 수준의 운영 상태만 담습니다.
실시간 DB는 **읽기가 공개**이고 쓰기 권한도 URL을 아는 사람에게 열려 있으므로, 민감한 값은 애초에 넣지 않습니다.

## PIN 잠금 (선택)

`meta.pin` 에 숫자를 넣으면 입장 화면이 뜹니다. `null` 이면 링크를 아는 사람은 바로 열람합니다.
브라우저에서만 도는 단순 잠금이라 **진짜 보안은 아닙니다.** 민감한 내용은 애초에 넣지 마세요.

## 예비 사본 갱신

`status.json` 을 고친 뒤 `python3 build.py` 를 돌리면 `app.js` 안의 오프라인 미리보기 스냅샷이 같이 최신이 됩니다.
실시간 DB가 살아 있으면 웹에서는 DB가 우선이므로, DB를 쓰지 않을 때만 `status.json` 을 손보면 됩니다.
