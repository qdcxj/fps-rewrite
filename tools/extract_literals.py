import re

with open("/Users/frank/Downloads/几猫国产3A大作_V1(1).html", "r", encoding="utf-8") as f:
    text = f.read()

pattern = re.compile(
    r'("(?:\\.|[^"\\])*[\u4e00-\u9fff]+(?:\\.|[^"\\])*")|'
    r"('(?:\\.|[^'\\])*[\u4e00-\u9fff]+(?:\\.|[^'\\])*')|"
    r'(`(?:\\.|[^`\\])*[\u4e00-\u9fff]+(?:\\.|[^`\\])*`)|'
    r'(>([^<]*[\u4e00-\u9fff]+[^<]*)<)'
)

matches = []
for m in pattern.finditer(text):
    val = m.group(0)
    matches.append(val)

print(f"Total matching literal blocks: {len(matches)}")
unique = sorted(set(matches))
print(f"Unique matching literal blocks: {len(unique)}")
for u in unique:
    print(repr(u))
