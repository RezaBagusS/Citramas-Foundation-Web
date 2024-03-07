"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import getDataImage from "@/app/helpers/getDataImage";
import { useDispatch } from "react-redux";
import { setOpenImage } from "@/app/redux/slices/reduxOpenImageSlices";

interface GalleryActivityProps {
  dataActivityList: {
    id: number;
    id_activity: number;
    name: string;
    createdAt: Date;
  }[];
}

interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
  createdAt: Date;
}
[];

const GalleryActivity = ({ dataActivityList }: GalleryActivityProps) => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<DataImage[]>([]);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const titleParams = searchParams.get("title");
  const itemParams = searchParams.get("item");

  const getActivityList = dataActivityList.filter((item) => {
    return item.name.replace(/ /g, "-").toLowerCase() == itemParams;
  });

  const getImage = async () => {
    const dataImage = await getDataImage(getActivityList[0].id);

    if (dataImage.length > 0) {
      setFilteredData(dataImage);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    titleParams ? getImage() : setLoading(false);
  }, [itemParams,titleParams]);

  const onClickImage = (url: string) => {
    dispatch(
      setOpenImage({
        show: true,
        url: url,
      })
    );
  };

  return (
    <>
      <h3 className="p-3 border-b-2 text-lg font-medium">
        Gallery :
        <span className="ms-2 text-sm font-normal text-gray-700">
          {`
        ${
          titleParams
            ? `${titleParams} - ${itemParams?.replace(/-/g, " ")}`
            : "Please select list activity first ..."
        }
      `}
        </span>
      </h3>
      <div className="w-full h-full">
        {
            !titleParams ? (
                <span className="p-3 text-xs text-red-400">
                    *No one activity selected, please select activity on Activity List
                </span>
            ) : loading ? (
                <div className="columns-2 md:columns-3 lg:columns-4 mt-10">
                <div className="bg-slate-400 my-2 md:my-0 animate-pulse w-full h-[350px]"></div>
                <div className="bg-slate-400 my-2 md:my-0 animate-pulse w-full h-[350px]"></div>
                </div>
            ) : filteredData.length == 0 ? (
          <div className="w-full py-10">
            <p className="text-center text-gray-700 text-lg font-semibold">
              image not found in this activity ...
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 mt-10">
            {filteredData.map((data) => {
              return (
                <div key={data.id} className="py-2">
                  <div
                    onClick={() => onClickImage(data.url)}
                    className="relative w-full cursor-pointer h-fit rounded-xl overflow-hidden shadow-[0px_0px_2px_rgba(0,0,0,0.3)]"
                  >
                  <Image src={data.url} className="w-full h-full object-cover object-center" alt="MissingIMG" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryActivity;
