#!/usr/bin/env python3
"""status.json 내용을 app.js 의 FALLBACK 블록에 넣습니다.

- http(s) 로 열면 페이지는 항상 ./status.json 을 읽으므로 이 블록은 쓰이지 않습니다.
- index.html 을 파일로 직접 열었을 때(오프라인 미리보기)만 이 스냅샷이 보입니다.
- status.json 을 고친 뒤 이 스크립트를 한 번 돌리면 미리보기도 같이 최신이 됩니다.

사용법:  python3 build.py
"""
import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent
data = json.loads((root / "status.json").read_text(encoding="utf-8"))
app_path = root / "app.js"
app = app_path.read_text(encoding="utf-8")

block = json.dumps(data, ensure_ascii=False, indent=2)
body = (
    "  /* FALLBACK:START — build.py 가 status.json 내용을 여기에 넣습니다.\n"
    "     (http 로 열면 실제로는 쓰이지 않고, 파일을 직접 열었을 때만 쓰입니다) */\n"
    "  var FALLBACK_STATUS = " + block + ";\n"
    "  /* FALLBACK:END */"
)

pattern = re.compile(r"  /\* FALLBACK:START.*?/\* FALLBACK:END \*/", re.S)
if not pattern.search(app):
    raise SystemExit("FALLBACK 블록을 찾지 못했습니다. app.js 를 확인해 주세요.")

app_path.write_text(pattern.sub(lambda m: body, app, count=1), encoding="utf-8")
print("app.js 갱신 완료 — 스냅샷 %d bytes" % len(block))
