import { memo, useState, useCallback } from 'react'
import { apiCreateComment } from '../services/post'
import { InputComment, Comment } from './'


const QuestionAndAnswer = ({ comments, pid, setRender }) => {
    const [content, setContent] = useState('')
    const [seeMore, setSeeMore] = useState(false)
    const handleSendComment = useCallback(async () => {
        const response = await apiCreateComment({ pid, content })
        if (response.data.success) {
            setRender(prev => !prev)
            setContent('')
        }

    }, [content])
    return (
        <div className='shadow-md border rounded-md bg-white p-[10px]'>
            <h3 className='font-bold text-[20px]'>Hỏi & đáp</h3>
            <InputComment
                content={content}
                setContent={setContent}
                handleSendComment={handleSendComment}
            />
            <div className={`mt-4 flex flex-col gap-8 pb-8 ${!seeMore && comments?.length > 2 ? 'h-[300px] overflow-hidden' : ''}`}>
                {comments && comments?.filter(item => !item.parentComment === true)?.map(item => (
                    <Comment
                        key={item.id}
                        commentator={item?.commentator}
                        content={item?.content}
                        createdAt={item?.createdAt}
                        cid={item?.id}
                        pid={pid}
                        setRender={setRender}
                        parents={comments?.filter(i => i.parentComment === item.id)}
                    />
                ))}
            </div>
            {comments && comments?.length > 2 && <div className='flex items-center justify-center'>
                {(seeMore) ? <button
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
            </div>}
        </div>
    )
}

export default memo(QuestionAndAnswer)