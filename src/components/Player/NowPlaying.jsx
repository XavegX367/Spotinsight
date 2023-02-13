import React from 'react'

const NowPlaying = ({currentlyPlaying}) => {
    return (
        <div>
            <div className='bg-orange-600 p-1 flex'>
                <div>
                    {/* Track cover image */}
                    <img src={``} />
                </div>

                <div className='flex w-full flex-col'>
                    <span className='text-md'>Bring it back</span>
                    <span className='text-sm text-gray-200'>Mesto</span>
                </div>
            </div>
        </div>
    )
}

export default NowPlaying