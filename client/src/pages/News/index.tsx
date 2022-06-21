import classNames from "classnames/bind"
import style from './news.module.scss'

const cx = classNames.bind(style)
const News = () => {
  return (
    <div className={cx('news-layout')}>
      <div className={cx('top-news')}>
        <div className={cx('left')}>

        </div>
        <div className={cx('center')}></div>
        <div className={cx('right')}></div>
      </div>
      <div className={cx('ctn-news-detail')}>
        <div className={cx('header')}>
          <ul >
            <li>the gioi</li>
            <li>the thao</li>
            <li>phap luat</li>
            <li>kinh te</li>
          </ul>
        </div>
      </div>
      <div className={cx('news-detail')}>

      </div>
    </div>
  )
}

export default News