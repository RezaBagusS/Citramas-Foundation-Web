"use client";

import dayjs from "dayjs";
import formatDate from "dayjs";
import { useEffect, useState } from "react";
import chevron from "../../assets/icons/chevron.svg";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";

const arrMonth: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agustus",
  "September",
  "October",
  "November",
  "December",
];

const generateDate = (
  month = formatDate().month(),
  year = formatDate().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDates = [];

  // Generate pre-date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDates.push({
      date: firstDateOfMonth.subtract(i + 1, "day"),
      currentMonth: false,
    });
  }

  // Generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDate = firstDateOfMonth.date(i);
    arrayOfDates.push({
      date: currentDate,
      currentMonth: true,
      today: currentDate.isSame(dayjs(), "day"),
    });
  }

  const postDate = 42 - arrayOfDates.length;

  // Generate post-date
  for (let i = 1; i <= postDate; i++) {
    arrayOfDates.push({
      date: lastDateOfMonth.add(i, "day"),
      currentMonth: false,
    });
  }

  return arrayOfDates;
};

const anotherDay = (...clasess: Array<String>) => {
  return clasess.filter(Boolean).join(" ");
};

interface IBookingDetail {
  name?: string;
  phoneNumber?: string;
  instagram?: string;
  session?: string;
  date?: string;
}

interface LeftSideProps {
  data: {
    id: number;
    title: string;
    description: string;
    date: Date | null;
    note: string | null;
    path: string;
  }[];
}

const Calendar = ({ data }: LeftSideProps) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const prevDay = () => {
    setToday(today.month(today.month() - 1));
  };

  const nextDay = () => {
    setToday(today.month(today.month() + 1));
  };

  const isNewsDay = (date: dayjs.Dayjs) => {
    return data.some((item) => {
      const previous = dayjs(item.date).subtract(1, "day");
      return dayjs(previous).isSame(date, "day");
    });
  };

  return (
    <div className="bg-slate-100 rounded-md text-custBlack flex flex-col gap-5 p-5 w-full max-h-72">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-base">
          {arrMonth[today.month()]}, {today.year()}
        </h1>
        <div className="flex gap-2">
          <FaChevronRight
            className="rotate-180 cursor-pointer h-5 w-5 p-1 ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full grid place-content-center hover:-translate-x-1 transition-all ease-out"
            onClick={prevDay}
          />
          <FaChevronRight
            className="cursor-pointer h-5 w-5 p-1 ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full grid place-content-center hover:translate-x-1 transition-all ease-out"
            onClick={nextDay}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          return (
            <div
              key={index}
              className="flex justify-center items-center mb-2 text-sm font-bold"
            >
              <p>{day}</p>
            </div>
          );
        })}
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div key={index} className="flex justify-center items-center">
                <p
                  className={anotherDay(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    isNewsDay(date) ? "bg-black text-white" : "",
                    "h-6 w-6 text-xs rounded-full grid place-content-center hover:bg-black/70 hover:text-white cursor-pointer transition-all"
                  )}
                >
                  {date.date()}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendar;
