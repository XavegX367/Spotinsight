import React, { useEffect, useState } from 'react'
import { getTopItems } from '../utils/APIRoutes';

const TopItems = (type) => {
    const [topItems, setTopItems] = useState([])

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const items = await getTopItems(type.type);
        setTopItems(items.items)
    }

    return (
        <div className='flex'>
            {
                (type.type === "artists") ? 
                    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center'>
                        {
                        topItems.map(item => (
                            <div key={item.id} className='flex flex-col'>
                                <a target='_blank' href={item.external_urls.spotify}>
                                    <img className='w-[46vh] h-[46vh]' src={item.images[0].url} />
                                    <div className='p-2 mb-4 text-xl'>{item.name}</div>
                                </a>
                            </div>
                        ))
                        }
                    </div> 
                :
                <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center'>
                {
                topItems.map(item => (
                    <div key={item.id} className='flex flex-col'>
                        <a target='_blank' href={item.external_urls.spotify}>
                            <img className='max-w-full' src={item.album.images[0].url} />
                            <div className='p-2 mb-4 text-xl'>{item.name}</div>
                        </a>
                    </div>
                ))
                }
            </div> 
            }
        </div>
    )
}

export default TopItems