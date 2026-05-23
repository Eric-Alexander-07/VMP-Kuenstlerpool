'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const LOGOS: { name: string; prominent: boolean }[] = [
  { name: 'AUDI',           prominent: true  },
  { name: 'PORSCHE',        prominent: true  },
  { name: 'VOLKSWAGEN',     prominent: true  },
  { name: 'DEUTSCHE BANK',  prominent: true  },
  { name: 'SAMSUNG',        prominent: true  },
  { name: 'REWE',           prominent: false },
  { name: 'DEUTSCHE POST',  prominent: false },
  { name: 'DVAG',           prominent: false },
  { name: 'DEBEKA',         prominent: false },
  { name: 'STIHL',          prominent: false },
  { name: 'BRIDGESTONE',    prominent: false },
  { name: 'WACKER CHEMIE',  prominent: false },
  { name: 'SONY ERICSSON',  prominent: false },
  { name: 'GRUNER & JAHR',  prominent: false },
]
const SIDEBAR_W = '26%'

const BAR_COUNT = 46

// Static resting heights (shown when paused) — minimum 14px to avoid dot artefacts
const REST_HEIGHTS = [
  14, 18, 28, 14, 36, 20, 14, 32, 18, 42, 26, 14, 36, 16, 46,
  22, 14, 40, 16, 34, 20, 14, 30, 18, 44, 14, 36, 26, 14, 30,
  16, 24, 38, 18, 44, 14, 32, 22, 14, 40, 16, 34, 14, 28, 20, 14,
]

const sineDelay  = (i: number) => Math.sin((i / BAR_COUNT) * Math.PI) * 0.4
const barDuration = (i: number) => 3.5 + ((i * 7) % 13) / 6
const barOpacity  = (i: number) => {
  const c = (BAR_COUNT - 1) / 2
  return 0.75 - (Math.abs(i - c) / c) * 0.45
}

// ── Combined waveform + audio player ──────────────────────────
function AudioPlayer() {
  const audioRef   = useRef<HTMLAudioElement>(null)
  const ctxRef     = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef     = useRef<number>(0)
  const barRefs    = useRef<(HTMLDivElement | null)[]>([])

  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  // --- animate loop: reads frequency data, writes directly to DOM ---
  const animate = useCallback(() => {
    const analyser = analyserRef.current
    if (!analyser) return

    const data = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(data)

    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      // Map bar index to lower-mid frequency range (bins 0–40% of spectrum)
      const binIndex = Math.floor((i / BAR_COUNT) * analyser.frequencyBinCount * 0.55)
      const raw = data[binIndex] / 255
      // Apply a floor so bars never collapse into dots
      const height = Math.max(7, raw * 46 + 2)
      bar.style.height = `${height}px`
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  // --- init Web Audio on first play (browser requires user gesture) ---
  const initAudio = useCallback(() => {
    if (ctxRef.current) return
    const ctx      = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize      = 128   // 64 frequency bins — enough for 30 bars
    analyser.smoothingTimeConstant = 0.75 // smooths rapid changes

    const source = ctx.createMediaElementSource(audioRef.current!)
    source.connect(analyser)
    analyser.connect(ctx.destination)

    ctxRef.current    = ctx
    analyserRef.current = analyser
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    initAudio()
    if (playing) {
      audio.pause()
      cancelAnimationFrame(rafRef.current)
      setPlaying(false)
    } else {
      ctxRef.current?.resume()
      audio.play()
      rafRef.current = requestAnimationFrame(animate)
      setPlaying(true)
    }
  }, [playing, initAudio, animate])

  const onTimeUpdate = () => {
    const a = audioRef.current
    if (a && a.duration) setProgress(a.currentTime / a.duration)
  }

  const onEnded = () => {
    cancelAnimationFrame(rafRef.current)
    setPlaying(false)
    setProgress(0)
    // Reset bars to resting heights
    barRefs.current.forEach((bar, i) => {
      if (bar) bar.style.height = `${REST_HEIGHTS[i]}px`
    })
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current
    if (!a) return
    const rect  = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    a.currentTime = ratio * a.duration
    setProgress(ratio)
  }

  // Cleanup on unmount
  useEffect(() => () => { cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div className="flex flex-col gap-3">
      {/* Waveform bars */}
      <div
        className="flex items-center justify-center w-full"
        style={{ height: 48, gap: 2 }}
      >
        {REST_HEIGHTS.map((h, i) => (
          playing && !reduced ? (
            // Live mode: plain div, height driven by Web Audio via ref
            <div
              key={i}
              ref={el => { barRefs.current[i] = el }}
              style={{
                width: 3,
                height: h,
                borderRadius: 999,
                backgroundColor: '#E8653A',
                opacity: barOpacity(i),
                transformOrigin: 'center',
                transition: 'height 0.05s linear',
                flexShrink: 0,
              }}
            />
          ) : (
            // Idle mode: Framer Motion slow sine animation
            <motion.div
              key={i}
              ref={el => { barRefs.current[i] = el as HTMLDivElement | null }}
              animate={reduced ? {} : {
                scaleY: [1, 0.25, 0.75, 0.15, 0.6, 1],
              }}
              transition={reduced ? {} : {
                duration: barDuration(i),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sineDelay(i),
              }}
              style={{
                width: 3,
                height: h,
                borderRadius: 999,
                backgroundColor: '#E8653A',
                opacity: barOpacity(i),
                transformOrigin: 'center',
                flexShrink: 0,
              }}
            />
          )
        ))}
      </div>

      {/* Player tile */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <audio
          ref={audioRef}
          src="/Song1.mp3"
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          preload="metadata"
        />

        {/* Controls row */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Abspielen'}
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 34, height: 34,
              backgroundColor: playing ? 'var(--color-orange)' : 'rgba(234,88,12,0.2)',
              border: '1px solid rgba(234,88,12,0.4)',
              cursor: 'pointer',
              color: playing ? '#fff' : 'var(--color-orange)',
              transition: 'background-color 0.2s',
            }}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="1.5" y="1" width="3" height="10" rx="1"/>
                <rect x="7.5" y="1" width="3" height="10" rx="1"/>
              </svg>
            ) : (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor">
                <path d="M1 1.5L10 6L1 10.5V1.5Z"/>
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <p className="font-body font-semibold text-white truncate" style={{ fontSize: 12 }}>
              Mal reinhören
            </p>
            <p className="font-body" style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>
              Groove Control · Live-Demo
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mx-4 mb-4 rounded-full cursor-pointer"
          style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.1)' }}
          onClick={seek}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: 'var(--color-orange)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ── TrustedBy section ─────────────────────────────────────────
export default function TrustedBy() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full flex"
    >
      {/* White left portion */}
      <div className="flex-1 bg-white py-4 md:py-6 px-5 md:px-8 flex flex-col justify-center gap-3">
        {/* Row 1: label + prominent logos (scrollable on mobile) */}
        <div className="flex items-center gap-3 md:gap-6">
          <span
            className="font-body font-semibold uppercase flex-shrink-0"
            style={{ fontSize: 9, color: 'var(--color-subtle)', letterSpacing: '0.15em' }}
          >
            Gebucht von
          </span>
          <div className="hidden md:block h-4 w-px flex-shrink-0" style={{ backgroundColor: 'var(--color-border)' }} />
          <div
            className="flex items-center gap-5 md:gap-8 md:flex-wrap"
            style={{ overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 1 }}
          >
            {LOGOS.filter(l => l.prominent).map(({ name }) => (
              <span
                key={name}
                className="font-body font-bold uppercase tracking-widest flex-shrink-0"
                style={{ fontSize: 12, color: '#9C948C', letterSpacing: '0.12em' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2: secondary logos — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 flex-wrap">
          {LOGOS.filter(l => !l.prominent).map(({ name }) => (
            <span
              key={name}
              className="font-body font-medium uppercase tracking-widest"
              style={{ fontSize: 10, color: '#C8C2BB', letterSpacing: '0.1em' }}
            >
              {name}
            </span>
          ))}
          <span className="font-body font-medium" style={{ fontSize: 10, color: '#C8C2BB', letterSpacing: '0.04em' }}>
            u.v.m.
          </span>
        </div>
      </div>

      {/* Dark right strip */}
      <div
        className="hidden lg:flex flex-shrink-0 flex-col justify-center gap-4"
        style={{
          width: SIDEBAR_W,
          backgroundColor: 'var(--color-bg-dark)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          padding: '18px 20px',
        }}
      >
        <AudioPlayer />
      </div>
    </motion.section>
  )
}
