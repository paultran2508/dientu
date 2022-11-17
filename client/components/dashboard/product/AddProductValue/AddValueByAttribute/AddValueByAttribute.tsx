import { Dispatch, SetStateAction, useRef } from "react"
import { ProductAttributeInfoFragmentDoc, useAddProductValueMutation } from "../../../../../src/generated/graphql"
import { GetValueChange } from "../../../../../types/GetValueChange"
import { Button } from "../../../../Lib/Button"
import { Input } from "../../../../Lib/Input"

type Props = {
  attributeId: string
}

export type ValueFragment = { __typename?: 'ProductValues', name: string, id: string }

export type AttributeFragment = { __typename?: 'ProductAttributes', name: string, id: string, values: Array<ValueFragment> }

export function AddValueByAttribute({ attributeId }: Props) {

  const [addProductValue] = useAddProductValueMutation()
  const setInput = useRef<Dispatch<SetStateAction<string>>>()
  const valueInput = useRef<string>("")

  const onAddProductValue = async () => {
    await addProductValue({
      variables: { inputProductValue: { attributeId: attributeId, value: valueInput.current } },
      update: async (cache, { data }) => {
        cache.updateFragment<AttributeFragment>({
          fragment: ProductAttributeInfoFragmentDoc,
          id: "ProductAttributes:" + attributeId,
        }, (prev) => {
          let setAttributeFragment: AttributeFragment | null = prev;
          if (data?.addProductValue.value && prev) {
            setAttributeFragment = {
              ...prev,
              values: [
                ...prev.values,
                data?.addProductValue.value
              ]
            }
          }
          return setAttributeFragment

        })

      }
    })
    setInput.current && setInput.current("")
  }

  const setInputValue: GetValueChange<string> = ({ value, setValue }) => {
    setInput.current = setValue
    valueInput.current = value
  }

  return (
    <>
      <Input width="200px" name=" Nhập value" getValueChange={setInputValue} />
      <Button handle={onAddProductValue} text="Thêm" data={attributeId} />
    </>
  )
}

