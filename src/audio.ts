/**
 * HARBOR BLACKOUT - Procedural Web Audio API Sound Synthesizer
 * 全部音效实时合成，无外部音频文件。
 */

type AudioContextCtor = new (options?: AudioContextOptions) => AudioContext;

export class HarborAudio {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  ambienceGain: GainNode | null = null;
  volume = 0.8;
  muted = false;
  initialized = false;
  interior = false;

  init(): void {
    if (this.initialized) return;
    const win = window as typeof window & { webkitAudioContext?: AudioContextCtor };
    const AudioContextClass: AudioContextCtor | undefined = win.AudioContext ?? win.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
    void this.ctx.resume();

    this.startAmbience();
  }

  setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    }
  }

  setInterior(on: boolean): void {
    this.interior = on;
    if (this.ambienceGain && this.ctx) {
      this.ambienceGain.gain.setTargetAtTime(on ? 0.09 : 0.2, this.ctx.currentTime, 0.4);
    }
  }

  private noise(duration: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const size = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  private tone(freq: number, endFreq: number, duration: number, type: OscillatorType, gainValue: number, delay = 0): void {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), t + duration);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainValue, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  private click(freq: number, duration: number, gainValue: number, delay = 0): void {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.noise(duration);
    if (!buffer) return;
    const t = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 1.2;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainValue, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start(t);
  }

  playGunshot(): void {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const buffer = this.noise(0.16);
    if (buffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(5200, t);
      filter.frequency.exponentialRampToValueAtTime(340, t + 0.16);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.75, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(t);
    }

    this.tone(150, 38, 0.11, "sine", 0.55);
    this.tone(72, 30, 0.2, "triangle", 0.24, 0.01);
  }

  playHitMarker(isKill = false): void {
    this.tone(isKill ? 1700 : 1150, isKill ? 2500 : 1500, 0.06, "sine", 0.22);
    if (isKill) this.tone(2400, 3000, 0.05, "sine", 0.12, 0.045);
  }

  playReload(): void {
    this.click(2600, 0.035, 0.35);
    this.click(1500, 0.05, 0.3, 0.55);
    this.click(3200, 0.03, 0.32, 1.35);
    this.tone(260, 120, 0.06, "square", 0.06, 1.4);
  }

  playEmpty(): void {
    this.click(3800, 0.025, 0.28);
  }

  /** 原版脚步：低通噪声短促脉冲，冲刺时更亮 */
  playStep(running = false): void {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.noise(0.09);
    if (!buffer) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = running ? 520 : 380;
    filter.Q.value = 1.1;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(running ? 0.055 : 0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start(t);
  }

  /** 抛壳金属轻响 */
  playShell(): void {
    this.click(5200, 0.035, 0.09, 0.06);
    this.click(3400, 0.045, 0.06, 0.12);
  }

  /** 子弹打在墙/地面上的弹着点 */
  playImpact(): void {
    this.click(760, 0.06, 0.16);
    this.tone(170, 62, 0.08, "triangle", 0.1);
  }

  playUi(): void {
    this.click(2200, 0.03, 0.16);
  }

  playAlert(): void {
    this.tone(520, 760, 0.16, "square", 0.07);
    this.tone(760, 520, 0.2, "square", 0.06, 0.18);
  }

  playHurt(): void {
    this.tone(120, 46, 0.3, "sawtooth", 0.2);
    this.click(420, 0.12, 0.16);
  }

  playObjective(): void {
    this.tone(660, 660, 0.12, "sine", 0.12);
    this.tone(990, 990, 0.2, "sine", 0.1, 0.1);
  }

  playVictory(): void {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, f, 0.5, "triangle", 0.1, i * 0.14));
  }

  playDroneShot(): void {
    this.tone(880, 220, 0.12, "sawtooth", 0.08);
  }

  /** 敌人持续性噪声循环（无人机旋翼 / 猎犬伺服） */
  loop(name: string, opts: { pos?: { x: number; y: number; z: number }; gain?: number } = {}): {
    stop: () => void;
    setGain: (value: number) => void;
    setPos: (pos: { x: number; y: number; z: number }) => void;
    setPitch: (value: number) => void;
  } | null {
    if (!this.ctx || !this.masterGain) return null;
    const t = this.ctx.currentTime;
    const base = name === "gull_rotor" ? 92 : 58;
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = base;
    const osc2 = this.ctx.createOscillator();
    osc2.type = "square";
    osc2.frequency.value = base * 1.51;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = name === "gull_rotor" ? 900 : 420;
    const gain = this.ctx.createGain();
    const level = Math.max(0, Math.min(1, opts.gain ?? 0.2));
    gain.gain.setValueAtTime(level * 0.16, t);
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc2.start(t);
    return {
      stop: () => {
        try {
          osc.stop();
          osc2.stop();
          gain.disconnect();
        } catch {
          /* 已停止 */
        }
      },
      setGain: (value: number) => {
        if (!this.ctx) return;
        gain.gain.setTargetAtTime(Math.max(0, Math.min(1, value)) * 0.16, this.ctx.currentTime, 0.08);
      },
      setPos: () => {
        /* 当前使用非空间化音频，位置变化忽略 */
      },
      setPitch: (value: number) => {
        if (!this.ctx) return;
        const rate = Math.max(0.25, Math.min(2.5, value));
        osc.frequency.setTargetAtTime(base * rate, this.ctx.currentTime, 0.12);
        osc2.frequency.setTargetAtTime(base * 1.51 * rate, this.ctx.currentTime, 0.12);
      },
    };
  }

  startAmbience(): void {
    if (!this.ctx || !this.masterGain) return;
    // 雨声 + 港区风声：滤波粉噪
    const bufferSize = Math.floor(this.ctx.sampleRate * 2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.96 * b1 + white * 0.11;
      b2 = 0.86 * b2 + white * 0.25;
      data[i] = (b0 + b1 + b2) * 0.15;
    }

    const rain = this.ctx.createBufferSource();
    rain.buffer = buffer;
    rain.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1300;
    filter.Q.value = 0.55;

    this.ambienceGain = this.ctx.createGain();
    this.ambienceGain.gain.value = this.interior ? 0.09 : 0.2;

    rain.connect(filter);
    filter.connect(this.ambienceGain);
    this.ambienceGain.connect(this.masterGain);
    rain.start();
  }
}

export const harborAudio = new HarborAudio();
