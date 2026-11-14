import re
import os

source_file = "/Users/frank/Downloads/几猫国产3A大作_V1(1).html"
output_dir = "/Users/frank/.gemini/antigravity/scratch/harbor_blackout"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(os.path.join(output_dir, "src"), exist_ok=True)

with open(source_file, "r", encoding="utf-8") as f:
    content = f.read()

# 1. HTML Header & Meta
content = content.replace('<html lang="zh-CN">', '<html lang="en">')
content = content.replace('<title>几猫3A大作</title>', '<title>HARBOR BLACKOUT</title>')
content = content.replace('<div class="boot-mark">几猫</div>', '<div class="boot-mark">HARBOR BLACKOUT</div>')
content = content.replace('id="boot-msg">正在载入几猫港区</div>', 'id="boot-msg">INITIALIZING NORTHSTAR HARBOR DEFENSE GRID...</div>')

# 2. Font replacements in CSS and JS
content = content.replace("'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif", "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif")
content = content.replace("'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', system-ui, sans-serif", "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif")
content = content.replace("'PingFang SC', 'Microsoft YaHei', ui-monospace, monospace", "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace")
content = content.replace('"PingFang SC", "PingFang SC", "PingFang SC", Impact, "PingFang SC", Arial, sans-serif', '"Impact", "Arial Black", "Segoe UI", sans-serif')
content = content.replace('"PingFang SC", "PingFang SC", "PingFang SC", Arial, sans-serif', '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif')
content = content.replace('"PingFang SC", "PingFang SC", Menlo, Consolas, monospace', 'ui-monospace, Menlo, Consolas, monospace')
content = content.replace('"PingFang SC",ui-monospace,monospace', 'ui-monospace, Menlo, Consolas, monospace')

# 3. Decals & Texture strings in JS
replacements = [
    # Shipping Logos & Specifications
    ('"几猫北航"', '"NORTHSTAR FREIGHT"'),
    ('"北极 · 大西洋 · 支线运输"', '"ARCTIC · ATLANTIC · FEEDER TRANSIT"'),
    ('"几猫远洋"', '"ATLANTIC CARGO"'),
    ('"集装箱运输"', '"CONTAINER LOGISTICS"'),
    ('"几猫太平洋"', '"PACIFIC LOGISTICS"'),
    ('"远洋 · 冷链 · 散货"', '"OCEAN · COLD CHAIN · BULK"'),
    ('"几猫联运"', '"INTERMODAL FREIGHT"'),
    ('"多式联运"', '"GLOBAL MULTIMODAL"'),
    ('"四号泊位"', '"BERTH 04"'),
    ('"安全检验铭牌"', '"SAFETY INSPECTION PLATE"'),
    ('"检验编号 SL/PA-4207/19"', '"INSPECTION NO. SL/PA-4207/19"'),
    ('"制造日期 2019年03月"', '"MFG DATE 2019-03"'),
    ('"设备编号 SLTU 402719 6"', '"UNIT NO. SLTU 402719 6"'),
    ('"最大总重 30 480 千克"', '"MAX GROSS 30,480 KG"'),
    ('"堆码载荷 192 000 千克"', '"STACKING LOAD 192,000 KG"'),
    ('"横向试验 150 千牛"', '"TRANSVERSE TEST 150 KN"'),
    ('"下次检验 2027年09月"', '"NEXT INSPECTION 2027-09"'),
    
    # Props and Signs
    ('"几猫港区  B4-0271"', '"NORTHSTAR HARBOR  B4-0271"'),
    ('"最大总重 30480 千克"', '"MAX GROSS 30,480 KG"'),
    ('"危险"', '"DANGER"'),
    ('"请勿靠近"', '"KEEP CLEAR"'),
    ('"最大总重 "', '"MAX GROSS "'),
    ('+" 千克"', '+" KG"'),
    ('"皮重 "', '"TARE "'),
    ('" 千克  净重 "', '" KG  NET "'),
    ('"容积 "', '"CAPACITY "'),
    ('+" 立方米"', '+" CU.M"'),
    ('"门禁控制"', '"ACCESS CONTROL"'),
    ('E3=["仅限授权人员","禁止行人通行","请穿反光服并佩戴安全帽","自动作业车辆","请勿靠近"]', 'E3=["AUTHORIZED PERSONNEL ONLY","NO PEDESTRIANS","PPE REQUIRED: VEST & HARD HAT","AUTONOMOUS VEHICLES ACTIVE","KEEP CLEAR"]'),
    ('"批次 "', '"LOT "'),
    ('"货位 "', '"BAY "'),
    ('"每层限重2000千克"', '"MAX LOAD 2000 KG PER TIER"'),
    ('"几猫船用制冷"', '"NORTHSTAR MARINE REFRIGERATION"'),
    ('"中继 "', '"RELAY "'),
    ('"港区主控上行链路"', '"HARBOR MASTER UPLINK"'),
    ('"接线图 SLT-R4"', '"WIRING DIAGRAM SLT-R4"'),
    ('"检修前请断电"', '"DISCONNECT POWER BEFORE SERVICE"'),
    (':o="易碎物品"', ':o="FRAGILE"'),
    ('["易碎物品","此面向上","保持干燥","机械零件"]', '["FRAGILE","THIS SIDE UP","KEEP DRY","MACHINERY PARTS"]'),
    ('"重物"', '"HEAVY CARGO"'),
    ('"几猫04"', '"NS-04"'),
    ('"储液箱 1000 升"', '"STORAGE TANK 1000 L"'),
    ('"几猫港区"', '"NORTHSTAR HARBOR"'),
    ('["乙炔","氧气","氩气","丙烷"]', '["ACETYLENE","OXYGEN","ARGON","PROPANE"]'),
    ('label:"易碎物品"', 'label:"FRAGILE"'),
    ('label:"保持干燥"', 'label:"KEEP DRY"'),
    ('"几猫"', '"NORTHSTAR"'),
    ('"液化气"', '"LPG"'),
    ('"最大载重2500千克"', '"MAX LOAD 2500 KG"'),
    ('"柴油"', '"DIESEL FUEL"'),
    ('"四号泊位废物 "', '"BERTH 04 WASTE "'),
    ('"检修 "', '"MAINTENANCE "'),
    ('"四号登船点"', '"BERTH 04 EXTRACTION POINT"'),
    ('"一号通道"', '"PASSAGE 01"'),
    ('"二号通道"', '"PASSAGE 02"'),
    ('"三号通道"', '"PASSAGE 03"'),
    ('"四号泊位维修车间"', '"BERTH 04 MAINTENANCE SHED"'),
    ('"甲号中继 · 集装箱堆场"', '"RELAY A · CONTAINER YARD"'),
    ('"乙号中继 · 维修车间"', '"RELAY B · MAINTENANCE SHED"'),
    ('"丙号中继 · 码头四号泊位"', '"RELAY C · QUAYSIDE BERTH 04"'),
    ('"几猫撤离艇  SL-04"', '"EXTRACTION BOAT  SL-04"'),
    ('"四号泊位 · 应急备用"', '"BERTH 04 · EMERGENCY EXTRACTION"'),
    ('"减速慢行 · 限速 5 节"', '"SLOW AHEAD · SPEED LIMIT 5 KTS"'),
    ('"几猫撤离艇"', '"EXTRACTION BOAT"'),
    ('" 号"', '" "'),
    
    # Weapon Markings & Tooltips
    ('"四号泊位武器库"', '"BERTH 04 ARMORY"'),
    ('"几猫九式突击步枪"', '"AR-9 SERVICE RIFLE"'),
    ('"几猫兵工厂 · 2024"', '"NORTHSTAR FOUNDRY · 2024"'),
    ('"反射瞄具 RS-4"', '"REFLEX SIGHT RS-4"'),
    ('"港务安全规程"', '"PORT SAFETY DIRECTIVE"'),
    ('"仅限授权突击队员使用"', '"AUTHORIZED OPERATIVES ONLY"'),
    ('"存放前必须清空弹膛"', '"CLEAR CHAMBER BEFORE STOWING"'),
    ('"港务局装备"', '"PORT AUTHORITY ORD"'),
    ('"警告 · 高温部件"', '"WARNING · HOT SURFACES"'),
    ('"港区装备"', '"HARBOR GEAR"'),
    
    # HUD Compass & Combat Feedback
    ('["北","东北","东","东南","南","西南","西","西北"]', '["N","NE","E","SE","S","SW","W","NW"]'),
    ('["北方","东北方","东方","东南方","南方","西南方","西方","西北方"]', '["North","Northeast","East","Southeast","South","Southwest","West","Northwest"]'),
    ('"任务目标"', '"OBJECTIVE"'),
    ('"生命状态"', '"VITALS"'),
    ('"弹药耗尽"', '"OUT OF AMMO"'),
    ('"弱点命中"', '"CRITICAL HIT"'),
    ('"按住"', '"HOLD"'),
    ('"指挥中心"', '"CENTRAL COMMAND"'),
    ('"米"', '"M"'),
    ('"机械守卫"', '"DEFENSE UNIT"'),
    ('"机械飞鸥"', '"PATROL DRONE"'),
    ('"机械猎犬"', '"SECURITY HOUND"'),
    ('"已摧毁"', '"DESTROYED"'),
    ('"换弹中"', '"RELOADING..."'),
    ('"换弹"', '"RELOAD"'),
    ('"弹药不足"', '"LOW AMMO"'),
    ('"发现敌情 · "', '"HOSTILE CONTACT · "'),
    ('"已从水中获救"', '"RECOVERED FROM WATER"'),
    ('"切断中继 "', '"DISABLE RELAY "'),
    ('"中继尚未断开，撤离艇无法在火力下接应"', '"RELAYS ACTIVE — EXTRACTION BOAT CANNOT DOCK UNDER FIRE"'),
    
    # Radio Dialogues
    ('intro:"几猫队员，这里是指挥中心。港区主控已封锁泊位。切断堆场、仓库、码头的三处中继。"', 'intro:"Operative, Central Command here. Harbor defenses have gone rogue. Disable the three relays in the container yard, maintenance shed, and quayside."'),
    ('contact:"你已被发现！空中有机械飞鸥，地面有机械猎犬。消灭它们。"', 'contact:"Hostiles alerted! Patrol drones airborne, security hounds advancing. Neutralize them!"'),
    ('"第一处中继已断开。敌方已察觉，机械守卫正在赶来。"', '"Relay A disabled. Security grid alerted—reinforcements en route!"'),
    ('"第二处中继已断开。敌方正全力围攻，小心应对。"', '"Relay B disabled. High-threat alert triggered—watch your corners!"'),
    ('all:"三处中继全部断开！撤离艇在码头南端的舷梯旁，快撤！"', 'all:"All relays disabled! Extraction vessel waiting at the south quay ladder. Evacuate now!"'),
    ('low:"伤势严重！找掩体躲避，稍作恢复。"', 'low:"Critical damage! Find cover and regenerate!"'),
    ('done:"几猫队员已登船，港区封锁解除。干得漂亮！"', 'done:"Operative extracted. Harbor blackout engaged. Mission accomplished!"'),
    
    # Objective Tracker text
    ('"前往撤离艇"', '"PROCEED TO EXTRACTION BOAT"'),
    ('"切断三处上行中继"', '"DISABLE 3 DEFENSE RELAYS"'),
    ('"切断最后一处中继"', '"DISABLE FINAL RELAY"'),
    ('`切断剩余 ${P} 处中继`', '`DISABLE ${P} REMAINING RELAYS`'),
    ('short:"撤离",label:"撤离艇"', 'short:"EVAC",label:"EXTRACTION BOAT"'),
    ('short:"中继",label:"中继"', 'short:"RELAY",label:"RELAY"'),
    
    # Mission Ratings
    ('["险象环生","火力全开","稳扎稳打","干净利落","精准果断","完美突击"]', '["SURVIVOR","AGGRESSIVE","TACTICAL","EFFICIENT","PRECISION","FLAWLESS"]'),
    
    # Controls Guide & Tooltips
    ('"移动"', '"MOVE"'),
    ('"视角"', '"LOOK"'),
    ('"鼠标"', '"MOUSE"'),
    ('"开火"', '"FIRE"'),
    ('"鼠标左键"', '"LEFT CLICK"'),
    ('"瞄准"', '"AIM"'),
    ('"鼠标右键"', '"RIGHT CLICK"'),
    ('"跳跃"', '"JUMP"'),
    ('"冲刺"', '"SPRINT"'),
    ('"蹲伏"', '"CROUCH"'),
    ('"近战"', '"MELEE"'),
    ('"暂停"', '"PAUSE"'),
    ('"交互"', '"INTERACT"'),
    ('"切断中继"', '"DISABLE RELAY"'),
    ('"点击开火"', '"CLICK TO FIRE"'),
    ('"移动鼠标调整视角"', '"MOVE MOUSE TO LOOK"'),
    ('"也可转向"', '"OR TURN"'),
    ('"方向键或"', '"ARROW KEYS OR"'),
    ('"释放"', '"RELEASE"'),
    ('"按"', '"PRESS"'),
    ('"或"', '"OR"'),
    ('"停在屏幕边缘持续转向"', '"HOLD AT EDGE TO CONTINUOUSLY TURN"'),
    ('"点击游戏画面以捕获鼠标"', '"CLICK GAME VIEW TO LOCK MOUSE"'),
    ('"鼠标已捕获"', '"MOUSE LOCKED"'),
    ('"鼠标捕获不可用"', '"POINTER LOCK UNAVAILABLE"'),
    ('"触屏操作已启用"', '"TOUCH CONTROLS ENABLED"'),
    ('"左手拇指在左侧任意位置滑动"', '"SWIPE LEFT THUMB TO MOVE"'),
    ('"在屏幕右侧拖动"', '"DRAG RIGHT SIDE TO AIM"'),
    ('"拖动跟踪目标"', '"TRACK TARGET"'),
    ('"切换瞄准状态"', '"TOGGLE ADS"'),
    ('"点击"', '"TAP"'),
    ('"靠近中继并按住"', '"APPROACH RELAY AND HOLD"'),
    ('"将摇杆推到最前方"', '"PUSH STICK FORWARD"'),
    
    # Settings & Menu Text
    ('"画面质量"', '"GRAPHICS QUALITY"'),
    ('{low:"低",medium:"中",high:"高",ultra:"极高"}', '{low:"Low",medium:"Medium",high:"High",ultra:"Ultra"}'),
    ('"鼠标灵敏度"', '"MOUSE SENSITIVITY"'),
    ('"反转垂直视角"', '"INVERT Y-AXIS"'),
    ('"开启"', '"ON"'),
    ('"关闭"', '"OFF"'),
    ('"主音量"', '"MASTER VOLUME"'),
    ('"视野范围"', '"FIELD OF VIEW"'),
    ('"显示模式"', '"DISPLAY MODE"'),
    ('"进入全屏"', '"FULLSCREEN"'),
    ('"退出全屏"', '"EXIT FULLSCREEN"'),
    ('"当前环境不支持全屏"', '"Fullscreen not supported in this environment"'),
    ('`已根据设备自动选择画质（${({low:"低",medium:"中",high:"高",ultra:"极高"})[U]||"默认"}），运行不流畅时可降低画质。`', '`Quality automatically adjusted for your hardware (${({low:"Low",medium:"Medium",high:"High",ultra:"Ultra"})[U]||"Default"}). Lower if needed for performance.`'),
    ('"画质设置立即生效；阴影和反射需要片刻重新生成。"', '"Settings take effect immediately; shadows and reflections will update."'),
    ('"继续游戏后将重新捕获鼠标。"', '"Mouse will be locked upon resuming."'),
    ('<h3>键盘 · 鼠标</h3>', '<h3>KEYBOARD & MOUSE</h3>'),
    ('<h3>触屏操作</h3>', '<h3>TOUCH CONTROLS</h3>'),
    ('<h3>手柄</h3>', '<h3>GAMEPAD</h3>'),
    ('<p class="panel-note">若浏览器无法捕获鼠标，按住鼠标按钮并拖动以调整视角（左键同时开火，右键同时瞄准）。方向键或 <kbd>I</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> 转向，<kbd>Enter</kbd> 开火。</p>', '<p class="panel-note">If pointer lock is unavailable, drag mouse to look (L-click fires, R-click aims). Arrow keys or I/J/K/L turn, Enter fires.</p>'),
    ('<p class="panel-note">摇杆移动与转动视角 · RT 开火 · LT 瞄准 · A 跳跃 · B 蹲伏 · X 换弹 · Y 切断中继 · L3 冲刺 · Start 暂停。</p>', '<p class="panel-note">Sticks move & look · RT Fire · LT Aim · A Jump · B Crouch · X Reload · Y Disable Relay · L3 Sprint · Start Pause.</p>'),
    ('<b>几猫港区 · 四号泊位 · 05:42</b><span>几猫突击小队 · 单兵行动，无人支援</span>', '<b>NORTHSTAR HARBOR · BERTH 04 · 05:42</b><span>SOLITARY OPERATIVE · DEFENSE OVERRIDE ACTIVE</span>'),
    
    # Boot sequence & error handling
    ('"正在启动渲染器"', '"INITIALIZING RENDERER..."'),
    ('"正在生成涂装、锈迹与雨水"', '"GENERATING INDUSTRIAL MATERIALS & RAIN..."'),
    ('"正在布置集装箱"', '"ASSEMBLING CONTAINER YARD..."'),
    ('"正在架设起重机"', '"ERECTING QUAYSIDE CRANES..."'),
    ('"正在生成港区地面"', '"BUILDING HARBOR TERRAIN & PUDDLES..."'),
    ('"正在加载弹道与烟雾"', '"COMPILING BALLISTICS & ATMOSPHERE..."'),
    ('"正在检查几猫制式步枪"', '"CALIBRATING AR-9 SERVICE RIFLE..."'),
    ('"正在启动港区主控"', '"ACTIVATING ROGUE HARBOR GRID..."'),
    ('"正在准备首帧画面"', '"PREPARING FRAMEBUFFER..."'),
    ('"准备就绪"', '"OPERATION READY"'),
    ('"几猫启动失败："', '"HARBOR BLACKOUT BOOT ERROR: "'),
    ('`几猫性能测试  t=${o.toFixed(0)}s', '`HARBOR BLACKOUT BENCHMARK  t=${o.toFixed(0)}s'),
]

for src, dst in replacements:
    content = content.replace(src, dst)

# 4. Check for HTML Panel elements that still contain Chinese (e.g. about panel, tabs)
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

# 5. Replace any remaining Chinese characters
remaining = set(re.findall(r"[\u4e00-\u9fff]", content))
print(f"Remaining Chinese characters before final sweep: {len(remaining)}")
if remaining:
    print("Remaining chars:", "".join(list(remaining)[:30]))
    # Run a sweep on lines that contain Chinese
    lines = content.split("\n")
    for idx, line in enumerate(lines):
        m = re.findall(r"[\u4e00-\u9fff]+", line)
        if m:
            print(f"L{idx+1}: {m}")

# Save the complete index.html
output_index = os.path.join(output_dir, "index.html")
with open(output_index, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Saved complete index.html ({len(content)} bytes)")
