import classNames from 'classnames/bind'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Button } from '../Lib/Button'
// import SelectProduct from '../product/SelectProduct'
import style from './News.module.scss'
import NewsDetail from './NewsDetail'


const cx = classNames.bind(style)
type Props = {}

const News = ({ }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('top-news')}>
        top news
      </div>

      <div className={cx('show-news')}>
        <div className={cx('filter')}>
          <Button text="Trong nước" />
          <Button text="Thế giới" />
          <Button text="Sức khỏe" />
          <Button text="Showbiz" />
          <Button text="Thể thao" />
          <Button text="Giải trí" />
          <Button text="Khoa học" />
          <Button text="Giáo dục" />
        </div>
        {/* <hr /> */}
        <div className={cx('ctn-show-news')}>
          <div className={cx('wrapper-show-news')}>
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Mưa lớn biến ga tàu điện ngầm New York thành thác nước tai binh thuan cua nhiều người nghiêng người" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
            <NewsDetail img={require('../../assets/news/news_1.jpg')} title="Tin 1" comment={20} star={4.3} />
          </div>
          <div className={cx('add-news')}><Button text="Xem thêm" /></div>

        </div>
      </div>
      <div className={cx('right')}>
        addr
      </div>
    </div>
  )
}

News.Layout = DefaultLayout


export default News