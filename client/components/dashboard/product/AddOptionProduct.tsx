import classNames from "classnames/bind"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { ImgOf, useProductAttributesQuery } from "../../../src/generated/graphql"
import { GetValueChange } from "../../../types/GetValueChange"
import { Button } from "../../Lib/Button"
import ModalImgServer, { GetChooseImgs } from "../../Lib/ImgServer/ModalImgServer"
import { Input } from "../../Lib/Input"
import SelectInput from "../../Lib/select"
import { TypeSelectOption } from "../../Lib/select/SelectInput"
import styled from "./add-option-product.module.scss"
import { AddOptionByIndex } from "./DashboardProduct"
import PriceOption from "./price"

const cx = classNames.bind(styled)
type Props = {
  categoryId: string,
  index: number,
  setValueOption: setFormValues,
  option: number

}

export type TypeSelectAttr = {
  attr: string
  options: TypeSelectOption[]
}

const AddOptionProduct = ({ categoryId, setValueOption, option, index }: Props) => {
  const [modal, setModal] = useState(false)
  const [addPrices, setAddPrices] = useState<number[]>([1])
  const { data } = useProductAttributesQuery({ variables: { categoryId } })
  const [chooseImgs, setChooseImg] = useState<string[]>([])


  // console.log(selects)

  const onShowImgServer = () => {
    setModal(true)

  }

  const setValueOptionInput: GetValueChange = (value, attr) => {
    setValueOption(values => {
      attr
      let options: AddOptionByIndex[] = values;
      options[index].optionValues.name = value
      return options
    })
  }

  const addPriceOption = () => {
    addPrices.length > 0 && setAddPrices(prices => [...prices, prices.slice(-1)[0] + 1])
    addPrices.length === 0 && setAddPrices([1])


  }

  const handleCloseOption = () => {
    console.log(option)
    setValueOption(options => options.filter(op => {
      console.log(options)
      return op.index !== option
    }))
  }

  const getChooseImg: GetChooseImgs = (imgs) => {
    setChooseImg(imgs)
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("close")}>
        <Button handle={handleCloseOption} icon="close" />

      </div>
      <h2>{"Option " + option}</h2>
      <div className={cx("ctn-select")}>
        {data?.productAttributes.attributes && data?.productAttributes.attributes.map(attrs =>
          <SelectInput
            name={attrs.name}
            key={attrs.id}
            options={attrs.values.map(value => ({ name: value.name, value: value.id }))}
          />)
        }
      </div>
      <Input attr="name" getValueChange={setValueOptionInput} name="Tên Option" />
      <div className={cx("ctn-price")}>
        {addPrices.map(price => <PriceOption callbackClose={setAddPrices} key={price} price={price} />)}
        <div className={cx("ctn-submit-add")}>
          <Button text="Thêm gía bán " handle={addPriceOption} />
        </div>
      </div>

      <div className={cx("ctn-img")}>
        <Button text="Thêm ảnh " handle={onShowImgServer} />
        <div className={cx("show-img")}>
          {chooseImgs.map((img, index) => <div key={index} className={cx("img-detail")}>
            <div onClick={() => {
              setChooseImg(imgs => imgs.filter(i => i !== img))
            }} className={cx("close-img")}><Button icon="close" /></div>
            <Image alt="" width={150} height={100} key={index} src={img} />
          </div>)}
        </div>
      </div>
      <ModalImgServer of={ImgOf.Product} callbackImgValues={getChooseImg} open={modal} close={setModal} />
    </div>
  )
}

export default AddOptionProduct