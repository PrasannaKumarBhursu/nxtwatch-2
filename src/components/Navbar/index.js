import {HiMenuAlt1, HiOutlineLightBulb} from 'react-icons/hi'
import {AiFillAccountBook, AiFillAlert} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import {CgProfile} from 'react-icons/cg'
import ThemeContext from '../ThemeContext'
import './index.css'

const Navbar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {
        themeColorStatus,
        menuBarStatus,
        onMenuBarChange,
        onThemeChange,
      } = value

      const changeTheme = () => {
        onThemeChange(!themeColorStatus)
      }

      const menuBarChange = () => {
        onMenuBarChange(!menuBarStatus)
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div
          className={`navbar__container p-2 bg-${
            themeColorStatus ? 'dark' : 'light'
          }`}
        >
          <div>
            <img
              src={`${
                themeColorStatus
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }`}
              className="ml-2 p-2"
              style={{maxWidth: '50%'}}
              alt="logo-img"
            />
          </div>
          <nav>
            {themeColorStatus ? (
              <HiOutlineLightBulb
                className={`fs-3 mr-3 text-${
                  themeColorStatus ? 'light' : 'dark'
                }`}
                onClick={() => changeTheme()}
              />
            ) : (
              <AiFillAccountBook
                className={`fs-3 mr-3 text-${
                  themeColorStatus ? 'light' : 'dark'
                }`}
                onClick={() => changeTheme()}
              />
            )}

            <CgProfile
              className={`fs-3 mr-3 d-none d-md-inline text-${
                themeColorStatus ? 'light' : 'dark'
              }`}
              onClick={() => menuBarChange()}
            />
            <HiMenuAlt1
              className={`fs-3 mr-3 d-md-none d-inline text-${
                themeColorStatus ? 'light' : 'dark'
              }`}
              onClick={() => menuBarChange()}
            />

            <AiFillAlert
              className={`fs-3 d-md-none mr-3 text-${
                themeColorStatus ? 'light' : 'dark'
              }`}
            />
            <div>
              <button
                type="button"
                className={`btn mr-3 fw-3 d-none d-md-inline ${
                  themeColorStatus ? 'btn-outline-light' : 'btn-outline-primary'
                }`}
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Navbar)
