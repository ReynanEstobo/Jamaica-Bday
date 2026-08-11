import { useEffect, useRef, useState } from 'react'

/**
 * Same IntersectionObserver-driven scroll reveal as the original vanilla
 * script (threshold 0.15, reveal-once), but exposed as React state so
 * components can toggle Tailwind classes conditionally, e.g.:
 *
 *   const [ref, revealed] = useReveal()
 *   <div ref={ref} className={`reveal-base ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
 */
export function useReveal() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setRevealed(true)
        })
      },
      { threshold: 0.15 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, revealed]
}

/** Shared Tailwind class string for the reveal transition + state. */
export function revealClass(revealed) {
  return `reveal-base ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`
}
