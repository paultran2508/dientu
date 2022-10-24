import classNames from 'classnames/bind'
import { ChangeEventHandler, useState } from 'react'
import style from './select-input.module.scss'



const cx = classNames.bind(style)

type Props = {
  name: string,
  options: TypeSelectOption[]
  handle?: Callback
  all?: boolean
}

export type TypeSelectOption = { value: string, name: string }
export type Callback = (value: string, name: string) => void

const SelectInput = ({ name, options, handle, all }: Props) => {

  const [value, setValue] = useState("")

  const onChangeValue: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setValue(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <div className={cx('wrapper')}>
      <label>{name}:</label>
      <select onClick={() => { handle && handle(value, name) }} defaultValue={value} onChange={onChangeValue} >
        {all && <option value={''}>Tac ca</option>}
        {options.map(option => (<option key={option.value} value={option.value}>{option.name}</option>))}
      </select>

    </div>
  )
}

export default SelectInput