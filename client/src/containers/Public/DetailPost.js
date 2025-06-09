import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "../../components";
import {
  BoxInfo,
  RelatedPost,
  VoteAndComment,
  VoteOption,
  QuestionAndAnswer,
  Report,
  Map,
} from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { apiGetPost } from "../../services/post";
import { useSelector } from "react-redux";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAP_API);
Geocode.setLanguage("vi");

const {
  HiLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  BsStopwatch,
  BsHash,
  MdReportProblem,
} = icons;

const DetailPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isVote, setIsVote] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [render, setRender] = useState(false);
  const [isReport, setIsReport] = useState(null);
  const [coords, setCoords] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await apiGetPost(postId);
      if (response?.data?.err === 0) setPost(response.data.response);
    };
    fetchPost();
    console.log(post)
  }, []);
  // useEffect(() => {
  //     if (post && post.address) {
  //         Geocode.fromAddress(post.address).then(
  //             (response) => {
  //                 const { lat, lng } = response.results[0].geometry.location;
  //                 setCoords({ lat, lng })
  //             },
  //             (error) => {
  //                 console.error(error);
  //             }
  //         );
  //     }
  // }, [post])
  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${post?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: post?.labelData?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div className="w-full flex gap-4 relative">
      {isVote && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay-30 flex items-center justify-center"
          onClick={() => setIsVote(false)}
        >
          <VoteOption pid={postId} setIsVote={setIsVote} />
        </div>
      )}
      {isReport && isReport?.id && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay-30 flex items-center justify-center"
          onClick={() => setIsReport(null)}
        >
          <Report
            pid={isReport?.id}
            setIsReport={setIsReport}
            title={isReport?.title}
            uid={isReport?.userId.id}
          />
        </div>
      )}
      <div className="w-[70%]">
        <Slider images={post?.images && JSON.parse(post?.images?.image)} />
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-red-600 flex flex-col gap-2">
              <span>{post?.title}</span>
              {post?.status === "RENTED" && (
                <span className="w-fit text-xs p-2 px-4 inline-block bg-sky-600 text-white font-semibold">
                  Đã cho thuê
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <span>Chuyên mục:</span>
              <span
                className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer"
                onClick={handleFilterLabel}
              >
                {post?.labelCode?.value}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker color="#2563eb" />
              <span>{post?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <TbReportMoney />
                <span className="font-semibold text-lg text-green-600">
                  {post?.attributesId?.price}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <RiCrop2Line />
                <span>{post?.attributesId?.acreage}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsStopwatch />
                <span>{post?.attributesId?.published}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsHash />
                <span>{post?.attributesId?.hashtag}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsReport(post)}
              className="flex items-center gap-2 text-sm bg-red-800 text-white p-2 w-fit"
            >
              <MdReportProblem />
              <span className="">Report bài đăng</span>
            </button>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {post?.description &&
                (() => {
                  let descriptionContent;
                  try {
                    // Attempt to parse the description as JSON
                    descriptionContent = JSON.parse(post.description);

                    // If it's an array, map over it; otherwise, treat it as a single string
                    if (Array.isArray(descriptionContent)) {
                      return descriptionContent.map((item, index) => (
                        <span key={index}>{item}</span>
                      ));
                    } else {
                      // If it's a simple string, just render it directly
                      return <span>{descriptionContent}</span>;
                    }
                  } catch (error) {
                    // If parsing fails, treat description as a simple string
                    return <span>{post.description}</span>;
                  }
                })()}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-2">Mã tin</td>
                  <td className="p-2">{post?.overviewId?.code}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Khu vực</td>
                  <td className="p-2">{post?.overviewId?.area}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Loại tin rao</td>
                  <td className="p-2">{post?.overviewId?.type}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Đối tượng</td>
                  <td className="p-2">{post?.overviewId?.target}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Gói tin</td>
                  <td className="p-2">{post?.overviewId?.bonus}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Ngày đăng</td>
                  <td className="p-2">{post?.overviewId?.created}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Ngày hết hạn</td>
                  <td className="p-2">{post?.overviewId?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-2">Liên hệ</td>
                  <td className="p-2">{post?.userId?.name}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-2">Điện thoại</td>
                  <td className="p-2">{post?.userId?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Zalo</td>
                  <td className="p-2">{post?.userId?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className='w-full h-[300px]'>
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            coords={coords}
                        />
                    </div> */}
        </div>
        <div className="mt-4">
          <VoteAndComment
            votes={post?.votes || []}
            star={post?.star}
            setIsVote={setIsVote}
          />
        </div>
        {!isLoggedIn ? (
          <div className="shadow-md border rounded-md bg-white p-[10px]">
            <h3 className="font-bold text-[20px]">Hỏi & đáp</h3>
            <span className="py-4">
              Bạn muốn bình luận cho bài đăng này?{" "}
              <Link
                to={`/${path.LOGIN}`}
                className="text-blue-500 hover:underline"
              >
                Đi tới đăng nhập nào
              </Link>
            </span>
          </div>
        ) : (
          <QuestionAndAnswer
            comments={post?.comments}
            pid={postId}
            setRender={setRender}
          />
        )}
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <BoxInfo userData={post?.userId} />
        {/* <RelatedPost /> */}
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPost;
