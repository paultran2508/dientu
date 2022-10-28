import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { AddProductInput, AddProductOptionInput, useBrandQuery, useCategoryQuery } from '../../../src/generated/graphql'
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
  optionValues: AddProductOptionInput
}


const DashboardProduct = ({ }: Props) => {
  const optionByOne: AddOptionByIndex = {
    index: 1,
    optionValues: {
      addImgs: [],
      name: "",
      valueIds: [],
      addPrices: []
    }
  }
  const [addOptions, setAddOptions] = useState<AddOptionByIndex[]>([optionByOne])
  const [formValues, setFormValues] = useState<AddProductInput>({ addOptions: [], brandId: "", categoryId: "", name: "", path: "" })



  // const [categoryId, setCategoryId] = useState<string | undefined>()
  const { data: dataCategory } = useCategoryQuery()
  const { data: dataBrands } = useBrandQuery()

  const onSubmitForm = () => {
    // setFormValues(formValues => ({ ...formValues, addOptions: addOptions.map(option => ({ ...option.optionValues })) }))
    console.log(formValues)
  }


  const setInputProductValue: GetValueChange = (input, attr) => {
    attr && setFormValues(value => ({ ...value, [attr]: input }))
    if (attr === "categoryId") {
      addOptions.length === 0 && setAddOptions([optionByOne])
      if (input !== "" && formValues.categoryId !== input) {
        setAddOptions([optionByOne])
      }
    }
  }



  const onAddOption = () => {
    setAddOptions(options => {
      return [...options, { index: options.slice(-1)[0].index + 1, optionValues: optionByOne.optionValues }]
    })

    addOptions.length === 0 && setAddOptions([optionByOne])
  }


  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Sản Phẩm</h1>
      <div className={cx("ctn-option")}>
        <div className={cx("category-select")}>
          <Input attr="name" getValueChange={setInputProductValue} width='400px' name='Tên Sản Phẩm ' />
          <Input attr="path" getValueChange={setInputProductValue} width='400px' name='Đường dẫn ' />
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
        { }
        <div className={cx('ctn-option')}>
          <div className={cx("option")}>
            {addOptions.length > 0 && formValues.categoryId !== "" && addOptions.map((op, index) =>
              <AddOptionProduct
                index={index}
                setValueOption={setFormValues}
                option={op.index} key={op.index}
                categoryId={formValues.categoryId}
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
