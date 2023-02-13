import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faPlay, faPause, faRepeat, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { PLAY, PAUSE, SHUFFLE, NEXT, PREVIOUS, REPEAT } from '../../utils/APIRoutes';
import axios from 'axios';

const Controls = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setisShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState("off");

    const changePlayState = () => {
        setIsPlaying(!isPlaying);
        if(isPlaying){
            axios.post(PLAY, );
        } else {
            axios.post(PAUSE, );
        }
    }

    const shuffle = async () => {
        setisShuffle(!isShuffle);
        axios.post(SHUFFLE, );
    }

    const repeat = async () => {
        if(isRepeat === "off"){
            setIsRepeat("context");
        } else if(isRepeat === "context") {
            setIsRepeat("track");

        } else {
            setIsRepeat("off");
        }

        axios.post(REPEAT, );
    }

    const previousTrack = async () => {
        axios.post(PREVIOUS, );
    }

    const nextTrack = async () => {
        axios.post(NEXT, );
    }

    return <>
        <div className='flex flex-col select-none mb-4 py-2 text-lg'>
            <div className='flex justify-center gap-12'>
                <div>
                    <button onClick={() => shuffle()} className={`hover:text-white text-gray-400  transition ${isShuffle ? 'text-orange-600': ''}`}>
                        <FontAwesomeIcon icon={faShuffle}/>
                    </button>
                </div>

                <div className='flex gap-x-8'>
                    <div>
                        <button onClick={() => previousTrack()} className='hover:text-white text-gray-400 transition'>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                    </div>

                    <div>
                        <button onClick={() => changePlayState()} className='hover:text-white text-gray-400 transition'>
                            <FontAwesomeIcon icon={ isPlaying ? faPause : faPlay}/>
                        </button>
                    </div>

                    <div>
                        <button onClick={() => nextTrack()} className='hover:text-white text-gray-400 transition'>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
                </div>

                <div>
                    <button onClick={() => repeat()} className={`hover:text-white text-gray-400 transition ${(isRepeat !== 'off') ? 'text-orange-600': ''}`}>
                        <FontAwesomeIcon icon={faRepeat}/>
                    </button>
                </div>

            </div>
        </div>
    </>
}

export default Controls