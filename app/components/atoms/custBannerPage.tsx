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
        <div className="md:h-80 w-full relative bg-[#f5f2f2]">
            <div className="cust-container absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 lg:left-0 lg:relative z-30 flex flex-col justify-center h-full">
                <div className="flex flex-col items-center md:items-start gap-3">
                    <span className="text-custPrimary bg-white px-3 py-1 lg:py-0 lg:px-0 lg:bg-transparent w-fit text-xl md:text-3xl lg:text-4xl font-semibold">{title}</span>
                    <span className="w-10/12 md:w-1/2 lg:w-1/3 px-3 py-1 lg:py-0 lg:px-0 text-[10px] sm:text-sm md:text-base text-custBlack/70 bg-white lg:bg-transparent">
                        {desc}
                    </span>
                </div>
            </div>
            <div className="lg:absolute right-0 top-0 lg:w-1/2 h-full overflow-hidden rounded-tl-[0%] rounded-bl-[60%]"
                style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
            >
                <Image src={img} alt="banner" className="object-cover" />
            </div>
        </div>
    )
}

export default CustBannerPage;