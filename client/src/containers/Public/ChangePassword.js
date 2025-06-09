import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import { apiForgotPassword } from '../../services'

const ChangePassword = () => {
    const [payload, setPayload] = useState({
        email: '',
    })
    const [invalidFields, setInvalidFields] = useState([])
    const handleChangePassword = async () => {
        const response = await apiForgotPassword(payload)
        console.log(response)
    }
    return (
        <div className='h-screen bg-white overflow-hidden flex flex-col gap-8 items-center justify-center'>
            <h1 className='text-[20px] text-blue-500 font-semibold'>Vui lòng đăng nhập email hiện tại:</h1>
            <div className='flex flex-col min-w-[500px] gap-4'>
                <InputForm
                    label='Email'
                    value={payload.email}
                    setValue={setPayload}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    keyPayload={'email'}
                />
                <Button
                    text={'Xác nhận'}
                    bgColor={'bg-blue-500'}
                    textColor={'text-white'}
                    onClick={handleChangePassword}
                />
            </div>
        </div>
    )
}

export default ChangePassword