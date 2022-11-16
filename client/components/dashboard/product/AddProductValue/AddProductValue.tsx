import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useAddProductValueMutation, useCategoryQuery, useProductAttributesLazyQuery } from "../../../../src/generated/graphql"
import { GetValueChange } from "../../../../types/GetValueChange"
import { Button, HandleClickButton } from "../../../Lib/Button"
import { Input } from "../../../Lib/Input"
import SelectInput from "../../../Lib/select"
import Table from "../../../table"
import style from "./add-product-value.module.scss"

const cx = classNames.bind(style)

type InputAddProductValue = {
  attributeId: string
  value: string
}

type Props = {
  // categoryId: string
}

type TypeAttributeTable = {
  Stt: number,
  "Thuộc tính": string,
  "Giá trị": React.ReactNode,
  "Thêm Giá trị": React.ReactNode
}
let nameCategory: string = "";

const AddProductValue = ({ }: Props) => {

  const [setDataAttribute, { data: dataAttribute }] = useProductAttributesLazyQuery()
  const { data: dataCategory } = useCategoryQuery()
  const [dataTable, setDataTable] = useState<TypeAttributeTable[]>()
  const [nameCategory, setNameCategory] = useState<string>("")
  const [addProductValue, { data: dataProductValue }] = useAddProductValueMutation()
  const [inputProductValue, setInputProductValue] = useState<InputAddProductValue>({ attributeId: "", value: "" })

  const setInputValue: GetValueChange<string> = async (value, attr, name,) => {

    if (attr === "categoryId") {
      await setDataAttribute({ variables: { categoryId: value } });
      const category = dataCategory?.categories.categories?.find(category => category.id == value)?.name
      category && setNameCategory(category)

    }

    // attr === "attributeId" && setInputProductValue(setValue => ({ ...setValue, attributeId: value }))
    // attr === "value" && setInputProductValue(setValue => ({ ...setValue, value: value }))
  }


  const onAddProductValue = async () => {
    inputProductValue && await addProductValue({ variables: { inputProductValue } })
  }

  const onDeleteValueAttr: HandleClickButton<string> = (_, id) => {
    alert(id)
  }

  useEffect(() => {
    const getDataTable = dataAttribute?.productAttributes.attributes?.map<TypeAttributeTable>((attr, index) => ({
      Stt: index + 1,
      "Thuộc tính": attr.name,
      "Giá trị": <div className={cx("value")}> {attr.values.map(value => <div key={value.id} className={cx("item-value")}>
        <span>{value.name}</span>
        <Button<string> data={value.id} handle={onDeleteValueAttr} text="Xóa" />
      </div>)} </div>,
      "Thêm Giá trị": <div className={cx("add-value")}>
        <Button text="Thêm" data={attr.id} />
        <Input width="200px" attr="value" value="" name="Nhập value" getValueChange={setInputValue} />
      </div>

    }))
    setDataTable(getDataTable)

  }, [dataAttribute])

  return (
    <div className={cx("wrapper")}>
      <h1>Thêm Value Sản Phẩm</h1>


      <div className={cx("show-category")}>
        {dataCategory?.categories.categories && dataCategory &&
          <SelectInput
            all
            name='Danh Mục'
            attr='categoryId'
            getValueChange={setInputValue}
            options={dataCategory.categories.categories.map(value =>
              ({ name: value.name, value: value.id })
            )}
          />}
      </div>
      {dataTable && <div className={cx("table")}>
        <Table<TypeAttributeTable>
          loading={true}
          name={`Bảng thuộc tinh ${nameCategory}`}
          onPushData={() => { }}
          data={dataTable}
          onSortTable={() => { }}
        />
      </div>
      }
      {/* {dataAttribute?.productAttributes.attributes && <SelectInput
        all
        getValueChange={setInputValue}
        attr="attributeId"
        name={"Chọn Attribute"}
        // key={}
        options={dataAttribute?.productAttributes.attributes.map(attr => ({ value: attr.id, name: attr.name }))}
      />


      }
      
      <Button text="Thêm Value" handle={onAddProductValue} /> */}
      {/* <Button text="Tạo attribute" /> */}
    </div>
  )
}

export default AddProductValue