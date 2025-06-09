import React from 'react'
import { useSelector } from 'react-redux'
import dumbavt from "../assets/user-dumb-avt.jpg"

const User = () => {
    const { currentData } = useSelector(state => state.user)

    return (
        <div className='text-sm'>
            {currentData && Object.keys(currentData).length > 0 && <div className='flex items-center gap-2'>
                <img src={dumbavt} alt="avatar" className='w-10 object-cover rounded-full h-10 border-2 shadow-md border-white' />
                <div className='flex flex-col'>
                    <span>Xin chào, <span className='font-semibold'>{currentData?.name}</span></span>
                    <span>Mã tài khoản: <span className='font-medium'>{`${currentData?.id?.toUpperCase()}`}</span></span>
                </div>
            </div>}
        </div>
    )
}

export default User