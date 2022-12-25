import classNames from "classnames/bind"
import { memo, useEffect, useRef } from "react"
import { useProductsLazyQuery } from "../../src/generated/graphql"
import { Button } from "../Lib/Button"
import style from './product-category.module.scss'
import ProductDetail from "./ProductDetail"

const cx = classNames.bind(style)

type Props = {
  categoryId?: string
  categoryName?: string,
  find?: {
    name: string
    values: string[]
  }
}

const ProductCategory = ({ categoryId, categoryName, find }: Props) => {

  const [setProductQuery, { data: dataProductQuery, fetchMore, loading, updateQuery }] = useProductsLazyQuery()
  const setSkip = useRef(0)

  useEffect(() => {
    (async () => {
      await setProductQuery({
        variables: {
          limit: !find ? 2 : undefined,
          hasMore: true,
          skip: 0,
          categoryId,
          find
        },
      })
    })();

    setSkip.current = dataProductQuery?.productsByCategoryId.products?.length ?? 0

  }, [setProductQuery, categoryId, find, dataProductQuery])


  const loadMore = async () => {

    const { data } = await fetchMore({
      variables: {
        limit: 1,
        categoryId,
        skip: setSkip.current,
        find: categoryId && find ? find : undefined,
        hasMore: true,
      }
    })
    // console.log(1)

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
      <h1>{categoryName ?? "Tìm kiếm:"}</h1>
      <div className={cx('product-details')}>
        {dataProductQuery?.productsByCategoryId.products &&
          dataProductQuery?.productsByCategoryId.products.map((product, id) => <ProductDetail
            key={id}
            price={product.options[0].prices[0].price}
            name={product.name}
            img={product.options[0].imgs[0].src}
            option={product.options.map(op => (op.values.map(i => i.name)))}
          />)}

      </div>
      {!find && <div className={cx('add-categories')}>

        {dataProductQuery?.productsByCategoryId.pagination?.hasMore ?
          <Button handle={loadMore} loading={loading} text="Xem thêm" /> : <>Hết</>}


      </div>}
      {loading && <h1>Loading ...</h1>}
    </div>
  )
}

export default memo(ProductCategory)