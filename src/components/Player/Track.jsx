import React from 'react'

const Track = ({track, setCurrentlyPlaying, currentlyPlaying}) => {

  const handleTrackChange = (selectedTrack) => {
    console.log(selectedTrack);
    setCurrentlyPlaying(selectedTrack)
  }

  return (
    <div className='w-full bg-zinc-900 hover:bg-zinc-700 transition cursor-pointer px-3 py-1' onClick={() => handleTrackChange(track.track.uri)}>
      <div className='flex gap-x-1'>
        <img className='w-10 h-10' src={track.track.album.images[0].url}/>
        <div className='flex flex-col text-sm mt-1'>
          {
            (track.track.uri === currentlyPlaying) ?
              <span className='text-orange-400'>{track.track.name}</span>
            :
              <span>{track.track.name}</span>

          }
          <div className='flex gap-x-2 text-xs'>
            {
              track.track.artists.map(artist => (
                <div key={artist.id}>
                  <span className=''>{artist.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Track