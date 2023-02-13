import React from 'react'

const Track = ({track, setCurrentlyPlaying}) => {

  const handleTrackChange = (track) => {
    // setCurrentlyPlaying()
  }

  return (
    <div className='w-full bg-zinc-900 hover:bg-zinc-700 transition cursor-pointer px-3 py-1'>
      <div className='flex flex-col'>
        <span>{track.track.name}</span>
        <div className='flex gap-x-2'>
          {
            track.track.artists.map(artist => (
              <div key={artist.id} onClick={handleTrackChange}>
                <span className=''>{artist.name}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Track