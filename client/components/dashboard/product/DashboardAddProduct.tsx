import classNames from 'classnames/bind'
import { useReducer } from 'react'
import { useAlert } from 'react-alert'
import { AddProductInput, Exact, useAddProductMutation, useBrandQuery, useCategoryQuery } from '../../../src/generated/graphql'
import { GetValueChange } from '../../../types/GetValueChange'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import AddOptionProduct from './AddOptionProduct'
import styled from "./dashboard-add-product.module.scss"
import { AddFormValue, addOptionValue, AddOptionValue, fomValueInit, reducer, removeOptionValueByIndexInit, setAddPriceValueAction, setFormValue, setOptionValueAction } from './init'

type Props = {
  callbackShowAddProduct: () => void
}
const cx = classNames.bind(styled)

const DashboardAddProduct = ({ callbackShowAddProduct }: Props) => {

  const [formValue, dispatch] = useReducer(reducer, fomValueInit)
  const { data: dataCategory } = useCategoryQuery()
  const { data: dataBrands } = useBrandQuery()
  const [addProductMutation, { data: dataProductMutation }] = useAddProductMutation()
  const { error, success } = useAlert()

  const onSubmitForm = async () => {
    const variables: Exact<{ productOptionInput: AddProductInput; }> = {
      productOptionInput: {
        brandId: formValue.brandId, categoryId: formValue.categoryId, path: formValue.path, name: formValue.name,
        addOptions: formValue.optionValues.map(option => ({
          valueIds: option.valueIds.map(valueId => valueId.id),
          addImgs: option.addImgs.map(img => ({ img: img })),
          addPrices: option.addPrices.map(priceValue => ({
            price: priceValue.price,
            note: priceValue.note ?? "",
            type: priceValue.type,
            colorId: priceValue.colorId
          })),
          name: option.name,

        }))
      }
    };
    const { data } = await addProductMutation({ variables })
    // console.log(data)
    if (data?.addProduct.success) {
      callbackShowAddProduct()
      success("Tạo sản phẩm thành công")
    } else {
      data?.addProduct.fieldErrors && data?.addProduct.fieldErrors?.length > 0 && error(data?.addProduct.fieldErrors[0].message)
      console.log(data?.addProduct.fieldErrors)
    }

  }


  const setInputProductValue: GetValueChange<any> = ({ value, attr }) => {
    if (attr === "categoryId") {
      value !== "" && dispatch(addOptionValue(fomValueInit))
      value === "" && dispatch(setFormValue({ optionValues: [] }))
    }
    dispatch(setFormValue({
      [attr as keyof AddFormValue]: value
    }))
  }

  const onAddOption = () => { dispatch(addOptionValue(formValue)) }

  const setOptionValue = (optionValue: AddOptionValue, indexOption: number) => {
    dispatch(setOptionValueAction(optionValue, indexOption))
  }

  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Sản Phẩm</h1>
      <div className={cx("show-errors")}>
        {!dataProductMutation?.addProduct.success && dataProductMutation?.addProduct.fieldErrors &&
          <>
            <h3>
              name:  {dataProductMutation?.addProduct.fieldErrors[0]?.name}
            </h3>
            <h3>
              message:  {dataProductMutation?.addProduct.fieldErrors[0]?.message}
            </h3>
          </>
        }
      </div>
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
              formValue?.categoryId !== "" &&
              formValue.optionValues.map((option, id) => {
                return (<AddOptionProduct
                  optionValue={option}
                  indexInit={option.indexInit}
                  imgs={option.addImgs}
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
                />)
              }
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

export default DashboardAddProduct
