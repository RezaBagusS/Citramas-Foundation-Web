import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

interface dataActivityListState {
  id: number;
  id_activity: number;
  description: string;
  name: string;
}

const ActivityList = () => {
  const [dataActivityList, setDataActivityList] = useState<dataActivityListState[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil state dari URL dan Redux
  const active = useSelector((state: any) => state.activeActivity.data.show);
  const searchParams = useSearchParams();
  const itemSearch = searchParams.get("item");
  const router = useRouter();

  // Fetch Data List Activity
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/activityList`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: active }),
        });

        const data = await res.json();

        if (data.data && Array.isArray(data.data)) {
          // Sort data di sini atau gunakan useMemo nanti. 
          // Kita sort disini agar logic redirect di bawahnya akurat ambil index[0]
          const sorted = data.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
          setDataActivityList(sorted);

          // ✅ Logic Auto-Select Item Pertama
          // Hanya redirect jika TIDAK ADA item di URL, tapi listnya ada isinya
          if (!itemSearch && sorted.length > 0) {
            const firstItemSlug = sorted[0].name.replace(/ /g, "-").toLowerCase();
            const slugActive = active.replace(/ /g, "-").toLowerCase();
            router.replace(`/activity?title=${slugActive}&item=${firstItemSlug}`);
          }
        } else {
          setDataActivityList([]);
        }

      } catch (err) {
        console.error("Error fetching activity list:", err);
      } finally {
        // ❌ Hapus setTimeout agar responsif
        setLoading(false);
      }
    };

    if (active) {
      fetchData();
    }
  }, [active]); // Hapus dependency router/searchParams untuk fetch agar tidak loop

  const generateSlugActive = active ? active.replace(/ /g, "-").toLowerCase() : "";

  // Helper change URL
  const handleChangePage = (itemName: string) => {
    const slugItem = itemName.replace(/ /g, "-").toLowerCase();
    router.push(`/activity?title=${generateSlugActive}&item=${slugItem}`);
    // ❌ Hapus window.scrollTo agar UX mobile lebih nyaman
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangePage(e.target.value); // Value option sebaiknya nama asli atau slug konsisten
  };

  // Tentukan selected item untuk dropdown
  // Cari item yang slug-nya cocok dengan itemSearch
  const currentSelectedName = useMemo(() => {
    if (!itemSearch) return "";
    const found = dataActivityList.find(i => i.name.replace(/ /g, "-").toLowerCase() === itemSearch);
    return found ? found.name : "";
  }, [dataActivityList, itemSearch]);


  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-custPrimary"></div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-2 text-sm p-3">
        {dataActivityList.length === 0 ? (
          <p className="text-gray-500 italic">Data activity not found</p>
        ) : (
          dataActivityList.map((item, index) => {
            const lowerItem = item.name.replace(/ /g, "-").toLowerCase();
            const isActive = itemSearch === lowerItem;

            return (
              <button
                key={item.id || index}
                onClick={() => handleChangePage(item.name)}
                className={`text-left px-2 py-1.5 rounded transition-all duration-200
                  ${isActive
                    ? "font-semibold text-custPrimary bg-blue-50 border-l-4 border-custPrimary"
                    : "font-normal text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                {item.name}
              </button>
            );
          })
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex gap-2 p-3">
        <select
          value={currentSelectedName}
          onChange={(e) => {
            // Cari item asli berdasarkan value name
            handleChangePage(e.target.value);
          }}
          className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-custPrimary bg-white"
        >
          {dataActivityList.length === 0 ? (
            <option disabled>Data not found</option>
          ) : (
            <>
              <option value="" disabled>Select Activity</option>
              {dataActivityList.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </>
  );
};

export default ActivityList;