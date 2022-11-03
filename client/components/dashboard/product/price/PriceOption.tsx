import classNames from 'classnames/bind'
import { useState } from 'react'
import { PriceType, useProductColorsQuery } from '../../../../src/generated/graphql'
import { GetValueChange } from '../../../../types/GetValueChange'
import { Button } from '../../../Lib/Button'
import { Input } from '../../../Lib/Input'
import SelectInput from '../../../Lib/select'
import { AddPriceValue } from '../init'
import style from "./price-option.module.scss"

const cx = classNames.bind(style)
type Props = {
  callbackRemovePriceThis?: (indexOption: number, indexPrice?: number) => void
  priceValue: AddPriceValue,
  indexInit: number,
  getValuePrice: (value: AddPriceValue, indexOption: number, indexPrice: number) => void
  // callbackGetValue?: Dispatch<SetStateAction<FormValue>>,
  indexOption: number
  indexPrice: number
}



function PriceOption({ callbackRemovePriceThis, indexInit, indexOption, indexPrice, priceValue, getValuePrice }: Props) {


  const [priceValueForm, setPriceValueForm] = useState(priceValue)
  // const valuePriceDefault: ValuePrice = {
  //   colorId: "",
  //   note: "",
  //   type: PriceType.Default,
  //   price: 0
  // }
  // const [valuePrice, setValuePrice] = useState<ValuePrice>(valuePriceDefault)
  const { data } = useProductColorsQuery({ variables: {} })



  const getValuePriceInput: GetValueChange<string> = (value, attr) => {
    let setValue: Partial<AddPriceValue> = {};
    attr === "price" && (setValue = { [attr]: +value });
    attr === "colorId" && (setValue = { [attr]: value });
    attr === "type" && (setValue = { [attr]: value as PriceType });
    // console.log({ ...priceValue, ...setValue })

    getValuePrice({ ...priceValueForm, ...setValue }, indexOption, indexPrice)
    setPriceValueForm({ ...priceValueForm, ...setValue })
    console.log({ ...priceValueForm, ...setValue })
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx("close")}>
        <Button
          alt="Đóng"
          icon='close'
          handle={() => { callbackRemovePriceThis && callbackRemovePriceThis(indexOption, indexPrice) }} />
      </div>
      <h3>{"Price Số : " + `${indexPrice + 1}`}</h3>
      <div className={cx("ctn-select")}>
        <SelectInput
          name='Phương Thức'
          options={Object.keys(PriceType).map(type => ({ name: type, value: type }))}
          attr="type"
          getValueChange={getValuePriceInput}
        />
        {data?.productColors.color && <SelectInput attr={"colorId"} getValueChange={getValuePriceInput}
          name='Màu sắc' options={
            data?.productColors.color.map(colors => ({ name: colors.name, value: colors.id }))
          } />}
      </div>
      <Input attr={"price"} getValueChange={getValuePriceInput} value="" type='number' name="Giá bán" />
    </div>
  )
}

export default PriceOption