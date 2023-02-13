import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { delay } from '../utils/Helpers';
import { refreshAccessToken, getUser } from '../utils/APIRoutes';
import Loader from '../components/Loader';
import Search from '../components/Player/Search';
import Playlists from '../components/Player/Playlists';
import Controls from '../components/Player/Controls';
import NowPlaying from '../components/Player/NowPlaying';
import Content from '../components/Player/Content';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedPlaylist, setselectedPlaylist] = useState("");
    const [currentlyPlaying, setCurrentlyPlaying] = useState("spotify:track:1e7gC7NhFSK0lBeoLISvKz")
    
    const navigate = useNavigate();
    useEffect(() => {
        verifyData();
    }, [])

    const verifyData = async () => {
    // wait 200ms the localstorage might have not been filled yet
        await delay(200);
        if(localStorage.getItem('refresh_token') === undefined || localStorage.getItem('refresh_token') === "" || localStorage.getItem('refresh_token') === null){
            navigate('/login');
            return;
        }

        // Check if accesscode/ refreshcode is valid
        const refresh_token = localStorage.getItem('refresh_token');
        const refreshCheck = refreshAccessToken(refresh_token);
        if(refreshCheck === 'error'){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
        }

        const userData = await getUser(localStorage.getItem('access_token'));
        if(userData === undefined){
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            navigate('/login');
        } else {
            loadPlayerData();
        }
    }

    const loadPlayerData = async () => {
        setIsLoading(true);
        // Create API call that retrieves all state data.
        setIsLoading(false);
    }

    return <>
        {
            isLoading ?
            <Loader/>
            :
            <div className='select-none'>
                <div className="flex w-full px-2" >
                    <Search search={search} setSearch={setSearch} setCurrentlyPlaying={setCurrentlyPlaying}/>
                </div>

                <div className="flex h-[80%]">
                    <div className="w-2/6">
                        <Playlists setselectedPlaylist={setselectedPlaylist} selectedPlaylist={selectedPlaylist}/>
                    </div>
                    <div className="w-4/6">
                        <Content selectedPlaylist={selectedPlaylist} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying}/>
                    </div>
                </div>
                {/* <div className="text-center bottom-14 fixed w-screen">
                    <NowPlaying currentlyPlaying={currentlyPlaying}/>
                </div> */}
                <div className="justify-center w-full fixed bottom-0 bg-zinc-800">
                <SpotifyPlayer
                    token={localStorage.getItem('access_token')}
                    uris={[currentlyPlaying]}
                    styles={{
                        activeColor: '#fff',
                        bgColor: '#333',
                        color: '#fff',
                        loaderColor: '#fff',
                        sliderColor: '#ff5400',
                        trackArtistColor: '#ccc',
                        trackNameColor: '#fff',
                    }}
                />
                </div>
            </div>
        }
    </>
}

export default Player