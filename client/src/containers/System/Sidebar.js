import React from "react";
import { useSelector, useDispatch } from "react-redux";
import menuSidebar from "../../ultils/menuSidebar";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { AiOutlineLogout } from "react-icons/ai";
import dumbavt from "../../assets/user-dumb-avt.jpg";
const activeStyle =
  "hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 font-bold bg-gray-200";
const notActiceStyle =
  "hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 cursor-pointer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const [key, setKey] = React.useState(0);

  const handleNavLinkClick = () => {
    setKey((prev) => prev + 1); // Cập nhật key để trigger re-render
  };

  return (
    <div className="w-[280px] flex-none p-4 flex flex-col gap-6" key={key}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={dumbavt}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {currentData?.id?.toUpperCase()}
          </small>
        </span>
      </div>
      <div>
        {menuSidebar.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${activeStyle} ${
                    currentData?.role === item.role ? "hidden" : ""
                  }`
                : `${notActiceStyle} ${
                    currentData?.role === item.role ? "hidden" : ""
                  }`
            }
            key={item.id}
            to={item?.path}
            onClick={handleNavLinkClick} // Cập nhật key khi nhấn
          >
            {item?.icon}
            {item.text}
          </NavLink>
        ))}
        <span
          onClick={() => dispatch(actions.logout())}
          className={notActiceStyle}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
