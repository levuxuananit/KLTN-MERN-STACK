import React, { useEffect, useState } from "react";
import Pagination from "../Public/Pagination";
import { apiGetExpireds, apiPlusExpired } from "../../services";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ManageExpired = () => {
  const [update, setUpdate] = useState(false);
  const [searchParams] = useSearchParams();
  const [expireds, setExpireds] = useState(null);
  const [isChangeStatus, setIsChangeStatus] = useState(null);
  const [payload, setPayload] = useState({
    days: "",
    status: "",
  });
  const fetchExpireds = async (searchParamsObject) => {
    const response = await apiGetExpireds(searchParamsObject);
    if (response.data?.err === 0) setExpireds(response.data?.data.items);
    console.log(response.data?.data.items);
  };
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) params.push(entry);
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    fetchExpireds(searchParamsObject);
  }, [update, searchParams]);

  // const deletePost = async (uid) => {
  //     const response = await apiDeleteUser(uid)
  //     if (response.data.success) {
  //         toast.success(response.mes)
  //         setUpdate(!update)
  //     } else toast.error(response.mes)
  // }

  const handleSubmit = async () => {
    payload.days = isChangeStatus.days;
    payload.pid = isChangeStatus.pid.id;
    payload.eid = isChangeStatus.id;
    const response = await apiPlusExpired(payload);
    if (response.data.err === 0) {
      setIsChangeStatus(null);
      toast.success(response.data.msg);
      setUpdate(!update);
    }
  };
  return (
    <div className="relative h-full bg-white p-4">
      <div className="flex items-center justify-between gap-8 border-b">
        <h3 className="font-bold text-[30px] pb-4 ">
          Quản lý yêu cầu gia hạn bài đăng
        </h3>
        {isChangeStatus && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2 px-4 bg-blue-600 rounded-md text-white font-semibold flex items-center justify-center gap-2"
            >
              <span>Update</span>
            </button>
            <button
              type="button"
              onClick={() => setIsChangeStatus(null)}
              className="py-2 px-4 bg-orange-600 rounded-md text-white font-semibold flex items-center justify-center gap-2"
            >
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
      <div className="py-4">
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="border-b border-t">
              <td className="p-2 font-bold">STT</td>
              <td className="p-2 font-bold">Người yêu cầu</td>
              <td className="p-2 font-bold">Phone</td>
              <td className="p-2 font-bold">Bài đăng</td>
              <td className="p-2 font-bold">Hết hạn ngày</td>
              <td className="p-2 font-bold">Số ngày gia hạn</td>
              <td className="p-2 font-bold">Số tiền</td>
              <td className="p-2 font-bold text-center">Trạng thái</td>
              <td className="p-2 font-bold">Ngày gia hạn</td>
            </tr>
          </thead>
          <tbody>
            {expireds?.map((item, index) => (
              <tr key={item.id}>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {index + 1}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.uid?.name}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.uid?.phone}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.pid?.title}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {moment(item?.pid?.expired).format("DD/MM/YYYY")}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.days}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.price}
                </td>
                <span className="py-2 bg-transparent">
                  {isChangeStatus?.id === item.id ? (
                    <select
                      className="border p-2"
                      value={payload.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setPayload((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <div
                      className={`w-[100%] cursor-pointer ${
                        item.status === "Accepted"
                          ? "bg-green-500"
                          : item.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } py-2 flex items-center justify-center text-white `}
                      onClick={(e) => {
                        if (!item?.isChecked) {
                          e.stopPropagation();
                          if (item.status === "Accepted") {
                            return;
                          }
                          setIsChangeStatus(item);
                        }
                      }}
                    >
                      {item.status}
                    </div>
                  )}
                </span>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                    <span
                      className="p-2 cursor-pointer text-blue-500 hover:underline"
                      // onClick={() => deletePost(item.id)}
                    >
                      {moment(item?.pid?.expired).format("DD/MM/YYYY")}
                    </span>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {expireds && (
        <div className="">
          <Pagination admin count={expireds?.count} posts={expireds?.rows} />
        </div>
      )}
    </div>
  );
};

export default ManageExpired;
