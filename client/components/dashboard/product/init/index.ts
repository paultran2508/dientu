import Error from "next/error";
import { PriceType } from "../../../../src/generated/graphql";

export const priceValueInit: AddPriceValue = {
  indexInit: 1,
  colorId: "",
  price: 0,
  note: "",
  type: PriceType.Default
}

export const optionValueInit: AddOptionValue = {
  indexInit: 1,
  addPrices: [priceValueInit],
  addImgs: [],
  name: "",
  valueIds: []
}

export type AddPriceValue = {
  indexInit: number
  colorId: string
  note?: string
  price: number
  type: PriceType

}

export type AddOptionValue = {
  indexInit: number,
  addImgs: string[];
  addPrices: AddPriceValue[];
  name: string;
  valueIds: { name: string, id: string }[],
}

export type AddFormValue = {
  brandId: string
  path: string
  name: string
  categoryId: string
  optionValues: AddOptionValue[]
}

export const fomValueInit: AddFormValue = {
  brandId: "",
  name: "",
  categoryId: "",
  path: "",
  optionValues: []
}

// Set Action
export enum TypeAction {
  "SET_VALUE_ACTION",
  "CLOSE_OPTION_ACTION",
  "ADD_OPTION_ACTION",
  "CLOSE_PRICE_ACTION",
  "SET_OPTION_VALUE_ACTION"
}

export type ActionValue = {
  type: TypeAction,
  value?: Partial<AddFormValue>
  attr?: keyof AddFormValue
  index?: {
    option: number
    price?: number
  }
}


export const addOptionValue = (stateFormValue: AddFormValue): ActionValue => {

  const optionValueInit = {
    indexInit: 1,
    addPrices: [{
      indexInit: 1,
      colorId: "",
      price: 0,
      note: "",
      type: PriceType.Default
    }],
    addImgs: [],
    name: "",
    valueIds: []
  }

  const indexLastItem = stateFormValue.optionValues.length - 1
  const numberInit = stateFormValue.optionValues[indexLastItem]?.indexInit
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: {
      optionValues: [
        ...stateFormValue.optionValues,
        { ...optionValueInit, indexInit: numberInit ? numberInit + 1 : 1 }
      ]
    }
  }
}
export const setFormValue = (value: Partial<AddFormValue>): ActionValue => {
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value
  }
}

export const reducer = (state: AddFormValue, action: ActionValue): AddFormValue => {

  let setFormValue = { ...state }
  switch (action.type) {
    case TypeAction.SET_VALUE_ACTION:
      setFormValue = { ...state, ...action.value }
      break;
    case TypeAction.CLOSE_OPTION_ACTION:
      break;
    case TypeAction.CLOSE_PRICE_ACTION:
      break;
    case TypeAction.SET_OPTION_VALUE_ACTION:
      action.value &&
        (setFormValue.optionValues[action.index?.option as number] =
          action.value as AddOptionValue);
      break;
    default:
      throw new Error({ statusCode: 400, title: "error" })
  }
  return setFormValue
}

export const setOptionValueAction = (optionValue: AddOptionValue, indexOption: number): ActionValue => {

  return {
    type: TypeAction.SET_OPTION_VALUE_ACTION,
    value: optionValue,
    index: {
      option: indexOption
    }
  }
}

export const setAddPriceValueAction = (formValue: AddFormValue, indexOption: number): ActionValue => {
  const lastItemNumber = formValue.optionValues[indexOption].addPrices.length - 1
  const indexInit = lastItemNumber === -1 ? 1 : formValue.optionValues[indexOption].addPrices[lastItemNumber].indexInit + 1
  formValue.optionValues[indexOption].addPrices.push({
    indexInit,
    colorId: "",
    price: 0,
    note: "",
    type: PriceType.Default
  })
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: { ...formValue }
  }
}

export const removeOptionValueByIndexInit = (formValue: AddFormValue, indexOption: number, indexPrice?: number): ActionValue => {

  let setFormValue = { ...formValue }
  if (indexPrice !== undefined && indexPrice !== null) {
    setFormValue.optionValues[indexOption].addPrices.splice(indexPrice, 1)
  } else {
    setFormValue.optionValues.splice(indexOption, 1)
  }
  return {
    type: TypeAction.SET_VALUE_ACTION,
    value: setFormValue
  }
}
