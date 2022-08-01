import classNames from "classnames/bind"
import SelectProduct from "../../components/product/SelectProduct"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import style from './Product.module.scss'
import ProductDetail from "./ProductDetail"

type Props = {

}

const ram = ['4gb', '8gb', '16gb']
const display = ['fullHD', 'HD']
const rom = ['32gb', '64gb', '128gb']
const cpu = ['core i3', 'core i5', 'core i7', 'core i9']

const cx = classNames.bind(style)

const Product = ({ }: Props) => {

  const handle = () => {
    console.log(1)
  }


  return (
    <div className={cx('wrapper')} >
      <div className={cx('filter')}>
        <SelectProduct options={ram} name="Ram" handle={handle} />
        <SelectProduct options={cpu} name="CPU" handle={handle} />
        <SelectProduct options={rom} name="Rom" handle={handle} />
        <SelectProduct options={display} name="Man hinh" handle={handle} />
      </div>
      <hr />
      <div className={cx('ctn-product')}>
        <ProductDetail price={7000000} name='Xiaomi poco 4' img={require('../../assets/product/xiaomi_poco4.jpg')} />
        <ProductDetail price={20000000} name='Iphone 12' img={require('../../assets/product/iphone_12.jpg')} />
        <ProductDetail price={15000000} name='Oppo Reno 7 ' img={require('../../assets/product/oppo_reno7.jpg')} />
        <ProductDetail price={10000000} name='Samsung M51' img={require('../../assets/product/samsung_m51.jpg')} />
        <ProductDetail price={20000000} name='Samsung S22' img={require('../../assets/product/samsung_s22.jpg')} />
        <ProductDetail price={7000000} name='Xiaomi poco 4' img={require('../../assets/product/xiaomi_poco4.jpg')} />
        <ProductDetail price={20000000} name='Iphone 12' img={require('../../assets/product/iphone_12.jpg')} />
        <ProductDetail price={15000000} name='Oppo Reno 7 ' img={require('../../assets/product/oppo_reno7.jpg')} />
        <ProductDetail price={10000000} name='Samsung M51' img={require('../../assets/product/samsung_m51.jpg')} />
        <ProductDetail price={20000000} name='Samsung S22' img={require('../../assets/product/samsung_s22.jpg')} />
      </div>

    </div >)
}

Product.Layout = DefaultLayout

export default Product