import { Rating } from "@mui/material"
import classNames from "classnames/bind"
import Image from "next/image"
import { Button } from "../../components/Lib/Button"
import style from './product-detail.module.scss'
import CommentIcon from '@mui/icons-material/Comment';

type Props = {
  name: string
  img: string
  price: number
}
const cx = classNames.bind(style)

const ProductDetail = ({ img, name, price }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('img')}>
        <Image width={"300%"} height={"200%"} src={img} alt={name} />
      </div>
      <div className={cx('content')}>
        <h4>{name}</h4>
        <div className={cx('rating')}>
          <div className={cx('star')}>
            <div> <Rating name="half-rating-read" defaultValue={3.3} precision={0.5} readOnly />  <sup>(20)</sup></div>
          </div>
          <div className={cx('comment')}>
            <div><CommentIcon fontSize="inherit" /><sup>(20)</sup></div>
          </div>
        </div>

        <div className={cx('price')}>
          <Button fullWidth icon="add_shopping_cart" text={<>{price.toString()} <sup>đ</sup></>} />
        </div>
      </div>


    </div>
  )
}

export default ProductDetail