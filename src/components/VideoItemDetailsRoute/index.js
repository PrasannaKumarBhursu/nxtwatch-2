import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {HiOutlineSaveAs} from 'react-icons/hi'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  isLikeActive: false,
  isDislikeActive:false
}

class VideoItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
    activeLikeDislikebuttonStatus: '',
  }

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const videoDetails = data.video_details
      let formattedVideoDetails = {
        channel: videoDetails.channel,
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }

      let {channel} = formattedVideoDetails

      channel = {
        name: channel.name,
        profileImageUrl: channel.profile_image_url,
        subscriberCount: channel.subscriber_count,
      }
      formattedVideoDetails = {...formattedVideoDetails, channel}
      this.setState({
        videoDetails: formattedVideoDetails,
        apiStatus: apiStatusConstants.success,
      })
      console.log(formattedVideoDetails)
    }
  }

  onClickLikeDislike = () => {
    const {activeLikeDislikebuttonStatus} = this.state
    console.log(activeLikeDislikebuttonStatus)
  }

  renderVideoDetails = () => {
    const {videoDetails, activeLikeDislikebuttonStatus} = this.state
    const {
      channel,
      description,
      publishedAt,
      title,
      videoUrl,
      viewCount,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    const publishedDistance = formatDistanceToNow(new Date(publishedAt))

    onClickLike = () => {
      const {isLikeActive,isDislikeActive} = this.state;
      if (isLikeActive){
        this.setState({isLikeActive:false})
      }
      else{
        this.setState({isLikeActive:true})
        if(isDislikeActive){
          this.setState({isDislikeActive:false})
        }
      }
    }

    onClickDislike = () => {
      const {isDislikeActive,isLikeActive} = this.state;
      if(isDislikeActive){
        this.setState({isDislikeActive:false})
      }
      else{
        this.setState({isDislikeActive:true})
         if(isLikeActive){
           this.setState({isLikeActive:false})
         }
      }
    }

    return (
      <div>
        <ReactPlayer url={videoUrl} />
        <p>{title}</p>
        <div>
          <div>
            <p>{`${viewCount} views`}</p>
            <p>{publishedDistance}</p>
          </div>
          <div>
            <button
              type="button"
              onClick={this.onClickLike}
              className={likedClassName}
            >
              <AiOutlineLike />
              <p>like</p>
            </button>
            <button
              type="button"
              className={dislikedClassName}
              onClick={this.onClickDislike}
            >
              <AiOutlineDislike />
              <p>dislike</p>
            </button>
            <button type="button">
              <HiOutlineSaveAs />
              <p>Save</p>
            </button>
          </div>
        </div>
        <hr />
        <div>
          <img src={profileImageUrl} alt="profile" />
          <div>
            <p>{name}</p>
            <p>{`${subscriberCount} subscribers`}</p>
          </div>
        </div>
        <p>{description}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure-view"
      />
      <p>We are having some trouble to complete your request</p>
      <p>Please try again</p>
      <button type="button" onClick={this.getVideoDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderVideoDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetails()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderVideoDetailsPage()}</div>
  }
}

export default VideoItemDetailsRoute
