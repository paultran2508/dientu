import classNames from 'classnames/bind'
import { useState } from 'react'
import { AddNewsInput, ImgOf, useAddNewsMutation, useNewsCategoriesQuery } from '../../../src/generated/graphql'
import { GetValueChange } from '../../../types/GetValueChange'
import { Button } from '../../Lib/Button'
import { Input } from '../../Lib/Input'
import SelectInput from '../../Lib/select'
import SelectImageModal from '../../Lib/SelectImageModal'
import DashboardLayout from '../DashboardLayout'
import style from "./dashboard-news.module.scss"
import { useAlert } from 'react-alert'
import EditorLib from '../../Lib/EditorLib'


const cx = classNames.bind(style)

type Props = {}
const DashboardNews = ({ }: Props) => {

  const { data: dataCategory } = useNewsCategoriesQuery()
  const [addNewsInput, setAddNewsInput] = useState<AddNewsInput>({ img: "", path: "", title: "", newsCategoryId: "" })
  const [addNews, { data: checkAddNews }] = useAddNewsMutation()
  const alert = useAlert()


  const getAddNewsValues: GetValueChange<string> = ({ value, attr }) => {
    attr && setAddNewsInput(values => ({ ...values, [attr]: value }))
  }

  const onSubmitAddNews = async () => {
    !Object.values(addNewsInput).includes("") && await addNews({ variables: { addNewsInput: addNewsInput } })
  }

  checkAddNews?.addNews.success && checkAddNews?.addNews.code === 200 && alert.success("Thêm tin mới thành công")

  return (
    <div className={cx("wrapper")}>

      {dataCategory?.showNewsCategories.newsCategories && <SelectInput
        all
        attr='newsCategoryId'
        name='Danh mục'
        getValueChange={getAddNewsValues}
        options={
          dataCategory.showNewsCategories.newsCategories.map(category => ({
            value: category.id,
            name: category.name
          }))
        }
      />}
      <div className={cx("add-news")}>
        <div className={cx("input")}>
          <Input name='Nhập tiêu đề' attr='title' getValueChange={getAddNewsValues} />
          <Input name='Đường dẫn' attr='path' getValueChange={getAddNewsValues} />
        </div>
        <div className={cx("ctn-show-img")}>
          <SelectImageModal
            getValueImgs={({ imgs }) => {
              console.log(imgs.length > 0)
              imgs.length > 0 && setAddNewsInput(values => ({
                ...values,
                img: imgs[0].img
              }))
            }}
            of={ImgOf.News}
            show={1}
          />
        </div>
        <div className={cx("editor")}>
          <EditorLib />
        </div>
        <Button text="Thêm tin mới" handle={onSubmitAddNews} />
      </div>
    </div>
  )
}

DashboardNews.Layout = DashboardLayout

export default DashboardNews