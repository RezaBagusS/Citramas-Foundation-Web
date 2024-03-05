import Link from "next/link";

interface INews {
  data : {
    id: number;
    title: string;
    description: string;
    date: Date | null;
    note: string | null;
    path: string;
  }
}

const dataNews = {
  title: "15 Tahun Fokus di Olahraga Layar",
  description: "Deskripsi lainnya adalah ini deskripsi loh",
  date: "2024-03-05 21:28:15.006",
  path: "#",
  note: "(Kutipan berita Koran Sindo, Selasa 8 November 2016, ditulis oleh Zainal Abidin)",
};

const CustListNews = ({ data }:INews) => {
  
  const formatDate = (dateStr: Date | null) => {

    if (dateStr === null) {
      return "Unknown Date";
    }

    const dateObj = new Date(dateStr);
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-slate-100 border p-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <p className="text-xs italic">{formatDate(data.date)}</p>
      </div>
      <div className="py-1">
        <p className="text-sm font-normal text-gray-500">
          {data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description}
        </p>
      </div>
      <div className="flex justify-between items-end">
        <span className="text-xs">{data.note}</span>
        <Link
          href={"#"}
          className="text-xs px-4 py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default CustListNews;
