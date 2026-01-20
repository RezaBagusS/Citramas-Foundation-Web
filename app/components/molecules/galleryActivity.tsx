import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOpenImage } from "@/app/redux/slices/reduxOpenImageSlices";

interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
}

const GalleryActivity = () => {
  const [loading, setLoading] = useState(false); // Default false, tunggu params
  const [dataImage, setDataImage] = useState<DataImage[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const titleParams = searchParams.get("title");
  const itemParams = searchParams.get("item");

  useEffect(() => {
    if (!itemParams || !titleParams) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/v1/imageActivity`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: itemParams }),
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setDataImage(data.data || []);
        setDesc(data.desc || "");
      } catch (err) {
        console.error(err);
        setError(true);
        setDataImage([]);
      } finally {
        // ❌ Hapus setTimeout
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchImages();
  }, [itemParams, titleParams, refresh]);

  const onClickImage = (url: string) => {
    dispatch(setOpenImage({ show: true, url: url }));
  };

  // Render Logic
  if (!titleParams) {
    return (
      <div className="w-full h-60 flex items-center justify-center text-gray-400 bg-gray-50 rounded border border-dashed border-gray-300">
        Please select an activity from the list
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Description Section */}
      {desc && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h5 className="text-sm font-semibold text-gray-800 mb-1">Description</h5>
          {loading ? (
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
          )}
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse w-full h-64 rounded-xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-red-500 mb-2">Failed to load images</p>
          <button
            onClick={() => setRefresh(true)}
            className="px-4 py-2 bg-custPrimary text-white text-sm rounded hover:bg-opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      ) : dataImage.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {dataImage.map((data) => (
            <div
              key={data.id}
              onClick={() => onClickImage(data.url)}
              className="relative break-inside-avoid group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={data.url}
                width={500}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Activity Gallery"
                loading="lazy"
              />
              {/* Overlay Hover Effect (Optional) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-lg">
          <span className="text-4xl mb-2">📷</span>
          <p>No images found for this activity</p>
        </div>
      )}
    </div>
  );
};

export default GalleryActivity;