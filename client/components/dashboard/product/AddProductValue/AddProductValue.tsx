import classNames from "classnames/bind"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import { ProductAttributeInfoFragmentDoc, ProductAttributesDocument, ProductAttributesQuery, useAddAttributeMutation, useCategoryQuery, useDeleteProductValueByAttributeMutation, useProductAttributesLazyQuery } from "../../../../src/generated/graphql"
import { GetValueChange } from "../../../../types/GetValueChange"
import { Button, HandleClickButton } from "../../../Lib/Button"
import { Input } from "../../../Lib/Input"
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
}

type GetValueId = {
  attrId: string
  valueId: string
}

const AddProductValue = ({ }: Props) => {

  const [category, setCategory] = useState<{ name?: string, id?: string } | undefined>()
  const [setDataAttribute, { data: dataAttribute }] = useProductAttributesLazyQuery()
  const { data: dataCategory } = useCategoryQuery()
  const [dataTable, setDataTable] = useState<TypeAttributeTable[]>()
  const [inputValueByAttr, setInputValueByAttr] = useState<{ [key: string]: string }>({})
  const [deleteValue, { data: checkDelete }] = useDeleteProductValueByAttributeMutation()
  const [addAttributeMutation] = useAddAttributeMutation()
  const [addCategory, setAddCategory] = useState<string[]>([])

  const setInputValue: GetValueChange<string> = async ({ value, attr }) => {

    switch (attr) {
      case "categoryId":
        await setDataAttribute({ variables: { categoryId: value } });
        const setDataCategory = dataCategory?.categories.categories?.find(category => category.id == value)
        setDataCategory && setCategory({ id: setDataCategory.id, name: setDataCategory.name })
        !setDataCategory && setCategory({})
        break;
      case "attributeId":
        setInputValueByAttr(inputValue => ({ ...inputValue, [attr]: value }))
        break;
      case "attribute":
        setInputValueByAttr(inputValue => ({ ...inputValue, [attr]: value }))
        break;
      default:
        break;
    }
  }



  const onDeleteValueAttr: HandleClickButton<GetValueId> = useCallback(async (_, getId) => {
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
          return setAttributeFragment
        })
      }
    })
  }
    , [deleteValue])

  const onSubmitAddAttribute: HandleClickButton<string> = async () => {
    if (inputValueByAttr.attribute !== "" && inputValueByAttr.attribute && category?.id) {
      await addAttributeMutation({
        variables: {
          attribute: inputValueByAttr.attribute,
          categoryIds: addCategory
        },
        update(cache, { data }) {
          if (data?.addAttribute.attributes) {
            addCategory.forEach(category => {
              cache.updateQuery<ProductAttributesQuery>({
                query: ProductAttributesDocument,
                variables: { categoryId: category }
              }, (prevData) => {
                let attributes = prevData?.productAttributes.attributes
                let setData = data?.addAttribute?.attributes
                if (prevData && setData) {
                  return {
                    productAttributes: {
                      ...prevData?.productAttributes,
                      attributes: attributes?.concat(setData)
                    }
                  }
                }
                return prevData
              })
            })
          }
        }
      })
    }
  }

  const onSetCategories: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.checked && setAddCategory(values => [...values, e.target.value])
    !e.target.checked && setAddCategory(values => values.filter(value => value !== e.target.value))
  }

  console.log(addCategory)


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

  }, [dataAttribute, inputValueByAttr, checkDelete, category, onDeleteValueAttr])

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
          name={`Bảng thuộc tinh ${category?.name ?? ""}`}
          onPushData={() => { }}
          data={dataTable}
          onSortTable={() => { }}
        />
      </div>
      }

      {category && category.id && <div className={cx("ctn-add-attribute")}>
        <Input getValueChange={setInputValue} attr="attribute" width="200px" name="Nhập Thuộc Tính" />
        <div className={cx("choose-category")}>
          {dataCategory?.categories.categories?.map(category => <div key={category.id} className={cx("item")}>
            <input type={"checkbox"} value={category.id} id={category.id} onChange={onSetCategories} />
            <label htmlFor={category.id}>{category.name}</label>
          </div>)}

        </div>
        <Button handle={onSubmitAddAttribute} text="Thêm Thuộc tính" />
      </div>}

    </div>
  )
}

export default AddProductValue