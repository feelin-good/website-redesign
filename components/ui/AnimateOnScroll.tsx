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

export function AnimateOnScroll({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 24 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: -24 },
      visible: { opacity: 1, x: 0 },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
