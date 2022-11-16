import classNames from "classnames/bind"
import { Dispatch, SetStateAction, useState } from "react"
import { GetValueChange } from "../../../types/GetValueChange"
import styled from "./input.module.scss"


const cx = classNames.bind(styled)
type Props = {
  name: string
  value?: string,
  type?: "number" | "text" | "password",
  width?: string
  getValueChange?: GetValueChange<string>,
  attr?: string,
  setValueInput?: Dispatch<SetStateAction<string>>

}



const Input = ({ name, value, type, width, getValueChange, attr }: Props) => {

  const [valueInput, setValueInput] = useState(value ?? "")

  return (
    <div style={{ width: width ?? "100%" }} className={cx('wrapper')}>
      <input type={type} className={cx("input")} placeholder=" " onChange={(e) => {
        setValueInput(e.target.value)
        getValueChange && getValueChange(e.target.value, attr, name, setValueInput)
      }} value={valueInput} />
      <label className={cx("label")} > {name} :</label>

    </div>
  )
}

export default Input