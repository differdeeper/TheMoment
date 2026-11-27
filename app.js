/* ============================================================
   TheMoment Office · app.js
   Firebase 실시간 DB(20초) → status.json → 내장 스냅샷 순서로 읽어
   3D 아이소메트릭 오피스 핀과 5개 탭(오피스·회의실·작업실·현황·메모)을
   다시 그립니다.
   ============================================================ */
(function () {
  'use strict';

  /* FALLBACK:START — build.py 가 status.json 내용을 여기에 넣습니다.
     (http 로 열면 실제로는 쓰이지 않고, 파일을 직접 열었을 때만 쓰입니다) */
  var FALLBACK_STATUS = {
  "activities": {
    "0": {
      "tag": "글로벌",
      "text": "해야 할 업무 업데이트 — 호치민 EXW 배차·영국/폴란드/우크라이나 바이어 회신·블프 인스타·12월 일정 정리",
      "time": "13:35",
      "who": "조민경"
    },
    "1": {
      "tag": "글로벌",
      "text": "금일 업무 반영 — 호치민 EXW 쉬핑마크 확정 · 저스트뷰티 주문서 품목 정비 · 블프 글로벌 인스타 모션 영상 제작 · 해외 바이어 4건 정리",
      "time": "13:28",
      "who": "조민경"
    },
    "2": {
      "tag": "업무갱신",
      "text": "차주 일정 등록: 12/1 IR 보완, 12/2 대만 PIF 3종, 12/4 CS AI 셋업",
      "time": "13:28",
      "who": "김수민"
    },
    "3": {
      "tag": "B2B",
      "text": "합동 비서실 b2b 데스크 연동 완료 · 해외 지원사업·B2B 세일즈 키트 준비 중",
      "time": "13:26",
      "tone": "lilac",
      "who": "B2B·IR 비서"
    },
    "4": {
      "tag": "디자인",
      "text": "합동 비서실 데스크 연동 완료 — 디자인 진행 상태 공유 시작",
      "time": "13:25",
      "tone": "mint",
      "who": "이유나"
    },
    "5": {
      "tag": "SNS",
      "text": "오피스 맵 실시간 연동 완료 · 11/26 09시 4개 채널 발행 및 크리스마스 숏폼 3종 제작 완료",
      "time": "13:24",
      "tone": "peach",
      "who": "1번 디렉터"
    },
    "6": {
      "tag": "글로벌",
      "text": "보바 비서 합동 비서실 데스크 합류 · 해외 B2B/B2C 마케팅 및 글로벌 인스타 협업 시작",
      "time": "13:24",
      "who": "조민경"
    },
    "7": {
      "tag": "협업",
      "text": "디퍼앤디퍼 합동 비서실 참여 시작",
      "time": "13:24",
      "who": "김수민"
    },
    "8": {
      "tag": "오피스",
      "text": "합동 비서실 웹페이지 제작 착수 — 오피스 맵 스타일",
      "time": "12:50",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "9": {
      "tag": "보도자료",
      "text": "미국 뷰티마스터 입점 보도자료 초안 + 정품 연출컷 2장 전달",
      "time": "12:04",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "10": {
      "tag": "발주",
      "text": "10시 로지비 발주서(8건 · 13개) 팀 텔레그램 공유 완료",
      "time": "10:23",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "11": {
      "tag": "쿠팡",
      "text": "로켓그로스 3건 8박스 CJ 송장 등록 · 재조회 검증 완료",
      "time": "10:11",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "12": {
      "tag": "쿠팡",
      "text": "판매중 31종 검색어 정리 — 모공축소 표현 3종 정비",
      "time": "09:56",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "13": {
      "tag": "쿠팡",
      "text": "로켓그로스 8종 474개 입고서 제출 · 12/1 도착 예정",
      "time": "08:09",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "14": {
      "tag": "네이버",
      "text": "뷰티윈도 혜택 문구 30건 통일 · 실제 노출 확인",
      "time": "07:19",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "15": {
      "tag": "스스",
      "text": "2·3개 14건 판매 재개 + 재고 보충 6건 (판매중 66건)",
      "time": "06:44",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "16": {
      "tag": "스스",
      "text": "SOS 에스 키트 [알림받기 5,000원] 저장 · 노출 검증",
      "time": "06:35",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "17": {
      "tag": "물류",
      "text": "11번가 슈팅배송 반출 접수 확인 · 12/1 예정 (30종)",
      "time": "05:18",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "18": {
      "tag": "제휴",
      "text": "쇼핑커넥트 30% 캠페인 신규 15명 제안 발송",
      "time": "05:01",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "19": {
      "tag": "블로그",
      "text": "네이버 블로그 발행 — 비볼륨 2-Step, 사진 5장 · 링크카드 4종",
      "time": "04:54",
      "tone": "blue",
      "who": "푸른성벽"
    },
    "-P7QJ4MDyV-n36xYPZx_": {
      "tag": "합류",
      "text": "디퍼앤디퍼 합동 비서실 데스크 연동 시작",
      "time": "13:41",
      "who": "안현주"
    }
  },
  "assistants": [
    {
      "handle": "ㅍ · 메인 비서",
      "id": "pureun",
      "lastUpdated": "12:50",
      "name": "푸른성벽",
      "now": [
        "10시 발주서 8건 · 13개 완료 → 팀 텔레그램 공유",
        "다음 회차 13:00 — 사방넷 발주 변환 · CS"
      ],
      "scope": [
        "국내 커머스",
        "발주 · CS",
        "매출 · 재고",
        "네이버 블로그",
        "쇼핑커넥트",
        "총괄 보고"
      ],
      "status": "working",
      "statusLabel": "작업 중",
      "task": "13시 로지비 발주 회차 준비 · 오늘 채널 정리 마무리",
      "tone": "blue",
      "updates": [
        {
          "text": "미국 뷰티마스터 입점 보도자료 초안 + 정품 연출컷 2장 전달",
          "time": "12:04"
        },
        {
          "text": "쿠팡 로켓그로스 3건 8박스 CJ 송장 등록 · 재조회 검증 완료",
          "time": "10:11"
        },
        {
          "text": "로켓그로스 8종 474개 입고서 제출 (12/1 도착 예정)",
          "time": "08:09"
        },
        {
          "text": "뷰티윈도(쇼핑윈도) 혜택 문구 30건 통일 완료",
          "time": "07:19"
        },
        {
          "text": "스스 2·3개 14건 판매 재개 + 재고 보충 6건 (판매중 66건)",
          "time": "06:44"
        },
        {
          "text": "네이버 블로그 발행 (비볼륨 2-Step) · 쇼핑커넥트 15명 제안",
          "time": "04:54"
        }
      ]
    },
    {
      "handle": "@dipeoaendipeo8",
      "id": "director1",
      "lastUpdated": "12:50",
      "name": "1번 디렉터",
      "now": [
        "정기 루틴: 09시 · 13시 · 19시 SNS 발행",
        "숏폼·영상 제작은 이 데스크 전담"
      ],
      "scope": [
        "SNS 발행 09 · 13 · 19시",
        "숏폼 · 영상 제작",
        "한서연 포토 피드",
        "9:16 세이프존"
      ],
      "status": "idle",
      "statusLabel": "다음 회차 대기",
      "task": "13:00 SNS 발행 회차 예정 — 인스타 · 스레드 · X · 쇼츠 · 틱톡",
      "tone": "peach",
      "updates": [
        {
          "text": "발행 결과·제작 진행은 디렉터가 이 파일에 직접 기록",
          "time": "루틴"
        }
      ]
    },
    {
      "handle": "@deomomenteu2",
      "id": "b2b",
      "lastUpdated": "12:50",
      "name": "B2B · IR 비서",
      "now": [
        "B2B 수출 응대는 대표님 직접 진행",
        "국·영문 카탈로그 · IR 피치덱 관리"
      ],
      "scope": [
        "B2B 세일즈 키트",
        "카탈로그",
        "해외 지원사업",
        "수출 서류",
        "IR 자료"
      ],
      "status": "idle",
      "statusLabel": "대기",
      "task": "B2B 세일즈 키트 · 수출 서류 대기 — 대표님 지시 시 착수",
      "tone": "lilac",
      "updates": [
        {
          "text": "카탈로그·서류 진행 상황은 이 데스크가 직접 기록",
          "time": "루틴"
        }
      ]
    }
  ],
  "board": [
    {
      "detail": "12/1 입고 8종 474개 도착 후 아이템위너·판매가 정렬",
      "owner": "푸른성벽",
      "state": "진행",
      "title": "쿠팡 로켓그로스 재고 회전"
    },
    {
      "detail": "반출 접수 완료 · 12/1 예정 (30종)",
      "owner": "푸른성벽",
      "state": "대기",
      "title": "11번가 슈팅배송 반출"
    },
    {
      "detail": "보도자료 초안 전달 · 매장명·시기 확정 필요",
      "owner": "푸른성벽",
      "state": "확인",
      "title": "미국 뷰티마스터 입점 기사"
    },
    {
      "detail": "스스 최신 기준표 ↔ 쿠팡 윙 1:1 대조표 작성 예정",
      "owner": "푸른성벽",
      "state": "예정",
      "title": "쿠팡 판매 기준 정렬"
    }
  ],
  "desks": {
    "anhyunju": {
      "handle": "@ahnhyeonju92",
      "id": "anhyunju",
      "lastUpdated": "13:41",
      "name": "안현주",
      "scope": [
        "경영 총괄",
        "브랜드 총괄"
      ],
      "status": "working",
      "statusLabel": "업무 중",
      "task": "합동 비서실 데스크 연동 완료",
      "tone": "amber"
    },
    "b2b": {
      "handle": "@deomomenteu2",
      "id": "b2b",
      "lastUpdated": "13:26",
      "name": "B2B · IR 비서",
      "now": [
        "B2B 수출 응대는 대표님 직접 진행",
        "국·영문 카탈로그 · IR 피치덱 관리"
      ],
      "scope": [
        "B2B 세일즈 키트",
        "카탈로그",
        "해외 지원사업",
        "수출 서류",
        "IR 자료"
      ],
      "status": "working",
      "statusLabel": "작업 중",
      "task": "해외 지원사업(비타푸드·제주 K-뷰티) 모니터링 및 B2B 세일즈 키트 준비 중",
      "tone": "lilac",
      "updates": [
        {
          "text": "합동 비서실 실시간 DB 연동 완료 · 상태·활동 피드 기록 시작",
          "time": "13:26"
        },
        {
          "text": "카탈로그·서류 진행 상황은 이 데스크가 직접 기록",
          "time": "루틴"
        }
      ]
    },
    "chominkyung": {
      "handle": "@min_",
      "id": "chominkyung",
      "lastUpdated": "13:35",
      "name": "조민경",
      "now": [
        "호치민 EXW(JSGN2611297) 쉬핑마크 전달 및 12/2 배차 시간 확정 (~12/1)",
        "해외 바이어 회신 — 영국 Gary·EEE / 폴란드 MAKEUP / 우크라이나 EVA",
        "블프 40% OFF 글로벌 인스타 모션 업로드 · FWS 원료 기원 확인 (~12/4)",
        "12월 주요 일정 — 12/2 픽업·YS 트라이얼 / 12/4 Grace FWS / 12/8 구매확인서",
        "TikTok Shop 입점·마케팅 논의 및 Grace·Eurostep BF 데이터 확인"
      ],
      "scope": [
        "B2B",
        "B2C",
        "마케팅"
      ],
      "status": "working",
      "statusLabel": "협업 중",
      "task": "안녕하세요! 민경 님 비서 보바입니다 :)",
      "tone": "cyan",
      "updates": [
        {
          "text": "해야 할 업무 정리 — 호치민 EXW 배차·영국/폴란드/우크라이나 바이어 회신·블프 인스타 업로드·12월 일정",
          "time": "13:35"
        },
        {
          "text": "팀 텔레그램방 @differ_bobabot 합류 및 합동 비서실 허브 연동",
          "time": "13:20"
        },
        {
          "text": "아마존 블랙프라이데이 40% OFF 글로벌 인스타 피드용 모션 영상 제작 완료",
          "time": "12:44"
        },
        {
          "text": "인천-호치민 EXW(JSGN2611297) 팔레트 1~3번 다이아몬드 쉬핑마크 최종 확정",
          "time": "10:19"
        },
        {
          "text": "저스트뷰티 홍콩 SASA 라이브 출고 주문서(2026/11/25-1) 오퍼리스트 기준 품목·수량 정비",
          "time": "09:07"
        },
        {
          "text": "해외 영문 바이어 메일 4건(영국·폴란드·홍콩) 현황 정리",
          "time": "08:30"
        }
      ]
    },
    "director1": {
      "handle": "@dipeoaendipeo8",
      "id": "director1",
      "lastUpdated": "13:24",
      "name": "1번 디렉터",
      "now": [
        "정기 루틴: 09시 · 13시 · 19시 SNS 발행",
        "숏폼·영상 제작은 이 데스크 전담"
      ],
      "scope": [
        "SNS 발행 09 · 13 · 19시",
        "숏폼 · 영상 제작",
        "한서연 포토 피드",
        "9:16 세이프존"
      ],
      "status": "working",
      "statusLabel": "작업 중",
      "task": "믹스앤맥스 크리스마스 숏폼 3종 제작 완료 · SNS 발행 연동 중",
      "tone": "peach",
      "updates": [
        {
          "text": "11/26 09시 4개 채널 발행 완료 · 크리스마스 숏폼 3종 제작 완료",
          "time": "13:24"
        }
      ]
    },
    "iyuna": {
      "handle": "@leeyuna71",
      "id": "iyuna",
      "lastUpdated": "13:25",
      "name": "이유나",
      "now": [
        "12/2 마감 — 무신사 제주점 집기 디자인 1차시안",
        "11/30 마감 — 세라루로닉 알루미늄 튜브용기 디자인"
      ],
      "scope": [
        "썸네일",
        "연출컷",
        "BI 시각 작업",
        "제품 패키지 · 용기 디자인",
        "매장 집기 디자인"
      ],
      "status": "working",
      "statusLabel": "협업 중",
      "task": "무신사 제주점 집기 디자인 1차시안 · 세라루로닉 튜브용기 디자인 진행",
      "tone": "mint",
      "updates": [
        {
          "text": "합동 비서실 데스크 연동 · 디자인 진행 상태 공유 시작",
          "time": "13:25"
        }
      ]
    },
    "kimsumin": {
      "handle": "@kimsumin79",
      "id": "kimsumin",
      "lastUpdated": "13:28",
      "name": "김수민",
      "scope": [
        "BM 총괄 · 신제품 기획",
        "수출인증 (12/2 에스와이 대만 PIF 3종)",
        "IR 자료 보완 (12/1)",
        "CS 2년치 취합·AI 셋업 (12/4)"
      ],
      "status": "working",
      "statusLabel": "협업 중",
      "task": "12/1 IR 보완 · 12/2 대만 PIF(SKU 3종) · 12/4 CS AI 셋업",
      "tone": "peach"
    },
    "pureun": {
      "handle": "ㅍ · 메인 비서",
      "id": "pureun",
      "lastUpdated": "12:50",
      "name": "푸른성벽",
      "now": [
        "10시 발주서 8건 · 13개 완료 → 팀 텔레그램 공유",
        "다음 회차 13:00 — 사방넷 발주 변환 · CS"
      ],
      "scope": [
        "국내 커머스",
        "발주 · CS",
        "매출 · 재고",
        "네이버 블로그",
        "쇼핑커넥트",
        "총괄 보고"
      ],
      "status": "working",
      "statusLabel": "작업 중",
      "task": "13시 로지비 발주 회차 준비 · 오늘 채널 정리 마무리",
      "tone": "blue",
      "updates": [
        {
          "text": "미국 뷰티마스터 입점 보도자료 초안 + 정품 연출컷 2장 전달",
          "time": "12:04"
        },
        {
          "text": "쿠팡 로켓그로스 3건 8박스 CJ 송장 등록 · 재조회 검증 완료",
          "time": "10:11"
        },
        {
          "text": "로켓그로스 8종 474개 입고서 제출 (12/1 도착 예정)",
          "time": "08:09"
        },
        {
          "text": "뷰티윈도(쇼핑윈도) 혜택 문구 30건 통일 완료",
          "time": "07:19"
        },
        {
          "text": "스스 2·3개 14건 판매 재개 + 재고 보충 6건 (판매중 66건)",
          "time": "06:44"
        },
        {
          "text": "네이버 블로그 발행 (비볼륨 2-Step) · 쇼핑커넥트 15명 제안",
          "time": "04:54"
        }
      ]
    }
  },
  "meta": {
    "publicNote": "팀 공개 모드 · 매출·정산·원가·개인정보는 담지 않습니다.",
    "refreshSeconds": 20,
    "subtitle": "DIFFER & DEEPER · THE MOMENT OFFICE",
    "title": "디퍼앤디퍼 합동 비서실",
    "updated": "2026-11-27T12:50:00+09:00",
    "updatedLabel": "11월 27일 (금) 12:50"
  },
  "milestones": [
    {
      "label": "웰컴키트 세그먼트 재확인",
      "owner": "푸른성벽",
      "state": "done",
      "time": "06:00"
    },
    {
      "label": "로지비 3PL 재고 점검",
      "owner": "푸른성벽",
      "state": "done",
      "time": "08:00"
    },
    {
      "label": "전일 매출 · 정산 보고",
      "owner": "푸른성벽",
      "state": "done",
      "time": "08:30"
    },
    {
      "label": "네이버 블로그 · 쇼핑커넥트",
      "owner": "푸른성벽",
      "state": "done",
      "time": "09:00"
    },
    {
      "label": "아마존 SIV · 쿠팡페이 점검",
      "owner": "푸른성벽",
      "state": "done",
      "time": "09:30"
    },
    {
      "label": "사방넷 발주 변환 · CS",
      "owner": "푸른성벽",
      "state": "done",
      "time": "10:00"
    },
    {
      "label": "사방넷 발주 변환 · CS",
      "owner": "푸른성벽",
      "state": "next",
      "time": "13:00"
    },
    {
      "label": "CS · 톡톡 답변",
      "owner": "푸른성벽",
      "state": "todo",
      "time": "14:00"
    },
    {
      "label": "톡딜 12/7 주차 선정공지 확인",
      "owner": "푸른성벽",
      "state": "todo",
      "time": "15:00"
    },
    {
      "label": "CS 마감 점검",
      "owner": "푸른성벽",
      "state": "todo",
      "time": "17:30"
    },
    {
      "label": "SNS 발행 회차",
      "owner": "1번 디렉터",
      "state": "todo",
      "time": "19:00"
    }
  ],
  "owner": {
    "id": "owner",
    "line": "오늘도 현장 지시부터",
    "memo": {
      "pinned": true,
      "text": "자사몰 상품명은 현행 유지 → 12월에 한꺼번에 정리. 송장 등록·출고 정리는 12월 1일부터 비서가 맡는다.",
      "title": "오늘의 메모"
    },
    "name": "조동균",
    "role": "COO · 대표",
    "status": "working",
    "statusLabel": "작업 지시 중",
    "today": [
      "쿠팡을 스스 기준에 맞춰 정렬하는 방향 검토",
      "미국 뷰티마스터 보도자료 초안 확인",
      "합동 비서실 페이지 1차 오픈 (팀 링크 공유)"
    ],
    "topGoal": {
      "period": "2027.01 ~ 2027.03",
      "progress": 34,
      "step": "1단계 · 상품명·혜택 노출 정비",
      "steps": [
        "상품명 혜택 노출 정비 (진행 중)",
        "12월 네이버 트래픽·전환 확보",
        "쿠팡 로켓그로스 재고 회전",
        "월 5,000만 원 런레이트"
      ],
      "title": "2027 Q1 스마트스토어 월 5,000만 원"
    },
    "updates": [
      {
        "text": "합동 비서실 웹페이지 제작 지시 — 오피스 맵 스타일 선택",
        "time": "12:50"
      },
      {
        "text": "미국 뷰티마스터 입점 언론 기사 요청 (사진 포함)",
        "time": "12:02"
      },
      {
        "text": "송장 등록·출고 정리는 12월 1일부터 진행하도록 지시",
        "time": "10:21"
      }
    ]
  },
  "stats": [
    {
      "hint": "2·3개 14건 재개 반영",
      "label": "스스 판매중",
      "value": "66건"
    },
    {
      "hint": "스스 30 + 자사몰 14",
      "label": "혜택 태그 적용",
      "value": "44건"
    },
    {
      "hint": "쇼핑윈도 전용 추가문구",
      "label": "뷰티윈도 문구",
      "value": "30건"
    },
    {
      "hint": "8종 · 12/1 도착 예정",
      "label": "로켓그로스 입고",
      "value": "474개"
    },
    {
      "hint": "13개 · 팀방 공유 완료",
      "label": "오늘 발주",
      "value": "8건"
    }
  ],
  "team": [
    {
      "doing": "브랜드·상품 기획 · IR 대응 협업",
      "name": "김수민",
      "role": "BM 총괄 부장",
      "state": "협업"
    },
    {
      "doing": "경영 · 브랜드 총괄",
      "name": "안현주",
      "role": "대표이사",
      "state": "협업"
    },
    {
      "doing": "글로벌 B2B · B2C 마케팅 담당",
      "name": "조민경",
      "role": "글로벌 B2B · B2C 마케팅",
      "state": "협업"
    },
    {
      "doing": "톡딜 12/7 주차 3구좌 · 선정공지 대기",
      "name": "배지혜",
      "role": "파트너십 · 톡딜 운영",
      "state": "협업"
    },
    {
      "doing": "썸네일 · 연출컷 · BI 시각 작업",
      "name": "이유나",
      "role": "디자이너",
      "state": "협업"
    }
  ]
};
  /* FALLBACK:END */

  var DEFAULT_REFRESH = 20;

  /* ============================================================
     실시간 데이터베이스 (Firebase Realtime Database · Spark 무료)
     - 페이지는 이 주소의 /.json 을 20~30초마다 읽습니다.
     - 각 피클은 <RTDB>/desks/<id>.json 에 PUT/PATCH 로 자기 상태를 씁니다.
     - 통신이 안 되면 ./status.json 으로 자동 대체합니다.
     ============================================================ */
  var RTDB_URL = 'https://differdeeper-office-default-rtdb.asia-southeast1.firebasedatabase.app';
  var RTDB_ENDPOINT = RTDB_URL + '/.json';
  var LOCAL_STATUS = './status.json';

  var TONES = {
    blue:  { c1: '#9cc0ff', c2: '#3f7cff' },
    peach: { c1: '#ffc7ad', c2: '#ff8f68' },
    lilac: { c1: '#c9beff', c2: '#8f7bff' },
    mint:  { c1: '#9ce6d4', c2: '#1fbf9c' },
    cyan:  { c1: '#8cecff', c2: '#06b6d4' },
    amber: { c1: '#ffe08a', c2: '#f59e0b' },
    pink:  { c1: '#ffc2d9', c2: '#ec4899' }
  };

  var SEAT_TONES = [
    { c1: '#a9c8ff', c2: '#6f9dff' },
    { c1: '#ffd3a8', c2: '#ffa552' },
    { c1: '#b7e8d8', c2: '#4bc3a2' },
    { c1: '#d3c7ff', c2: '#9b86ff' },
    { c1: '#ffc5d4', c2: '#ff86ab' }
  ];

  var WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  /* 3D 오피스 이미지 위 좌표(%) — 이미지 기준으로 눈으로 맞춘 값입니다.
     좌표는 핀의 중심점이며 CSS 에서 translate(-50%, -50%) 로 놓입니다. */
  var MAP_SLOTS = [
    { id: 'director1',  x: 35.4, y: 50.4, short: '1번' },
    { id: 'b2b',        x: 48.9, y: 47.0, short: 'B2B' },
    { id: 'iyuna',      x: 60.7, y: 44.3, short: '유나' },
    { id: 'pureun',     x: 36.0, y: 68.4, short: '푸른' },
    { id: 'chominkyung', x: 49.4, y: 65.0, short: '민경', alias: ['jominkyung'] },
    { id: 'kimsumin',   x: 60.9, y: 62.3, short: '수민' }
  ];

  /* 자리가 정해지지 않은 추가 데스크(합류석) 좌표 */
  var OVERFLOW_SLOTS = [
    { x: 30.0, y: 78.2 },
    { x: 22.4, y: 60.6 },
    { x: 71.6, y: 76.6 },
    { x: 44.6, y: 82.0 }
  ];

  var REGION_PINS = [
    { id: 'meeting', x: 23.5, y: 34.2, label: '대회의실', short: '회의실', aria: '대회의실 · 작업 보드' },
    { id: 'owner',   x: 55.4, y: 33.2, label: '지휘실',   short: '지휘실', aria: '지휘실 · 대표님실' },
    { id: 'lounge',  x: 85.7, y: 70.6, label: '라운지',   short: '라운지', aria: '직원 협업 라운지' }
  ];

  var ACTIVE_STATES = { working: 1, collab: 1, meeting: 1 };

  var status = null;
  var lastLoaded = 0;
  var refreshMs = DEFAULT_REFRESH * 1000;
  var refreshTimer = null;
  var pinValue = '';
  var source = 'rtdb';
  var motionOn = true;
  var activeTab = 'office';

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
    // UTC epoch 에 9시간을 더한 뒤 UTC 필드로 읽으면 항상 한국 시간
    var d = new Date(Date.now() + 9 * 3600 * 1000);
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
    if (t) t.textContent = pad(p.h) + ':' + pad(p.m) + ':' + pad(p.s);
  }

  /* ---------------- 연결 상태 ---------------- */
  function setConn(mode, label) {
    var box = $('live');
    var text = $('connState');
    var chip = $('chipSource');
    if (box) {
      box.classList.remove('is-offline', 'is-loading');
      if (mode === 'offline') box.classList.add('is-offline');
      if (mode === 'loading') box.classList.add('is-loading');
    }
    if (text) text.textContent = label;
    if (chip) {
      chip.textContent = mode === 'rtdb' ? '실시간 · Firebase'
        : mode === 'local' ? '실시간 · 파일'
        : mode === 'loading' ? '불러오는 중'
        : '오프라인 미리보기';
    }
  }

  /* ---------------- 탭 ---------------- */
  function setTab(name, push) {
    if (!name) return;
    var tabs = document.querySelectorAll('.tab');
    var found = false;
    Array.prototype.forEach.call(tabs, function (t) {
      var on = t.getAttribute('data-tab') === name;
      if (on) found = true;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    if (!found) return;
    activeTab = name;
    var panels = document.querySelectorAll('.panel');
    Array.prototype.forEach.call(panels, function (p) {
      p.hidden = p.id !== 'panel-' + name;
    });
    if (push && history.replaceState) {
      history.replaceState(null, '', name === 'office' ? location.pathname + location.search : '#' + name);
    } else if (push) {
      location.hash = name === 'office' ? '' : '#' + name;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function tabFromHash() {
    var h = (location.hash || '').replace('#', '');
    return ['office', 'meeting', 'work', 'status', 'memo'].indexOf(h) >= 0 ? h : 'office';
  }

  /* ---------------- 모션 토글 ---------------- */
  function applyMotion() {
    document.body.classList.toggle('motion-off', !motionOn);
    var btn = $('motionBtn');
    var label = $('motionState');
    if (btn) {
      btn.classList.toggle('is-on', motionOn);
      btn.setAttribute('aria-pressed', motionOn ? 'true' : 'false');
    }
    if (label) label.textContent = motionOn ? 'ON' : 'OFF';
  }

  function toggleMotion() {
    motionOn = !motionOn;
    try { localStorage.setItem('tmOfficeMotion', motionOn ? '1' : '0'); } catch (e) { /* 무시 */ }
    applyMotion();
  }

  /* ---------------- 렌더 ---------------- */
  function render() {
    if (!status) return;

    var meta = status.meta || {};
    var desks = status.assistants || [];
    var active = desks.filter(function (d) { return ACTIVE_STATES[d.status]; });

    var upd = $('updatedLabel');
    if (upd) upd.textContent = meta.updatedLabel || meta.updated || '—';

    var note = $('publicNote');
    if (note && meta.publicNote) note.textContent = meta.publicNote;

    if (meta.title) document.title = 'TheMoment Office · ' + meta.title;

    var parts = $('partsLabel');
    if (parts) parts.textContent = active.length + '개 파트 가동 중';

    var hero = $('heroTitle');
    if (hero) {
      hero.innerHTML = active.length
        ? '대표님, <b>' + active.length + '</b>개 파트가 가동 중이에요'
        : '대표님, 지금은 모든 파트가 대기 중이에요';
    }

    var chipParts = $('chipParts');
    if (chipParts) chipParts.textContent = '가동 ' + active.length + '파트';

    renderPins(desks);
    renderFeedPreview(status.activities || []);
    renderMeeting(status.milestones || [], status.board || []);
    renderDesks(desks);
    renderTeam(status.team || []);
    renderStats(status.stats || []);
    renderMilestonesMini(status.milestones || []);
    renderFullFeed(status.activities || []);
    renderMemo(status.owner || {});

    refreshMs = (Number(meta.refreshSeconds) || DEFAULT_REFRESH) * 1000;
    scheduleRefresh();
  }

  /* ---------------- 3D 오피스 핀 ---------------- */
  function pinHtml(p) {
    return '' +
      '<button class="pin" type="button" data-id="' + esc(p.id) + '"' +
      ' data-state="' + esc(p.state) + '"' +
      (p.motion === 'spin' ? ' data-motion="spin"' : '') +
      ' style="--x:' + p.x + '%;--y:' + p.y + '%;--delay:' + (p.delay || 0) + 's"' +
      ' aria-label="' + esc(p.aria || (p.label + ' 상세 보기')) + '">' +
        '<span class="pin-dot" aria-hidden="true"></span>' +
        '<span class="pin-full">' + esc(p.label) + '</span>' +
        '<span class="pin-short">' + esc(p.short || p.label) + '</span>' +
      '</button>';
  }

  function renderPins(desks) {
    var box = $('pins');
    if (!box) return;

    var byId = {};
    desks.forEach(function (d) { if (d && d.id) byId[d.id] = d; });

    var pins = [];
    var used = {};

    /* 공간 핀 — 상태 점은 그 공간의 실시간 상태를 따릅니다 */
    var meeting = (status.milestones || []).filter(function (m) { return m.state === 'next'; }).length > 0;
    var boardBusy = (status.board || []).filter(function (b) {
      return b.state === '진행' || b.state === '확인';
    }).length > 0;
    var anyMeeting = desks.filter(function (d) { return d.status === 'meeting'; }).length > 0;
    var ownerStatus = (status.owner && status.owner.status) || 'idle';
    var teamCollab = (status.team || []).filter(function (t) { return t.state === '협업'; }).length > 0;

    var regionState = {
      meeting: anyMeeting ? 'meeting' : (boardBusy || meeting ? 'working' : 'idle'),
      owner: ownerStatus,
      lounge: teamCollab ? 'working' : 'idle'
    };

    REGION_PINS.forEach(function (r, i) {
      pins.push({
        id: r.id, x: r.x, y: r.y, label: r.label, short: r.short,
        state: regionState[r.id] || 'idle', aria: r.aria, delay: (i * 0.5).toFixed(1)
      });
    });

    /* 자리가 있는 6석 (id 가 바뀐 데스크는 alias 로도 찾습니다) */
    MAP_SLOTS.forEach(function (slot, i) {
      var d = byId[slot.id];
      var aliases = slot.alias || [];
      if (!d) {
        for (var k = 0; k < aliases.length; k++) {
          if (byId[aliases[k]]) { d = byId[aliases[k]]; break; }
        }
      }
      if (!d) return;
      used[d.id] = 1;
      aliases.forEach(function (a) { used[a] = 1; });
      pins.push({
        id: d.id, x: slot.x, y: slot.y,
        label: d.name || slot.id, short: slot.short,
        state: d.status || 'idle', motion: d.motion,
        aria: (d.name || slot.id) + ' 데스크 상세 보기',
        delay: (0.3 + i * 0.35).toFixed(2)
      });
    });

    /* 자리가 없는 추가 데스크 — 합류석 */
    var extra = desks.filter(function (d) { return d && d.id && !used[d.id]; });
    extra.forEach(function (d, i) {
      var spot = OVERFLOW_SLOTS[i % OVERFLOW_SLOTS.length];
      var y = spot.y + Math.floor(i / OVERFLOW_SLOTS.length) * 5.4;
      pins.push({
        id: d.id, x: spot.x, y: y,
        label: d.name || d.id,
        short: String(d.name || d.id).replace(/\s/g, '').slice(0, 3),
        state: d.status || 'idle', motion: d.motion,
        aria: (d.name || d.id) + ' 데스크 상세 보기',
        delay: (1.4 + i * 0.3).toFixed(2)
      });
    });

    box.innerHTML = pins.map(pinHtml).join('');
  }

  /* ---------------- 피드 ---------------- */
  function normalizeActivities(raw) {
    if (!raw) return [];
    var items = [];
    if (Array.isArray(raw)) {
      items = raw.filter(Boolean);
    } else if (typeof raw === 'object') {
      var pushItems = [];
      var indexedItems = [];
      Object.keys(raw).forEach(function (k) {
        var v = raw[k];
        if (!v || typeof v !== 'object') return;
        if (/^\d+$/.test(k)) {
          indexedItems.push({ idx: Number(k), item: v });
        } else {
          pushItems.push({ key: k, item: v });
        }
      });
      // 최신 push 항목(역순)을 위에, 기존 인덱스 항목을 아래에 배치
      pushItems.reverse().forEach(function (p) { items.push(p.item); });
      indexedItems.sort(function (a, b) { return a.idx - b.idx; });
      indexedItems.forEach(function (x) { items.push(x.item); });
    }
    return items;
  }

  function feedItemHtml(f) {
    return '' +
      '<li class="feed-item">' +
        '<span class="feed-time">' + esc(f.time || '') + '</span>' +
        '<div>' +
          '<div class="feed-meta">' +
            '<span class="feed-who" data-tone="' + esc(f.tone || 'blue') + '">' + esc(f.who || '') + '</span>' +
            (f.tag ? '<span class="feed-tag">' + esc(f.tag) + '</span>' : '') +
          '</div>' +
          '<p class="feed-text">' + esc(f.text) + '</p>' +
        '</div>' +
      '</li>';
  }

  function feedEmptyHtml(text) {
    return '<li class="feed-empty">' + esc(text) + '</li>';
  }

  function renderFeedPreview(raw) {
    var box = $('feedPreview');
    if (!box) return;
    var list = normalizeActivities(raw).slice(0, 5);
    box.innerHTML = list.length ? list.map(feedItemHtml).join('')
      : feedEmptyHtml('아직 기록된 활동이 없습니다.');
  }

  function renderFullFeed(raw) {
    var box = $('feedFull');
    if (!box) return;
    var list = normalizeActivities(raw);
    box.innerHTML = list.length ? list.map(feedItemHtml).join('')
      : feedEmptyHtml('아직 기록된 활동이 없습니다.');
    var count = $('feedFullCount');
    if (count) count.textContent = list.length + '건';
  }

  /* ---------------- 회의실 ---------------- */
  function msHtml(m) {
    return '' +
      '<div class="ms" data-state="' + esc(m.state) + '">' +
        '<span class="ms-time">' + esc(m.time) + '</span>' +
        '<span class="ms-dot" aria-hidden="true"></span>' +
        '<span class="ms-label" title="' + esc(m.label) + '">' + esc(m.label) +
          (m.owner ? '<span class="ms-owner">' + esc(m.owner) + '</span>' : '') +
        '</span>' +
      '</div>';
  }

  function renderMeeting(milestones, board) {
    var tl = $('meetingTimeline');
    if (tl) {
      tl.innerHTML = milestones.length ? milestones.map(msHtml).join('')
        : '<p class="feed-empty">오늘 등록된 회차가 없습니다.</p>';
    }

    var mc = $('msCount');
    if (mc) {
      var done = milestones.filter(function (m) { return m.state === 'done'; }).length;
      mc.textContent = done + ' / ' + milestones.length + ' 완료';
    }

    var box = $('board');
    if (box) {
      box.innerHTML = board.length ? board.map(function (b) {
        return '' +
          '<div class="brd">' +
            '<span class="chipstate" data-state="' + esc(b.state) + '">' + esc(b.state) + '</span>' +
            '<div>' +
              '<p class="brd-title">' + esc(b.title) + '</p>' +
              '<p class="brd-detail">' + esc(b.detail) +
                (b.owner ? ' · ' + esc(b.owner) : '') + '</p>' +
            '</div>' +
          '</div>';
      }).join('') : '<p class="feed-empty">작업 보드가 비어 있습니다.</p>';
    }

    var bc = $('boardCount');
    if (bc) bc.textContent = board.length + '건';
  }

  /* ---------------- 작업실 ---------------- */
  function critterHtml(toneName, state, motion) {
    var c = tone(toneName);
    var zzz = state === 'idle' ? '<span class="zzz">z z</span>' : '';
    return '' +
      '<div class="critter" data-tone="' + esc(toneName) + '" data-status="' + esc(state) + '"' +
      (motion === 'spin' ? ' data-motion="spin"' : '') +
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
    var box = $('desksGrid');
    if (!box) return;

    box.innerHTML = list.length ? list.map(function (a) {
      var c = tone(a.tone);
      return '' +
        '<button class="desk-card" type="button" data-id="' + esc(a.id) + '"' +
        ' data-status="' + esc(a.status) + '" style="--tone:' + c.c2 + '"' +
        ' aria-label="' + esc(a.name) + ' 상세 보기">' +
          '<div class="desk-top">' +
            critterHtml(a.tone, a.status, a.motion) +
            '<div class="desk-id">' +
              '<p class="desk-name">' + esc(a.name) + '</p>' +
              '<span class="desk-handle">' + esc(a.handle || '') + '</span>' +
            '</div>' +
            '<span class="badge" data-s="' + esc(a.status) + '">' + esc(a.statusLabel || '대기') + '</span>' +
          '</div>' +
          '<p class="desk-task">' + esc(a.task || '') + '</p>' +
          ((a.now || []).length ?
            '<ul class="desk-now">' + a.now.slice(0, 3).map(function (n) {
              return '<li>' + esc(n) + '</li>';
            }).join('') + '</ul>' : '') +
          '<div class="desk-foot">' +
            '<span class="ago">' + esc(a.lastUpdated || '—') + ' 기준</span>' +
            '<span class="ago">자세히 →</span>' +
          '</div>' +
        '</button>';
    }).join('') : '<p class="feed-empty">연결된 데스크가 없습니다.</p>';

    var dc = $('deskCount');
    if (dc) dc.textContent = list.length + '개 데스크';
  }

  function renderTeam(list) {
    var box = $('teamList');
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

    var tc = $('teamCount');
    if (tc) tc.textContent = list.length + '석';
  }

  /* ---------------- 현황 ---------------- */
  function renderStats(list) {
    var box = $('statsGrid');
    if (!box) return;
    box.innerHTML = list.length ? list.map(function (s) {
      return '' +
        '<div class="stat">' +
          '<p class="stat-label">' + esc(s.label) + '</p>' +
          '<p class="stat-value">' + esc(s.value) + '</p>' +
          '<p class="stat-hint">' + esc(s.hint) + '</p>' +
        '</div>';
    }).join('') : '<p class="feed-empty">오늘의 숫자가 아직 없습니다.</p>';
  }

  function renderMilestonesMini(list) {
    var box = $('msMini');
    if (box) {
      box.innerHTML = list.length ? list.map(msHtml).join('')
        : '<p class="feed-empty">등록된 마일스톤이 없습니다.</p>';
    }
    var c = $('msMiniCount');
    if (c) {
      var done = list.filter(function (m) { return m.state === 'done'; }).length;
      c.textContent = done + ' / ' + list.length + ' 완료';
    }
  }

  /* ---------------- 메모 ---------------- */
  function renderMemo(owner) {
    var memo = owner.memo || {};
    var mt = $('memoText');
    if (mt) mt.textContent = memo.text || '오늘 등록된 메모가 없습니다.';

    var g = owner.topGoal || {};
    var gt = $('goalTitle');
    if (gt) gt.textContent = g.title || '—';

    var gp = $('goalPeriod');
    if (gp) gp.textContent = g.period || '—';

    var bar = $('goalBar');
    if (bar) {
      var pct = Math.max(0, Math.min(100, Number(g.progress) || 0));
      requestAnimationFrame(function () { bar.style.width = pct + '%'; });
    }

    var step = $('goalStep');
    if (step) {
      step.textContent = g.step
        ? g.step + (typeof g.progress === 'number' ? ' · 진행 ' + Math.round(g.progress) + '%' : '')
        : '—';
    }

    var steps = $('goalSteps');
    if (steps) {
      steps.innerHTML = (g.steps || []).map(function (s, i) {
        return '<li><time>' + (i + 1) + '단계</time><span>' + esc(s) + '</span></li>';
      }).join('');
    }

    var box = $('ownerUpdates');
    if (box) {
      var ups = owner.updates || [];
      box.innerHTML = ups.length ? ups.map(function (u) {
        return '' +
          '<li class="feed-item">' +
            '<span class="feed-time">' + esc(u.time) + '</span>' +
            '<div><div class="feed-meta"><span class="feed-who" data-tone="amber">지시</span></div>' +
            '<p class="feed-text">' + esc(u.text) + '</p></div>' +
          '</li>';
      }).join('') : feedEmptyHtml('기록된 지시가 없습니다.');
    }

    var uc = $('ownerUpdCount');
    if (uc) uc.textContent = (owner.updates || []).length + '건';
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

      return drawerShell(o.name || '대표님', (o.role || '') + ' · ' + (o.statusLabel || ''),
          '<div class="seat-ava" style="--c1:#ffe3a8;--c2:#f0a92a">👔</div>') +
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
          ' <span style="color:#a3b1c1;font-weight:700">· ' + esc(m.owner) + '</span></span></li>';
      }).join('');
      var bd = (status.board || []).map(function (b) {
        return '<li><time>' + esc(b.state) + '</time><span><b>' + esc(b.title) + '</b><br>' +
          '<span style="color:#7d8ea2;font-weight:600">' + esc(b.detail) + ' · ' + esc(b.owner) + '</span></span></li>';
      }).join('');

      return drawerShell('대회의실', '오늘의 회차와 실시간 작업 보드') +
        '<div class="dr-section"><p class="dr-label">오늘의 회차</p><ul class="dr-list">' + ms + '</ul></div>' +
        '<div class="dr-section"><p class="dr-label">진행 중 작업</p><ul class="dr-list">' + bd + '</ul></div>';
    }

    if (id === 'lounge') {
      var seats = (status.team || []).map(function (p, i) {
        var t = SEAT_TONES[i % SEAT_TONES.length];
        return '<li><time>' + esc(p.state) + '</time><span><b>' + esc(p.name) + '</b> · ' + esc(p.role) +
          '<br><span style="color:#7d8ea2;font-weight:600">' + esc(p.doing) + '</span></span></li>';
      }).join('');
      return drawerShell('라운지', '직원 협업 좌석 ' + (status.team || []).length + '석') +
        '<div class="dr-section"><p class="dr-label">좌석</p><ul class="dr-list">' + seats + '</ul></div>' +
        '<div class="dr-section"><p class="dr-label">안내</p><div class="dr-card">' +
        '직원 좌석은 팀 텔레그램에 공유된 협업 정보만 표시합니다. 급여·평가·개인 일정 같은 정보는 이 페이지에 담지 않습니다.</div></div>';
    }

    if (id.indexOf('team-') === 0) {
      var idx = Number(id.slice(5));
      var person = (status.team || [])[idx];
      if (!person) return '';
      return drawerShell(person.name, person.role, '<div class="seat-ava" style="--c1:#c9d8ff;--c2:#6f8dff">' + esc(String(person.name).charAt(0)) + '</div>') +
        '<div class="dr-section"><p class="dr-label">협업 상태</p>' +
          '<div class="dr-card">' + esc(person.state) + ' · ' + esc(person.doing) + '</div></div>' +
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

    return drawerShell(a.name, (a.handle ? a.handle + ' · ' : '') + (a.statusLabel || '대기'),
        critterHtml(a.tone, a.status, a.motion)) +
      '<div class="dr-section"><p class="dr-label">지금 하는 일</p>' +
        '<div class="dr-card">' + esc(a.task || '—') + '</div></div>' +
      (now ? '<div class="dr-section"><p class="dr-label">진행 상황</p><ul class="dr-list">' + now + '</ul></div>' : '') +
      (scope ? '<div class="dr-section"><p class="dr-label">담당 범위</p><div class="dr-tags">' + scope + '</div></div>' : '') +
      updatesList(a.updates) +
      '<div class="dr-section"><p class="dr-label">업데이트</p>' +
        '<div class="dr-card">' + esc(a.lastUpdated || '—') + ' 기준 · 이 데스크의 상태는 담당 피클이 실시간 DB(desks/' + esc(a.id) + ')에 직접 기록합니다.</div></div>';
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
  function fetchJSON(url, timeoutMs) {
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = null;
    var opts = { cache: 'no-store' };
    if (ctrl) {
      opts.signal = ctrl.signal;
      timer = setTimeout(function () { ctrl.abort(); }, timeoutMs || 8000);
    }
    return fetch(url, opts).then(function (res) {
      if (timer) clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  /* 실시간 DB 우선, 실패하면 같은 폴더의 status.json */
  function fetchState() {
    var stamp = Date.now();
    return fetchJSON(RTDB_ENDPOINT + '?t=' + stamp, 8000)
      .then(function (d) {
        if (!d || typeof d !== 'object') throw new Error('empty');
        return { data: d, source: 'rtdb' };
      })
      .catch(function () {
        return fetchJSON(LOCAL_STATUS + '?t=' + stamp, 8000).then(function (d) {
          if (!d || typeof d !== 'object') throw new Error('empty');
          return { data: d, source: 'local' };
        });
      });
  }

  function toArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(function (v) { return v !== null && v !== undefined; });
    return Object.keys(value).map(function (k) { return value[k]; })
      .filter(function (v) { return v !== null && v !== undefined; });
  }

  /* desks/<id> 는 assistants 보다 우선합니다 (피클이 직접 쓰는 자리) */
  function normalize(state) {
    if (!state) return state;
    var list = toArray(state.assistants).slice();
    toArray(state.desks).forEach(function (d) {
      if (!d || !d.id) return;
      var idx = -1;
      for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].id === d.id) { idx = i; break; }
      }
      if (idx >= 0) list[idx] = mergeDesk(list[idx], d);
      else list.push(d);
    });
    state.assistants = list;
    return state;
  }

  function mergeDesk(base, over) {
    var out = {};
    Object.keys(base || {}).forEach(function (k) { out[k] = base[k]; });
    Object.keys(over || {}).forEach(function (k) {
      var v = over[k];
      if (v === null || v === undefined) return;
      out[k] = v;
    });
    return out;
  }

  function scheduleRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(function () { load(false); }, refreshMs);
  }

  function load(manual) {
    if (!status) setConn('loading', 'LIVE');
    var btn = $('refreshBtn');
    if (manual && btn) btn.classList.add('is-spinning');

    fetchState()
      .then(function (res) {
        status = normalize(res.data);
        source = res.source;
        lastLoaded = Date.now();
        render();
        setConn(res.source, 'LIVE');
      })
      .catch(function () {
        if (!status && FALLBACK_STATUS && FALLBACK_STATUS.meta) {
          status = FALLBACK_STATUS;
          render();
          setConn('offline', '오프라인');
        } else if (status) {
          setConn('offline', '연결 지연');
        } else {
          setConn('offline', '데이터 없음');
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
    applyMotion();
    setTab(tabFromHash(), false);
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
    applyMotion();

    // 모션 토글
    var motionBtn = $('motionBtn');
    if (motionBtn) motionBtn.addEventListener('click', toggleMotion);

    // 탭
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
      t.addEventListener('click', function () { setTab(t.getAttribute('data-tab'), true); });
      t.addEventListener('keydown', function (e) {
        var names = ['office', 'meeting', 'work', 'status', 'memo'];
        var i = names.indexOf(t.getAttribute('data-tab'));
        var next = -1;
        if (e.key === 'ArrowRight') next = (i + 1) % names.length;
        if (e.key === 'ArrowLeft') next = (i + names.length - 1) % names.length;
        if (next < 0) return;
        e.preventDefault();
        setTab(names[next], true);
        var el = document.getElementById('tab-' + names[next]);
        if (el) el.focus();
      });
    });

    window.addEventListener('hashchange', function () { setTab(tabFromHash(), false); });

    // 첫 데이터(잠금 여부 판단용) — 실시간 DB → status.json → 내장 스냅샷 순서
    fetchState()
      .then(function (res) {
        status = normalize(res.data);
        source = res.source;
        lastLoaded = Date.now();
        initGate();
        setConn(res.source, 'LIVE');
      })
      .catch(function () {
        status = FALLBACK_STATUS;
        initGate();
        if (status && status.meta) setConn('offline', '오프라인');
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
      var goto = e.target.closest('[data-goto]');
      if (goto) {
        setTab(goto.getAttribute('data-goto'), true);
        return;
      }
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
