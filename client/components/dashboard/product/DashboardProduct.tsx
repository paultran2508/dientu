import classNames from "classnames/bind"
import React, { useEffect, useState } from "react"
import { ProductsQuery, useDeleteProductMutation, useProductsLazyQuery } from "../../../src/generated/graphql"
import { Button, HandleClickButton } from "../../Lib/Button"
import Table from "../../table"
import DashboardLayout from "../DashboardLayout"
import style from "./dashboard-product.module.scss"
import DashboardAddProduct from "./DashboardAddProduct"

const cx = classNames.bind(style)
type Props = {}
export type ProductTable = {
  "Tên": string,
  // "Đường dẫn": string,
  "Thương hiệu": string,
  "Xóa": React.ReactNode,
  "option": React.ReactNode,
  // "Ảnh": React.ReactNode,
  "Ngày tạo": string
}


type Sort = {
  name: string
  sort: 1 | -1
}


const DashboardProduct = ({ }: Props) => {

  const [showAddProduct, setShowAddProduct] = useState<boolean>(false)
  const [dataProductTable, setDataProductTable] = useState<ProductTable[]>()
  const [setProductQuery, { data: dataProductQuery, fetchMore, updateQuery, refetch }]
    = useProductsLazyQuery()
  const [sort, setSort] = useState<Sort>({ name: "createAt", sort: -1 })

  const [deleteProduct,] = useDeleteProductMutation()


  const showOptionTable: HandleClickButton<string> = (_, dataOption) => {
    console.log(dataOption)
  }

  const onDeleteProduct: HandleClickButton<string> = async (_, id) => {
    if (id) {
      await deleteProduct({ variables: { id } })
      updateQuery((prev) => {
        let setProductQuery:
          ProductsQuery | null = prev;
        if (setProductQuery && prev) {
          setProductQuery = {
            productsByCategoryId: {
              ...prev.productsByCategoryId,
              products: prev?.productsByCategoryId
                .products?.filter(product => product.id !== id)
            }
          }
        }
        return setProductQuery
      })
    }
  }

  const callbackAddDataTable = async () => {
    const skip = dataProductQuery?.productsByCategoryId.pagination?.skip
    const { data } = await fetchMore({
      variables: {
        limit: 2,
        hasMore: dataProductQuery?.productsByCategoryId.pagination?.hasMore,
        skip: skip ? skip + 2 : 2,
        sort: sort,
      }
    })
    updateQuery((prev) => {
      // console.log(data.productsByCategoryId.pagination)
      return {
        productsByCategoryId: {
          ...data.productsByCategoryId,
          products: prev.productsByCategoryId.products && data.productsByCategoryId.products ? [
            ...prev?.productsByCategoryId?.products,
            ...data.productsByCategoryId.products
          ] : []
        }
      }
    }
    )
  }

  useEffect(() => {
    setProductQuery({ variables: { limit: 3, hasMore: true, sort: sort, skip: 0 } })

    const product = dataProductQuery?.productsByCategoryId.products?.map<ProductTable>((product, index) => ({
      stt: index + 1,
      // id: product.id,
      Tên: product.name,
      // "Đường dẫn": product.path.name,
      "Thương hiệu": product.brand.name,
      option: <Button<string> data={product.id} handle={showOptionTable} key={product.id} text="option" />,
      Xóa: <Button<string> data={product.id} key={product.id} handle={onDeleteProduct} text="xóa" />,
      "Ngày tạo": product.createAt,
      // Ảnh: <div key={product.id}> {product.options.map(option => {
      //   let imgs: string[] = []
      //   option.imgs.forEach(img => {
      //     imgs.push(img.src)
      //   })
      //   return imgs.map(image => <Image key={image} height={50} width={80} alt="" src={image} />)
      // })}</div>
    }))
    setDataProductTable(product)
    console.log(dataProductQuery)
  }, [dataProductQuery, sort])


  return (
    <div className={cx('wrapper')}>
      <div className={cx("show-product-table")}>
        {dataProductTable && <Table<ProductTable> onPushData={callbackAddDataTable} onSortTable={(_, data) => {
          if (data?.name === "Tên") {
            setSort({ name: "name", sort: data.sort })
          }
          if (data?.name === "Ngày tạo") {
            setSort({ name: "createAt", sort: data.sort })
          }

          if (data?.name === "Thương hiệu") {
            setSort({ name: "brand", sort: data.sort })
          }
          console.log(data)
        }} data={dataProductTable} />}
      </div>
      <div className={cx("add-product")}>
        <Button text={!showAddProduct ? "Thêm mới sản phẩm" : "Đóng"} handle={() => { setShowAddProduct(check => !check) }} />
        {showAddProduct && <DashboardAddProduct callbackShowAddProduct={() => {
          refetch({ limit: 2, hasMore: true })
          setShowAddProduct(false)
        }} />}
      </div>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout

export default DashboardProduct