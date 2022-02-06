import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const NotFound = () => (
  <div>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not-found"
    />
    <p>Page Not Found</p>
    <p>We are sorry,the page you requested could not be found</p>
    <div>
      <Popup
        modal
        trigger={
          <button className="trigger-button" type="button">
            Trigger
          </button>
        }
        position="bottom left"
      >
        {close => (
          <>
            <div>
              <p>React is a popular and widely used programming language</p>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Close
            </button>
          </>
        )}
      </Popup>
    </div>
  </div>
)

export default NotFound
