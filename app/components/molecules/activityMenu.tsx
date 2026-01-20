import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CustTabActivity from "../atoms/custTabActivity";
import { setActive } from "@/app/redux/slices/reduxActiveActivitySlices";
import { useDispatch, useSelector } from "react-redux";

interface DataTab {
  id: number;
  name: string;
  createdAt: Date;
}

interface ActivityMenuProps {
  dataTab: DataTab[];
}

const ActivityMenu = ({ dataTab }: ActivityMenuProps) => {
  const active = useSelector((state: any) => state.activeActivity.data.show);
  const searchParams = useSearchParams();
  const titleParams = searchParams.get("title");
  const dispatch = useDispatch();

  // Sync Redux dengan URL Params
  useEffect(() => {
    if (titleParams) {
      dispatch(setActive({ show: titleParams }));
    }
  }, [titleParams, dispatch]);

  const handleActive = (title: string) => {
    dispatch(setActive({ show: title }));
    // Note: Anda mungkin perlu menambahkan router.push disini jika CustTabActivity tidak mengubah URL
  };

  // ✅ Optimasi: useMemo untuk sorting
  const sortedDataTab = useMemo(() => {
    if (!dataTab) return [];
    return [...dataTab].sort((a, b) => a.name.localeCompare(b.name));
  }, [dataTab]);

  return (
    <>
      {sortedDataTab.map((item, index) => (
        <CustTabActivity
          text={item.name}
          isActive={active}
          handleActive={handleActive}
          key={item.id || index} // Gunakan ID jika ada
        />
      ))}
    </>
  );
};

export default ActivityMenu;