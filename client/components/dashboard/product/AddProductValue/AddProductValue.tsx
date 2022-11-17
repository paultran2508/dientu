import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { ProductAttributeInfoFragmentDoc, useCategoryQuery, useDeleteProductValueByAttributeMutation, useProductAttributesLazyQuery } from "../../../../src/generated/graphql"
import { GetValueChange } from "../../../../types/GetValueChange"
import { Button, HandleClickButton } from "../../../Lib/Button"
import SelectInput from "../../../Lib/select"
import Table from "../../../table"
import style from "./add-product-value.module.scss"
import AddValueByAttribute from "./AddValueByAttribute"
import { AttributeFragment } from "./AddValueByAttribute/AddValueByAttribute"

const cx = classNames.bind(style)



type Props = {
}

type TypeAttributeTable = {
  Stt: number,
  "Thuộc tính": string,
  "Giá trị": React.ReactNode,
  // "Thêm Giá trị": React.ReactNode
}

type GetValueId = {
  attrId: string
  valueId: string
}





const AddProductValue = ({ }: Props) => {

  const [setDataAttribute, { data: dataAttribute }] = useProductAttributesLazyQuery()
  const { data: dataCategory } = useCategoryQuery()
  const [dataTable, setDataTable] = useState<TypeAttributeTable[]>()
  const [nameCategory, setNameCategory] = useState<string>("")
  const [inputValueByAttr, setInputValueByAttr] = useState<{ [key: string]: string }>({})
  const [deleteValue, { data: checkDelete }] = useDeleteProductValueByAttributeMutation()

  const setInputValue: GetValueChange<string> = async ({ value, attr }) => {

    if (attr === "categoryId") {
      await setDataAttribute({ variables: { categoryId: value } });
      const category = dataCategory?.categories.categories?.find(category => category.id == value)?.name
      category && setNameCategory(category)
    } else {
      attr && setInputValueByAttr(inputValue => ({ ...inputValue, [attr]: value }))
    }
  }

  const onDeleteValueAttr: HandleClickButton<GetValueId> = async (_, getId) => {
    getId?.valueId && await deleteValue({
      variables: { valueId: getId?.valueId },
      update(cache, { data: check }) {
        cache.updateFragment<AttributeFragment>({
          fragment: ProductAttributeInfoFragmentDoc,
          id: "ProductAttributes:" + getId.attrId,
        }, (prev) => {
          let setAttributeFragment: AttributeFragment | null = prev;
          if (check?.deleteProductValueByAttribute && prev) {
            setAttributeFragment = {
              ...prev,
              values: prev.values.filter(value => value.id !== getId.valueId)
            }
          }
          console.log(setAttributeFragment?.values)
          return setAttributeFragment
        })
      }
    })
  }


  useEffect(() => {
    const getDataTable = dataAttribute?.productAttributes.attributes?.map<TypeAttributeTable>((attr, index) => ({
      Stt: index + 1,
      "Thuộc tính": attr.name,
      "Giá trị": <div className={cx("value")}> {attr.values.map(value => <div key={value.id} className={cx("item-value")}>
        <span>{value.name}</span>
        <Button<GetValueId> data={{ attrId: attr.id, valueId: value.id }} handle={onDeleteValueAttr} text="Xóa" />
      </div>)} </div>,
      "Thêm Giá trị": <div className={cx("add-value")}> <AddValueByAttribute attributeId={attr.id} /></div>
    }))
    setDataTable(getDataTable)

  }, [dataAttribute, inputValueByAttr, checkDelete])

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
      {dataTable && inputValueByAttr && <div className={cx("table")}>
        <Table<TypeAttributeTable>
          loading={true}
          name={`Bảng thuộc tinh ${nameCategory}`}
          onPushData={() => { }}
          data={dataTable}
          onSortTable={() => { }}
        />
      </div>
      }
    </div>
  )
}

export default AddProductValue