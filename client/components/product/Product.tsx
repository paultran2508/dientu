import classNames from "classnames/bind"
import SelectProduct from "../../components/product/SelectProduct"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import { CategoryDocument, useCategoryQuery } from "../../src/generated/graphql"
import { Button } from "../Lib/Button"
import style from './product.module.scss'
import ProductCategory from "./ProductCategory"

type Props = {

}

const ram = ['4gb', '8gb', '16gb']
const display = ['fullHD', 'HD']
const rom = ['32gb', '64gb', '128gb']
const cpu = ['core i3', 'core i5', 'core i7', 'core i9']

const cx = classNames.bind(style)

const Product = ({ }: Props) => {

  const { data, loading, fetchMore } = useCategoryQuery({
    variables: {
      limit: 1
    }
  })

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

  const OnChangeValues = () => {

  }


  return (
    <div className={cx('wrapper')} >
      <div className={cx('filter')}>
        <SelectProduct options={ram} name="Ram" handle={OnChangeValues} />
        <SelectProduct options={cpu} name="CPU" handle={OnChangeValues} />
        <SelectProduct options={rom} name="Rom" handle={OnChangeValues} />
        <SelectProduct options={display} name="Man hinh" handle={OnChangeValues} />
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