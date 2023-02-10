import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import Search from '../components/Player/Search';
import Playlists from '../components/Player/Playlists';
import Controls from '../components/Player/Controls';
import NowPlaying from '../components/Player/NowPlaying';
import Content from '../components/Player/Content';

const Player = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("")

    useEffect(() => {
        loadPlayerData();
    }, [])

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
            <div>
                <div className="flex w-full px-4" >
                    <Search search={search} setSearch={setSearch}/>
                </div>

                <div className="flex h-[80%]">
                    <div className="w-2/6">
                        <Playlists/>
                    </div>
                    <div className="w-4/6">
                        <Content search={search}/>
                    </div>
                </div>
                <div className="justify-start h-[15%]">
                    <NowPlaying/>
                </div>
                <div className="justify-center w-full absolute bottom-0 bg-zinc-800">
                    <Controls/>
                </div>
            </div>
        }
    </>
}

export default Player