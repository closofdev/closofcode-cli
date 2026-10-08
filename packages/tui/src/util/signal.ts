import { createEffect, createSignal, on, onCleanup, type Accessor } from "solid-js"

export function createDebouncedSignal<T>(value: T, ms: number): [Accessor<T>, (value: T) => void] {
  const [get, set] = createSignal(value)
  let timer: ReturnType<typeof setTimeout> | undefined
  const debounced = (next: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      set(() => next)
    }, ms)
  }
  onCleanup(() => {
    if (timer) clearTimeout(timer)
  })
  return [get, debounced]
}

export function createPulse(enabled: Accessor<boolean>, min = 0.35, period = 1600) {
  const [alpha, setAlpha] = createSignal(1)

  createEffect(
    on(enabled, (animate) => {
      if (!animate) {
        setAlpha(1)
        return
      }

      const start = performance.now()
      const timer = setInterval(() => {
        const t = ((performance.now() - start) % period) / period
        const wave = 0.5 - 0.5 * Math.cos(t * Math.PI * 2)
        const smooth = wave * wave * (3 - 2 * wave)
        setAlpha(min + (1 - min) * smooth)
      }, 50)

      onCleanup(() => clearInterval(timer))
    }),
  )

  return alpha
}

export function createFadeIn(show: Accessor<boolean>, enabled: Accessor<boolean>) {
  const [alpha, setAlpha] = createSignal(show() ? 1 : 0)
  let revealed = show()

  createEffect(
    on([show, enabled], ([visible, animate]) => {
      if (!visible) {
        setAlpha(0)
        return
      }

      if (!animate || revealed) {
        revealed = true
        setAlpha(1)
        return
      }

      const start = performance.now()
      revealed = true
      setAlpha(0)

      const timer = setInterval(() => {
        const progress = Math.min((performance.now() - start) / 160, 1)
        setAlpha(progress * progress * (3 - 2 * progress))
        if (progress >= 1) clearInterval(timer)
      }, 16)

      onCleanup(() => clearInterval(timer))
    }),
  )

  return alpha
}
