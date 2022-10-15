import React from 'react'
import { useCategoryQuery } from '../../../src/generated/graphql'
import SelectInput from '../../Lib/select'
import DashboardLayout from '../DashboardLayout'

type Props = {}

const DashboardProduct = (props: Props) => {
  const { data } = useCategoryQuery()
  // console.log(data)
  // const category = data?.categories?.categories ? data.categories.categories.map<string>(value => value.name) : ""
  const onSelectCategory = () => {
    alert(1)
  }
  return (
    <div>
      <h1>Thêm Sản Phẩm</h1>
      <div>
        {data?.categories.categories && data && <SelectInput name='Category' handle={onSelectCategory} options={data.categories.categories.map(value => value.name)} />}

        <>
        </>
      </div>
      <></>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout

export default DashboardProduct