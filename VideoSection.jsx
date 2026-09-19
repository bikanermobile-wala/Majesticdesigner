import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { featuredVideo } from '../data/videos'

const Icon = ({ name }) => {
  const p = {
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
    pause: <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" stroke="none" />,
    on: <><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /></>,
    off: <><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" /><path d="M17 9l5 6M22 9l-5 6" /></>,
    full: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  }[name]
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {p}
    </svg>
  )
}

// Reusable autoplaying player: muted start, loop, playsInline, sound / play / fullscreen controls.
// Falls back to the supplied Cloudinary embed if the direct file cannot be played.
export function VideoPlayer({ video, startMuted = true, cover = true, className = '' }) {
  const wrapRef = useRef(null)
  const vidRef = useRef(null)
  const userPaused = useRef(false)
  const [muted, setMuted] = useState(startMuted)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Try to autoplay. If sound is blocked by the browser, fall back to muted playback.
  useEffect(() => {
    const v = vidRef.current
    if (!v || failed) return
    v.muted = startMuted
    const attempt = v.play()
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        v.muted = true
        setMuted(true)
        v.play().catch(() => {})
      })
    }
  }, [failed, startMuted, video.src])

  // Pause when off-screen to save battery/data.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || failed || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = vidRef.current
        if (!v) return
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [failed])

  const togglePlay = () => {
    const v = vidRef.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  const toggleSound = () => {
    const v = vidRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.paused) v.play().catch(() => {})
  }

  const toggleFullscreen = () => {
    const el = wrapRef.current
    const v = vidRef.current
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      ;(document.exitFullscreen || document.webkitExitFullscreen).call(document)
    } else if (el && (el.requestFullscreen || el.webkitRequestFullscreen)) {
      ;(el.requestFullscreen || el.webkitRequestFullscreen).call(el)
    } else if (v && v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen() // iPhone Safari
    }
  }

  return (
    <div ref={wrapRef} className={`vp ${cover ? 'vp--cover' : 'vp--contain'} ${className}`}>
      {failed ? (
        <iframe
          className="vp__frame"
          title={video.title}
          src={`${video.embedUrl}&autoplay=true&muted=true&loop=true`}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <video
            ref={vidRef}
            className={`vp__video ${ready ? 'is-ready' : ''}`}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted={startMuted}
            loop
            playsInline
            preload="auto"
            aria-label={video.title}
            onLoadedData={() => setReady(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
          <div className="vp__controls">
            <button type="button" className="vp__btn" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
              <Icon name={playing ? 'pause' : 'play'} />
              <span className="vp__label">{playing ? 'Pause' : 'Play'}</span>
            </button>
            <button type="button" className="vp__btn" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
              <Icon name={muted ? 'off' : 'on'} />
              <span className="vp__label">{muted ? 'Sound off' : 'Sound on'}</span>
            </button>
            <button type="button" className="vp__btn" onClick={toggleFullscreen} aria-label="Fullscreen">
              <Icon name="full" />
              <span className="vp__label">Fullscreen</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Cinematic full-width homepage section.
export default function VideoSection({ video = featuredVideo }) {
  return (
    <section className="vsec" aria-labelledby="vsec-title">
      <div className="vsec__head wrap">
        <h2 id="vsec-title" className="h-display h-lg" data-reveal="text">A GLIMPSE INTO MAJESTIC</h2>
      </div>
      <div className="vsec__stage">
        <VideoPlayer video={video} startMuted cover />
        <div className="vsec__shade" aria-hidden="true" />
        <div className="vsec__overlay wrap">
          <p className="vsec__title h-display">THE MAJESTIC EXPERIENCE</p>
          <Button to="/collections" variant="solid" arrow>Explore the collection</Button>
        </div>
      </div>
    </section>
  )
}
