import Image, { StaticImageData } from "next/image";

interface CustBannerPageProps {
    title: string;
    desc: string;
    img: StaticImageData;
}

const CustBannerPage = ({
    title, desc, img
}: CustBannerPageProps) => {
    return (
        <div className="h-80 w-full relative bg-[#f5f2f2]">
            <div className="cust-container flex flex-col gap-3 justify-center h-full">
                <h1 className="text-custPrimary text-xl md:text-3xl lg:text-4xl font-semibold">{title}</h1>
                <p className="w-1/3 text-xs sm:text-sm md:text-base text-custBlack/70">
                    {desc}
                </p>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden rounded-tl-[0%] rounded-bl-[60%]"
                style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
            >
                <Image src={img} alt="banner" className="object-cover" />
            </div>
        </div>
    )
}

export default CustBannerPage;