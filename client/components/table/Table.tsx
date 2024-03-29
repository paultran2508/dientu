import classNames from "classnames/bind"
import { Button, HandleClickButton } from "../Lib/Button"
import style from "./table.module.scss"


const cx = classNames.bind(style)
type Props<T> = {
  data: T[],
  onPushData: HandleClickButton<string>
  onSortTable: HandleClickButton<Sort>
  loading: boolean,
  name: string

}

export type Sort = {
  name: string
  sort: 1 | -1
}
function Table<T extends object>({ data, onPushData, onSortTable, loading, name }: Props<T>) {

  const header = data.length > 0 ? Object.keys(data[0]) : []
  const values = data.map(value => Object.values(value))

  return (

    <>
      <h1>{name}</h1>
      {data.length > 0 ? <table className={cx("table")}>

        <thead>
          <tr>
            {header.map(header =>
              <th scope="col" key={header}>
                <div className={cx("header")}>
                  <span>{header}</span>
                  <div className={cx("btn-sort")}>
                    <Button<Sort> icon="arrow_drop_up" data={{ name: header, sort: 1 }} handle={onSortTable} />
                    <Button<Sort> icon="arrow_drop_down" data={{ name: header, sort: -1 }} handle={onSortTable} />
                  </div>

                </div>

              </th>)}
          </tr>
        </thead>
        <tbody>

          {values.map((tr, index) => <tr key={index}>
            {tr.map((td, id) => <td key={id} scope="row">{td}</td>)}
          </tr>)}


        </tbody>
        <tfoot>
          <tr>
            <td scope="row" colSpan={header.length} ><Button loading={loading} text="Xêm thêm" handle={onPushData} /></td>
            {/* <td colSpan={2}>77</td> */}
            {/* <td></td> */}
          </tr>
        </tfoot>

      </table> : <i>Dữ liệu rỗng</i>}
    </>)

}

export default Table