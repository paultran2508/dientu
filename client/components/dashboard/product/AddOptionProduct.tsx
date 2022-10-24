import classNames from "classnames/bind"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../../Lib/Button"
import ModalImgServer from "../../Lib/ImgServer/ModalImgServer"
import { Input } from "../../Lib/Input"
import SelectInput from "../../Lib/select"
import { TypeSelectOption } from "../../Lib/select/SelectInput"
import styled from "./add-option-product.module.scss"
import PriceOption from "./price"

const cx = classNames.bind(styled)
type Props = {
  selects: TypeSelectAttr[],
  name: string | number,

}

export type TypeSelectAttr = {
  attr: string
  options: TypeSelectOption[]
}

const AddOptionProduct = ({ selects, name }: Props) => {
  const [modal, setModal] = useState(false)
  const [priceAdd, setPriceAdd] = useState<string[]>(["Price"])
  // console.log(selects)

  const onShowImgServer = () => {
    setModal(true)
  }

  const addPriceOption = () => {
    setPriceAdd(price => price.concat(["Price"]))

  }


  return (
    <div className={cx("wrapper")}>
      <h2>{"Option " + name}</h2>
      <div className={cx("ctn-select")}>
        {selects.map(select => <SelectInput all name={select.attr} key={select.attr} options={select.options} />)}
      </div>
      <Input name="Tên Option" />
      <div className={cx("ctn-price")}>
        {priceAdd.map((price, index) => <PriceOption key={index} price={price + " " + `${index + 1}`} />)}
        <Button fullWidth text="Thêm gía bán " handle={addPriceOption} />
      </div>

      <div className={cx("ctn-img")}>
        <Button text="Thêm ảnh " handle={onShowImgServer} />
        <div className={cx("show-img")}>
          <Image alt="" width={150} height={100} src="https://i.ibb.co/QfrNyqD/iphone-14-pro-bac-1-2-jpg.jpg" />
          <Image alt="" width={150} height={100} src="https://i.ibb.co/QfrNyqD/iphone-14-pro-bac-1-2-jpg.jpg" />
          <Image alt="" width={150} height={100} src="https://i.ibb.co/QfrNyqD/iphone-14-pro-bac-1-2-jpg.jpg" />
        </div>
      </div>


      <ModalImgServer open={modal} close={setModal} />
    </div>
  )
}

export default AddOptionProduct