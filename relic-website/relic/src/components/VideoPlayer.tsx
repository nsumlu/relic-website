import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

interface Props {
  src: string
  poster: string
  width: number
  height: number
  label: string
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

/** Accessible custom player: native <video>, real buttons, keyboard-operable scrubber. */
export function VideoPlayer({ src, poster, width, height, label }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<FsVideo>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [captionTracks, setCaptionTracks] = useState(0)
  const [captionsOn, setCaptionsOn] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const onTime = () => setTime(v.currentTime)
    const onMeta = () => {
      setDuration(v.duration)
      setCaptionTracks(Array.from(v.textTracks).filter((t) => t.kind === 'captions' || t.kind === 'subtitles').length)
    }
    const onPlay = () => {
      setPlaying(true)
      setStarted(true)
    }
    const onPause = () => setPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onPause)
    if (v.readyState >= 1) onMeta()
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onPause)
    }
  }, [])

  const toggle = useCallback(() => {
    const v = video.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }, [])

  const toggleMute = () => {
    const v = video.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const toggleCaptions = () => {
    const v = video.current
    if (!v) return
    const next = !captionsOn
    Array.from(v.textTracks).forEach((t) => {
      if (t.kind === 'captions' || t.kind === 'subtitles') t.mode = next ? 'showing' : 'hidden'
    })
    setCaptionsOn(next)
  }

  const fullscreen = () => {
    const el = wrap.current
    const v = video.current
    if (!el || !v) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else if (el.requestFullscreen) {
      void el.requestFullscreen()
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen() // iOS Safari
    }
  }

  const progress = duration ? (time / duration) * 100 : 0

  return (
    <div
      ref={wrap}
      className="group relative mx-auto w-full max-w-[min(100%,calc(78svh*9/16))] bg-night"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={video}
        className="h-full w-full object-contain"
        src={src}
        poster={poster}
        width={width}
        height={height}
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={toggle}
      />

      {!started && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play film"
          className="absolute inset-0 grid place-items-center text-ivory"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full border border-ivory/60 bg-night/30 backdrop-blur-sm transition duration-700 hover:scale-105 hover:border-ivory">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent px-4 pb-3 pt-10 text-ivory">
        <input
          type="range"
          className="scrub"
          min={0}
          max={duration || 0}
          step={0.05}
          value={time}
          style={{ '--p': `${progress}%` } as CSSProperties}
          aria-label="Seek"
          aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
          onChange={(e) => {
            const v = video.current
            if (v) v.currentTime = Number(e.target.value)
          }}
        />
        <div className="mt-1 flex items-center justify-between text-[0.7rem] uppercase tracking-caps">
          <div className="flex items-center gap-5">
            <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="py-1">
              {playing ? 'Pause' : 'Play'}
            </button>
            <span aria-hidden="true" className="tabular-nums text-ivory/70">
              {fmt(time)} / {fmt(duration)}
            </span>
          </div>
          <div className="flex items-center gap-5">
            {captionTracks > 0 && (
              <button type="button" onClick={toggleCaptions} aria-pressed={captionsOn} className="py-1">
                CC
              </button>
            )}
            <button type="button" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? 'Unmute' : 'Mute'} className="py-1">
              {muted ? 'Sound off' : 'Sound on'}
            </button>
            <button type="button" onClick={fullscreen} aria-label="Toggle full screen" className="py-1">
              Full
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
