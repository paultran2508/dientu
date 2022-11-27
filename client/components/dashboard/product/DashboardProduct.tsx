import classNames from "classnames/bind"
import React, { useCallback, useEffect, useState } from "react"
import { ProductMutationResponse, useDeleteProductMutation, useProductsLazyQuery } from "../../../src/generated/graphql"
import { Button, HandleClickButton } from "../../Lib/Button"
import Modal from "../../Lib/Modal"
import Table from "../../table"
import DashboardLayout from "../DashboardLayout"
import style from "./dashboard-product.module.scss"
import DashboardAddProduct from "./DashboardAddProduct"
import AddProductValue from "./AddProductValue"

const cx = classNames.bind(style)
type Props = {}
export type ProductTable = {
  "Tên": string,
  "Đường dẫn": string,
  "Thương hiệu": string,
  "Xóa": React.ReactNode,
  "option": React.ReactNode,
  "Ngày tạo": string,
  "Danh mục": string
}

type Sort = {
  name: string
  sort: 1 | -1
}

const DashboardProduct = ({ }: Props) => {
  const limit = 3
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false)
  const [showAddValue, setShowAddValue] = useState<boolean>(false)
  const [dataProductTable, setDataProductTable] = useState<ProductTable[]>()
  const [setProductQuery, { data: dataProductQuery, fetchMore, updateQuery, refetch, loading }]
    = useProductsLazyQuery()
  const [sort, setSort] = useState<Sort>({ name: "createAt", sort: -1 })
  const [deleteProduct,] = useDeleteProductMutation()
  const showOptionTable: HandleClickButton<string> = (_, dataOption) => {
    console.log(dataOption)
  }



  const onDeleteProduct: HandleClickButton<string> = useCallback(async (_, id) => {
    if (id) {
      await deleteProduct({
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              productsByCategoryId(products): Omit<ProductMutationResponse, "products"> & { products: { __ref: string }[] } {
                let setProduct: Omit<ProductMutationResponse, "products"> & { products: { __ref: string }[] } = products;
                console.log(setProduct.products.find(pr => pr.__ref == "Products:" + id))
                return { ...setProduct, products: setProduct.products.filter(pr => pr.__ref !== "Products:" + id) }
              }
            }
          })
        }
      })
    }
  }, [deleteProduct])


  const callbackAddDataTable = async () => {
    const skip = dataProductQuery?.productsByCategoryId.pagination?.skip
    const { data } = await fetchMore({
      variables: {
        limit: 2,
        hasMore: dataProductQuery?.productsByCategoryId.pagination?.hasMore,
        skip: skip ? skip + 2 : limit,
        sort: sort,
      }
    })
    updateQuery((prev) => {
      return {
        productsByCategoryId: {
          ...data.productsByCategoryId,
          products: prev.productsByCategoryId.products && data.productsByCategoryId.products ? [
            ...prev?.productsByCategoryId?.products,
            ...data.productsByCategoryId.products
          ] : []
        }
      }
    })
  }

  useEffect(() => {
    setProductQuery({ variables: { limit, hasMore: true, sort: sort, skip: 0 } })
    const product = dataProductQuery?.productsByCategoryId.products?.map<ProductTable>((product, index) => ({
      stt: index + 1,
      Tên: product.name,
      "Danh mục": product.category.name,
      "Đường dẫn": product.path.name,
      "Thương hiệu": product.brand.name,
      option: <Button<string> data={product.id}
        handle={showOptionTable} key={product.id}
        text="option" />,
      Xóa: <Button<string>
        data={product.id}
        key={product.id}
        handle={onDeleteProduct}
        text="xóa" />,
      "Ngày tạo": product.createAt,
    }))
    setDataProductTable(product)
  }, [dataProductQuery, sort, onDeleteProduct, setProductQuery])

  const callbackOnAddOption = () => {
    refetch()
    setShowAddProduct(false)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx("show-product-table")}>
        {dataProductTable && <Table<ProductTable>
          name="Bảng sản phẩm"
          loading={loading}
          onPushData={callbackAddDataTable}
          onSortTable={(_, data) => {
            data?.name === "Tên" && setSort({ name: "name", sort: data.sort })
            data?.name === "Ngày tạo" && setSort({ name: "createAt", sort: data.sort })
            data?.name === "Thương hiệu" && setSort({ name: "brand", sort: data.sort })
            data?.name === "Danh mục" && setSort({ name: "category", sort: data.sort })
          }}
          data={dataProductTable}
        />}
      </div>
      <div className={cx("add-product")}>
        <Button
          text={!showAddProduct ? "Thêm mới sản phẩm" : "Đóng"}
          handle={() => { setShowAddProduct(check => !check) }}
        />
        {showAddProduct && <DashboardAddProduct
          callbackShowAddProduct={callbackOnAddOption}
        />}
      </div>
      <div className={cx("add-value")}>
        <Button
          text="thêm value"
          handle={() => { setShowAddValue(true) }}
        />
        {showAddValue &&
          <Modal open={setShowAddValue} >
            <AddProductValue />
          </Modal >}
      </div>
    </div>
  )
}
DashboardProduct.Layout = DashboardLayout
export default DashboardProduct