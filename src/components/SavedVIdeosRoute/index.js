import './index.css'

const SavedVideosList = [
  {
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch/ibc-sol-1-img.png',
    title:
      'Sehwag shares his batting experience in iB Cricket | iB Cricket Super Over League',
    viewCount: '1.4K',
    name: 'iB Cricket',
    publishedDistance: '2years ago',
  },
]

const SavedVideosRoute = () => {
  console.log('hello')
  const {
    thumbnailUrl,
    title,
    viewCount,
    name,
    publishedDistance,
  } = SavedVideosList[0]
  return (
    <>
      <div>
        <div>
          <img src={thumbnailUrl} alt="thumbnail" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div>
              <p>{`${viewCount} views`}</p>
              <p>{publishedDistance}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SavedVideosRoute
