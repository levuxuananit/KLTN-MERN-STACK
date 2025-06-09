import React, { memo, useState } from 'react'
import { renderStar } from '../ultils/fn'
import { Votebar } from './'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'
import Swal from 'sweetalert2'

const VoteAndComment = ({ votes, star, setIsVote }) => {
    const navigate = useNavigate()
    const [seeMore, setSeeMore] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)
    return (
        <div className='shadow-md relative border rounded-md p-[10px] bg-white'>
            <h3 className='text-base font-bold'>{`Đánh giá & nhận xét tin đăng`}</h3>
            <div className='flex border rounded-md mt-8'>
                <div className='flex-auto w-2/5 border-r flex flex-col gap-1 items-center justify-center'>
                    <span className='text-[24px] font-bold'>{`${Math.round(votes?.reduce((sum, item) => +item.score + sum, 0) * 100 / votes?.length) / 100 || 0}/5`}</span>
                    <span className='flex items-center'>
                        {renderStar(star)?.map((item, index) => (<span key={index}>{item}</span>))}
                    </span>
                    <span className='text-base text-gray-600'>{`${votes?.length} lượt đánh giá và nhận xét`}</span>
                </div>
                <div className='flex-auto w-3/5 p-[10px]'>
                    {[...Array(5).keys()].map(item => (
                        <Votebar
                            key={item}
                            star={5 - item}
                            voter={votes?.filter(i => +i.score === 5 - item)?.length}
                            percent={Math.round(votes?.filter(i => +i.score === 5 - item)?.length * 100 / votes?.length)}
                        />
                    ))}
                </div>
            </div>
            <div className={`w-full flex justify-center items-center text-base gap-2 flex-col mt-4`}>
                <span>Bạn đánh giá sao sản phẩm này</span>
                <button
                    type='button'
                    className='bg-main px-6 py-2 text-white bg-red-500 flex items-center justify-center rounded-md w-fit'
                    onClick={() => {
                        if (isLoggedIn) {
                            setIsVote(true)
                        } else {
                            Swal.fire('Oops', 'Hãy đăng nhập để đánh giá nào ~', 'info').then(() => {
                                navigate(`/${path.LOGIN}`)
                            })
                        }
                    }}
                >
                    Đánh giá ngay
                </button>
            </div>
            <div className={`${!seeMore ? 'h-[300px] overflow-hidden' : ''}`}>
                {votes?.map(item => (
                    <div key={item.id} className='flex gap-2 flex-col mt-4'>
                        <div className='flex gap-4'>
                            <img
                                src={item?.userData?.avatar}
                                alt="avatar"
                                className='w-[25px] h-[25px] object-cover rounded-md'
                            />
                            <span className='text-blue-500'>{item?.userData?.name}</span>
                        </div>
                        <div className='ml-[28px] p-4 gap-2 flex flex-col bg-gray-100 rounded-md text-sm'>
                            <span className='font-semibold flex gap-2'>
                                <span>Đánh giá: </span>
                                <span className='flex items-center'>{renderStar(item.score)?.map((item, index) => (<span key={index}>{item}</span>))}</span>
                            </span>
                            <span className='font-semibold flex gap-2'>
                                <span>Nhận xét:</span>
                                <span>{item.comment || 'Chưa có nhận xét'}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {votes?.length > 2 && <>
                <div className='flex items-center justify-center'>
                    {seeMore ? <button
                        type='button'
                        className='py-2 px-4 text-blue-500 my-4 hover:underline'
                        onClick={() => setSeeMore(false)}
                    >
                        Ẩn bớt bình luận
                    </button> : <button
                        type='button'
                        className='py-2 px-4 text-blue-500 my-4 hover:underline'
                        onClick={() => setSeeMore(true)}
                    >
                        Xem thêm bình luận
                    </button>}
                </div>
            </>}
        </div>
    )
}

export default memo(VoteAndComment)