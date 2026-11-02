// ============================================================================
// TalentXcel Game Sound Engine (Synthesized via Web Audio API)
// 100% Client-Side • Zero Network Dependencies • Sub-millisecond Latency
// ============================================================================

class GameSoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('talentxcel_game_sound_muted')
      this.isMuted = saved === 'true'
    }
  }

  private initCtx() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('talentxcel_game_sound_muted', muted ? 'true' : 'false')
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted)
    return this.isMuted
  }

  public vibrate(pattern: number | number[] = 30) {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern)
      } catch {
        // Silently catch if browser restricts haptics
      }
    }
  }

  // 1. Soft UI Tap
  public playTap() {
    if (this.isMuted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  }

  // 2. Correct Victory Chime
  public playCorrect() {
    this.vibrate([40, 30, 60])
    if (this.isMuted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const startTime = ctx.currentTime + idx * 0.07

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.12, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.3)
    })
  }

  // 3. Incorrect Muted Thud
  public playIncorrect() {
    this.vibrate(100)
    if (this.isMuted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2)

    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  }

  // 4. Powerup Activation
  public playPowerup() {
    this.vibrate(50)
    if (this.isMuted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.18)

    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.18)
  }

  // 5. Streak Multiplier Fanfare
  public playStreak() {
    this.vibrate([50, 40, 80])
    if (this.isMuted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const notes = [440, 554.37, 659.25, 880]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const startTime = ctx.currentTime + idx * 0.05

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)
      gain.gain.setValueAtTime(0.1, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.25)
    })
  }
}

export const soundEngine = new GameSoundEngine()
