'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorVariant = 'default' | 'hover' | 'globe'

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isDesktop, setIsDesktop] = useState(false)
  const variantRef = useRef<CursorVariant>('default')

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  const springCfg = { damping: 26, stiffness: 260, mass: 0.6 }
  const x = useSpring(rawX, springCfg)
  const y = useSpring(rawY, springCfg)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="globe"]')) {
        variantRef.current = 'globe'
        setVariant('globe')
      } else if (target.closest('a, button, [role="button"], [data-cursor="hover"]')) {
        variantRef.current = 'hover'
        setVariant('hover')
      } else {
        variantRef.current = 'default'
        setVariant('default')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [isDesktop, rawX, rawY])

  if (!isDesktop) return null

  return (
    <AnimatePresence>
      {variant !== 'globe' ? (
        <motion.div
          key="dot"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
            mixBlendMode: 'difference',
          }}
          animate={
            variant === 'hover'
              ? {
                  width: 40,
                  height: 40,
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: '#7ECECA',
                  borderStyle: 'solid',
                  borderRadius: '50%',
                }
              : {
                  width: 6,
                  height: 6,
                  backgroundColor: '#ffffff',
                  borderWidth: 0,
                  borderColor: 'transparent',
                  borderStyle: 'solid',
                  borderRadius: '50%',
                }
          }
          transition={{ type: 'spring', damping: 22, stiffness: 380, mass: 0.35 }}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
        />
      ) : (
        <motion.div
          key="crosshair"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
            width: 24,
            height: 24,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.3 }}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
        >
          <span
            style={{ backgroundColor: '#7ECECA' }}
            className="absolute top-1/2 left-0 w-full h-px -translate-y-px"
          />
          <span
            style={{ backgroundColor: '#7ECECA' }}
            className="absolute left-1/2 top-0 h-full w-px -translate-x-px"
          />
          <span
            style={{ backgroundColor: '#7ECECA' }}
            className="absolute top-1/2 left-1/2 w-[3px] h-[3px] rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
