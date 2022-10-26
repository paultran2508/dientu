import classNames from "classnames/bind"
import Image from "next/image"
import { ChangeEventHandler, Dispatch, memo, SetStateAction, useState } from "react"
import { ImgOf, InputMaybe, useImgsLazyQuery, useUploadImgMutation } from "../../../src/generated/graphql"
import { Button, HandleClickButton } from "../Button"
import ImgDetail from "./ImgDetail"
import style from "./modal-img-server.module.scss"

const cx = classNames.bind(style)
type Props = {
  // onModal: (modal: Dispatch<SetStateAction<boolean>>) => void
  open: boolean
  close: Dispatch<SetStateAction<boolean>>
  callbackImgValues?: GetChooseImgs
}

export type GetChooseImgs = (imgs: string[]) => void

const ModalImgServer = ({ open, close, callbackImgValues }: Props) => {

  const [uploadFiles, setUploadFiles] = useState<FileList[]>([])
  const [dataImgs, setDataImgs] = useState<{ name: string, src: string, id: string }[] | undefined>()
  const [chooseImgs, setChooseImg] = useState<string[]>([])
  const [upload, { loading, data }] = useUploadImgMutation()
  const [imgs] = useImgsLazyQuery()

  // console.log(chooseImgs)

  const onUploadImg = async () => {

    try {
      console.log(uploadFiles)
      if (uploadFiles.length <= 0) {
        alert("error")
      } else {
        const file = uploadFiles[0][0]

        const { data } = await upload({
          variables: { file },
          fetchPolicy: "no-cache"
        })
        console.log(data?.uploadImg)
      }

    } catch (error) {
      console.log(error)
    }


  }

  const onSetFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files)
    e.target.files && e.target.files.length === 1 && setUploadFiles([e.target.files, ...uploadFiles])
  }

  const handleImg: HandleClickButton<InputMaybe<ImgOf>> = async (_, name) => {
    console.log(name)
    const { data } = await imgs({ variables: { of: name } })
    console.log(data?.showImgs.imgs)
    data?.showImgs.imgs && setDataImgs(data?.showImgs.imgs.map(img => ({ id: img.id, name: img.name, src: img.src })))
  }




  return (
    <div className={cx({ modal: true, open })}>

      <div className={cx("content")}>
        <div className={cx("close")}>
          <Button text="Đóng" handle={() => { close(false) }} />
        </div>
        <div className={cx("ctn-button")}>
          {Object.values(ImgOf).map(of => <Button<InputMaybe<ImgOf>>
            data={of}
            handle={handleImg} key={of} text={of}
          />)}

        </div>
        <div className={cx("ctn-form-upload")}>
          <h1>Tải ảnh lên server</h1>
          <input onChange={onSetFileUpload} type="file" />
          <Button handle={onUploadImg} text="Upload Ảnh" />
        </div>

        <div className={cx("ctn-show-img")}>
          {loading && <h3>loading ...</h3>}
          {data?.uploadImg.fieldErrors && data.uploadImg.fieldErrors.length > 0 && <h3>{data.uploadImg.fieldErrors[0].message}</h3>}
          {data?.uploadImg.img?.name && <Image
            alt=""
            loading={loading ? "lazy" : undefined}
            src={data?.uploadImg.img?.src}
            width={150} height={100}
          />}


          {dataImgs && dataImgs.map(img => <ImgDetail callbackChooseImgs={setChooseImg} id={img.id} src={img.src} name={img.name} key={img.id} />)}

        </div>
        <Button handle={() => {
          callbackImgValues && callbackImgValues(chooseImgs)
          close(false)
        }} text="Hoàn Thành" />
      </div>
    </div>
  )
}

export default memo(ModalImgServer)