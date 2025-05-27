import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLongPress } from 'use-long-press'
import RouteCard from './RouteCard'

const routes = [
  {
    href: '/',
    text: 'Main',
  },
  // {
  //   href: '/profile',
  //   text: 'Profile',
  // },
  {
    href: '/work',
    text: 'Work',
  },
]

const coolBox = [
  <div
    className="noise-filter min-h-32 min-w-32 mix-blend-multiply"
    key="noisy-cool"
  />,
  <img
    src="./img/love-death-robots.gif"
    alt="love-death-robots-gif"
    width="200px"
    height="200px"
    className="bg-black"
    key="love-death-robots"
    fetchPriority="low"
  />,
  <img
    src="./img/sonic.gif"
    alt="sonic-gif"
    width="200px"
    height="200px"
    className="object-contain p-4"
    key="sonic"
    fetchPriority="low"
  />,
  <img
    src="./img/cassette-covers.png"
    alt="cassette-covers"
    width="200px"
    height="200px"
    key="cassette-covers"
    fetchPriority="low"
    className="grayscale-100"
  />,
  <img
    src="./img/player.gif"
    alt="eva-player"
    width="200px"
    height="200px"
    key="player-cool"
    fetchPriority="low"
    className="object-cover grayscale-100"
  />,
  <img
    src="./img/whatever-happens.jpeg"
    alt="whatever-happens"
    width="200px"
    height="200px"
    key="whatever-happens"
    fetchPriority="low"
    className="object-cover grayscale-100"
  />,
  <img
    src="./img/girl.png"
    alt="girl"
    width="200px"
    height="200px"
    key="girl-cool"
    fetchPriority="low"
  />,
  <img
    src="./img/berserk.jpg"
    alt="berserk"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="berserk-cool"
    fetchPriority="low"
  />,
  <img
    src="./img/keyboard-shift.jpg"
    alt="keyboard-cool"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="keyboard-shift"
    fetchPriority="low"
  />,
]

export default function Navigator() {
  const [parent] = useAutoAnimate()
  const [coolIndex, setCoolIndex] = useState(0)
  const intervalRef = useRef<number>(null)
  const handlers = useLongPress((e) => {
    e.preventDefault()
    goPrevCool()
  })

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCoolIndex((prev) => (prev + 1) % coolBox.length)
    }, 10000)
  }, [])

  const goNextCool = useCallback(() => {
    setCoolIndex((prev) => (prev + 1) % coolBox.length)
    startInterval()
  }, [startInterval])

  const goPrevCool = useCallback(() => {
    setCoolIndex((prev) => (prev - 1 + coolBox.length) % coolBox.length)
    startInterval()
    return false
  }, [startInterval])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startInterval])

  return (
    <nav className="dark:border-white-pale flex h-32 min-h-32 min-w-32 flex-row items-center border-t-2 sm:h-full sm:flex-col sm:border-t-0 sm:border-r-2">
      {routes.map((props) => (
        <RouteCard key={props.text + props.href} {...props} />
      ))}
      <div
        className="after:bg-accent after:content:'' flex max-h-32 min-h-32 max-w-32 min-w-32 flex-2 after:absolute after:inset-0 after:h-32 after:w-32 after:opacity-0 after:transition-opacity after:duration-1000 hover:after:opacity-20 sm:w-full md:h-full md:flex-1"
        onClick={goNextCool}
        onContextMenu={(e) => {
          e.preventDefault()
          goPrevCool()
        }}
        {...handlers()}
        ref={parent}
      >
        {coolBox[coolIndex]}
      </div>
    </nav>
  )
}
