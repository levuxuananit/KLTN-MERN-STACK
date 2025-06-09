import React, { memo, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { apiRatings } from '../services/post'
const votes = [
    { txt: 'Rất tệ', star: 1 },
    { txt: 'Tệ', star: 2 },
    { txt: 'Bình thường', star: 3 },
    { txt: 'Tốt', star: 4 },
    { txt: 'Rất tốt', star: 5 },
]
const VoteOption = ({ pid, setIsVote }) => {
    const [payload, setPayload] = useState({
        txt: '',
        star: null
    })
    const handleSubmit = async () => {
        const data = {
            pid,
            comment: payload.txt,
            score: payload.star
        }
        const response = await apiRatings(data)
        console.log(response);
        if (response.data.success) {
            setPayload({
                txt: '',
                star: null
            })
            setIsVote(false)
        }
    }
    return (
        <div onClick={e => e.stopPropagation()} className='p-8 bg-white rounded-md min-w-[600px]'>
            <div className='flex flex-col gap-2 border-b pb-4'>
                <span className='font-bold'>Hãy chia sẻ cảm nhận của bạn về sản phẩm</span>
                <textarea cols="30" rows="3"
                    className='bg-gray-100 p-2'
                    placeholder='Viết tại đây...'
                    value={payload.txt}
                    onChange={e => setPayload(prev => ({ ...prev, txt: e.target.value }))}
                ></textarea>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
                <span className='font-bold'>Bạn thấy sản phẩm này như thế nào</span>
                <div className='w-full flex justify-between items-center'>
                    {votes.map((item, index) => (
                        <span
                            key={item.star}
                            className='flex flex-col flex-1 py-4 gap-2 justify-center rounded-lg cursor-pointer items-center hover:bg-gray-200'
                            onClick={() => setPayload(prev => ({ ...prev, star: item.star }))}
                        >
                            {payload.star < index + 1 ? <AiFillStar size={18} /> : <AiFillStar size={18} color='#f59e0b' />}
                            <span>{item.txt}</span>
                        </span>
                    ))}
                </div>
            </div>
            <button
                type='button'
                className='py-2 w-full mt-8 font-semibold text-white bg-secondary1 bg-main rounded-md'
                onClick={handleSubmit}
            >
                Gửi đánh giá
            </button>
        </div>
    )
}

export default memo(VoteOption)