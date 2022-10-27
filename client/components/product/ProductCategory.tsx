import classNames from "classnames/bind"
import { ProductsDocument, useProductsQuery } from "../../src/generated/graphql"
import { Button } from "../Lib/Button"
import style from './product-category.module.scss'
import ProductDetail from "./ProductDetail"

const cx = classNames.bind(style)

type Props = {
  categoryId: string
  categoryName: string
}

// let products: ProductInfoFragment[] = []
const ProductCategory = ({ categoryId, categoryName }: Props) => {

  const { data, networkStatus, fetchMore } = useProductsQuery({
    variables: { categoryId, limit: 2 },
    notifyOnNetworkStatusChange: false,
    fetchPolicy: "network-only"
  })


  const loadMore = async () => {
    const { loading: loadingMore, networkStatus } = await fetchMore({
      query: ProductsDocument,
      variables: { cursor: data?.productsByCategoryId.pagination?.cursor, categoryId, limit: 2 },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        return {
          productsByCategoryId: {
            ...fetchMoreResult.productsByCategoryId,
            products: [...previousQueryResult.productsByCategoryId.products ?? [], ...fetchMoreResult.productsByCategoryId.products ?? []]
          }
        }
      }

    })
    // refetch()
    console.log(loadingMore, networkStatus)

  }

  return (
    <div className={cx('wrapper')}>
      <h1>{categoryName}</h1>
      {/* <>{console.log(dataMore)}</> */}
      <div className={cx('product-details')}>
        {data?.productsByCategoryId.products &&
          data?.productsByCategoryId.products.map((product, id) => <ProductDetail key={id} price={15000000} name={product.name} img={require('../../assets/product/oppo_reno7.jpg')} />)}
        {/* {loading && <h1>Loading ...</h1>} */}
      </div>
      <div className={cx('add-categories')}>
        {/* <>{console.log("render")}</> */}
        {data?.productsByCategoryId.pagination?.hasMore ? <Button handle={loadMore} loading={networkStatus === 3} text="Xem thêm" /> : <>Hết</>}

      </div>

    </div>
  )
}

export default ProductCategory