import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { path } from '../../ultils/constant'

const RegisterResult = () => {
    const { status } = useParams()
    return (
        <div className='py-8 min-h-screen flex flex-col justify-center items-center gap-4'>
            <div className='p-8 border rounded-md'>
                <img src='https://media.istockphoto.com/id/1311125874/vector/two-steps-authentication-verification-code-message-on-smartphone-notice-with-code-for-secure.jpg?s=612x612&w=0&k=20&c=oXrQ_Tife852Vbmice_Vll8NZyUhgI_oR4eBDGbbJac=' alt="" className='w-[300px] object-contain' />
                <span className='flex items-center gap-3'>
                    <span>{+status === 1 ? 'Đăng ký tài khoản thành công' : 'Đăng ký tài khoản không thành công.'}</span>
                    <Link
                        to={`/${path.LOGIN}`}
                        state={{ register: +status === 1 ? false : true }}
                        className='text-blue-500 hover:underline'
                    >
                        {+status === 1 ? 'Đi tới đăng nhập' : 'Đăng ký lại'}
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default RegisterResult