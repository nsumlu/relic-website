import type { CSSProperties } from 'react'

/** Sets the `--d` custom property used by the reveal / hero animations as a stagger delay. */
export const delay = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties
