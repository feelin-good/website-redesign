'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in'
  delay?: number
  threshold?: number
  once?: boolean
}

const variants = {
  'fade-up':    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  'fade-in':    { hidden: { opacity: 0 },        visible: { opacity: 1 } },
  'slide-left': { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  'slide-right':{ hidden: { opacity: 0, x: -20 },visible: { opacity: 1, x: 0 } },
  'scale-in':   { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1 } },
}

export function AnimateOnScroll({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants[animation]}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}
