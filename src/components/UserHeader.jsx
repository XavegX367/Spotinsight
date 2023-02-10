import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const UserHeader = ({user, setUser}) => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setShowOptions(!showOptions);
    }

    const handleSignOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        navigate('/login');
    }

    return (
        <div>
            <div onClick={handleClick} className='flex select-none rounded-3xl bg-[#353333] hover:bg-[#262525] text-white border-2 border-gray-300 cursor-pointer'>
                <img className='rounded-full p-1 h-12' src={user.images[0].url}/>
                <span className='mt-3 px-4'>{user.display_name}</span>
            </div>
            {
                showOptions ?
                    <div className="z-50 w-36 flex mt-2 rounded-full absolute bg-[#353333] hover:bg-[#262525] shadow border ring-1 ring-black cursor-pointer" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            <button onClick={handleSignOut} type="button" className="text-white block w-auto px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</button>
                        </div>
                    </div>
                : ""
            }
        </div>
    )
}

export default UserHeader