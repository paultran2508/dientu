import classNames from 'classnames/bind'
import style from './select-input.module.scss'



const cx = classNames.bind(style)

type Props = {
  name: string,
  options: string[]
  handle?: () => void
}



const SelectInput = ({ name, options, handle }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <label>{name}:</label>
      <select onClick={() => { handle && handle() }}>
        <option value={''}>Tac ca</option>
        {options.map((value, id) => (<option key={id} value={value}>{value}</option>))}
      </select>

    </div>
  )
}

export default SelectInput