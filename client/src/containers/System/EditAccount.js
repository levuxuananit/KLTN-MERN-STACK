import React, { useState } from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { apiUpdateUser } from '../../services'
import { fileToBase64 } from '../../ultils/Common/tobase64'
import { getCurrent, logout } from '../../store/actions'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'

const EditAccount = () => {
    const { currentData } = useSelector(state => state.user)
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: currentData?.avatar || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })
    const handleSubmit = async () => {
        console.log(payload);
        const formData = new FormData()
        if (payload.name) formData.append('name', payload.name)
        if (payload.avatar) formData.append('avatar', payload.avatar)
        if (payload.fbUrl) formData.append('fbUrl', payload.fbUrl)
        if (payload.zalo) formData.append('zalo', payload.zalo)
        const response = await apiUpdateUser(formData)
        if (response?.data.err === 0) {
            Swal.fire('Done', 'Chỉnh sửa thông tin cá nhân thành công', 'success').then(() => {
                dispatch(getCurrent())
            })
        } else {
            Swal.fire('Oops!', 'Chỉnh sửa thông tin cá nhân không thành công', 'error')
        }
    }
    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setImage(imageBase64)
        setPayload(prev => ({
            ...prev,
            avatar: e.target.files[0]
        }))
    }
    return (
        <div className='flex flex-col h-full items-center'>
            <h1 className='text-3xl w-full text-start font-medium py-4 border-b border-gray-200'>Chỉnh sửa thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center flex-auto'>
                <div className='py-6 flex flex-col gap-4 w-full'>
                    <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} direction='flex-row' label='Mã thành viên' />
                    <InputReadOnly value={currentData?.phone} editPhone direction='flex-row' label='Số điện thoại' />
                    <InputFormV2
                        name='name'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.name}
                        label='Tên hiển thị' />
                    <InputFormV2
                        name='zalo'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.zalo}
                        label='Zalo' />
                    <InputFormV2

                        name='fbUrl'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.fbUrl}
                        label='Facebook' />
                    <div className='flex'>
                        <label className='w-48 flex-none' htmlFor="password">Mật khẩu</label>
                        <div onClick={() => {
                            dispatch(logout())
                            navigate(`/${path.CHANGE_PASSWORD}`)
                        }} className='flex-auto text-blue-500 h-12 cursor-pointer'>Đổi mật khẩu</div>
                    </div>
                    <div className='flex mb-6'>
                        <label className='w-48 flex-none' htmlFor="avatar">Ảnh đại diện</label>
                        <div>
                            <img src={image || payload.avatar} alt="avatar" className='w-28 h-28 rounded-full object-cover' />
                            <input onChange={handleUploadFile} type="file" className='appearance-none my-4' id="avatar" />
                        </div>

                    </div>
                    <Button
                        text='Cập nhật'
                        bgColor='bg-blue-600'
                        textColor='text-white'
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditAccount