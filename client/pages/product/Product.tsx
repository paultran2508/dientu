import classNames from "classnames/bind"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import style from './Product.module.scss'
import ProductDetail from "./ProductDetail"

type Props = {

}

const cx = classNames.bind(style)

const Product = ({ }: Props) => {

  return (
    <div className={cx('wrapper')} >
      <div className={cx('ctn-product')}>
        <ProductDetail price={7000000} name='xiaomi poco 4' img={require('../../assets/product/xiaomi_poco4.jpg')} />
        <ProductDetail price={20000000} name='Iphon 12' img={require('../../assets/product/iphone_12.jpg')} />
        <ProductDetail price={15000000} name='Oppo Reno 7 ' img={require('../../assets/product/news_1.jpg')} />
        <ProductDetail price={10000000} name='Samsung M51' img={require('../../assets/product/samsung_m51.jpg')} />
        <ProductDetail price={20000000} name='Samsung S22' img={require('../../assets/product/samsung_s22.jpg')} />
      </div>

    </div >)
}

Product.Layout = DefaultLayout

export default Product