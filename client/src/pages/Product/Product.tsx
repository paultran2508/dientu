import classNames from "classnames/bind"
import styles from './product.module.scss'
import ProductDetail from "./ProductDetail"


const cx = classNames.bind(styles)

const Product = () => {
  return (
    <div className={cx('layout-product')}>
      <div className={cx('ctn-product-detail')}>
        <ProductDetail />
        <ProductDetail />
        <ProductDetail />
        <ProductDetail />
      </div>
    </div>

  )
}

export default Product