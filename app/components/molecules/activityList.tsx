import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

interface dataActivityListState {
  id: number;
  id_activity: number;
  description: string;
  name: string;
}

const ActivityList = () => {
  const [dataActivityList, setDataActivityList] = useState<dataActivityListState[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>(useSearchParams().get("item") || "");
  const active = useSelector((state: any) => state.activeActivity.data.show);
  const [loading, setLoading] = useState(true);
  const location = useRouter();

  let titleSearch = useSearchParams().get("title");
  let itemSearch = useSearchParams().get("item");

  useEffect(() => {

    setLoading(true);

    const getDataActivityList = fetch(`/api/v1/activityList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        active: active,
      }),
    });

    getDataActivityList.then((res) => {
      if (!res.ok) {
        console.log("Error: ", res.statusText);
      }
      return res.json();
    }).then((data) => {
      if (data.data) {
        const sortedData = data.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
        setSelectedItem(sortedData[0].name.replace(/ /g, "-").toLowerCase())
        setDataActivityList(sortedData);
      } else {
        setDataActivityList([]);
      }
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setTimeout(() => {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    });

  }, [active]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value)
  };

  const generateSlugActive = active.replace(/ /g, "-").toLowerCase();

  return (
    <>
      {
        loading ? (
          <>
            <div className="flex justify-center items-center h-fit py-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-custPrimary"></div>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex flex-col gap-4 text-xs md:text-sm p-3">
              {
                dataActivityList && dataActivityList.length == 0 ? (
                  <p className="text-gray-500">Data activity not found</p>
                ) :
                  dataActivityList.map((item, index) => {
                    const lowerItem = item.name.replace(/ /g, "-").toLowerCase();

                    return (
                      <span
                        // href={`?title=${generateSlugActive}&item=${lowerItem}`}
                        onClick={() => location.push('/activity?title=' + generateSlugActive + '&item=' + lowerItem)}
                        className={`cursor-pointer hover:text-gray-500 text-gray-800
                            ${itemSearch == lowerItem ? "font-semibold underline" : "font-normal"
                          }
                        `}
                        key={index}
                      >
                        {item.name}
                      </span>
                    );
                  })}
            </div>
            <div className="md:hidden flex gap-2">
              <select
                value={selectedItem}
                className="w-full text-sm sm:text-base p-1 mt-2"
                onChange={handleChange}
              >
                {
                  dataActivityList && dataActivityList.length == 0 ? (
                    <option value="" disabled>
                      Data activity not found
                    </option>
                  ) :
                    dataActivityList.map((item, index) => (
                      <option
                        key={index}
                        value={item.name.replace(/ /g, "-").toLowerCase()}
                      >
                        {item.name}
                      </option>
                    ))}
                <option value="" disabled>
                  Select Activity
                </option>
              </select>
              <button
                onClick={
                  () => location.push('/activity?title=' + generateSlugActive + '&item=' + selectedItem)
                }
                className="md:hidden w-fit text-sm sm:text-base py-1 px-3 mt-2 bg-custPrimary text-white"
              >
                Go
              </button>
            </div>
          </>
        )
      }
    </>
  );
};

export default ActivityList;
