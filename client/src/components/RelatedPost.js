import React, { useEffect } from 'react'
import { Sitem } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { getNewPosts } from '../store/actions/post'

import * as actions from '../store/actions'

const RelatedPost = () => {
    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewPosts())
        // console.log(newPosts)
    }, [])
    return (
        <div className='w-full bg-white rounded-md p-4' >
            <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map(item => {
                    // console.log(item)
                    return (
                        <Sitem
                            key={item.id}
                            id={item.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            createdAt={item?.createdAt}
                            image={item.imagesId?.image}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={item?.description}
                            images={item?.imagesId?.image}
                            star={+item?.star}
                            user={item?.userId}
                        />
                    )
                })}

            </div>
        </div>
    )
}

export default RelatedPost