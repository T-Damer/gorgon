import 'gradients.css'
import { cn } from 'helpers/cn'
import { useEffect, useRef, useState } from 'react'

const LIGHT_THEME_COLORS = {
  gradientBackgroundStart: '#f3f4f6',
  gradientBackgroundEnd: '#d1d5db',
  firstColor: 'rgba(148, 163, 184, 0.28)',
  secondColor: '229, 231, 235',
  thirdColor: '203, 213, 225',
  fourthColor: '156, 163, 175',
  fifthColor: '107, 114, 128',
  pointerColor: '148, 163, 184',
} as const

const DARK_THEME_COLORS = {
  gradientBackgroundStart: '#111827',
  gradientBackgroundEnd: '#030712',
  firstColor: 'rgba(71, 85, 105, 0.4)',
  secondColor: '55, 65, 81',
  thirdColor: '31, 41, 55',
  fourthColor: '75, 85, 99',
  fifthColor: '17, 24, 39',
  pointerColor: '107, 114, 128',
} as const

const getIsDarkTheme = () => {
  const root = document.documentElement

  if (root.classList.contains('dark')) {
    return true
  }

  if (root.classList.contains('light')) {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const BgGradients = ({
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor,
  secondColor,
  thirdColor,
  fourthColor,
  fifthColor,
  pointerColor,
  size = '100%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = () => setIsDarkTheme(getIsDarkTheme())
    const observer = new MutationObserver(syncTheme)

    syncTheme()
    mediaQuery.addEventListener('change', syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      mediaQuery.removeEventListener('change', syncTheme)
      observer.disconnect()
    }
  }, [])

  const themeColors = isDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS
  const resolvedGradientBackgroundStart =
    gradientBackgroundStart ?? themeColors.gradientBackgroundStart
  const resolvedGradientBackgroundEnd =
    gradientBackgroundEnd ?? themeColors.gradientBackgroundEnd
  const resolvedFirstColor = firstColor ?? themeColors.firstColor
  const resolvedSecondColor = secondColor ?? themeColors.secondColor
  const resolvedThirdColor = thirdColor ?? themeColors.thirdColor
  const resolvedFourthColor = fourthColor ?? themeColors.fourthColor
  const resolvedFifthColor = fifthColor ?? themeColors.fifthColor
  const resolvedPointerColor = pointerColor ?? themeColors.pointerColor

  useEffect(() => {
    document.body.style.setProperty(
      '--gradient-background-start',
      resolvedGradientBackgroundStart
    )
    document.body.style.setProperty(
      '--gradient-background-end',
      resolvedGradientBackgroundEnd
    )
    document.body.style.setProperty('--first-color', resolvedFirstColor)
    document.body.style.setProperty('--second-color', resolvedSecondColor)
    document.body.style.setProperty('--third-color', resolvedThirdColor)
    document.body.style.setProperty('--fourth-color', resolvedFourthColor)
    document.body.style.setProperty('--fifth-color', resolvedFifthColor)
    document.body.style.setProperty('--pointer-color', resolvedPointerColor)
    document.body.style.setProperty('--size', size)
    document.body.style.setProperty('--blending-value', blendingValue)
  }, [
    blendingValue,
    resolvedFifthColor,
    resolvedFirstColor,
    resolvedFourthColor,
    resolvedGradientBackgroundEnd,
    resolvedGradientBackgroundStart,
    resolvedPointerColor,
    resolvedSecondColor,
    resolvedThirdColor,
    size,
  ])

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return
      }
      setCurX(curX + (tgX - curX) / 20)
      setCurY(curY + (tgY - curY) / 20)
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`
    }

    move()
  }, [tgX, tgY])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      setTgX(event.clientX - rect.left)
      setTgY(event.clientY - rect.top)
    }
  }

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div className="absolute inset-0 h-dvh w-dvw overflow-hidden">
      <div
        className={cn(
          'relative h-full w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
          containerClassName
        )}
      >
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className={cn('', className)}>{children}</div>
        <div
          className={cn(
            'gradients-container h-full w-full blur-lg',
            isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]'
          )}
        >
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
              `[transform-origin:center_center]`,
              `animate-first`,
              `opacity-100`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
              `[transform-origin:calc(50%-400px)]`,
              `animate-second`,
              `opacity-100`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
              `[transform-origin:calc(50%+400px)]`,
              `animate-third`,
              `opacity-100`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
              `[transform-origin:calc(50%-200px)]`,
              `animate-fourth`,
              `opacity-70`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
              `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
              `animate-fifth`,
              `opacity-100`
            )}
          ></div>

          {interactive && (
            <div
              ref={interactiveRef}
              onMouseMove={handleMouseMove}
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                `-top-1/2 -left-1/2 h-full w-full [mix-blend-mode:var(--blending-value)]`,
                `opacity-70`
              )}
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}
