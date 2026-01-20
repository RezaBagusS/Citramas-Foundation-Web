"use client";

import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa6";

// Helper to combine classes
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const arrMonth: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarProps {
  data: {
    date: Date | string | null;
  }[];
}

const Calendar = ({ data }: CalendarProps) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(dayjs());

  // ✅ 1. Memoize Date Generation
  const calendarDays = useMemo(() => {
    const year = currentDate.year();
    const month = currentDate.month();
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDates = [];

    // Prefix dates
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      arrayOfDates.push({
        date: firstDateOfMonth.subtract(i + 1, "day"),
        currentMonth: false,
      });
    }
    // Reverse to get correct order for prefix
    arrayOfDates.reverse(); 

    // Current dates
    for (let i = 1; i <= lastDateOfMonth.date(); i++) {
      arrayOfDates.push({
        date: firstDateOfMonth.date(i),
        currentMonth: true,
      });
    }

    // Suffix dates (Fill up to 42 grids)
    const remaining = 42 - arrayOfDates.length;
    for (let i = 1; i <= remaining; i++) {
      arrayOfDates.push({
        date: lastDateOfMonth.add(i, "day"),
        currentMonth: false,
      });
    }

    return arrayOfDates;
  }, [currentDate]); // Only re-calculate when month changes

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  // ✅ 2. Safe Date Comparison (String vs String)
  const isNewsDay = (date: dayjs.Dayjs) => {
    return data.some((item) => {
      if (!item.date) return false;
      // Compare only YYYY-MM-DD to avoid timezone issues
      return dayjs(item.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
    });
  };

  const isToday = (date: dayjs.Dayjs) => {
    return date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  };

  return (
    <div className="bg-slate-100 rounded-md text-custBlack flex flex-col gap-5 p-5 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-base">
          {arrMonth[currentDate.month()]}, {currentDate.year()}
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-1 ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full hover:-translate-x-1 transition-all"
          >
            <FaChevronRight className="rotate-180 h-3 w-3" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full hover:translate-x-1 transition-all"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day) => (
          <div key={day} className="flex justify-center items-center text-xs font-bold text-gray-500">
            {day}
          </div>
        ))}

        {calendarDays.map(({ date, currentMonth }, index) => {
          const hasNews = isNewsDay(date);
          const today = isToday(date);

          return (
            <div key={index} className="flex justify-center items-center h-8">
              <div
                className={cn(
                  "h-7 w-7 text-xs rounded-full grid place-content-center transition-all cursor-default",
                  !currentMonth && "text-gray-300",
                  currentMonth && "text-gray-700",
                  // Priority Styling: Today > News > Normal
                  today && "bg-red-600 text-white font-bold shadow-md",
                  hasNews && !today && "bg-black text-white font-semibold",
                  !today && !hasNews && currentMonth && "hover:bg-gray-200"
                )}
              >
                {date.date()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;