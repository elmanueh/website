import { useState, type KeyboardEvent } from 'react'
import type { MouseHandlerDataParam } from 'recharts'

export function useGithubActivity(periodCount: number) {
  const [selected, setSelected] = useState<number | null>(null)
  const isSelected = selected !== null && selected >= 0 && selected < periodCount
  const current = isSelected ? selected : periodCount - 1
  const resetSelection = () => setSelected(null)

  const previewPeriod = (event: MouseHandlerDataParam) => {
    if (event.activeTooltipIndex == null) return resetSelection()
    const index = Number(event.activeTooltipIndex)
    setSelected(Number.isInteger(index) && index >= 0 && index < periodCount ? index : null)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') return resetSelection()
    const positions: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: periodCount - 1
    }
    const next = positions[event.key]
    if (next === undefined) return
    event.preventDefault()
    setSelected(Math.max(0, Math.min(periodCount - 1, next)))
  }

  return {
    current,
    isSelected,
    previewPeriod,
    resetSelection,
    handleKeyDown
  }
}
