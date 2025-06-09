import { memo, useEffect, useRef } from 'react'
import icons from '../ultils/icons'
const { AiFillStar } = icons
const Votebar = ({ star, percent, voter }) => {
    const votebar = useRef()
    useEffect(() => {
        votebar.current.style.right = `${100 - percent}%`
    }, [percent])
    return (
        <div className='flex w-full items-center gap-1 my-2 text-xs text-gray-600'>
            <span className='text-sm font-bold'>{star}</span>
            <AiFillStar color='orange' size={20} />
            <div className='h-[8px] flex-auto bg-gray-300 rounded-l-full rounded-r-full relative'>
                <div ref={votebar} className='absolute top-0 bottom-0 left-0 bg-red-500 rounded-l-full rounded-r-full'></div>
            </div>
            <span className=''>{`${voter} đánh giá`}</span>
        </div>
    )
}

export default memo(Votebar)