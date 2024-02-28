import Image from "next/image";
import banner from "@/app/assets/cs-contact.jpg"

const BannerContact = () => {
    return (
        <div className="h-80 w-full relative bg-[#f5f2f2]">
            <div className="cust-container flex flex-col gap-3 justify-center h-full">
                <h1 className="text-custPrimary text-xl md:text-3xl lg:text-4xl font-semibold">Get in touch</h1>
                <p className="w-1/3 text-xs sm:text-sm md:text-base text-custBlack/70">
                    We are here to help and answer any question you might have. We look forward to hearing from you.
                </p>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden rounded-tl-[0%] rounded-bl-[60%]"
                style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
            >
                <Image src={banner} alt="banner" layout="fill" objectFit="cover" />
            </div>
        </div>
    )
}

export default BannerContact;