import React from 'react';
import { FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white pt-10 mt-10 w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-20 text-sm">
                {/* Cột 1: Giới thiệu */}
                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Nhà Việt</h4>
                    <p className="text-gray-300">
                        Kênh thông tin số 1 Việt Nam kết nối người cho thuê và người tìm trọ nhanh chóng, uy tín.
                    </p>
                </div>

                {/* Cột 2: Liên hệ */}
                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Liên hệ</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-white" /> vothinhuy2608btm@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-white" /> 0899 891 422
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Hỗ trợ */}
                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Hỗ trợ</h4>
                    <ul className="text-gray-300 space-y-1">
                        <li>Hỗ trợ thanh toán: 0832 415 045</li>
                        <li>Zalo: 0832 415 045</li>
                        <li>Hỗ trợ đăng tin 24/7</li>
                    </ul>
                </div>

                {/* Cột 4: Mạng xã hội */}
                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Theo dõi chúng tôi</h4>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-[#1877F2] transition-colors" title="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-[#FF0000] transition-colors" title="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="#" className="hover:text-[#028fe7] transition-colors" title="Zalo">
                            Zalo
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-white text-sm py-2 text-center bg-blue-600 mt-4">
                © {new Date().getFullYear()} <strong>Nhà Việt</strong>. Bản quyền thuộc về NhaViet.com
            </div>
        </footer>
    );
};

export default Footer;
