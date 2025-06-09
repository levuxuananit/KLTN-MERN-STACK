import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { memuSidebar } from '../../ultils/constant'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import dumbavt from "../../assets/user-dumb-avt.jpg"
const activeStyle = 'font-medium px-[10px] gap-4 h-[40px] flex items-center hover:bg-gray-200 bg-gray-200'
const notActiceStyle = 'font-medium px-[10px] gap-4 h-[40px] flex items-center hover:bg-gray-200 cursor-pointer'

const AdminSidebar = ({ admin }) => {
    const navigate = useNavigate()
    const { currentData } = useSelector(state => state.user)
    return (
        <div className='flex-none p-4 flex flex-col gap-6 bg-white min-h-screen'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={dumbavt} alt="avatar" className='w-12 h-12 object-cover rounded-full border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span >Mã thành viên: <small className='font-medium'>{currentData?.id?.toUpperCase()}</small></span>
            </div>
            <div>
                {memuSidebar?.map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}
                <span onClick={() => navigate('/')} className={notActiceStyle}><AiOutlineLogout size={24} />Tới website</span>
            </div>
        </div>
    )
}

export default memo(AdminSidebar)