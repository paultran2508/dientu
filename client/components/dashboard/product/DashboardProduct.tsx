import classNames from 'classnames/bind'
import Error from 'next/error'
import { useReducer } from 'react'
import { PriceType, useBrandQuery, useCategoryQuery } from '../../../src/generated/graphql'
import { GetValueChange } from '../../../types/GetValueChange'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import DashboardLayout from '../DashboardLayout'
import AddOptionProduct from './AddOptionProduct'
import styled from "./dashboard-product.module.scss"
import { AddFormValue, AddOptionValue } from './init'

type Props = {}
const cx = classNames.bind(styled)



// Set Value ProductInput 





const fomValueInit: AddFormValue = {
  brandId: "",
  name: "",
  categoryId: "",
  path: "",
  optionValues: []
}

// Set Action
export enum TypeAction {
  "SET_VALUE_ACTION",
  "CLOSE_OPTION_ACTION",
  "ADD_OPTION_ACTION",
  "CLOSE_PRICE_ACTION",
  "SET_OPTION_VALUE_ACTION"
}

type ActionValue = {
  type: TypeAction,
  value?: Partial<AddFormValue>
  attr?: keyof AddFormValue
  index?: {
    option: number
    price?: number
  }
}


const addOptionValue = (stateFormValue: AddFormValue): ActionValue => {

  // console.log(optionValueInit)
  const optionValueInit = {
    indexInit: 1,
    addPrices: [{
      indexInit: 1,
      colorId: "",
      price: 0,
      note: "",
      type: PriceType.Default
    }],
    addImgs: [],
    name: "",
    valueIds: []
  }

  const indexLastItem = stateFormValue.optionValues.length - 1
  const numberInit = stateFormValue.optionValues[indexLastItem]?.indexInit
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: {
      optionValues: [
        ...stateFormValue.optionValues,
        { ...optionValueInit, indexInit: numberInit ? numberInit + 1 : 1 }
      ]
    }
  }
}
const setFormValue = (value: Partial<AddFormValue>): ActionValue => {
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value
  }
}

const setOptionValueAction = (optionValue: AddOptionValue, indexOption: number): ActionValue => {

  // console.log(indexOption)
  return {
    type: TypeAction.SET_OPTION_VALUE_ACTION,
    value: optionValue,
    index: {
      option: indexOption
    }
  }
}

const setAddPriceValueAction = (formValue: AddFormValue, indexOption: number): ActionValue => {
  const lastItemNumber = formValue.optionValues[indexOption].addPrices.length - 1
  // console.log()
  const indexInit = lastItemNumber === -1 ? 1 : formValue.optionValues[indexOption].addPrices[lastItemNumber].indexInit + 1

  formValue.optionValues[indexOption].addPrices.push({
    indexInit,
    colorId: "",
    price: 0,
    note: "",
    type: PriceType.Default
  })
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: { ...formValue }
  }
}

const removeOptionValueByIndexInit = (formValue: AddFormValue, indexOption: number, indexPrice?: number): ActionValue => {

  if (indexPrice !== undefined && indexPrice !== null) {
    formValue.optionValues[indexOption].addPrices.splice(indexPrice, 1)
  } else {
    formValue.optionValues.splice(indexOption, 1)
  }
  // console.log(formValue)
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: formValue
  }
}


// Reducer

const reducer = (state: AddFormValue, action: ActionValue): AddFormValue => {

  let setFormValue = state

  switch (action.type) {
    case TypeAction.SET_VALUE_ACTION:
      // console.log(action.value?.optionValues)
      setFormValue = { ...state, ...action.value }
      break;
    case TypeAction.CLOSE_OPTION_ACTION:

      break;
    case TypeAction.CLOSE_PRICE_ACTION:

      break;

    case TypeAction.SET_OPTION_VALUE_ACTION:
      action.value &&
        (setFormValue.optionValues[action.index?.option as number] =
          action.value as AddOptionValue);
      break;
    default:
      throw new Error({ statusCode: 400, title: "error" })

  }
  return setFormValue
}

const DashboardProduct = ({ }: Props) => {

  const [formValue, dispatch] = useReducer(reducer, fomValueInit)
  const { data: dataCategory } = useCategoryQuery()
  const { data: dataBrands } = useBrandQuery()

  const onSubmitForm = () => {
    console.log(formValue.optionValues)
  }

  const setInputProductValue: GetValueChange<any> = (input, attr) => {
    if (attr === "categoryId") {
      input !== "" && dispatch(addOptionValue(fomValueInit))
      input === "" && dispatch(setFormValue({ optionValues: [] }))
    }
    dispatch(setFormValue({
      [attr as keyof AddFormValue]: input
    }))
  }

  const onAddOption = () => {
    dispatch(addOptionValue(formValue))
  }

  const setOptionValue = (optionValue: AddOptionValue, indexOption: number) => {
    dispatch(setOptionValueAction(optionValue, indexOption))
  }

  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Sản Phẩm</h1>
      <div className={cx("ctn-option")}>
        <div className={cx("category-select")}>
          <Input value="" attr="name"
            getValueChange={setInputProductValue}
            width='200px' name='Tên Sản Phẩm ' />
          <Input value="" attr="path"
            getValueChange={setInputProductValue}
            width='200px'
            name='Đường dẫn ' />
          {dataBrands?.showBrands.brands &&
            <SelectInput
              all
              name='Thương hiệu'
              attr='brandId'
              getValueChange={setInputProductValue}
              options={dataBrands?.showBrands.brands.map(value =>
                ({ name: value.name, value: value.id })
              )}
            />}
          {dataCategory?.categories.categories && dataCategory &&
            <SelectInput
              all
              name='Danh Mục'
              attr='categoryId'
              getValueChange={setInputProductValue}
              options={dataCategory.categories.categories.map(value =>
                ({ name: value.name, value: value.id })
              )}
            />}
        </div>
        <div className={cx('ctn-option')}>
          <div className={cx("option")}>
            {formValue?.optionValues?.length > 0 &&
              formValue?.categoryId !== "" && formValue.optionValues.map((option, id) =>
                <AddOptionProduct
                  optionValue={option}
                  indexInit={option.indexInit}
                  categoryId={formValue?.categoryId}
                  key={option.indexInit}
                  indexOption={id}
                  callbackValueChange={setOptionValue}
                  callbackCloseOptionThis={(indexOption, indexPrice) => {
                    dispatch(removeOptionValueByIndexInit(formValue, indexOption, indexPrice))
                  }}
                  onAddPrice={(indexOption) => {
                    dispatch(setAddPriceValueAction(formValue, indexOption))
                  }}
                />
              )}
          </div>
        </div>
        <div className={cx('ctn-button')}>
          {<Button handle={onAddOption} text="Thêm option" />}
          <Button handle={onSubmitForm} text="Thêm Sản phẩm" />
        </div>

      </div>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout
export default DashboardProduct
