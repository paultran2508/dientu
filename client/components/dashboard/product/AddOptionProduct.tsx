import classNames from "classnames/bind"
import Image from "next/image"
import { useState } from "react"
import { ImgOf, useProductAttributesQuery } from "../../../src/generated/graphql"
import { GetValueChange } from "../../../types/GetValueChange"
import { Button } from "../../Lib/Button"
import ModalImgServer from "../../Lib/ImgServer/ModalImgServer"
import { Input } from "../../Lib/Input"
import SelectInput from "../../Lib/select"
import { TypeSelectOption } from "../../Lib/select/SelectInput"
import styled from "./add-option-product.module.scss"
import { AddOptionValue, AddPriceValue } from "./init"
import PriceOption from "./price"

const cx = classNames.bind(styled)
type Props = {
  categoryId: string,
  callbackValueChange: (optionsValue: AddOptionValue, indexOption: number) => void,
  indexOption: number,
  indexInit: number,
  callbackCloseOptionThis?: (indexOption: number, indexPrice?: number) => void,
  optionValue: AddOptionValue,
  onAddPrice: (indexOption: number) => void
  imgs: string[]
}

export type TypeSelectAttr = {
  attr: string
  options: TypeSelectOption[]
}



type SetValueOption = (optionValue: AddOptionValue, value: any, attr?: string, name?: string) => AddOptionValue

const setValueOption: SetValueOption = (optionValue, value, attr?, name?) => {
  let setOptionValue = optionValue

  switch (attr) {
    case "valueIds":
      const indexValue = optionValue.valueIds.findIndex(value => value.name === name)
      indexValue === -1 && setOptionValue.valueIds.push({ id: value, name: name as string })
      indexValue !== -1 && (setOptionValue.valueIds[indexValue].id = value as string);
      break;
    case "name":
      (setOptionValue.name = value);
      break;
    case "addImgs":
      Array.isArray(value) && (setOptionValue.addImgs = value);

      break;
    default:
      break;
  }
  return setOptionValue
}


function AddOptionProduct({
  categoryId,
  callbackValueChange,
  callbackCloseOptionThis,
  optionValue,
  indexOption,
  onAddPrice,
  imgs
}: Props) {

  const [modal, setModal] = useState(false)
  const { data } = useProductAttributesQuery({
    variables: { categoryId }
  })
  const onShowImgServer = () => {
    setModal(true)
  }

  const getOptionValue: GetValueChange<any> = (input, attr, name) => {

    const setOptionValue = setValueOption({ ...optionValue }, input, attr ? attr : "addImgs", name)
    callbackValueChange(setOptionValue, indexOption)
  }

  const getValuePrice = (priceValue: AddPriceValue, indexOption: number, indexPrice: number) => {
    let setPriceValue = optionValue.addPrices
    setPriceValue[indexPrice] = priceValue
    const setOptionValue: AddOptionValue = { ...optionValue, addPrices: setPriceValue }
    callbackValueChange(setOptionValue, indexOption)
  }

  return (<>
    <div className={cx("wrapper")}>
      <div className={cx("close")}>
        <Button handle={() => {
          callbackCloseOptionThis && callbackCloseOptionThis(indexOption)
        }} icon="close" />
      </div>
      <h2>{"Option " + `${indexOption + 1}`}</h2>
      <div className={cx("ctn-select")}>
        {data?.productAttributes.attributes &&
          data?.productAttributes.attributes.map(attrs =>
            <SelectInput
              all
              getValueChange={getOptionValue}
              attr="valueIds"
              name={attrs.name}
              key={attrs.id}
              options={attrs.values.map(value =>
                ({ name: value.name, value: value.id }))
              }
            />)
        }
      </div>
      <Input attr="name" value=""

        getValueChange={getOptionValue}
        name="Tên Option" />
      <div className={cx("ctn-price")}>
        {optionValue.addPrices.map((price, id) =>
          <PriceOption
            getValuePrice={getValuePrice}
            indexPrice={id}
            indexOption={indexOption}
            indexInit={price.indexInit}
            callbackRemovePriceThis={callbackCloseOptionThis}
            priceValue={price}
            key={price.indexInit}
          />
        )}
        <div className={cx("ctn-submit-add")}>
          <Button text="Thêm gía bán " handle={() => { onAddPrice(indexOption) }} />
        </div>
      </div>
      <div className={cx("ctn-img")}>
        <Button text="Thêm ảnh " handle={onShowImgServer} />
        <div className={cx("show-img")}>
          {imgs.map((img, index) => <div key={index} className={cx("img-detail")}>
            <div
              onClick={() => {
                const setImgs = imgs.filter(i => i !== img)
                callbackValueChange({
                  ...optionValue,
                  addImgs: setImgs
                }, indexOption)
              }}
              className={cx("close-img")}
            >
              <Button icon="close" />
            </div>
            <Image alt="" width={150} height={100} key={index} src={img} />
          </div>)}
        </div>
      </div>
      <ModalImgServer of={ImgOf.Product}
        callbackImgValues={getOptionValue}
        open={modal}
        close={setModal} />
    </div>
  </>)
}

export default AddOptionProduct