import classNames from "classnames/bind"
import { ChangeEventHandler, Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import { ImgMutationResponse, ImgOf, ImgsDocument, InputMaybe, useImgsLazyQuery, useUploadImgMutation } from "../../../src/generated/graphql"
import { Button, HandleClickButton } from "../Button"
import ImgDetail from "./ImgDetail"
import style from "./modal-img-server.module.scss"

const cx = classNames.bind(style)
type Props = {
  of?: ImgOf
  open: boolean
  close: Dispatch<SetStateAction<boolean>>
  callbackImgValues?: GetChooseImgs
}

export type GetChooseImgs = (imgs: string[]) => void

const ModalImgServer = ({ open, close, callbackImgValues, of }: Props) => {

  const [uploadFiles, setUploadFiles] = useState<FileList[]>([])
  const [dataImgs, setDataImgs] = useState<{} & { name: string, src: string, id: string }[]>([])
  const [chooseImgs, setChooseImg] = useState<string[]>([])
  const [upload, { loading, data }] = useUploadImgMutation()
  const [imgs, { data: dataQueryImgs }] = useImgsLazyQuery()


  useEffect(() => {
    const loadImgServer = async (typeOf: ImgOf) => {
      await imgs({ variables: { of: typeOf } })
      dataQueryImgs?.showImgs.imgs && setDataImgs(dataQueryImgs?.showImgs.imgs.map(img => ({ id: img.id, name: img.name, src: img.src })))
    }
    of && loadImgServer(of)
  }, [dataQueryImgs, of, imgs])

  const onUploadImg = async () => {
    try {
      if (uploadFiles.length <= 0) {
        alert("error")
      } else {
        const file = uploadFiles[0][0]
        const { } = await upload({
          variables: { file },
          update(cache, { data }) {
            cache.updateQuery<{ showImgs: ImgMutationResponse }>({ query: ImgsDocument, variables: { of: ImgOf.Product } }, (dataUpdate) => {
              let newsImg;
              if (dataUpdate?.showImgs.imgs) {
                newsImg = {
                  showImgs: {
                    ...dataUpdate?.showImgs,
                    imgs: data?.uploadImg.img ? [{ ...data?.uploadImg.img }, ...dataUpdate?.showImgs.imgs] : [...dataUpdate?.showImgs.imgs]
                  }
                }
              }
              if (data?.uploadImg.img) {
                const setImg = data?.uploadImg.img
                setDataImgs(imgs => [{ ...setImg, }, ...imgs])
              }
              return newsImg
            })
          }
        })
      }
    } catch (error) { console.log(error) }
  }

  const onSetFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && e.target.files.length === 1 && setUploadFiles([e.target.files, ...uploadFiles])
  }

  const handleImg: HandleClickButton<InputMaybe<ImgOf>> = async (_, name) => {
    const { data } = await imgs({ variables: { of: name } })
    data?.showImgs.imgs && setDataImgs(data?.showImgs.imgs.map(img => ({ id: img.id, name: img.name, src: img.src })))
  }

  return (
    <div className={cx({ modal: true, open })}>
      <div className={cx("content")}>
        <div className={cx("close")}>
          <Button text="Đóng" handle={() => { close(false) }} />
        </div>
        {!of && <div className={cx("ctn-button")}>
          {Object.values(ImgOf).map(of => <Button<InputMaybe<ImgOf>>
            data={of}
            handle={handleImg} key={of} text={of}
          />)}
        </div>}
        <div className={cx("ctn-form-upload")}>
          <h1>Tải ảnh lên server</h1>
          <input onChange={onSetFileUpload} type="file" />
          <Button handle={onUploadImg} text="Upload Ảnh" />
        </div>

        <div className={cx("ctn-show-img")}>
          {loading && <h3>loading ...</h3>}
          {data?.uploadImg.fieldErrors && data.uploadImg.fieldErrors.length > 0 && <h3>{data.uploadImg.fieldErrors[0].message}</h3>}
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