import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

export default class VideoCard extends Component {
  render() {
    const {video} = this.props
    const {id} = video
    return (
      <>
        <Link to={`videos/${id}`}>
          <div className="card__container" key={video.id}>
            <div className="card ml-3">
              <img src={video.thumbnail_url} alt="video" />
              <div className="d-flex mt-3">
                <img
                  alt="video-channel"
                  src={video.channel.profile_image_url}
                />
                <div>
                  <p>{video.title}</p>
                  <div className="d-flex align-items-center">
                    <h1>{video.channel.name}</h1>
                    <div>
                      <h1 className="ml-2">{`${video.view_count} views`}</h1>
                    </div>
                    <div>
                      <h1 className="ml-2">{`${video.published_at}`}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    )
  }
}
