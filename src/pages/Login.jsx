import {React, useEffect} from 'react'
import { logo_symbol_white} from '../assets'
import { connectRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const connectClick = () => {
    window.location.href = connectRoute;
}

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        checkLogin();
    }, [])

    const checkLogin = async () => {
        if(localStorage.getItem('access_token') === undefined || localStorage.getItem('access_token') === null)
        {
            return;
        }

        navigate('/')
    }

    return (
        <section>
            <div className=' rounded-lg'>
                <div className='text-2xl flex justify-center text-white shadow-xs mb-6'>
                    Login by connecting your account
                </div>
                <div className='flex justify-center mb-4'>
                    <button onClick={() => connectClick()} className='rounded-full bg-green-400 p-2 hover:bg-green-700 transition text-gray-200 hover:text-gray-300 '>
                        <div className='flex'>
                            <img className='w-6 mr-1' src={logo_symbol_white}/>
                            Connect with Spotify
                        </div>
                    </button>
                </div>
                <hr className='border border-neutral-600 mt-4 mb-2'/>
                <div>
                    <span className='text-xs text-center flex justify-center text-transparent bg-clip-text bg-gradient-to-br from-[#ff5400] via-[#e3936b] to-white'>
                        Before connecting your account; we would like to inform you that SpotInsight won't save/share any of your data. This means that the data stays at Spotify and SpotInsight only visualizes it.
                        We also do not save any data when playing music through our site. In short: We don't save any data at all.

                    </span>
                </div>
            </div>
        </section>
    )
}

export default Login