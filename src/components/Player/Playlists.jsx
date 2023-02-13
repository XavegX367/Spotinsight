import React, {useState, useEffect} from 'react'
import { getUserPlaylists, refreshAccessToken } from '../../utils/APIRoutes.js';
import axios from 'axios';

const Playlists = ({setselectedPlaylist, selectedPlaylist}) => {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        retrievePlaylists();
    }, [])

    const retrievePlaylists = async () => {
        refreshAccessToken(localStorage.getItem('refresh_token'));
        const access_token = localStorage.getItem('access_token');
        const config = {
            headers:{
                "Authorization": `Bearer ${access_token}`
            }
        }

        const {data} = await axios.get(getUserPlaylists, config)
        if(data !== undefined){
            setPlaylists(data.items)
        }
    }

    const setPlaylist = (playlistId) => {
        setselectedPlaylist(playlistId);
    }

    return <>
        {
            (playlists !== []) 
            ?
                <div className='p-4'>
                    {
                        playlists.map(playlist => (
                            <div key={playlist.id} className='cursor-pointer hover:text-orange-400 transition' onClick={() => setPlaylist(playlist.id)}>
                                {
                                    (selectedPlaylist === playlist.id) ?
                                    <span className='text-orange-400'>{playlist.name}</span> : playlist.name
                                }
                            </div>
                        ))
                    }
                </div>
            :
                ""
        }
    </>
    
}

export default Playlists