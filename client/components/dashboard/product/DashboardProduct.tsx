import classNames from 'classnames/bind'
import { useState } from 'react'
import { useBrandQuery, useCategoryQuery } from '../../../src/generated/graphql'
import { GetValueChange } from '../../../types/GetValueChange'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import DashboardLayout from '../DashboardLayout'
import AddOptionProduct from './AddOptionProduct'
import styled from "./dashboard-product.module.scss"

type Props = {}
const cx = classNames.bind(styled)

export type AddOptionByIndex = {
  index: number,
  optionValues: {
    addImgs: string[];
    addPrices: {}[];
    name: string;
    valueIds: {
      name: string
      id: string
    }[];
  },
}

export type FormValue = {
  brandId: string
  path: string
  name: string
  categoryId: string
  optionValues: AddOptionByIndex[]

}

const DashboardProduct = ({ }: Props) => {

  const optionByOne: AddOptionByIndex = {
    index: 1,
    optionValues: { addImgs: [], name: "", valueIds: [], addPrices: [] }
  }

  const [formValue, setFormValue] = useState<FormValue>({ optionValues: [], brandId: "", categoryId: "", name: "", path: "" })
  const { data: dataCategory } = useCategoryQuery()
  const { data: dataBrands } = useBrandQuery()

  const onSubmitForm = () => {
    console.log(formValue)
  }

  const setInputProductValue: GetValueChange = (input, attr) => {
    attr && setFormValue(value => ({ ...value, [attr]: input }))
    attr === "categoryId" && input === "" && setFormValue(value => ({ ...value, optionValues: [] }))
    attr === "categoryId" && input !== formValue.categoryId && setFormValue(value => ({ ...value, optionValues: [optionByOne] }))
  }
  // console.log("render")

  const onAddOption = () => {
    formValue.categoryId !== "" && setFormValue(value => {

      if (value.optionValues.length > 0) return {
        ...value,
        optionValues: [...value.optionValues,
        {
          index: value.optionValues.slice(-1)[0].index + 1, optionValues: { ...optionByOne.optionValues }
        }]
      }
      return { ...value, optionValues: [optionByOne] }
    })
    formValue.categoryId === "" && setFormValue(value => ({ ...value, optionValues: [] }))
  }

  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Sản Phẩm</h1>
      <div className={cx("ctn-option")}>
        <div className={cx("category-select")}>
          <Input value="" attr="name" getValueChange={setInputProductValue} width='400px' name='Tên Sản Phẩm ' />
          <Input value="" attr="path" getValueChange={setInputProductValue} width='400px' name='Đường dẫn ' />
          {dataBrands?.showBrands.brands &&
            <SelectInput
              all
              name='Thương hiệu'
              attr='brandId'
              getValueChange={setInputProductValue}
              options={dataBrands?.showBrands.brands.map(value => ({ name: value.name, value: value.id }))}
            />}
          {dataCategory?.categories.categories && dataCategory &&
            <SelectInput
              all
              name='Danh Mục'
              attr='categoryId'
              getValueChange={setInputProductValue}
              options={dataCategory.categories.categories.map(value => ({ name: value.name, value: value.id }))}
            />}
        </div>
        <div className={cx('ctn-option')}>
          <div className={cx("option")}>
            {formValue?.optionValues?.length > 0 && formValue?.categoryId !== "" && formValue.optionValues.map((option) =>
              <AddOptionProduct
                index={option.index}
                setFormValue={setFormValue}
                key={option.index}
                categoryId={formValue.categoryId}
              />
            )}
          </div>
        </div>
        {<Button handle={onAddOption} text="Thêm option" />}
        <Button handle={onSubmitForm} text="Thêm Sản phẩm" />
      </div>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout
export default DashboardProduct
