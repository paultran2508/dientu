import classNames from 'classnames/bind'
import { useState } from 'react'
import { useCategoryQuery } from '../../../src/generated/graphql'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import { Callback } from '../../Lib/select/SelectInput'
import DashboardLayout from '../DashboardLayout'
import AddOptionProduct from './AddOptionProduct'
import styled from "./dashboard-product.module.scss"

type Props = {}
const cx = classNames.bind(styled)


const DashboardProduct = ({ }: Props) => {

  const [addOptions, setAddOptions] = useState<number[]>([1])

  const [categoryId, setCategoryId] = useState<string | undefined>()
  const { data } = useCategoryQuery()

  const onSelectCategory: Callback = async (value, name) => {
    name
    // console.log(name)
    value === "" && setCategoryId(undefined)
    addOptions.length === 0 && setAddOptions([1])
    if (value !== "" && categoryId !== value) {
      setCategoryId(value)
      setAddOptions([1])
    }
  }

  const onAddOption = () => {
    addOptions && setAddOptions([...addOptions, addOptions.slice(-1)[0] + 1])
    addOptions.length === 0 && setAddOptions([1])
  }


  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Sản Phẩm</h1>
      <div className={cx("ctn-option")}>
        <div className={cx("category-select")}>
          <Input width='400px' name='Tên Sản Phẩm ' />
          {data?.categories.categories && data && <SelectInput all name='Category' handle={onSelectCategory}
            options={data.categories.categories.map(value => ({ name: value.name, value: value.id }))} />}
        </div>
        <div className={cx('ctn-option')}>
          <div className={cx("option")}>
            {addOptions.length > 0 && categoryId && addOptions.map((op) =>
              <AddOptionProduct callbackAddOption={setAddOptions}
                option={op} key={op}
                categoryId={categoryId} />)}
          </div>
        </div>
        {<Button handle={onAddOption} text="Thêm option" />}
      </div>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout
export default DashboardProduct
