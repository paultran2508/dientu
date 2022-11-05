import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useProductsQuery } from "../../../src/generated/graphql"
import { Button } from "../../Lib/Button"
import Table from "../../table"
import DashboardLayout from "../DashboardLayout"
import style from "./dashboard-product.module.scss"
import DashboardAddProduct from "./DashboardAddProduct"

const cx = classNames.bind(style)
type Props = {}

const DashboardProduct = ({ }: Props) => {

  const [showAddProduct, setShowAddProduct] = useState<boolean>(false)
  const [dataProduct, setDataProduct] = useState()
  const { data, error } = useProductsQuery()

  useEffect(() => {

  }, [showAddProduct])


  return (
    <div className={cx('wrapper')}>
      <div className={cx("show-product-table")}>
        <Table />
      </div>
      <div className={cx("add-product")}>
        <Button text={!showAddProduct ? "Thêm mới sản phẩm" : "Đóng"} handle={() => { setShowAddProduct(check => !check) }} />
        {showAddProduct && <DashboardAddProduct callbackShowAddProduct={setShowAddProduct} />}
      </div>
    </div>
  )
}

DashboardProduct.Layout = DashboardLayout

export default DashboardProduct