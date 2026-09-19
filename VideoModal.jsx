import { useEffect, useRef } from 'react'
import { VideoPlayer } from './VideoSection'

export default function VideoModal({ video, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={video.title}>
      <button type="button" className="modal__backdrop" aria-label="Close video" onClick={onClose} tabIndex={-1} />
      <div className="modal__panel">
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close video">
          <span /><span />
        </button>
        <div className="modal__stage">
          <VideoPlayer video={video} startMuted={false} cover={false} />
        </div>
        <div className="modal__caption">
          <h2 className="h-display h-md">{video.title}</h2>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  )
}
