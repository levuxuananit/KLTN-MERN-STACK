import generateCode from "./generateCode.js"
const prices = [
    {
        min: 0,
        max: 1,
        value: 'Dưới 1 triệu',
    },
    {
        min: 1,
        max: 2,
        value: 'Từ 1 - 2 triệu',
    },
    {
        min: 2,
        max: 3,
        value: 'Từ 2 - 3 triệu',
    },
    {
        min: 3,
        max: 5,
        value: 'Từ 3 - 5 triệu',
    },
    {
        min: 5,
        max: 7,
        value: 'Từ 5 - 7 triệu',
    },
    {
        min: 7,
        max: 10,
        value: 'Từ 7 - 10 triệu',
    },
    {
        min: 10,
        max: 15,
        value: 'Từ 10 - 15 triệu',
    },
    {
        min: 15,
        max: 999999,
        value: 'Trên 15 triệu'
    },
]

const areas = [
    {
        min: 0,
        max: 20,
        value: 'Dưới 20m'
    },
    {
        min: 20,
        max: 30,
        value: 'Từ 20m - 30m'
    },
    {
        min: 30,
        max: 50,
        value: 'Từ 30m - 50m'
    },
    {
        min: 50,
        max: 70,
        value: 'Từ 50m - 70m'
    },
    {
        min: 70,
        max: 90,
        value: 'Từ 70m - 90m'
    },
    {
        min: 90,
        max: 9999999,
        value: 'Trên 90m'
    },
]

export const dataPrice = prices.map(item => ({
    ...item,
    code: generateCode(item.value),
}))
export const dataArea = areas.map(item => ({
    ...item,
    code: generateCode(item.value),
}))

export const roles = [
    {
        code: 'R1',
        value: 'Quản trị viên'
    },
    {
        code: 'R2',
        value: 'Chủ trọ'
    },
    {
        code: 'R3',
        value: 'Người thuê trọ'
    },
]
export const cactegories = [
    {
        code: 'CTCH',
        value: 'Cho thuê căn hộ',
        header: 'Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, Mới Nhất 2022',
        subheader: 'Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.'
    },
    {
        code: 'CTMB',
        value: 'Cho thuê mặt bằng',
        header: 'Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot, Mới Nhất 2022',
        subheader: 'Cho thuê mặt bằng - Kênh đăng tin cho thuê mặt bằng, cho thuê cửa hàng, cho thuê kiot số 1: giá rẻ, mặt tiền, khu đông dân cư, phù hợp kinh doanh.'
    },
    {
        code: 'CTPT',
        value: 'Cho thuê phòng trọ',
        header: 'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2022',
        subheader: 'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2022. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.'
    },
    {
        code: 'NCT',
        value: 'Nhà cho thuê',
        header: 'Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2022',
        subheader: 'Cho thuê nhà nguyên căn - Kênh đăng tin cho thuê nhà số 1: giá rẻ, chính chủ, miễn trung gian, đầy đủ tiện nghi, mức giá, diện tích cho thuê khác nhau.'
    },
]




