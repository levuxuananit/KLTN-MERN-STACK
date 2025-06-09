import React, { useState, useEffect } from 'react'
import { apiGetDashboard, apiGetPostsLimit } from '../../services/post'
import icons from '../../ultils/icons'
import { ChartLine } from '../../components'
import moment from 'moment'

const { HiUserGroup, MdPersonAddAlt1, MdOutlinePostAdd } = icons

const Dashboard = () => {
    const [data, setData] = useState(null)
    const [isMonth, setIsMonth] = useState(false)
    const [newPosts, setNewPosts] = useState(null)
    const [customTime, setCustomTime] = useState({
        from: '',
        to: ''
    })
    const fetchDashboard = async (params) => {
        const response = await Promise.all([apiGetDashboard(params), apiGetPostsLimit({ limitPost: 5, order: ['createdAt', 'DESC'] })])
        if (response[0].data.success) setData(response[0].data.chartData)
        if (response[1].data.err === 0) setNewPosts(response[1].data.response.rows)
    }
    useEffect(() => {
        const type = isMonth ? 'month' : 'day'
        const params = { type }
        if (customTime.from) params.from = customTime.from
        if (customTime.to) params.to = customTime.to
        fetchDashboard(params)
    }, [isMonth, customTime])
    const handleCustomTime = () => {
        setCustomTime({ from: '', to: '' })
    }
    return (
        <div className='relative bg-white p-4 h-full'>
            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Tổng quan</h3>
            </div>
            <div className='py-8'>
                <div className='flex gap-4 items-center'>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>{data?.views || 0}</span>
                            <span className='text-sm text-gray-500'>SỐ LƯỢT TRUY CẬP</span>
                        </span>
                        <HiUserGroup size={30} />
                    </div>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>{data?.postCount || 0}</span>
                            <span className='text-sm text-gray-500'>SÔ BÀI ĐĂNG</span>
                        </span>
                        <MdOutlinePostAdd size={30} />
                    </div>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>{data?.userCount || 0}</span>
                            <span className='text-sm text-gray-500'>THÀNH VIÊN</span>
                        </span>
                        <MdPersonAddAlt1 size={30} />
                    </div>
                </div>
                <div className='mt-5 '>
                    <div className='flex gap-4 justify-between h-[400px]'>
                        <div className='flex-1 h-full shadow-lg rounded-md flex flex-col p-4'>
                            <h4 className='font-bold'>Số bài đăng cho thuê phòng trọ</h4>
                            <ChartLine
                                data={data?.ctpt}
                                isMonth={isMonth}
                                customTime={customTime}
                            />
                        </div>
                        <div className='flex-1 h-full shadow-lg rounded-md flex flex-col p-4'>
                            <h4 className='font-bold'>Số bài đăng cho thuê mặt bằng</h4>
                            <ChartLine
                                data={data?.ctmb}
                                isMonth={isMonth}
                                customTime={customTime}
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 justify-between h-[400px]'>
                        <div className='flex-1 h-full shadow-lg rounded-md flex flex-col p-4'>
                            <h4 className='font-bold'>Số bài đăng cho thuê căng hộ</h4>
                            <ChartLine
                                data={data?.ctch}
                                isMonth={isMonth}
                                customTime={customTime}
                            />
                        </div>
                        <div className='flex-1 h-full shadow-lg rounded-md flex flex-col p-4'>
                            <h4 className='font-bold'>Số bài đăng nhà cho thuê</h4>
                            <ChartLine
                                data={data?.nct}
                                isMonth={isMonth}
                                customTime={customTime}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-8 rounded-md shadow-lg p-4'>
                    <h4 className='font-bold'>Các bài đăng mới nhất</h4>
                    <table className="table-auto w-full mt-4">
                        <thead>
                            <tr className='border-b border-t'>
                                <td className='p-2 font-bold'>STT</td>
                                <td className='p-2 font-bold'>Tựa đề</td>
                                <td className='p-2 font-bold'>Thể loại</td>
                                <td className='p-2 font-bold'>Người đăng</td>
                                <td className='p-2 font-bold'>Liên hệ</td>
                                <td className='p-2 font-bold'>Ngày đăng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {newPosts?.map((item, index) => (
                                <tr
                                    key={item.id}
                                >
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.title}</td>
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.category?.value}</td>
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.receiverName || item?.user?.name}</td>
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.receiverPhone || item?.user?.zalo}</td>
                                    <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard