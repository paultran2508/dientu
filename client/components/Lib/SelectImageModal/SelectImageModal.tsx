import classNames from "classnames/bind"
import Image from "next/image"
import { useState } from "react"
import { ImgOf } from "../../../src/generated/graphql"
import { GetValueChange } from "../../../types/GetValueChange"
import { Button } from "../Button"
import ModalImgServer from "../ImgServer/ModalImgServer"
import style from "./select-image-modal.module.scss"

type TypeImgValues = {
  img: string,
  title: string,
}
type Props = {
  of: ImgOf,
  show?: number
  attr?: string
  getValueImgs: GetValueImgs
};

type TypeImg = {
  imgs: TypeImgValues[],
  attr?: string
}


export type GetValueImgs = (param: TypeImg) => void

const cx = classNames.bind(style)



const SelectImageModal = ({ of, show, getValueImgs, attr }: Props) => {

  const [modal, setModal] = useState(false)
  const [imgs, setImgs] = useState<TypeImgValues[]>([])

  const setImg: GetValueChange<string[]> = ({ value }) => {
    const newImgs = value.map(img => ({
      img: img,
      title: img
    })).slice(show ? -show : show)
    setImgs(newImgs)
    getValueImgs({ attr, imgs: newImgs })
  }

  return (
    <div className={cx("wrapper")}>
      <h2>Chon ảnh đại diện: </h2>
      <Button text="Chọn Ảnh" handle={() => {
        setModal(true)
      }} />
      <ModalImgServer
        open={modal}
        callbackImgValues={setImg}
        close={setModal}
        of={of}
      />

      <div className={cx("show-img")}>
        {imgs && imgs.map((img) =>
          <div key={img.img} className={cx("img-detail")}>
            <div className={cx("close")}> <Button<number> icon="close" handle={() => {
              setImgs(values => values.filter(value => value.img !== img.img))
            }} /></div>
            <Image width={"200px"} height={"120px"} src={img.img} alt={img.title ?? ""} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectImageModal