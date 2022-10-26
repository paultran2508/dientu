import { MouseEvent } from 'react'

export { default as Button } from './Button'
export type HandleClickButton<T> = (e: MouseEvent, data?: T) => void
// export function HandleClickButton<T>(e: MouseEvent, data: T) { }