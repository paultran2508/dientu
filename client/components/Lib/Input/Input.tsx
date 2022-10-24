import classNames from "classnames/bind"
import styled from "./input.module.scss"


const cx = classNames.bind(styled)
type Props = {
  name: string
  value?: string,
  type?: "number" | "text" | "password",
  width?: string

}

const Input = ({ name, value, type, width }: Props) => {
  return (
    <div style={{ width: width ?? "100%" }} className={cx('wrapper')}>
      <input type={type} className={cx("input")} placeholder=" " value={value} />
      <label className={cx("label")} > {name} :</label>

    </div>
  )
}

export default Input