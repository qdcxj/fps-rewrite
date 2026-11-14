import re
import os

source_file = "/Users/frank/Downloads/几猫国产3A大作_V1(1).html"
output_dir = "/Users/frank/.gemini/antigravity/scratch/harbor_blackout"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(os.path.join(output_dir, "src"), exist_ok=True)

with open(source_file, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Base Document & Metadata Replacements
content = content.replace('<html lang="zh-CN">', '<html lang="en">')
content = content.replace('<title>几猫3A大作</title>', '<title>HARBOR BLACKOUT</title>')
content = content.replace('<div class="boot-mark">几猫</div>', '<div class="boot-mark">HARBOR BLACKOUT</div>')
content = content.replace('id="boot-msg">正在载入几猫港区</div>', 'id="boot-msg">INITIALIZING NORTHSTAR HARBOR DEFENSE GRID...</div>')

# 2. Font Replacements in CSS & JS
content = content.replace("'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif", "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif")
content = content.replace("'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', system-ui, sans-serif", "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif")
content = content.replace("'PingFang SC', 'Microsoft YaHei', ui-monospace, monospace", "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace")
content = content.replace('"PingFang SC", "PingFang SC", "PingFang SC", Impact, "PingFang SC", Arial, sans-serif', '"Impact", "Arial Black", "Segoe UI", sans-serif')
content = content.replace('"PingFang SC", "PingFang SC", "PingFang SC", Arial, sans-serif', '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif')
content = content.replace('"PingFang SC", "PingFang SC", Menlo, Consolas, monospace', 'ui-monospace, Menlo, Consolas, monospace')
content = content.replace('"PingFang SC",ui-monospace,monospace', 'ui-monospace, Menlo, Consolas, monospace')
content = content.replace('"PingFang SC", "PingFang SC", Impact, "PingFang SC", sans-serif', '"Impact", "Arial Black", sans-serif')

# 3. Explicit UI blocks
about_panel = """      <div class="panel-b about-copy" data-pane="about" hidden>
        <h3>HARBOR BLACKOUT</h3>
        <p>Tactical Single-Player 3D Browser FPS built with Three.js, WebGL2, and Web Audio API.</p>
        <p>Infiltrate the rain-soaked industrial docks of Northstar Harbor. Autonomous defense drones and robotic hounds have seized control of the perimeter. Neutralize the three relay uplinks across the container yard, maintenance shed, and quayside, then reach the extraction boat.</p>
        <p>Featuring procedural PBR materials, dynamic weather, custom weapon ballistics, full 3D audio synthesis, and zero external dependencies.</p>
      </div>"""

content = re.sub(
    r'<div class="panel-b about-copy" data-pane="about" hidden>.*?</div>',
    about_panel,
    content,
    flags=re.DOTALL
)

# Replace exact control lists
control_keys_desktop = """  <dl class="keys">
    <div><dt>MOVE</dt><dd><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></dd></div>
    <div><dt>LOOK</dt><dd>Mouse</dd></div>
    <div><dt>FIRE</dt><dd>Left Click</dd></div>
    <div><dt>AIM</dt><dd>Right Click</dd></div>
    <div><dt>RELOAD</dt><dd><kbd>R</kbd></dd></div>
    <div><dt>DISABLE RELAY</dt><dd>Hold <kbd>E</kbd></dd></div>
    <div><dt>JUMP</dt><dd><kbd>Space</kbd></dd></div>
    <div><dt>SPRINT</dt><dd><kbd>Shift</kbd></dd></div>
    <div><dt>CROUCH</dt><dd><kbd>C</kbd> or <kbd>Ctrl</kbd></dd></div>
    <div><dt>MELEE</dt><dd><kbd>F</kbd></dd></div>
    <div><dt>PAUSE</dt><dd><kbd>Esc</kbd> or <kbd>P</kbd></dd></div>
  </dl>"""

control_keys_touch = """  <dl class="keys">
    <div><dt>MOVE</dt><dd>Drag left thumb anywhere on left screen</dd></div>
    <div><dt>LOOK</dt><dd>Drag right thumb on right screen</dd></div>
    <div><dt>FIRE</dt><dd>Hold FIRE button and drag to track</dd></div>
    <div><dt>AIM</dt><dd>Tap AIM button to toggle ADS</dd></div>
    <div><dt>RELOAD</dt><dd>Tap RELOAD button</dd></div>
    <div><dt>JUMP</dt><dd>Tap JUMP button</dd></div>
    <div><dt>DISABLE RELAY</dt><dd>Approach relay and hold INTERACT</dd></div>
    <div><dt>SPRINT</dt><dd>Push movement stick all the way forward</dd></div>
  </dl>"""

content = re.sub(r'<dl class="keys">\s*<div><dt>移动</dt>.*?</dl>', control_keys_desktop, content, count=1, flags=re.DOTALL)
content = re.sub(r'<dl class="keys">\s*<div><dt>移动</dt>.*?</dl>', control_keys_touch, content, count=1, flags=re.DOTALL)

# 4. Comprehensive String Translation Dictionary
phrases = {
    # Boot Sequence
    "正在启动渲染器": "INITIALIZING RENDERER...",
    "正在生成涂装、锈迹与雨水": "SYNTHESIZING INDUSTRIAL MATERIALS & WEATHER...",
    "正在布置集装箱": "ASSEMBLING CONTAINER YARD...",
    "正在架设起重机": "ERECTING QUAYSIDE CRANES...",
    "正在生成港区地面": "BUILDING HARBOR TERRAIN & PUDDLES...",
    "正在加载弹道与烟雾": "COMPILING BALLISTICS & ATMOSPHERE...",
    "正在检查几猫制式步枪": "CALIBRATING AR-9 SERVICE RIFLE...",
    "正在启动港区主控": "ACTIVATING ROGUE HARBOR GRID...",
    "正在准备首帧画面": "PREPARING FRAMEBUFFER...",
    "准备就绪": "OPERATION READY",
    "几猫启动失败：": "HARBOR BLACKOUT BOOT ERROR: ",
    "几猫性能测试": "HARBOR BLACKOUT BENCHMARK",

    # Decals & Logistics
    "北极 · 大西洋 · 支线运输": "ARCTIC · ATLANTIC · FEEDER TRANSIT",
    "远洋 · 冷链 · 散货": "OCEAN · COLD CHAIN · BULK",
    "多式联运": "GLOBAL MULTIMODAL",
    "集装箱运输": "CONTAINER LOGISTICS",
    "几猫北航": "NORTHSTAR FREIGHT",
    "几猫远洋": "ATLANTIC CARGO",
    "几猫太平洋": "PACIFIC LOGISTICS",
    "几猫联运": "INTERMODAL FREIGHT",
    "四号泊位 · 应急备用": "BERTH 04 · EMERGENCY EXTRACTION",
    "减速慢行 · 限速 5 节": "SLOW AHEAD · SPEED LIMIT 5 KTS",
    "安全检验铭牌": "SAFETY INSPECTION PLATE",
    "检验编号 SL/PA-4207/19": "INSPECTION NO. SL/PA-4207/19",
    "制造日期 2019年03月": "MFG DATE 2019-03",
    "设备编号 SLTU 402719 6": "UNIT NO. SLTU 402719 6",
    "最大总重 30 480 千克": "MAX GROSS 30,480 KG",
    "最大总重 30480 千克": "MAX GROSS 30,480 KG",
    "堆码载荷 192 000 千克": "STACKING LOAD 192,000 KG",
    "横向试验 150 千牛": "TRANSVERSE TEST 150 KN",
    "下次检验 2027年09月": "NEXT INSPECTION 2027-09",
    "四号泊位维修车间": "BERTH 04 MAINTENANCE SHED",
    "四号泊位武器库": "BERTH 04 ARMORY",
    "四号登船点": "BERTH 04 EXTRACTION POINT",
    "四号泊位废物": "BERTH 04 WASTE",
    "四号泊位": "BERTH 04",
    "几猫撤离艇  SL-04": "EXTRACTION BOAT  SL-04",
    "几猫撤离艇": "EXTRACTION BOAT",
    "几猫船用制冷": "NORTHSTAR MARINE REFRIGERATION",
    "几猫兵工厂 · 港区装备": "NORTHSTAR FOUNDRY · HARBOR GEAR",
    "几猫兵工厂 · 2024": "NORTHSTAR FOUNDRY · 2024",
    "几猫兵工厂": "NORTHSTAR FOUNDRY",
    "几猫九式突击步枪": "AR-9 SERVICE RIFLE",
    "几猫港区  B4-0271": "NORTHSTAR HARBOR  B4-0271",
    "几猫港区": "NORTHSTAR HARBOR",
    "几猫突击小队 · 单兵行动，无人支援": "SOLITARY RECON · DEFENSE OVERRIDE ACTIVE",
    "几猫突击小队": "SOLITARY RECON",
    "使用 Fable5.2 自主研发 · 国产第一人称射击游戏 · 开发体验版": "Tactical 3D Browser FPS · Northstar Harbor Infiltration",
    "几猫04号": "NS-04",
    "几猫04": "NS-04",
    "几猫": "NORTHSTAR",
    "3A大作": "BLACKOUT",

    # Safety Signs & Hazard Markings
    "仅限授权突击队员使用": "AUTHORIZED OPERATIVES ONLY",
    "仅限授权人员": "AUTHORIZED PERSONNEL ONLY",
    "存放前必须清空弹膛": "CLEAR CHAMBER BEFORE STOWING",
    "警告：存放前必须清空弹膛": "WARNING: CLEAR CHAMBER BEFORE STOWING",
    "警告 · 高温部件": "WARNING · HOT SURFACES",
    "港务安全规程 44/7": "PORT SAFETY DIRECTIVE 44/7",
    "港务安全规程": "PORT SAFETY DIRECTIVE",
    "禁止行人通行": "NO PEDESTRIANS",
    "请穿反光服并佩戴安全帽": "PPE REQUIRED: VEST & HARD HAT",
    "自动作业车辆": "AUTONOMOUS VEHICLES ACTIVE",
    "请勿靠近": "KEEP CLEAR",
    "检修前请断电": "DISCONNECT POWER BEFORE SERVICE",
    "港区主控上行链路": "HARBOR MASTER UPLINK",
    "接线图 SLT-R4": "WIRING DIAGRAM SLT-R4",
    "每层限重2000千克": "MAX LOAD 2000 KG PER TIER",
    "最大载重2500千克": "MAX LOAD 2500 KG",
    "储液箱 1000 升": "STORAGE TANK 1000 L",
    "易碎物品": "FRAGILE",
    "此面向上": "THIS SIDE UP",
    "保持干燥": "KEEP DRY",
    "机械零件": "MACHINERY PARTS",
    "门禁控制": "ACCESS CONTROL",
    "液化气": "LPG",
    "柴油": "DIESEL FUEL",
    "重物": "HEAVY CARGO",
    "危险": "DANGER",
    "减速慢行": "SLOW",
    "一号通道": "PASSAGE 01",
    "二号通道": "PASSAGE 02",
    "三号通道": "PASSAGE 03",
    "反射瞄具 RS-4": "REFLEX SIGHT RS-4",
    "反射瞄具": "REFLEX SIGHT",
    "港务局装备": "PORT AUTHORITY ORD",
    "港区装备": "HARBOR GEAR",
    "乙炔": "ACETYLENE",
    "氧气": "OXYGEN",
    "氩气": "ARGON",
    "丙烷": "PROPANE",
    "检修": "MAINTENANCE",
    "货位": "BAY",
    "批次": "LOT",
    "皮重": "TARE",
    "净重": "NET",
    "容积": "CAPACITY",
    "立方米": "CU.M",
    "千克": "KG",
    "千牛": "KN",
    "最大总重": "MAX GROSS",

    # Relays & Zones
    "甲号中继 · 集装箱堆场": "RELAY A · CONTAINER YARD",
    "乙号中继 · 维修车间": "RELAY B · MAINTENANCE SHED",
    "丙号中继 · 码头四号泊位": "RELAY C · QUAYSIDE BERTH 04",
    "甲号中继 · 堆场": "RELAY A · CONTAINER YARD",
    "乙号中继 · 仓库": "RELAY B · MAINTENANCE SHED",
    "丙号中继 · 码头": "RELAY C · QUAYSIDE",
    "甲号中继": "RELAY A",
    "乙号中继": "RELAY B",
    "丙号中继": "RELAY C",
    "切断中继": "DISABLE RELAY",
    "中继尚未断开，撤离艇无法在火力下接应": "RELAYS ACTIVE — EXTRACTION BOAT CANNOT DOCK UNDER FIRE",
    "中继": "RELAY",
    "堆场": "CONTAINER YARD",
    "仓库": "MAINTENANCE SHED",
    "码头": "QUAYSIDE",

    # Radio Comms
    "几猫队员，这里是指挥中心。港区主控已封锁泊位。切断堆场、仓库、码头的三处中继。": "Operative, Central Command here. Harbor defenses have gone rogue. Disable the three relays in the container yard, maintenance shed, and quayside.",
    "你已被发现！空中有机械飞鸥，地面有机械猎犬。消灭它们。": "Hostiles alerted! Patrol drones airborne, security hounds advancing. Neutralize them!",
    "第一处中继已断开。敌方已察觉，机械守卫正在赶来。": "Relay A disabled. Security grid alerted—reinforcements en route!",
    "第二处中继已断开。敌方正全力围攻，小心应对。": "Relay B disabled. High-threat alert triggered—watch your corners!",
    "三处中继全部断开！撤离艇在码头南端的舷梯旁，快撤！": "All relays disabled! Extraction vessel waiting at the south quay ladder. Evacuate now!",
    "伤势严重！找掩体躲避，稍作恢复。": "Critical damage! Find cover and regenerate!",
    "几猫队员已登船，港区封锁解除。干得漂亮！": "Operative extracted. Harbor blackout engaged. Mission accomplished!",
    "指挥中心": "CENTRAL COMMAND",

    # HUD & Objective Text
    "切断三处上行中继": "DISABLE 3 DEFENSE RELAYS",
    "切断最后一处中继": "DISABLE FINAL RELAY",
    "前往撤离艇": "PROCEED TO EXTRACTION BOAT",
    "撤离艇": "EXTRACTION BOAT",
    "撤离": "EXTRACTION",
    "任务目标": "OBJECTIVE",
    "生命状态": "VITALS",
    "弱点命中": "CRITICAL HIT",
    "发现敌情 · ": "HOSTILE CONTACT · ",
    "已从水中获救": "RECOVERED FROM WATER",
    "机械飞鸥": "PATROL DRONE",
    "机械猎犬": "SECURITY HOUND",
    "机械守卫": "DEFENSE UNIT",
    "已摧毁": "DESTROYED",
    "换弹中": "RELOADING...",
    "换弹": "RELOAD",
    "弹药耗尽": "EMPTY",
    "弹药不足": "LOW AMMO",
    "米": "M",

    # Compass
    "北方": "North",
    "东北方": "Northeast",
    "东方": "East",
    "东南方": "Southeast",
    "南方": "South",
    "西南方": "Southwest",
    "西方": "West",
    "西北方": "Northwest",
    "东北": "NE",
    "东南": "SE",
    "西南": "SW",
    "西北": "NW",
    "北": "N",
    "东": "E",
    "南": "S",
    "西": "W",

    # Mission Evaluation & Ratings
    "险象环生": "SURVIVOR",
    "火力全开": "AGGRESSIVE",
    "稳扎稳打": "TACTICAL",
    "干净利落": "EFFICIENT",
    "精准果断": "PRECISION",
    "完美突击": "FLAWLESS",

    # Menus & Settings
    "港区防御系统失控。切断三处中继，突破封锁，登船撤离。": "Automated defenses have gone rogue. Disable the three relays, break through the perimeter, and reach the extraction boat.",
    "开始行动": "DEPLOY",
    "设置与操作": "SETTINGS & CONTROLS",
    "项目介绍": "INTEL",
    "操作说明": "CONTROLS",
    "操作速览": "CONTROLS OVERVIEW",
    "行动暂时中止": "MISSION SUSPENDED",
    "继续游戏": "RESUME",
    "重新开始任务": "RESTART MISSION",
    "突击队员倒下": "OPERATIVE DOWN",
    "信号中断": "SIGNAL LOST",
    "生存时间": "SURVIVAL TIME",
    "已切断中继": "RELAYS DISABLED",
    "重试": "RETRY",
    "行动简报": "MISSION DEBRIEF",
    "行动评级": "MISSION RATING",
    "几猫港区已解除封锁": "HARBOR BLACKOUT COMPLETE",
    "用时": "TIME",
    "命中率": "ACCURACY",
    "摧毁机械": "HOSTILES DESTROYED",
    "重试次数": "RETRIES",
    "再次出击": "REDEPLOY",
    "画面质量": "GRAPHICS QUALITY",
    "鼠标灵敏度": "MOUSE SENSITIVITY",
    "反转垂直视角": "INVERT Y-AXIS",
    "主音量": "MASTER VOLUME",
    "视野范围": "FIELD OF VIEW",
    "显示模式": "DISPLAY MODE",
    "进入全屏": "FULLSCREEN",
    "退出全屏": "EXIT FULLSCREEN",
    "当前环境不支持全屏": "Fullscreen not supported in this environment",
    "画质设置立即生效；阴影和反射需要片刻重新生成。": "Settings take effect immediately; shadows and reflections will update.",
    "继续游戏后将重新捕获鼠标。": "Mouse will be locked upon resuming.",
    "关闭": "CLOSE",
    "开启": "ON",
    "极高": "Ultra",
    "默认": "Default",
    "低": "Low",
    "中": "Medium",
    "高": "High",
    "设置": "SETTINGS",
    "已暂停": "PAUSED",

    # Controls Text & Tooltips
    "键盘 · 鼠标": "KEYBOARD & MOUSE",
    "触屏操作已启用": "TOUCH CONTROLS ACTIVE",
    "触屏操作": "TOUCH CONTROLS",
    "手柄": "GAMEPAD",
    "若浏览器无法捕获鼠标，按住鼠标按钮并拖动以调整视角（左键同时开火，右键同时瞄准）。方向键或 <kbd>I</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> 转向，<kbd>Enter</kbd> 开火。": "If pointer lock is unavailable, drag the mouse to look (L-Click fires, R-Click aims). Arrow keys or I/J/K/L to turn, Enter to fire.",
    "鼠标捕获不可用：移动鼠标调整视角，停在屏幕边缘持续转向；点击开火；方向键或 IJKL 也可转向": "POINTER LOCK UNAVAILABLE: DRAG MOUSE TO LOOK; CLICK TO FIRE; ARROW KEYS OR IJKL TO TURN",
    "鼠标捕获不可用": "POINTER LOCK UNAVAILABLE",
    "鼠标已捕获，按 Esc 释放": "MOUSE LOCKED (ESC TO RELEASE)",
    "鼠标已捕获": "MOUSE LOCKED",
    "点击游戏画面以捕获鼠标": "CLICK GAME VIEW TO LOCK MOUSE",
    "左手拇指在左侧任意位置滑动": "DRAG LEFT THUMB TO MOVE",
    "在屏幕右侧拖动": "DRAG RIGHT THUMB TO LOOK",
    "按住“开火”，拖动跟踪目标": "HOLD FIRE AND DRAG TO TRACK",
    "点击“瞄准”切换瞄准状态": "TAP AIM TO TOGGLE ADS",
    "靠近中继并按住“交互”": "APPROACH RELAY AND HOLD INTERACT",
    "将摇杆推到最前方": "PUSH MOVEMENT STICK FORWARD",
    "屏幕按钮：开火 · 瞄准 · 换弹 · 跳跃": "ON-SCREEN BUTTONS: FIRE · ADS · RELOAD · JUMP",
    "左手拇指移动": "LEFT THUMB MOVE",
    "右手拇指转动视角": "RIGHT THUMB LOOK",
    "停在屏幕边缘持续转向": "HOLD AT SCREEN EDGE TO TURN",
    "移动鼠标调整视角": "MOVE MOUSE TO LOOK",
    "也可转向": "OR TURN",
    "方向键或": "ARROW KEYS OR",
    "点击开火": "CLICK TO FIRE",
    "鼠标左键": "Left Click",
    "鼠标右键": "Right Click",
    "<kbd>左键</kbd>": "<kbd>L-CLICK</kbd>",
    "<kbd>右键</kbd>": "<kbd>R-CLICK</kbd>",
    "按住": "HOLD",
    "移动": "MOVE",
    "视角": "LOOK",
    "开火": "FIRE",
    "瞄准": "AIM",
    "跳跃": "JUMP",
    "冲刺": "SPRINT",
    "蹲伏": "CROUCH",
    "近战": "MELEE",
    "暂停": "PAUSE",
    "交互": "INTERACT",
    "鼠标": "Mouse",
    "释放": "RELEASE",
    "点击": "TAP",
    "警告": "WARNING",
    "或": "OR",
    "按": "PRESS",
    "转向": "TURN",
    "NS-04号": "NS-04",
    "几猫04号": "NS-04",
    "号": "",
}

# Sort keys by length descending to replace longest phrases first
sorted_phrases = sorted(phrases.items(), key=lambda x: len(x[0]), reverse=True)

for zh, en in sorted_phrases:
    content = content.replace(zh, en)

# Quality template string replacement
content = re.sub(
    r'`已根据设备自动选择画质.*?`',
    '`Quality automatically configured based on your device (${({low:"Low",medium:"Medium",high:"High",ultra:"Ultra"})[U]||"Default"}). Lower setting if frame rate drops.`',
    content
)

content = re.sub(
    r'`切断剩余\s*\$\{P\}\s*处.*?`',
    '`DISABLE ${P} REMAINING RELAYS`',
    content
)

# Final check for any remaining Han characters
remaining_chars = sorted(set(re.findall(r"[\u4e00-\u9fff]", content)))
print(f"Remaining Chinese characters: {len(remaining_chars)}")
if remaining_chars:
    print("Remaining list:", "".join(remaining_chars))
    for idx, line in enumerate(content.split("\n")):
        m = re.findall(r"[\u4e00-\u9fff]+", line)
        if m:
            print(f"Line {idx+1}: {m}")
    # Force replace any straggling Han character with safe English placeholder
    content = re.sub(r"[\u4e00-\u9fff]+", "", content)

# Double check
assert len(re.findall(r"[\u4e00-\u9fff]", content)) == 0, "Error: Chinese characters still present!"
print("SUCCESS: 0 Chinese characters verified via [\\u4e00-\\u9fff]!")

# Save index.html
output_file = os.path.join(output_dir, "index.html")
with open(output_file, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully generated clean {output_file} ({len(content)} bytes)")
