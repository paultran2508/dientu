import classNames from "classnames/bind"
import Image from "next/image"
import style from './ProductDetail.module.scss'


type Props = {
  name: string
  img: any
  price: number
}
const cx = classNames.bind(style)

const ProductDetail = ({ img, name, price }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('img')}>
        <Image src={img} alt={name} />
      </div>
      <div className={cx('content')}>
        <h4>{name}</h4>
        <div className={cx('price')}>
          {price}<sup>đ</sup>
        </div>
      </div>


    </div>
  )
}

export default ProductDetail