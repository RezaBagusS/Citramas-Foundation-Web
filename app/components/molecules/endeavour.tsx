import CustCardEndeavour from "../atoms/custCardEndeavour";
import { MdOutlineHealthAndSafety, MdOutlineVolunteerActivism } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { RiUserVoiceLine, RiCommunityLine } from "react-icons/ri";
import { GiWhirlwind } from "react-icons/gi";

const dataEndeavour = [
    {
        title: "Health and Medical",
        icon: <MdOutlineHealthAndSafety className="w-12 h-12 pointer-events-none fill-custWhite" />,
    },
    {
        title: "Education Apparatus",
        icon: <HiOutlineAcademicCap className="w-12 h-12 pointer-events-none stroke-custWhite" />,
    },
    {
        title: "Physical Education and Training",
        icon: <MdOutlineVolunteerActivism className="w-12 h-12 pointer-events-none fill-custWhite" />,
    },
    {
        title: "Vocational Skills Training",
        icon: <RiUserVoiceLine className="w-12 h-12 pointer-events-none fill-custWhite" />,
    },
    {
        title: "Local Community",
        icon: <RiCommunityLine className="w-12 h-12 pointer-events-none fill-custWhite" />,
    },
    {
        title: "Disaster Relief",
        icon: <GiWhirlwind className="w-12 h-12 pointer-events-none fill-custWhite"/>,
    },
]

const Endeavour = () => {
    return (
        <div className="cust-container z-20 absolute -bottom-14 left-1/2 -translate-x-1/2 grid grid-cols-6 place-content-center rounded-lg overflow-hidden border-2 border-custWhite">
            {dataEndeavour.map((data, index) => {
                return (
                    <CustCardEndeavour key={index} title={data.title} icon={data.icon} />
                );
            })}
        </div>
    )
}

export default Endeavour;