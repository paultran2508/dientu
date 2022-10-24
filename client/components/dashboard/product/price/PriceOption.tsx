import classNames from 'classnames/bind'
import { PriceType, useProductColorsQuery } from '../../../../src/generated/graphql'
import { Input } from '../../../Lib/Input'
import SelectInput from '../../../Lib/select'
import style from "./price-option.module.scss"
const cx = classNames.bind(style)
type Props = {
  price: string
}

const PriceOption = ({ price }: Props) => {

  const { data } = useProductColorsQuery({ variables: {} })

  // console.log(data?.productColors.color, error)
  return (
    <div className={cx('wrapper')}>
      <h3>{price}</h3>
      <div className={cx("ctn-select")}>
        <SelectInput name='Phương Thức' options={Object.keys(PriceType).map(type => ({ name: type, value: type }))} />
        {data?.productColors.color && <SelectInput name='Màu sắc' options={
          data?.productColors.color.map(colors => ({ name: colors.name, value: colors.id }))
        } />}
      </div>

      <Input type='number' name="Giá bán" />


    </div>
  )
}

export default PriceOption