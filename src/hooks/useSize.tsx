import { useEffect, useState } from 'react'

const useSize = () => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? [window?.innerWidth, window?.innerHeight] : [0, 0]
  )

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize([window?.innerWidth, window?.innerHeight])
    }
    window?.addEventListener('resize', windowSizeHandler)

    return () => {
      window?.removeEventListener('resize', windowSizeHandler)
    }
  }, [])

  return windowSize
}

export default useSize
