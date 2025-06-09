import React from 'react'

const Contact = () => {
    return (
        <div className='bg-white rounded-md p-4 flex flex-col items-center w-full gap-3'>
            <h2 className='text-[28px] font-bold'>Thông tin liên hệ</h2>
            <div className='bg-blue-100 border-blue-200 border rounded-md p-4 text-sm text-blue-800 mt-4'>
                <span>Chúng tôi cung cấp các dịch vụ sau đây:</span>
                <ul className='list-disc pl-8'>
                    <li>Người chủ trọ đăng tin tìm kiếm người thuê</li>
                    <li>Người chủ quán ăn hoặc các dịch vụ khác cần quản bá của hàng cửa mình thông quan các bài đăng</li>
                    <li>Người có nhu cầu thuê trọ dễ dàng tìm được các phòng trọ phù hợp</li>
                    <li>Người có nhu cầu dễ dàng tìm kiếm các quán ăn gần đây ngon, bổ, rẻ</li>
                    <li>Người có nhu cầu dễ dàng tìm kiếm các dịch vụ khác phù hợp với nhu cầu cá nhân</li>
                </ul>
                <div className='mt-4'>
                    <span className='font-semibold'>NOTE: </span>
                    <span>Thành viên muốn đăng bài hoặc gia hạn bài đăng thì xin vui lòng liện hệ với Admin theo thông tin bên dưới. Chúc mọi người ngày mới làm việc hiệu quả.</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 justify-between'>
                <span className='flex gap-2 w-[47%] flex-auto py-2 px-4 border items-center'>
                    <span className='font-medium'>Admin:</span>
                    <span>Lê Vũ Xuân An</span>
                </span>
                <span className='flex gap-2 w-[47%] flex-auto py-2 px-4 border items-center'>
                    <span className='font-medium'>Phone:</span>
                    <a className='text-blue-500 hover:underline' href='tel:0832415045'>0832415045</a>
                </span>
                <span className='flex gap-2 w-[47%] flex-auto py-2 px-4 border items-center'>
                    <span className='font-medium'>Email:</span>
                    <a className='text-blue-500 hover:underline' href='mailto:levuxuananit@gmail.com'>levuxuananit@gmail.com</a>
                </span>
                <span className='flex gap-2 w-[47%] flex-auto py-2 px-4 border items-center'>
                    <span className='font-medium'>Zalo:</span>
                    <a className='text-blue-500 hover:underline' target='_blank' href='https://zalo.me/0832415045'>Lê Vũ Xuân An</a>
                </span>
            </div>
        </div>
    )
}

export default Contact