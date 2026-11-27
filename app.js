/* ============================================================
   디퍼앤디퍼 합동 비서실 · app.js
   status.json 을 30초마다 다시 읽어 화면을 갱신합니다.
   ============================================================ */
(function () {
  'use strict';

  /* FALLBACK:START — build.py 가 status.json 내용을 여기에 넣습니다.
     (http 로 열면 실제로는 쓰이지 않고, 파일을 직접 열었을 때만 쓰입니다) */
  var FALLBACK_STATUS = {
  "meta": {
    "title": "디퍼앤디퍼 합동 비서실",
    "subtitle": "DIFFER & DEEPER · THE MOMENT OFFICE",
    "updated": "2026-11-27T12:50:00+09:00",
    "updatedLabel": "11월 27일 (금) 12:50",
    "pin": null,
    "publicNote": "팀 공개 모드 · 매출·정산·원가·개인정보는 담지 않습니다.",
    "refreshSeconds": 30
  },
  "owner": {
    "id": "owner",
    "name": "조동균",
    "role": "COO · 대표",
    "status": "working",
    "statusLabel": "작업 지시 중",
    "line": "오늘도 현장 지시부터",
    "topGoal": {
      "title": "2027 Q1 스마트스토어 월 5,000만 원",
      "period": "2027.01 ~ 2027.03",
      "step": "1단계 · 상품명·혜택 노출 정비",
      "progress": 34,
      "steps": [
        "상품명 혜택 노출 정비 (진행 중)",
        "12월 네이버 트래픽·전환 확보",
        "쿠팡 로켓그로스 재고 회전",
        "월 5,000만 원 런레이트"
      ]
    },
    "memo": {
      "title": "오늘의 메모",
      "text": "자사몰 상품명은 현행 유지 → 12월에 한꺼번에 정리. 송장 등록·출고 정리는 12월 1일부터 비서가 맡는다.",
      "pinned": true
    },
    "today": [
      "쿠팡을 스스 기준에 맞춰 정렬하는 방향 검토",
      "미국 뷰티마스터 보도자료 초안 확인",
      "합동 비서실 페이지 1차 오픈 (팀 링크 공유)"
    ],
    "updates": [
      {
        "time": "12:50",
        "text": "합동 비서실 웹페이지 제작 지시 — 오피스 맵 스타일 선택"
      },
      {
        "time": "12:02",
        "text": "미국 뷰티마스터 입점 언론 기사 요청 (사진 포함)"
      },
      {
        "time": "10:21",
        "text": "송장 등록·출고 정리는 12월 1일부터 진행하도록 지시"
      }
    ]
  },
  "assistants": [
    {
      "id": "pureun",
      "name": "푸른성벽",
      "handle": "ㅍ · 메인 비서",
      "tone": "blue",
      "status": "working",
      "statusLabel": "작업 중",
      "task": "13시 로지비 발주 회차 준비 · 오늘 채널 정리 마무리",
      "lastUpdated": "12:50",
      "scope": [
        "국내 커머스",
        "발주 · CS",
        "매출 · 재고",
        "네이버 블로그",
        "쇼핑커넥트",
        "총괄 보고"
      ],
      "now": [
        "10시 발주서 8건 · 13개 완료 → 팀 텔레그램 공유",
        "다음 회차 13:00 — 사방넷 발주 변환 · CS"
      ],
      "updates": [
        {
          "time": "12:04",
          "text": "미국 뷰티마스터 입점 보도자료 초안 + 정품 연출컷 2장 전달"
        },
        {
          "time": "10:11",
          "text": "쿠팡 로켓그로스 3건 8박스 CJ 송장 등록 · 재조회 검증 완료"
        },
        {
          "time": "08:09",
          "text": "로켓그로스 8종 474개 입고서 제출 (12/1 도착 예정)"
        },
        {
          "time": "07:19",
          "text": "뷰티윈도(쇼핑윈도) 혜택 문구 30건 통일 완료"
        },
        {
          "time": "06:44",
          "text": "스스 2·3개 14건 판매 재개 + 재고 보충 6건 (판매중 66건)"
        },
        {
          "time": "04:54",
          "text": "네이버 블로그 발행 (비볼륨 2-Step) · 쇼핑커넥트 15명 제안"
        }
      ]
    },
    {
      "id": "director1",
      "name": "1번 디렉터",
      "handle": "@dipeoaendipeo8",
      "tone": "peach",
      "status": "idle",
      "statusLabel": "다음 회차 대기",
      "task": "13:00 SNS 발행 회차 예정 — 인스타 · 스레드 · X · 쇼츠 · 틱톡",
      "lastUpdated": "12:50",
      "scope": [
        "SNS 발행 09 · 13 · 19시",
        "숏폼 · 영상 제작",
        "한서연 포토 피드",
        "9:16 세이프존"
      ],
      "now": [
        "정기 루틴: 09시 · 13시 · 19시 SNS 발행",
        "숏폼·영상 제작은 이 데스크 전담"
      ],
      "updates": [
        {
          "time": "루틴",
          "text": "발행 결과·제작 진행은 디렉터가 이 파일에 직접 기록"
        }
      ]
    },
    {
      "id": "b2b",
      "name": "B2B · IR 비서",
      "handle": "@deomomenteu2",
      "tone": "lilac",
      "status": "idle",
      "statusLabel": "대기",
      "task": "B2B 세일즈 키트 · 수출 서류 대기 — 대표님 지시 시 착수",
      "lastUpdated": "12:50",
      "scope": [
        "B2B 세일즈 키트",
        "카탈로그",
        "해외 지원사업",
        "수출 서류",
        "IR 자료"
      ],
      "now": [
        "B2B 수출 응대는 대표님 직접 진행",
        "국·영문 카탈로그 · IR 피치덱 관리"
      ],
      "updates": [
        {
          "time": "루틴",
          "text": "카탈로그·서류 진행 상황은 이 데스크가 직접 기록"
        }
      ]
    }
  ],
  "team": [
    {
      "name": "김수민",
      "role": "BM 총괄 부장",
      "state": "협업",
      "doing": "브랜드·상품 기획 · IR 대응 협업"
    },
    {
      "name": "안현주",
      "role": "대표이사",
      "state": "협업",
      "doing": "경영 · 브랜드 총괄"
    },
    {
      "name": "조민경",
      "role": "운영 협업",
      "state": "대기",
      "doing": "공유된 업무 없음"
    },
    {
      "name": "배지혜",
      "role": "파트너십 · 톡딜 운영",
      "state": "협업",
      "doing": "톡딜 12/7 주차 3구좌 · 선정공지 대기"
    },
    {
      "name": "이유나",
      "role": "디자이너",
      "state": "협업",
      "doing": "썸네일 · 연출컷 · BI 시각 작업"
    }
  ],
  "milestones": [
    {
      "time": "06:00",
      "label": "웰컴키트 세그먼트 재확인",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "08:00",
      "label": "로지비 3PL 재고 점검",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "08:30",
      "label": "전일 매출 · 정산 보고",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "09:00",
      "label": "네이버 블로그 · 쇼핑커넥트",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "09:30",
      "label": "아마존 SIV · 쿠팡페이 점검",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "10:00",
      "label": "사방넷 발주 변환 · CS",
      "owner": "푸른성벽",
      "state": "done"
    },
    {
      "time": "13:00",
      "label": "사방넷 발주 변환 · CS",
      "owner": "푸른성벽",
      "state": "next"
    },
    {
      "time": "14:00",
      "label": "CS · 톡톡 답변",
      "owner": "푸른성벽",
      "state": "todo"
    },
    {
      "time": "15:00",
      "label": "톡딜 12/7 주차 선정공지 확인",
      "owner": "푸른성벽",
      "state": "todo"
    },
    {
      "time": "17:30",
      "label": "CS 마감 점검",
      "owner": "푸른성벽",
      "state": "todo"
    },
    {
      "time": "19:00",
      "label": "SNS 발행 회차",
      "owner": "1번 디렉터",
      "state": "todo"
    }
  ],
  "board": [
    {
      "title": "쿠팡 로켓그로스 재고 회전",
      "detail": "12/1 입고 8종 474개 도착 후 아이템위너·판매가 정렬",
      "owner": "푸른성벽",
      "state": "진행"
    },
    {
      "title": "11번가 슈팅배송 반출",
      "detail": "반출 접수 완료 · 12/1 예정 (30종)",
      "owner": "푸른성벽",
      "state": "대기"
    },
    {
      "title": "미국 뷰티마스터 입점 기사",
      "detail": "보도자료 초안 전달 · 매장명·시기 확정 필요",
      "owner": "푸른성벽",
      "state": "확인"
    },
    {
      "title": "쿠팡 판매 기준 정렬",
      "detail": "스스 최신 기준표 ↔ 쿠팡 윙 1:1 대조표 작성 예정",
      "owner": "푸른성벽",
      "state": "예정"
    }
  ],
  "stats": [
    {
      "label": "스스 판매중",
      "value": "66건",
      "hint": "2·3개 14건 재개 반영"
    },
    {
      "label": "혜택 태그 적용",
      "value": "44건",
      "hint": "스스 30 + 자사몰 14"
    },
    {
      "label": "뷰티윈도 문구",
      "value": "30건",
      "hint": "쇼핑윈도 전용 추가문구"
    },
    {
      "label": "로켓그로스 입고",
      "value": "474개",
      "hint": "8종 · 12/1 도착 예정"
    },
    {
      "label": "오늘 발주",
      "value": "8건",
      "hint": "13개 · 팀방 공유 완료"
    }
  ],
  "activities": [
    {
      "time": "12:50",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "오피스",
      "text": "합동 비서실 웹페이지 제작 착수 — 오피스 맵 스타일"
    },
    {
      "time": "12:04",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "보도자료",
      "text": "미국 뷰티마스터 입점 보도자료 초안 + 정품 연출컷 2장 전달"
    },
    {
      "time": "10:23",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "발주",
      "text": "10시 로지비 발주서(8건 · 13개) 팀 텔레그램 공유 완료"
    },
    {
      "time": "10:11",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "쿠팡",
      "text": "로켓그로스 3건 8박스 CJ 송장 등록 · 재조회 검증 완료"
    },
    {
      "time": "09:56",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "쿠팡",
      "text": "판매중 31종 검색어 정리 — 모공축소 표현 3종 정비"
    },
    {
      "time": "08:09",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "쿠팡",
      "text": "로켓그로스 8종 474개 입고서 제출 · 12/1 도착 예정"
    },
    {
      "time": "07:19",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "네이버",
      "text": "뷰티윈도 혜택 문구 30건 통일 · 실제 노출 확인"
    },
    {
      "time": "06:44",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "스스",
      "text": "2·3개 14건 판매 재개 + 재고 보충 6건 (판매중 66건)"
    },
    {
      "time": "06:35",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "스스",
      "text": "SOS 에스 키트 [알림받기 5,000원] 저장 · 노출 검증"
    },
    {
      "time": "05:18",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "물류",
      "text": "11번가 슈팅배송 반출 접수 확인 · 12/1 예정 (30종)"
    },
    {
      "time": "05:01",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "제휴",
      "text": "쇼핑커넥트 30% 캠페인 신규 15명 제안 발송"
    },
    {
      "time": "04:54",
      "who": "푸른성벽",
      "tone": "blue",
      "tag": "블로그",
      "text": "네이버 블로그 발행 — 비볼륨 2-Step, 사진 5장 · 링크카드 4종"
    }
  ]
};
  /* FALLBACK:END */

  var DEFAULT_REFRESH = 30;

  var TONES = {
    blue:  { c1: '#9cc0ff', c2: '#3f7cff' },
    peach: { c1: '#ffc7ad', c2: '#ff8f68' },
    lilac: { c1: '#c9beff', c2: '#8f7bff' },
    mint:  { c1: '#9ce6d4', c2: '#1fbf9c' }
  };

  var SEAT_TONES = [
    { c1: '#a9c8ff', c2: '#6f9dff' },
    { c1: '#ffd3a8', c2: '#ffa552' },
    { c1: '#b7e8d8', c2: '#4bc3a2' },
    { c1: '#d3c7ff', c2: '#9b86ff' },
    { c1: '#ffc5d4', c2: '#ff86ab' }
  ];

  var WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  var status = null;
  var lastLoaded = 0;
  var refreshMs = DEFAULT_REFRESH * 1000;
  var refreshTimer = null;
  var gated = false;
  var pinValue = '';

  function $(id) { return document.getElementById(id); }

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tone(name) { return TONES[name] || TONES.blue; }

  /* ---------------- 시계 (한국 시간 고정) ---------------- */
  function seoulParts() {
    var d = new Date(Date.now() + (new Date().getTimezoneOffset() + 540) * 60000);
    return {
      h: d.getUTCHours(),
      m: d.getUTCMinutes(),
      s: d.getUTCSeconds(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
      week: WEEK[d.getUTCDay()]
    };
  }

  function tickClock() {
    var p = seoulParts();
    var t = $('clockTime');
    var d = $('clockDate');
    if (t) t.textContent = pad(p.h) + ':' + pad(p.m) + ':' + pad(p.s);
    if (d) d.textContent = p.month + '월 ' + p.day + '일 (' + p.week + ')';
  }

  /* ---------------- 연결 상태 ---------------- */
  function setConn(mode, label) {
    var box = $('live');
    var text = $('connState');
    if (!box || !text) return;
    box.classList.remove('is-offline', 'is-loading');
    if (mode === 'offline') box.classList.add('is-offline');
    if (mode === 'loading') box.classList.add('is-loading');
    text.textContent = label;
  }

  /* ---------------- 렌더 ---------------- */
  function render() {
    if (!status) return;

    var meta = status.meta || {};
    var upd = $('updatedLabel');
    if (upd) upd.textContent = meta.updatedLabel || meta.updated || '—';

    var note = $('publicNote');
    if (note && meta.publicNote) note.textContent = meta.publicNote;

    if (meta.title) document.title = '🏢 ' + meta.title;

    renderOwner(status.owner || {});
    renderDesks(status.assistants || []);
    renderSeats(status.team || []);
    renderMilestones(status.milestones || []);
    renderBoard(status.board || []);
    renderStats(status.stats || []);
    renderFeed(status.activities || []);

    refreshMs = (Number(meta.refreshSeconds) || DEFAULT_REFRESH) * 1000;
    scheduleRefresh();
  }

  function renderOwner(owner) {
    var name = $('ownerName');
    if (name) name.textContent = (owner.name || '—') + (owner.role ? '' : '');

    var role = $('ownerRole');
    if (role) role.textContent = owner.role || '';

    var badge = $('ownerBadge');
    if (badge) {
      badge.dataset.s = owner.status || 'idle';
      badge.textContent = owner.statusLabel || '대기';
    }

    var goal = owner.topGoal || {};
    var gt = $('goalTitle');
    if (gt) gt.textContent = goal.title || '—';

    var bar = $('goalBar');
    if (bar) {
      var pct = Math.max(0, Math.min(100, Number(goal.progress) || 0));
      requestAnimationFrame(function () { bar.style.width = pct + '%'; });
    }

    var step = $('goalStep');
    if (step) {
      step.textContent = goal.step ? goal.step + (goal.period ? ' · ' + goal.period : '') : '';
    }

    var memo = owner.memo || {};
    var memoBox = $('ownerMemo');
    if (memoBox) {
      var mt = memoBox.querySelector('.memo-title');
      var mx = memoBox.querySelector('.memo-text');
      if (mt) mt.textContent = memo.title || '메모';
      if (mx) mx.textContent = memo.text || '';
    }
  }

  function critterHtml(toneName, state) {
    var c = tone(toneName);
    var zzz = state === 'idle' ? '<span class="zzz">z z</span>' : '';
    return '' +
      '<div class="critter" data-tone="' + esc(toneName) + '" data-status="' + esc(state) + '"' +
      ' style="--c1:' + c.c1 + ';--c2:' + c.c2 + '" aria-hidden="true">' +
        '<span class="c-shadow"></span>' +
        '<span class="c-ear c-ear--l"></span>' +
        '<span class="c-ear c-ear--r"></span>' +
        '<span class="c-body"></span>' +
        '<span class="c-face"><span class="c-eye"></span><span class="c-eye"></span><span class="c-mouth"></span></span>' +
        zzz +
      '</div>';
  }

  function renderDesks(list) {
    var box = $('desks');
    if (!box) return;

    box.innerHTML = list.map(function (a) {
      var c = tone(a.tone);
      return '' +
        '<button class="desk" type="button" data-id="' + esc(a.id) + '"' +
        ' data-status="' + esc(a.status) + '" style="--tone:' + c.c2 + '"' +
        ' aria-label="' + esc(a.name) + ' 상세 보기">' +
          '<div class="desk-top">' +
            critterHtml(a.tone, a.status) +
            '<div class="desk-id">' +
              '<p class="desk-name">' + esc(a.name) + '</p>' +
              '<span class="desk-handle">' + esc(a.handle) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="bubble">' + esc(a.task) + '</div>' +
          '<div class="desk-foot">' +
            '<span class="badge" data-s="' + esc(a.status) + '">' + esc(a.statusLabel) + '</span>' +
            '<span class="ago">' + esc(a.lastUpdated) + ' 기준</span>' +
          '</div>' +
        '</button>';
    }).join('');
  }

  function renderSeats(list) {
    var box = $('seats');
    if (!box) return;

    box.innerHTML = list.map(function (p, i) {
      var t = SEAT_TONES[i % SEAT_TONES.length];
      var initial = String(p.name || '?').charAt(0);
      return '' +
        '<li>' +
          '<button class="seat" type="button" data-id="team-' + i + '"' +
          ' aria-label="' + esc(p.name) + ' 상세 보기">' +
            '<span class="seat-ava" style="--c1:' + t.c1 + ';--c2:' + t.c2 + '" aria-hidden="true">' + esc(initial) + '</span>' +
            '<span class="seat-body">' +
              '<p class="seat-name">' + esc(p.name) + '</p>' +
              '<p class="seat-role">' + esc(p.role) + '</p>' +
              '<p class="seat-doing">' + esc(p.doing) + '</p>' +
            '</span>' +
            '<span class="seat-state" data-state="' + esc(p.state) + '">' + esc(p.state) + '</span>' +
          '</button>' +
        '</li>';
    }).join('');
  }

  function renderMilestones(list) {
    var box = $('milestones');
    if (!box) return;

    box.innerHTML = list.map(function (m) {
      return '' +
        '<div class="ms" data-state="' + esc(m.state) + '">' +
          '<span class="ms-time">' + esc(m.time) + '</span>' +
          '<span class="ms-dot"></span>' +
          '<span class="ms-label" title="' + esc(m.label) + '">' + esc(m.label) + '</span>' +
        '</div>';
    }).join('');
  }

  function renderBoard(list) {
    var box = $('board');
    if (!box) return;

    box.innerHTML = list.map(function (b) {
      return '' +
        '<div class="brd">' +
          '<span class="chip" data-state="' + esc(b.state) + '">' + esc(b.state) + '</span>' +
          '<div>' +
            '<p class="brd-title">' + esc(b.title) + '</p>' +
            '<p class="brd-detail">' + esc(b.detail) + '</p>' +
          '</div>' +
        '</div>';
    }).join('');
  }

  function renderStats(list) {
    var box = $('stats');
    if (!box) return;

    box.innerHTML = list.map(function (s) {
      return '' +
        '<div class="stat">' +
          '<p class="stat-label">' + esc(s.label) + '</p>' +
          '<p class="stat-value">' + esc(s.value) + '</p>' +
          '<p class="stat-hint">' + esc(s.hint) + '</p>' +
        '</div>';
    }).join('');
  }

  function renderFeed(list) {
    var box = $('feed');
    if (!box) return;

    box.innerHTML = list.map(function (f) {
      return '' +
        '<li class="feed-item">' +
          '<span class="feed-time">' + esc(f.time) + '</span>' +
          '<div>' +
            '<div class="feed-meta">' +
              '<span class="feed-who" data-tone="' + esc(f.tone) + '">' + esc(f.who) + '</span>' +
              (f.tag ? '<span class="feed-tag">' + esc(f.tag) + '</span>' : '') +
            '</div>' +
            '<p class="feed-text">' + esc(f.text) + '</p>' +
          '</div>' +
        '</li>';
    }).join('');

    var count = $('feedCount');
    if (count) count.textContent = list.length + '건';
  }

  /* ---------------- 상세 드로어 ---------------- */
  function drawerShell(title, sub, headExtra) {
    return '' +
      '<div class="dr-head">' + (headExtra || '') +
        '<div><h2 class="dr-title" id="drawerTitle">' + esc(title) + '</h2>' +
        '<p class="dr-sub">' + esc(sub) + '</p></div>' +
      '</div>';
  }

  function updatesList(updates) {
    if (!updates || !updates.length) return '';
    return '' +
      '<div class="dr-section"><p class="dr-label">최근 업데이트</p>' +
      '<ul class="dr-list">' +
        updates.map(function (u) {
          return '<li><time>' + esc(u.time) + '</time><span>' + esc(u.text) + '</span></li>';
        }).join('') +
      '</ul></div>';
  }

  function drawerHtml(id) {
    if (!status) return '';

    if (id === 'owner') {
      var o = status.owner || {};
      var g = o.topGoal || {};
      var steps = (g.steps || []).map(function (s, i) {
        return '<li><time>' + (i + 1) + '단계</time><span>' + esc(s) + '</span></li>';
      }).join('');

      return drawerShell(o.name + ' 대표님', o.role + ' · ' + (o.statusLabel || ''), '<div class="owner-ava">👔</div>') +
        '<div class="dr-section">' +
          '<p class="dr-label">오늘의 톱골</p>' +
          '<div class="dr-goal"><b>' + esc(g.title || '—') + '</b>' +
          '<span>' + esc(g.step || '') + (g.period ? ' · ' + esc(g.period) : '') + '</span></div>' +
        '</div>' +
        (steps ? '<div class="dr-section"><p class="dr-label">진행 단계</p><ul class="dr-list">' + steps + '</ul></div>' : '') +
        ((o.today || []).length ?
          '<div class="dr-section"><p class="dr-label">오늘 할 일</p><ul class="dr-list">' +
          o.today.map(function (t) { return '<li><time>·</time><span>' + esc(t) + '</span></li>'; }).join('') +
          '</ul></div>' : '') +
        (o.memo && o.memo.text ?
          '<div class="dr-section"><p class="dr-label">메모</p><div class="dr-card">' + esc(o.memo.text) + '</div></div>' : '') +
        updatesList(o.updates);
    }

    if (id === 'meeting') {
      var ms = (status.milestones || []).map(function (m) {
        return '<li><time>' + esc(m.time) + '</time><span>' + esc(m.label) +
          ' <span style="color:#a3b1c1;font-weight:600">· ' + esc(m.owner) + '</span></span></li>';
      }).join('');
      var bd = (status.board || []).map(function (b) {
        return '<li><time>' + esc(b.state) + '</time><span><b>' + esc(b.title) + '</b><br>' +
          '<span style="color:#7d8ea2;font-weight:600">' + esc(b.detail) + ' · ' + esc(b.owner) + '</span></span></li>';
      }).join('');

      return drawerShell('회의실 · 작업 보드', '오늘의 일정과 진행 중인 작업') +
        '<div class="dr-section"><p class="dr-label">오늘의 일정</p><ul class="dr-list">' + ms + '</ul></div>' +
        '<div class="dr-section"><p class="dr-label">진행 중 작업</p><ul class="dr-list">' + bd + '</ul></div>';
    }

    if (id.indexOf('team-') === 0) {
      var idx = Number(id.slice(5));
      var p = (status.team || [])[idx];
      if (!p) return '';
      return drawerShell(p.name, p.role, '<div class="owner-ava">👤</div>') +
        '<div class="dr-section"><p class="dr-label">협업 상태</p>' +
          '<div class="dr-card">' + esc(p.state) + ' · ' + esc(p.doing) + '</div></div>' +
        '<div class="dr-section"><p class="dr-label">안내</p>' +
          '<div class="dr-card">직원 좌석은 팀 텔레그램에 공유된 협업 정보만 표시합니다. ' +
          '급여·평가·개인 일정 같은 정보는 이 페이지에 담지 않습니다.</div></div>';
    }

    var a = null;
    (status.assistants || []).forEach(function (x) { if (x.id === id) a = x; });
    if (!a) return '';

    var scope = (a.scope || []).map(function (s) { return '<span class="dr-tag">' + esc(s) + '</span>'; }).join('');
    var now = (a.now || []).map(function (n) {
      return '<li><time>지금</time><span>' + esc(n) + '</span></li>';
    }).join('');

    return drawerShell(a.name, a.handle + ' · ' + a.statusLabel,
        critterHtml(a.tone, a.status)) +
      '<div class="dr-section"><p class="dr-label">지금 하는 일</p>' +
        '<div class="dr-card">' + esc(a.task) + '</div></div>' +
      (now ? '<div class="dr-section"><p class="dr-label">진행 상황</p><ul class="dr-list">' + now + '</ul></div>' : '') +
      (scope ? '<div class="dr-section"><p class="dr-label">담당 범위</p><div class="dr-tags">' + scope + '</div></div>' : '') +
      updatesList(a.updates) +
      '<div class="dr-section"><p class="dr-label">업데이트</p>' +
        '<div class="dr-card">' + esc(a.lastUpdated) + ' 기준 · 이 데스크의 상태는 담당 피클이 status.json에 직접 기록합니다.</div></div>';
  }

  function openDrawer(id) {
    var html = drawerHtml(id);
    if (!html) return;
    var body = $('drawerBody');
    var drawer = $('drawer');
    var scrim = $('scrim');
    if (!body || !drawer || !scrim) return;

    body.innerHTML = html;
    drawer.hidden = false;
    scrim.hidden = false;
    drawer.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    var close = $('drawerClose');
    if (close) close.focus();
  }

  function closeDrawer() {
    var drawer = $('drawer');
    var scrim = $('scrim');
    if (drawer) drawer.hidden = true;
    if (scrim) scrim.hidden = true;
    document.body.style.overflow = '';
  }

  /* ---------------- 데이터 로딩 ---------------- */
  function scheduleRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(function () { load(false); }, refreshMs);
  }

  function load(manual) {
    setConn('loading', '불러오는 중');
    var btn = $('refreshBtn');
    if (manual && btn) btn.classList.add('is-spinning');

    fetch('./status.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        status = data;
        lastLoaded = Date.now();
        render();
        setConn('live', '실시간 연결');
      })
      .catch(function () {
        if (!status && FALLBACK_STATUS) {
          status = FALLBACK_STATUS;
          render();
          setConn('offline', '오프라인 미리보기');
        } else if (status) {
          setConn('offline', '연결 지연 · 이전 데이터');
        } else {
          setConn('offline', 'status.json 없음');
        }
      })
      .then(function () {
        if (manual && btn) {
          setTimeout(function () { btn.classList.remove('is-spinning'); }, 500);
        }
      });
  }

  /* ---------------- PIN 게이트 ---------------- */
  function showApp() {
    var app = $('app');
    if (app) app.hidden = false;
    load(false);
  }

  function initGate() {
    var app = $('app');
    var gate = $('gate');
    if (!app || !gate) return;

    var pin = status && status.meta && status.meta.pin ? String(status.meta.pin) : '';
    pinValue = pin;

    if (!pin) { showApp(); return; }

    var ok = false;
    try { ok = sessionStorage.getItem('pickleOfficeOk') === '1'; } catch (e) { ok = false; }

    if (ok) { showApp(); return; }

    gated = true;
    gate.hidden = false;

    var form = $('gateForm');
    var input = $('gateInput');
    var err = $('gateError');

    if (input) setTimeout(function () { input.focus(); }, 150);

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input && input.value.trim() === pinValue) {
          try { sessionStorage.setItem('pickleOfficeOk', '1'); } catch (e2) { /* 무시 */ }
          gate.hidden = true;
          gated = false;
          showApp();
        } else if (err) {
          err.hidden = false;
          if (input) { input.value = ''; input.focus(); }
        }
      });
    }
  }

  /* ---------------- 시작 ---------------- */
  function boot() {
    tickClock();
    setInterval(tickClock, 1000);

    // 첫 데이터(잠금 여부 판단용) — 파일을 직접 열었으면 내장 스냅샷으로
    fetch('./status.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('x'); return r.json(); })
      .then(function (d) { status = d; lastLoaded = Date.now(); initGate(); })
      .catch(function () {
        status = FALLBACK_STATUS;
        initGate();
        if (status) setConn('offline', '오프라인 미리보기');
      });

    var refreshBtn = $('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', function () { load(true); });

    var close = $('drawerClose');
    if (close) close.addEventListener('click', closeDrawer);

    var scrim = $('scrim');
    if (scrim) scrim.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-id]');
      if (!target) return;
      var id = target.getAttribute('data-id');
      if (id) openDrawer(id);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var active = document.activeElement;
      if (!active || active.tagName === 'BUTTON') return;
      if (active.hasAttribute('data-id')) {
        e.preventDefault();
        openDrawer(active.getAttribute('data-id'));
      }
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastLoaded > refreshMs) load(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
