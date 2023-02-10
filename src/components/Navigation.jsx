import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navigation = ({activeNav, setActiveNav}) => {
    const navigate = useNavigate();

    const handleNavChange = (tab) => {
        setActiveNav(tab);
        
        if(tab === 'insight'){
            navigate('/');
        } else if (tab === 'player'){
            navigate('/player');
        }
    }

    return (
        <div className='flex gap-x-4'>
            <button className={`${(activeNav === 'insight' ? "text-white" : "text-zinc-600 hover:text-white")} transition`} onClick={() => handleNavChange("insight")}>Insight</button>
            <button className={`${(activeNav === 'player' ? "text-white" : "text-zinc-600 hover:text-white")} transition`} onClick={() => handleNavChange("player")}>Player</button>
        </div>
    )
}

export default Navigation