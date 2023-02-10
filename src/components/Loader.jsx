import React from 'react'

function Loader() {
    return (
        <div className='grid h-screen place-items-center'>
        <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-[#ff5400] border-t-transparent"></div>
        </div>
    )
}

export default Loader