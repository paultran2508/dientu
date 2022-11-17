import { Dispatch, SetStateAction } from "react";

type Callback<T> = { value: T, attr?: string, name?: string, setValue?: Dispatch<SetStateAction<string>> }

export type GetValueChange<T> = (callback: Callback<T>) => void