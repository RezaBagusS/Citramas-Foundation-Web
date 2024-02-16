import Link from "next/link";

interface CustNavbarListProps {
    title: string;
    path: string;
}

const CustNavbarList = ({title, path}:CustNavbarListProps) => {
  return (
    <Link href={path} className="relative text-custWhite whitespace-nowrap hover:text-custWhite/70">
        <p>{title}</p>
        <span className="absolute -bottom-2 bg-custPrimary w-full h-1 rounded-full"></span>
    </Link>
  );
};

export default CustNavbarList;
