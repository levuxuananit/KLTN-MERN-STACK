import React from 'react'
import { Paypal } from '../../components'

const Checkout = () => {
    return (
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-white z-[100]'>
            <h2>Chọn phương thức gia hạn</h2>
            <Paypal />
        </div>
    )
}

export default Checkout