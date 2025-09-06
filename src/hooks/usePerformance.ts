import { useEffect, useRef } from 'react'

export function usePerformance() {
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    const handleLoad = () => {
      const loadTime = Date.now() - startTime.current
      console.log(`Page loaded in ${loadTime}ms`)
      
      // Report to analytics if needed
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log('Performance metrics:', {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart
          })
        }
      }
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return {
    measureTime: (name: string, fn: () => void) => {
      const start = performance.now()
      fn()
      const end = performance.now()
      console.log(`${name} took ${end - start} milliseconds`)
    }
  }
}

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    })

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [callback, options])

  return targetRef
}
