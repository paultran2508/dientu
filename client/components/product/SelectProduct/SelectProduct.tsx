import classNames from 'classnames/bind'
import { useProductAttributesQuery } from '../../../src/generated/graphql'
import { GetValueChange } from '../../../types/GetValueChange'
import SelectInput from '../../Lib/select'
import style from './select-product.module.scss'



const cx = classNames.bind(style)

type Props = {
  categoryId?: string
  callbackValues?: GetValueChange<string>
}


const SelectProduct = ({ categoryId, callbackValues }: Props) => {

  const { data } = useProductAttributesQuery({ variables: { categoryId: categoryId } })

  return <div className={cx('wrapper')}>
    {data?.productAttributes.attributes &&
      data?.productAttributes.attributes.map(attrs =>
        <SelectInput
          all
          getValueChange={callbackValues}
          attr={attrs.name}
          name={attrs.name}
          key={attrs.id}
          options={attrs.values.map(value =>
            ({ name: value.name, value: value.id }))
          }
        />)}
  </div>
}

export default SelectProduct