import { useState, type KeyboardEvent } from 'react'
import type { MouseHandlerDataParam } from 'recharts'

export function useGithubActivity(monthCount: number) {
  const [selected, setSelected] = useState<number | null>(null)
  const isSelected = selected !== null && selected >= 0 && selected < monthCount
  const current = isSelected ? selected : monthCount - 1
  const resetSelection = () => setSelected(null)

  const previewMonth = (event: MouseHandlerDataParam) => {
    if (event.activeTooltipIndex == null) return resetSelection()
    const index = Number(event.activeTooltipIndex)
    setSelected(
      Number.isInteger(index) && index >= 0 && index < monthCount ? index : null
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') return resetSelection()
    const positions: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: monthCount - 1
    }
    const next = positions[event.key]
    if (next === undefined) return
    event.preventDefault()
    setSelected(Math.max(0, Math.min(monthCount - 1, next)))
  }

  return {
    current,
    isSelected,
    previewMonth,
    resetSelection,
    handleKeyDown
  }
}
