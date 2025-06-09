import React, { memo } from 'react'
import icons from '../ultils/icons'
const { RiSendPlaneFill } = icons

const InputComment = ({ content, setContent, handleSendComment, rep }) => {

    return (
        <div className='mt-8 flex justify-between gap-4'>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                cols="30"
                rows="5"
                className='border rounded-md flex-auto p-2'
                placeholder='Xin mời để lại câu hỏi. Admin sẽ trả lời bạn trong 1h, các câu hỏi từ sau 20h sẽ được trả lời vào sáng hôm sau.'
            ></textarea>
            <div className='flex-none'>
                <button
                    type='button'
                    className='px-4 py-2 text-white bg-secondary1 font-semibold bg-main rounded-md flex items-center gap-2'
                    onClick={handleSendComment}
                >
                    <RiSendPlaneFill />
                    <span>{rep ? 'Trả lời' : 'Gửi'}</span>
                </button>
            </div>
        </div>
    )
}

export default memo(InputComment)