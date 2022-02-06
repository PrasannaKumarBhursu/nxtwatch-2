import {Component} from 'react'

import {AiOutlineClose} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import TailSpin from 'react-loader-spinner'
import Cookies from 'js-cookie'

import VideoCard from '../VideoCard'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    showBanner: true,
    searchValue: ' ',
    youtubeVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  onSuccess = updatedVideosList => {
    this.setState({youtubeVideos: updatedVideosList})
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    console.log('its clicked')
    const {searchValue} = this.state
    console.log(searchValue)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedVideosList = data.videos
      this.onSuccess(updatedVideosList)
      this.setState({apiStatus: apiStatusConstants.success})
      console.log(data)
    }
    if (data.videos.length === 0) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickEnter = e => {
    if (e.key === 'Enter') {
      this.getDetails()
    }
  }

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  searchValueUpdated = e => {
    const inputValue = e.target.value
    this.setState({searchValue: inputValue})
  }

  retryTheFetchCall = () => {
    this.getDetails()
  }

  renderFetchSuccuss = () => {
    const {youtubeVideos} = this.state
    return (
      <div
        className="mt-0"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {youtubeVideos.map(video => (
          <VideoCard video={video} key={video.id} />
        ))}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center">
      <TailSpin height="75" width="75" color="blue" ariaLabel="loading" />
    </div>
  )

  renderFetchFailure = () => (
    <div className="failuer__container d-flex justify-content-center align-items-center">
      <div>
        <img
          alt="no-search"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="w-100 p-3"
        />
        <div className="text-center p-3 pt-0">
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.retryTheFetchCall()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  renderFinalPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFetchSuccuss()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFetchFailure()
      default:
        return null
    }
  }

  render() {
    const {showBanner, searchValue} = this.state

    return (
      <>
        <div>
          <Navbar />
        </div>
        {showBanner && (
          <div className="p-4 img__container">
            <AiOutlineClose onClick={() => this.removeBanner()} />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="img-banner"
            />
            <p className="mt-3">Buy Nxt Watch Premium prepaid plans with UPI</p>
            <div>
              <button type="button" className="Btn mt-3">
                GET IT NOW
              </button>
            </div>
          </div>
        )}
        <div className="pl-4 pr-4 searchbar__container mt-2">
          <input
            type="search"
            placeholder="Search"
            onChange={this.searchValueUpdated}
            value={searchValue}
            onKeyDown={this.onClickEnter}
          />
          <div>
            <BiSearch type="submit" onClick={() => this.getDetails()} />
          </div>
        </div>
        {this.renderFinalPage()}
      </>
    )
  }
}

export default HomeRoute
