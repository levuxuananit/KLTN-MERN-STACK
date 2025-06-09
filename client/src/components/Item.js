import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { path } from '../ultils/constant'
import { apiUpdateWishlist } from '../services/post'
import { toast } from 'react-toastify'
import anonuser from "../assets/anon-avatar.png"

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons

const Item = ({ images, user, title, star, description, attributes,priceNumber , address, id, islover, setUpdate }) => {
    const [isTym, setIsTym] = useState(false)
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars

    }
    const handleUpdateWishlist = async (e) => {
        e.stopPropagation()
        const response = await apiUpdateWishlist({ pid: id })
        if (response.data?.err === 0) {
            setUpdate(prev => !prev)
            setIsTym(!isTym)
            toast.success(response.data.msg)
        }
        
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4 relative'>
            <Link
                to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
            >
                {images && images?.length > 0 && images.filter((i, index) => [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[47%] h-[120px] object-cover' />
                    )
                })}
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images?.length} ảnh`}</span>
            </Link>
            <div
                className='text-white absolute p-4 right-5 bottom-2 left-[27%]'
                onClick={e => {
                    e.stopPropagation()
                    handleUpdateWishlist(e)
                }}
            >
                {isTym ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
            </div>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} className='text-red-600 font-medium'>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </Link>
                </div>
                <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {`${address?.split(',')[address?.split(',').length - 2]}${address?.split(',')[address?.split(',').length - 1]}`}
                    </span>
                </div>
                {/* <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {description}
                </p> */}
                <div className='flex items-center my-5 justify-between'>
                    <div className=' flex items-center'>
                        <img src={anonuser} alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <a
                            className='bg-blue-700 text-white p-1 rounded-md'
                            href={`tel:${user?.phone}`}
                            target='_blank'
                        >
                            {`Gọi ${user?.phone}`}
                        </a>
                        <a
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
                            href={`https://zalo.me/${user?.zalo}`}
                            target='_blank'
                        >
                            Nhắn zalo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)