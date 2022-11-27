import classNames from "classnames/bind"
import { useEffect, useRef } from "react"
import { useProductsLazyQuery } from "../../src/generated/graphql"
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

  const [setProductQuery, { data: dataProductQuery, fetchMore, loading, updateQuery }] = useProductsLazyQuery()
  const setSkip = useRef(0)

  useEffect(() => {
    setProductQuery({ variables: { limit: 1, hasMore: true, skip: 0, categoryId } })
    setSkip.current = dataProductQuery?.productsByCategoryId.products?.length ?? 0
    // console.log(dataProductQuery?.productsByCategoryId.products?.length)

  }, [dataProductQuery, setProductQuery, categoryId])


  const loadMore = async () => {
    console.log(setSkip.current)
    const { data } = await fetchMore({
      variables: {
        limit: 1,
        categoryId,
        skip: setSkip.current,
        hasMore: true,
      }
    })

    updateQuery((prev) => {
      let setDataProduct = prev.productsByCategoryId.products;
      let setPagination = data?.productsByCategoryId.pagination;
      if (data.productsByCategoryId.products && prev.productsByCategoryId.products && data?.productsByCategoryId.pagination) {
        setDataProduct = [
          ...prev.productsByCategoryId.products,
          ...data.productsByCategoryId.products
        ];
        setPagination = {
          ...data?.productsByCategoryId.pagination,
          skip: setSkip.current
        }
      }
      return {
        __typename: prev.__typename,
        productsByCategoryId: {
          ...prev.productsByCategoryId,
          products: setDataProduct,
          pagination: setPagination
        }
      }
    })
  }
  return (
    <div className={cx('wrapper')}>
      <h1>{categoryName}</h1>
      {/* <>{console.log(dataMore)}</> */}
      <div className={cx('product-details')}>
        {dataProductQuery?.productsByCategoryId.products &&
          dataProductQuery?.productsByCategoryId.products.map((product, id) => <ProductDetail
            key={id}
            price={product.options[0].prices[0].price}
            name={product.name}
            img={product.options[0].imgs[0].src}
          />)}

      </div>
      <div className={cx('add-categories')}>
        {/* <>{console.log("render")}</> */}
        {dataProductQuery?.productsByCategoryId.pagination?.hasMore ? <Button handle={loadMore} loading={loading} text="Xem thêm" /> : <>Hết</>}
        {loading && <h1>Loading ...</h1>}

      </div>

    </div>
  )
}

export default ProductCategory