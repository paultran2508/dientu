import { MouseEvent } from 'react'

export { default as Button } from './Button'
// export type T = (x? : any) => any | undefined
export type HandleClickButton<T> = (e: MouseEvent, data?: T) => void
// export function HandleClickButton<T>(e: MouseEvent, data: T) { }