import { Dispatch, SetStateAction } from "react";

export type GetValueChange<T> = (value: T, attr?: string, name?: string, setValue?: Dispatch<SetStateAction<string>>) => void