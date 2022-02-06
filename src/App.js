import {Component} from 'react'
import {Switch as Routes, Route} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import HomeRoute from './components/HomeRoute'
import ThemeContext from './components/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    themeColorStatus: false,
    menuBarStatus: false,
  }

  render() {
    const {themeColorStatus, menuBarStatus} = this.state
    return (
      <Routes>
        <ThemeContext.Provider
          value={{
            themeColorStatus,
            menuBarStatus,
            onMenuBarChange: this.onMenuBarChange,
            onThemeChange: this.onThemeChange,
          }}
        >
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
        </ThemeContext.Provider>
      </Routes>
    )
  }
}

export default App