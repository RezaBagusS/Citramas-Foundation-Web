import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOpenImage } from "@/app/redux/slices/reduxOpenImageSlices";
import getDataImage from "@/app/helpers/getDataImage";


interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
}

const GalleryActivity = () => {
  const [loading, setLoading] = useState(true);
  const [dataImage, setDataImage] = useState<DataImage[]>([]);
  const [desc, setDesc] = useState<string>("");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const location = useRouter();

  const titleParams = searchParams.get("title");
  const itemParams = searchParams.get("item");

  useEffect(() => {
    if (!itemParams) {
      location.push("/activity?title=Health&item=eye-screening");
    }

    setLoading(true);

    const getImageActivityList = fetch(`/api/v1/imageActivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        item: itemParams,
      }),
    });

    getImageActivityList.then((res) => {
      return res.json();
    }).then((data) => {
      setDataImage(data.data);
      setDesc(data.desc);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [itemParams]);

  const onClickImage = (url: string) => {
    dispatch(setOpenImage({ show: true, url: url }));
  }

  return (
    <>
      <h3 className="p-3 border-b-2 text-lg font-medium">
        Gallery :
        <span className="ms-2 text-sm font-normal text-gray-700">
          {`
        ${titleParams
              ? `${titleParams} - ${itemParams?.replace(/-/g, " ")}`
              : "Please select list activity first ..."
            }
      `}
        </span>
      </h3>
      {desc && (
        <div className="w-full flex-col gap-1 p-3 flex items-start justify-center border-b-2">
          <h5 className="text-sm text-justify font-medium text-gray800">Description :</h5>
          <p className="text-sm text-justify text-gray-600">{desc}</p>
        </div>
      )}
      <div className="w-full h-full">
        {!titleParams ? (
          <span className="p-3 text-xs text-red-400">
            *No one activity selected, please select activity on Activity List
          </span>
        ) : loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 mt-10">
            <div className="bg-slate-400 my-2 md:my-0 animate-pulse w-full h-[350px]"></div>
            <div className="bg-slate-400 my-2 md:my-0 animate-pulse w-full h-[350px]"></div>
          </div>
        ) : dataImage.length > 0 ? (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 mt-10">
              {dataImage.map((data) => {
                return (
                  <div key={data.id} className="py-2">
                    <div
                      onClick={() => onClickImage(data.url)}
                      className="relative w-full cursor-pointer h-fit rounded-xl overflow-hidden shadow-[0px_0px_2px_rgba(0,0,0,0.3)]"
                    >
                      <Image
                        src={data.url}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover object-center"
                        alt="MissingIMG"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="w-full py-10">
            <p className="text-center text-gray-700 text-lg font-semibold">
              image not found in this activity ...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryActivity;
