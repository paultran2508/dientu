import { Rating } from "@mui/material"
import classNames from "classnames/bind"
import Image from "next/image"
import style from './NewsDetail.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';

const cx = classNames.bind(style)

type Props = {
  title: string
  img: string
  comment: number
  star: number
}

const NewsDetail = ({ star, img, title }: Props) => {

  const handle = () => {
    // alert(1)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('ctn-news-detail')}>

        <div className={cx('img')}>
          <Image src={img} alt="anh" />
        </div>

        <div className={cx('content')}>
          <h4>{title}</h4>
          <div className={cx('rating')}>
            <div className={cx('star')}><Rating defaultValue={star} precision={0.5} readOnly /><sup>({star})</sup></div>
            <div className={cx('view')}><VisibilityIcon fontSize="inherit" /><sup>(30)</sup></div>
            <button onClick={handle}>
              <FacebookIcon fontSize="inherit" />
            </button>
          </div>
          <div className={cx('date')}>30/12/2022 18:00</div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail