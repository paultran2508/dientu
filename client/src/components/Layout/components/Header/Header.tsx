import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import logo from "../../../../assets/logo"
import { Button } from "../../../Lib/Button"
import { SearchList } from "../../../Search"
import styles from './Header.module.scss'

const cx = classNames.bind(styles)
const Header = () => {
  const [searchResult, setSearchResult] = useState<number[]>([])

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2])
    }, 0);


  }, [])


  return (
    <header className={cx('wrapper', 'fl-bw')}>
      {/* Logo */}
      <div className={cx('logo', 'fl-center')}>
        <img src={logo.commerce} alt="commerce" />
        <div className={cx('name-logo')}>Logo DienTu</div>
      </div>

      {/* Search */}

      <Tippy
        interactive
        visible={searchResult.length > 0}
        render={
          (attrs) => (
            <div tabIndex={-1} {...attrs} className={cx('search-result')}>
              <SearchList >
                {/* <Button icon="home" text="search" ></Button> */}
              </SearchList>
            </div>
          )
        }
      >
        <div className={cx('search')} >
          <input placeholder="search key work" type="text" />
          <Button icon="search"  ></Button>
        </div>
      </Tippy>

      {/* action */}

      <div className={cx(['action'])}>
        <Button icon="login" text="Login" />
        <Button icon="logout" text="logout" />
      </div>

    </header >
  )
}

export default Header