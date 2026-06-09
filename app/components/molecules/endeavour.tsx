import CustCardEndeavour from "../atoms/custCardEndeavour";
import { MdOutlineHealthAndSafety, MdOutlineVolunteerActivism } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { RiUserVoiceLine, RiCommunityLine } from "react-icons/ri";
import { GiWhirlwind } from "react-icons/gi";

const dataEndeavour = [
    {
        title: "Health and Medical",
        icon: <MdOutlineHealthAndSafety className="w-12 h-12 pointer-events-none fill-custWhite" />,
        path: "/activity?title=health",
    },
    {
        title: "Education Apparatus",
        icon: <HiOutlineAcademicCap className="w-12 h-12 pointer-events-none stroke-custWhite" />,
        path: "/activity?title=education&item=english-language-for-children",
    },
    {
        title: "Physical Education and Training",
        icon: <MdOutlineVolunteerActivism className="w-12 h-12 pointer-events-none fill-custWhite" />,
        path: "/activity?title=education&item=professional-development-in-teaching-contextualised-english-for-teachers-sep-2025",
    },
    {
        title: "Vocational Skills Training",
        icon: <RiUserVoiceLine className="w-12 h-12 pointer-events-none fill-custWhite" />,
        path: "/activity?title=education&item=providing-educational-assistance-(august-2023)",
    },
    {
        title: "Local Community",
        icon: <RiCommunityLine className="w-12 h-12 pointer-events-none fill-custWhite" />,
        path: "/activity?title=social-community&item=bakti-sosial---pemeriksaan-balita-",
    },
    {
        title: "Disaster Relief",
        icon: <GiWhirlwind className="w-12 h-12 pointer-events-none fill-custWhite" />,
        path: "/activity?title=social-community&item=relief-for-padang-earthquake-victims",
    },
]

const Endeavour = () => {
    return (
        <div className="cust-container z-30 absolute -bottom-14 left-1/2 -translate-x-1/2 grid grid-cols-6 place-content-center rounded-lg overflow-hidden border-2 border-custWhite">
            {dataEndeavour.map((data, index) => {
                return (
                    <CustCardEndeavour key={index} title={data.title} icon={data.icon} path={data.path} />
                );
            })}
        </div>
    )
}

export default Endeavour;