import React, { useEffect, useState } from 'react'
import { getPlaylistContent } from '../../utils/APIRoutes';
import Track from '../../components/Player/Track';

const Content = ({selectedPlaylist, setCurrentlyPlaying}) => {
    const [currentPlaylist, setCurrentPlaylist] = useState("");
    const [tracks, setTracks] = useState([])

    useEffect(() => {
            if(selectedPlaylist !== ""){
                retrievePlaylist();
            }
    }, [selectedPlaylist]);

    const retrievePlaylist = async () => {
        const data = await getPlaylistContent(selectedPlaylist)
        setCurrentPlaylist(data);
        setTracks(data.tracks.items)
    }



    return (
        <div>
            {
                (currentPlaylist !== "")
                ?
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <div>
                                <img src={currentPlaylist.images[0].url} className='w-32'/>
                            </div>
                            <div className='text-xl mt-12 ml-4'>
                                {currentPlaylist.name}
                            </div>
                        </div>

                        <div className='mt-2'>
                            {
                                // console.log(tracks)
                                tracks.map(track => (  
                                    <Track setCurrentlyPlaying={setCurrentlyPlaying} track={track} key={track.track.id}/>
                                ))
                            }
                        </div>
                    </div>
                :
                    "No playlist selected"
            }
        </div>
    )
}

export default Content