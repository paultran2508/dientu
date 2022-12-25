import classNames from "classnames/bind"
import { type } from "os"
import { useRef, useState } from "react"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import { CategoryDocument, useCategoryQuery } from "../../src/generated/graphql"
import { GetValueChange } from "../../types/GetValueChange"
import { Button } from "../Lib/Button"
import style from './product.module.scss'
import ProductCategory from "./ProductCategory"
import SelectProduct from "./SelectProduct"

type Props = {

}

type FindValue = {
  name: string,
  value: string
}



const cx = classNames.bind(style)

const Product = ({ }: Props) => {

  const setFindSelect = useRef<FindValue[]>([])
  const { data, loading, fetchMore } = useCategoryQuery({
    variables: {
      limit: 1
    }
  })
  const [findValues, setFindValues] = useState<FindValue[]>([])



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
    setFindValues(setFindSelect.current)
  }

  const onSetFindValue: GetValueChange<string> = ({ value, attr }) => {
    if (value === "") {
      setFindSelect.current = setFindSelect.current.filter(item => item.name !== attr)
    } else {
      setFindSelect.current = setFindSelect.current.filter(item => item.name !== attr)
      setFindSelect.current = [...setFindSelect.current, { name: attr as string, value }]
    }
  }
  return (
    <div className={cx('wrapper')} >
      <div className={cx('filter')}>
        <SelectProduct callbackValues={onSetFindValue} />
        <Button handle={onFindProduct} text="Tìm kiếm" />
      </div>
      <hr />
      <div className={cx('ctn-product')}>
        {findValues.length > 0 && <div>
          <ProductCategory
            find={{
              name: "values",
              values: findValues.map(item => item.value)
            }}
          />
        </div>}
        {data?.categories && findValues.length === 0 && data.categories.categories?.map(category => <ProductCategory key={category.id} categoryName={category.name} categoryId={category.id} />)}
        {loading && <h1>Loading ...</h1>}
      </div>
      <div className={cx('load-more')}>
        {data?.categories.pagination?.hasMore && findValues.length === 0 ? <Button handle={onLoadMore} loading={loading} text="Xem thêm" /> : <>Hết</>}
      </div>
    </div >)
}

Product.Layout = DefaultLayout

export default Product