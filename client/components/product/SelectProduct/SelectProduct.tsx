import classNames from 'classnames/bind'
import style from './SelectProduct.module.scss'



const cx = classNames.bind(style)

type Props = {
  name: string,
  options: string[]
  handle?: () => void
}


const SelectProduct = ({ name, options, }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <label>{name}:</label>
      <select>
        <option value={''}>Tac ca</option>
        {options.map((value, id) => (<option key={id} value={value}>{value}</option>))}
      </select>

    </div>
  )
}

export default SelectProduct