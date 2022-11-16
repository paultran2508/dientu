import classNames from 'classnames/bind'
import { ChangeEventHandler, useState } from 'react'
import { GetValueChange } from '../../../types/GetValueChange'
import style from './select-input.module.scss'



const cx = classNames.bind(style)

type Props = {
  name: string,
  options: TypeSelectOption[]
  all?: boolean,
  attr?: string,
  getValueChange?: GetValueChange<string>
}

export type TypeSelectOption = { value: string, name?: string }
export type Callback = (value: string, name: string) => void

const SelectInput = ({ name, options, all, attr, getValueChange }: Props) => {

  const [value, setValue] = useState("")

  const onChangeValue: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setValue(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <div className={cx('wrapper')}>
      <label>{name}:</label>
      <select onClick={() => { getValueChange && getValueChange(value, attr, name) }} defaultValue={value} onChange={onChangeValue} >
        {all && <option value={''}>Tac ca</option>}
        {options.map(option => (<option key={option.value} value={option.value}>{option.name ?? option.value}</option>))}
      </select>
      <div className={cx("error")}></div>
    </div>
  )
}

export default SelectInput