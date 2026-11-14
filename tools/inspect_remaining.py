import re

with open("/Users/frank/Downloads/几猫国产3A大作_V1(1).html", "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect where Chinese characters are in the file:
# Find every chunk of Chinese characters and 20 chars around it
chunks = []
for m in re.finditer(r"[\u4e00-\u9fff]+", text):
    start = max(0, m.start() - 25)
    end = min(len(text), m.end() + 25)
    surrounding = text[start:end]
    chunks.append((m.group(0), surrounding))

print(f"Total Chinese chunks: {len(chunks)}")
# print unique Chinese words
words = sorted(set(c[0] for c in chunks))
print(f"Unique words: {len(words)}")
for w in words:
    # print one example context
    example = next(c[1] for c in chunks if c[0] == w)
    print(f"{w:15} | {repr(example)}")
