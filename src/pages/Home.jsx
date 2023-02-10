import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken, getUser } from '../utils/APIRoutes';
import { delay } from '../utils/Helpers';
import Loader from '../components/Loader';
import TopItems from '../components/TopItems';

const Home = () => {
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        verifyData();
    }, []);

    const verifyData = async () => {
    // wait 155ms the localstorage might have not been filled yet
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
            setUser(userData);
        }
    }
    return (
    <>
        {
            user ?
            <div className='flex flex-col px-4'>
                <div className='flex flex-col gap-y-4 mt-4'>
                    <div className='flex flex-col bg-zinc-700 rounded-md p-4'>
                        <span className='text-2xl p-2 text-transparent bg-clip-text bg-gradient-to-br from-[#ff5400] via-[#e3936b] to-white'>Your top artists</span>
                        <TopItems type="artists"/>
                    </div>

                    <div className='flex flex-col bg-zinc-700 rounded-md p-4'>
                        <span className='text-2xl p-2 text-transparent bg-clip-text bg-gradient-to-br from-[#ff5400] via-[#e3936b] to-white'>Songs that you just couldn't get enough of</span>
                        <TopItems type="tracks"/>
                    </div>
                </div>

            </div>
            :
            <Loader/>
        }
    </>
    )
}

export default Home