import { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  let active = useSelector((state: any) => state.activeActivity.data.show);

  const searchParams = useSearchParams();

  const titleParams = searchParams.get("title");

  const handleActive = (title: string) => {
    dispatch(setActive({ show: title }));
  };

  useEffect(() => {
    if (titleParams) {
      dispatch(setActive({ show: titleParams }));
    }
  }, [titleParams, dispatch]);

  const sortedDataTab = dataTab.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      {sortedDataTab.map((item, index) => {
        return (
          <CustTabActivity
            text={item.name}
            isActive={active}
            handleActive={handleActive}
            key={index}
          />
        );
      })}
    </>
  );
};

export default ActivityMenu;
