import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost, Paypal } from '../../components'
import { apiDeletePost, apiRequestExpired, apiGetReports, apiSeenReport, apiChangeRented } from '../../services'
import Swal from 'sweetalert2'


const ManagePost = () => {
    const dispach = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const { postOfCurrent, dataEdit } = useSelector(state => state.post)
    const [updateData, setUpdateData] = useState(false)
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('')
    const [price, setPrice] = useState(0)
    const [isExpired, setIsExpired] = useState(null)
    const [reportPosts, setReportPosts] = useState(null)
    const [update, setUpdate] = useState(false)

    const fetchReport = async () => {
        const response = await apiGetReports({ status: 'Accepted', user: true })
        if (response.data.err === 0) {
            setReportPosts(response.data?.data?.rows)
            // console.log(reportPosts)
            // console.log(posts)
        }
    }
    useEffect(() => {
        dispach(actions.getPostsLimitAdmin({ status }))
    }, [dataEdit, updateData, status])

    useEffect(() => {
        setPosts(postOfCurrent)
        // console.log(posts)
    }, [postOfCurrent])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])
    useEffect(() => {
        fetchReport()
    }, [update])
    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
        if (response?.data.err === 0) {
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Oops!', 'Xóa tin đăng thất bại', 'error')
        }
    }
    const handleChangeRented = async (status, pid) => {
        const st = status === 'ACTIVE' ? 'RENTED' : 'ACTIVE'
        const response = await apiChangeRented({ status: st }, pid)
        if (response?.data?.err === 0) setUpdateData(!updateData)
    }
    const handleExpired = async () => {
        const response = await apiRequestExpired({ price: price * 5000, days: price, pid: isExpired })
        if (response?.data.err === 0) {
            setIsExpired(null)
            setPrice(0)
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Oops!', 'Gia hạn tin đăng thất bại', 'error')
        }
    }
    const handleSeenReport = async () => {
        const response = await apiSeenReport()
        if (response.data.err === 0) setUpdate(!update)
    }
    return (
        <div className='flex flex-col gap-6'>
            {isExpired && <div onClick={() => setIsExpired(null)} className='absolute z-50 top-0 left-0 bottom-0 right-0 bg-overlay-30 flex justify-center items-center'>
                <div onClick={e => e.stopPropagation()} className=' p-8 bg-white w-[600px] rounded-md flex flex-col gap-2'>
                    <p className='p-2 border-blue-500 border rounded-md text-justify text-sm bg-blue-100 text-blue-800'>
                        Gia hạn ngày đăng bài, người đăng có thể chọn 2 phương án dưới đây:
                        <ul className='italic'>
                            <li><span className='font-bold'>Thanh toán nhanh:</span> Thanh toán trực tiếp qua paypal và bài đăng sẽ ngay lập tức được cộng thêm số ngày được gian hạn tính từ hôm nay</li>
                            <li><span className='font-bold'>Thanh toán offline:</span> Người đăng bài đăng ký với hệ thống số ngày đăng muốn gian hạn, và liên hệ Admin để trao đổi thanh toán.</li>
                        </ul>
                        <br />
                        <span>{`Giá tiền gia hạn: ${process.env.REACT_APP_GIA_HAN}vnđ/ngày`}</span>
                    </p>
                    <span>Nhập số ngày bạn muốn gia hạn:</span>
                    <div>
                        <input type="number" className='px-4 py-2 rounded-md border' value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <span>
                        <span>Tổng tiền cần gia hạn: </span>
                        <span className='font-bold'>{Number(price * +process.env.REACT_APP_GIA_HAN).toLocaleString() + ' USD'}</span>
                    </span>
                    <button
                        type='button'
                        className='px-4 py-2 text-white font-bold bg-blue-500 rounded-md'
                        onClick={handleExpired}
                    >
                        Gia hạn
                    </button>
                    <div className='w-full'>
                        <h2>Chọn phương thức gia hạn</h2>
                        <Paypal
                            amount={price * process.env.REACT_APP_GIA_HAN}
                            pid={isExpired}
                            days={price}
                            setIsExpired={setIsExpired}
                            setUpdateData={setUpdateData}

                        />
                    </div>
                </div>
            </div>}
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium '>Quản lý tin đăng</h1>
                <div className='text-sm p-4 rounded-md text-blue-800 bg-blue-200 italic'>Sau khi xác nhận gia hạn, vui lòng chủ trọ hãy bank tiền gia hạn theo <a className='text-blue-500 hover:underline' href='http://zalo.me/0862434001'>tài khoản này</a> để admin duyệt nhé ~</div>
                <select onChange={e => setStatus(+e.target.value)} value={status} className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="">Lọc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                </select>
            </div>
            {reportPosts && Object.keys(reportPosts).length > 0 && <div className='p-4 border relative rounded-md bg-blue-100 border-blue-500 text-sm'>
                <span onClick={handleSeenReport} className='absolute p-2 cursor-pointer right-[8px] top-[8px]'>X</span>
                <h1 className='font-medium text-blue-600'>Thông báo:</h1>
                <ul>
                    {reportPosts?.map(el => (
                        <li key={el.id} className='flex items-center gap-1'>
                            <span>Bài đăng</span>
                            <span className='font-medium'>{el.title}</span>
                            <span>của bạn đã bị xóa bởi report của người xem với lý do</span>
                            <span className='text-red-500 italic'>{`"${el.reason}"`}</span>
                        </li>
                    ))}
                </ul>
            </div>}
            <table className="w-full table-auto">
                <thead >
                    <tr className='w-full bg-gray-100'>
                        <th className='border text-center'>Mã tin</th>
                        <th className='border text-center'>Tiêu đề</th>
                        <th className='border text-center'>Giá</th>
                        <th className='border text-center'>Ngày bắt đàu</th>
                        <th className='border text-center'>Ngày hết hạn</th>
                        <th className='border text-center'>Trạng thái</th>
                        <th className='border text-center'>Đã thuê</th>
                        <th className='border text-center'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts
                        ? <tr>
                            <td>Chưa có bài đăng</td>
                        </tr>
                        : posts?.map(item => {
                            // console.log(posts)
                            return (
                                <tr className='text-center' key={item.id}>
                                    <td className='text-center py-4 border-b'>{item?.id}</td>
                                    <td className='text-center py-4 border-b'>{`${item?.title}`}</td>
                                    <td className='text-center py-4 border-b'>{item?.attributesId?.price}</td>
                                    <td className='text-center py-4 border-b'>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='text-center py-4 border-b'>{moment(item?.expired).format('DD/MM/YYYY')}</td>
                                    <td className='text-center py-4 border-b'>
                                        {item?.expireds?.status === 'Pending'
                                            ? <span className='px-4 py-2 bg-orange-500 text-white'>Pending</span>
                                            : new Date(item?.expired).getTime() >= new Date().getTime()
                                                ? <span className='px-4 py-2 bg-green-500 text-white'>Active</span>
                                                : <span className='px-4 py-2 bg-red-500 text-white'>Expired</span>
                                        }
                                    </td>
                                    <td className='text-center py-4 border-b'>
                                        <input
                                            type="checkbox"
                                            checked={item?.status === 'RENTED'}
                                            onChange={(e) => handleChangeRented(item?.status, item.id)}
                                        />
                                    </td>
                                    <td className='flex justify-center text-center py-4 border-b items-center h-full'>
                                        {new Date(item?.expired).getTime() < new Date().getTime() && !item.expireds?.id && <Button
                                            text='Gia hạn'
                                            textColor='text-blue-500 hover:underline py-1'
                                            onClick={() => setIsExpired(item.id)}
                                        />}
                                        <Button
                                            text='Sửa'
                                            textColor='text-blue-500 hover:underline py-1'
                                            onClick={() => {
                                                dispach(actions.editData(item))
                                                setIsEdit(true)
                                            }}
                                        />
                                        <Button
                                            text='Xóa'
                                            textColor='text-blue-500 hover:underline py-1'
                                            onClick={() => handleDeletePost(item.id)}
                                        />

                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    )
}

export default ManagePost