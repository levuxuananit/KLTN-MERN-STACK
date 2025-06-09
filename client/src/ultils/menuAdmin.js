import icons from './icons'
import { path } from './constant'
const { BiUserPin } = icons

const menuAdmin = [
    {
        id: 1,
        text: 'Admin',
        path: `${path.ADMIN}/${path.DASHBOARD}`,
        icon: <BiUserPin />
    }
]

export default menuAdmin