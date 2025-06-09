import React, { useEffect, useState } from 'react'
import { Button, Item } from '../../components'
import { getPostsLimit } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const { currentData } = useSelector(state => state.user)
    const [sort, setSort] = useState(0)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        if (sort === 0) searchParamsObject.order = ['title', 'DESC']
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryCode, sort, update])

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: 12:05 22/11/2024</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Mặc định</span>
                <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    console.log()
                    return (
                        
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={item?.description}
                            images={item?.imagesId?.image}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.userId}
                            id={item?.id}
                            islover={item.lovers?.uid === currentData?.id}
                            setUpdate={setUpdate}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default List