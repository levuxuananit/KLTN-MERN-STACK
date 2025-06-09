import React, { useState } from 'react'
import { apiReportPost } from '../services'
import { toast } from 'react-toastify'

const Report = ({ pid, setIsReport, title, uid }) => {
    const [reason, setReason] = useState('')
    const handleSubmit = async () => {
        const response = await apiReportPost({ pid, reason, title, uid })
        if (response.data.err === 0) {
            setIsReport(null)
            toast.success(response.data.data)
        } else toast.error(response.data.data)
    }
    return (
        <div onClick={e => e.stopPropagation()} className='p-8 bg-white rounded-md min-w-[600px]'>
            <div className='flex flex-col gap-2 border-b pb-4'>
                <h4 className='font-bold'>Báo cáo vi phạm bài đăng</h4>
                <textarea cols="30" rows="3"
                    className='bg-gray-100 p-2 outline-none border'
                    placeholder='Viết tại đây...'
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                ></textarea>
            </div>
            <button
                type='button'
                className='py-2 w-full mt-8 font-semibold text-white bg-secondary1 bg-main rounded-md'
                onClick={handleSubmit}
            >
                Gửi báo cáo
            </button>
        </div>
    )
}

export default Report