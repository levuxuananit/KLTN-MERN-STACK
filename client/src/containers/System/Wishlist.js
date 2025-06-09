import React, { useState, useEffect } from 'react'
import { apiGetWishlist } from '../../services'
import { Item } from '../../components'
import { useSelector } from 'react-redux'

const Wishlist = () => {

    const [wishlist, setWishlist] = useState(null)
    const [update, setUpdate] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const fetchWishlist = async () => {
        const response = await apiGetWishlist()
        if (response.data.err === 0) setWishlist(response.data.response)
    }
    useEffect(() => {
        fetchWishlist()
    }, [update])
    return (
        <div>
            <h1 className='text-[24px] font-semibold'>Bài đăng đã thích</h1>
            <div>
                {wishlist?.map(el => (
                    <Item
                        key={el.id}
                        address={el?.pid?.address}
                        attributes={el?.pid?.attributesId}
                        description={el?.wishlistData?.description}
                        images={el?.pid?.imagesId?.image}
                        star={+el?.pid?.star}
                        title={el?.pid?.title}
                        user={el?.pid?.userId}
                        id={el?.pid?.id}
                        islover={el?.wishlistData?.lovers?.some(i => currentData?.id === i.uid)}
                        setUpdate={setUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default Wishlist