import classNames from "classnames/bind"
import { useState } from "react"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import { CategoryDocument, useCategoryQuery } from "../../src/generated/graphql"
import { GetValueChange } from "../../types/GetValueChange"
import { Button } from "../Lib/Button"
import style from './product.module.scss'
import ProductCategory from "./ProductCategory"
import SelectProduct from "./SelectProduct"

type Props = {

}



const cx = classNames.bind(style)

const Product = ({ }: Props) => {

  const { data, loading, fetchMore } = useCategoryQuery({
    variables: {
      limit: 1
    }
  })
  const [findValues, setFindValues] = useState<{ [key: string]: string }>({})

  const onLoadMore = async () => {
    await fetchMore({
      query: CategoryDocument,
      variables: { limit: 1, cursor: data?.categories.pagination?.cursor },
      updateQuery(pre, { fetchMoreResult }) {
        return {
          categories: {
            ...fetchMoreResult.categories,
            categories: [...pre.categories.categories ?? [], ...fetchMoreResult.categories.categories ?? []]
          }

        }
      }
    })
  }

  const onFindProduct = () => {
    console.log(findValues)

  }

  const onSetFindValue: GetValueChange<string> = ({ value, attr }) => {
    setFindValues(values => {
      values[attr as string] = value
      if (value === "") {
        delete values[attr as string]
      }
      console.log(values)
      return values
    }

    )
  }




  return (
    <div className={cx('wrapper')} >
      <div className={cx('filter')}>
        <SelectProduct callbackValues={onSetFindValue} />
        <Button handle={onFindProduct} text="Tìm kiếm" />
      </div>
      <hr />
      <div className={cx('ctn-product')}>

        {data?.categories && data.categories.categories?.map(category => <ProductCategory key={category.id} categoryName={category.name} categoryId={category.id} />)}
        {loading && <h1>Loading ...</h1>}
      </div>
      <div className={cx('load-more')}>
        {data?.categories.pagination?.hasMore ? <Button handle={onLoadMore} loading={loading} text="Xem thêm" /> : <>Hết</>}
      </div>


    </div >)
}

Product.Layout = DefaultLayout

export default Product