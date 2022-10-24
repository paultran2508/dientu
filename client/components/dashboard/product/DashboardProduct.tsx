import classNames from 'classnames/bind'
import { useState } from 'react'
import { useCategoryQuery, useProductAttributesLazyQuery } from '../../../src/generated/graphql'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import { Callback } from '../../Lib/select/SelectInput'
import DashboardLayout from '../DashboardLayout'
import AddOptionProduct, { TypeSelectAttr } from './AddOptionProduct'
import styled from "./dashboard-product.module.scss"

type Props = {}
const cx = classNames.bind(styled)


const DashboardProduct = ({ }: Props) => {

  const [selectsAttr, setSelectsAttr] = useState<TypeSelectAttr[][] | undefined>()


  const { data } = useCategoryQuery()
  const [getAttr, _] = useProductAttributesLazyQuery()

  const onSelectCategory: Callback = async (value, name) => {
    name
    const { data } = await getAttr({ variables: { categoryId: value } })
    const selectAttr = data?.productAttributes.attributes?.map<TypeSelectAttr>(attr => ({
      attr: attr.name,
      options: attr.values.map(value => ({ name: value.name, value: value.id }))
    }))

    setSelectsAttr(selectAttr ? [selectAttr] : selectAttr)
  }

  const onAddOption = () => {
    selectsAttr && setSelectsAttr([...selectsAttr, selectsAttr[0]])
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
          { }
          {selectsAttr && selectsAttr.map((select, index) => <AddOptionProduct key={index} name={index + 1} selects={select} />)}
          <div className={cx("option")}>
          </div>
        </div>
        {selectsAttr && <Button handle={onAddOption} text="Thêm option" />}
      </div>

    </div>
  )
}

DashboardProduct.Layout = DashboardLayout

export default DashboardProduct
