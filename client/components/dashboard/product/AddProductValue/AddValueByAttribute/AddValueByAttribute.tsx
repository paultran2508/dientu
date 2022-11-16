import { type } from "os"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useAddProductValueMutation } from "../../../../../src/generated/graphql"
import { GetValueChange } from "../../../../../types/GetValueChange"
import { Button } from "../../../../Lib/Button"
import { Input } from "../../../../Lib/Input"

type Props = {
  attributeId: string
}


export function AddValueByAttribute({ attributeId }: Props) {

  const [addProductValue] = useAddProductValueMutation()
  const [value, setValue] = useState<string>("")
  const setInput = useRef<Dispatch<SetStateAction<string>>>()

  const onAddProductValue = async () => {
    const { data } = await addProductValue({ variables: { inputProductValue: { attributeId: attributeId, value } } })
    setInput.current && setInput.current("")
    // console.log(data)
  }

  const setInputValue: GetValueChange<string> = (value, _, s, callback) => {
    setInput.current = callback
    // callback && callback("test")
    setValue(value)
  }

  return (
    <>
      <Input width="200px" value={value} name=" Nhập value" getValueChange={setInputValue} />
      <Button handle={onAddProductValue} text="Thêm" data={attributeId} />
    </>
  )
}

