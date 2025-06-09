import React, { memo, useState, useCallback } from 'react'
import moment from 'moment'
import icons from '../ultils/icons'
import { InputComment } from './'
import { apiCreateComment } from '../services/post'

const { AiOutlineHistory, FaComments } = icons
const Comment = ({ commentator, createdAt, content, cid, pid, setRender, parents }) => {
    const [isRep, setIsRep] = useState(false)
    const [replyContent, setReplyContent] = useState('')

    const handleSendReply = useCallback(async () => {
        const response = await apiCreateComment({ content: replyContent, parentComment: cid, pid })
        if (response.data.success) {
            setRender(prev => !prev)
            setReplyContent('')
            setIsRep(false)
        }
    }, [replyContent])
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-2'>
                    <img
                        src={commentator?.avatar}
                        alt="avatar"
                        className='w-[25px] h-[25px] object-cover rounded-md'
                    />
                    <span className='font-semibold'>{commentator?.name}</span>
                </div>
                <span className='italic flex gap-1 items-center'>
                    <AiOutlineHistory />
                    <span>{moment(createdAt).fromNow()}</span>
                </span>
            </div>
            <div className='p-4 rounded-md bg-gray-100 border ml-[28px]'>
                <span>{content}</span>
                <div
                    onClick={() => setIsRep(true)}
                    className='flex gap-2 items-center hover:underline cursor-pointer justify-end mt-4 text-sm text-main'>
                    <FaComments />
                    <span>Phản hồi</span>
                </div>
            </div>
            <div className='ml-[28px]'>
                {parents && parents?.map(item => (
                    <Comment
                        key={item.id}
                        commentator={item?.commentator}
                        content={item?.content}
                        createdAt={item?.createdAt}
                        cid={cid}
                        pid={pid}
                        setRender={setRender}
                    />
                ))}
            </div>
            {isRep && <InputComment
                rep
                content={replyContent}
                setContent={setReplyContent}
                handleSendComment={handleSendReply}
            />}
        </div>
    )
}

export default memo(Comment)