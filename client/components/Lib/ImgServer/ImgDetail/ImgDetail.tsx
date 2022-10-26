import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import style from "./img-detail.module.scss"


const cx = classNames.bind(style)

type Props = {
  callbackChooseImgs?: Dispatch<SetStateAction<string[]>>
  id: string
  name: string
  src: string
}

const ImgDetail = ({ id, name, src, callbackChooseImgs }: Props) => {

  const [selectImg, setSelectImg] = useState<boolean>(false)


  const handleCallbackImg = () => {
    setSelectImg(select => !select)
    console.log(selectImg)
    !selectImg && callbackChooseImgs && callbackChooseImgs(imgs => imgs.concat([src]))
    selectImg && callbackChooseImgs && callbackChooseImgs(imgs => imgs.filter(img => img !== src))

  }
  return (
    <div onClick={handleCallbackImg} className={cx("wrapper")}>
      {selectImg && <div className={cx("select-img")}><Icon className={cx("icon")}>done</Icon></div >}
      <Image
        key={id}
        alt={name}
        src={src}
        width={150} height={100}
      />
    </div>
  )
}

export default ImgDetail