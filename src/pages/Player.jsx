import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';

const Player = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPlayerData();
    }, [])

    const loadPlayerData = async () => {
        setIsLoading(true);


        setIsLoading(false);
    }

    return <>
        {
            isLoading ?
            <Loader/>
            :
            <div>Player</div>
        }
    </>
}

export default Player