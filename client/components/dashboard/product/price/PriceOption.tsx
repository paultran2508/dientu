import classNames from 'classnames/bind'
import { Dispatch, SetStateAction } from 'react'
import { PriceType, useProductColorsQuery } from '../../../../src/generated/graphql'
import { Button } from '../../../Lib/Button'
import { Input } from '../../../Lib/Input'
import SelectInput from '../../../Lib/select'
import style from "./price-option.module.scss"
const cx = classNames.bind(style)
type Props = {
  callbackClose: Dispatch<SetStateAction<number[]>>
  price: number
}

const PriceOption = ({ callbackClose, price }: Props) => {

  const { data } = useProductColorsQuery({ variables: {} })

  // console.log(data?.productColors.color, error)
  return (
    <div className={cx('wrapper')}>
      <div className={cx("close")}>
        <Button alt="Đóng" icon='close' handle={() => {
          callbackClose(addPrices => addPrices.filter(addPrice => addPrice !== price))
        }} />
      </div>

      <h3>{"Price Số : " + price}</h3>
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