import React, { useEffect, useState } from "react";
import Pagination from "../Public/Pagination";
import {
  apiUpdateReport,
  apiGetReports,
  apiRemoveReport,
  apiGetReportsAdmin,
} from "../../services";
import moment from "moment";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../ultils/constant";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

const ManageReport = () => {
  const [update, setUpdate] = useState(false);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [reports, setReports] = useState(null);
  const [isChangeStatus, setIsChangeStatus] = useState(null);
  const fetchReports = async (searchParamsObject) => {
    const response = await apiGetReportsAdmin(searchParamsObject);
    if (response.data?.err === 0) setReports(response.data?.data);
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
    fetchReports(searchParamsObject);
  }, [update, searchParams]);

  const deletePost = async (rid) => {
    const response = await apiRemoveReport(rid);
    if (response.data.err === 0) {
      toast.success(response.data.data);
      setUpdate(!update);
    } else toast.error(response.data.data);
  };

  const handleSubmit = async () => {
    // console.log({ rid: isChangeStatus.id, status, pid: isChangeStatus.pid.id })

    const response = await apiUpdateReport({
      rid: isChangeStatus.id,
      status,
      pid: isChangeStatus.pid.id,
    });
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
          Quản lý bài đăng vi phạm
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
              <td className="p-2 font-bold">Bài đăng</td>
              <td className="p-2 font-bold">Người đăng</td>
              <td className="p-2 font-bold">Lý do vi phạm</td>
              <td className="p-2 font-bold">Ngày báo cáo</td>
              <td className="p-2 font-bold">Trạng thái</td>
              <td className="p-2 font-bold">Hành động</td>
            </tr>
          </thead>
          <tbody>
            {reports?.rows?.map((item, index) => (
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
                  {item?.pid ? (
                    <Link
                      to={`${path.DETAIL}${formatVietnameseToString(
                        item?.pid?.title?.replaceAll("/", "")
                      )}/${item?.pid?.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item?.pid?.title}
                    </Link>
                  ) : (
                    <span>Bài đăng đã xóa</span>
                  )}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.uid?.name || ""}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {item?.reason}
                </td>
                <td
                  className={`p-2 ${
                    index % 2 === 0 ? "" : "bg-gray-100"
                  } m-auto`}
                >
                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                </td>
                <span className="flex-1 py-2 flex items-center">
                  {isChangeStatus?.id === item.id ? (
                    <select
                      className="border p-2"
                      value={status}
                      onClick={(e) => {
                        if (item.status === "Accepted") {
                          return;
                        }
                        e.stopPropagation();
                      }}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Canceled">Cancelled</option>
                    </select>
                  ) : (
                    <div
                      className={`w-[90px] cursor-pointer ${
                        item.status === "Accepted"
                          ? "bg-green-500"
                          : item.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } py-1 flex items-center justify-center text-white `}
                      onClick={(e) => {
                        if (!item?.isChecked) {
                          if (item.status === "Accepted") {
                            return;
                          }
                          e.stopPropagation();
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
                  {item?.status !== "Pendin" && (
                    <span
                      className="p-2 cursor-pointer text-blue-500 hover:underline"
                      onClick={() => deletePost(item.id)}
                    >
                      Xóa
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reports && (
        <div className="">
          <Pagination admin count={reports?.count} posts={reports?.rows} />
        </div>
      )}
    </div>
  );
};

export default ManageReport;
