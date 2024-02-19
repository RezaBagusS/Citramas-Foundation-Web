import CustTagTittle from "../atoms/custTagTittle";
import Image from "next/image";
import bgActivity from "../../assets/bgActivity.jpg";
import CustCardActivity from "../atoms/custCardActivity";

const dataActivity = [
    "Health programs",
    "Education programs",
    "Social Community Programs",
    "Sports programs",
]

const Activity = () => {
    return (
        <div className="relative h-96 bg-black mb-10">
            <Image src={bgActivity} alt="hero" fill className="opacity-50 object-cover" />
            {/* <CustTagTittle text="Activity" /> */}
            <div className="cust-container absolute top-0 left-1/2 -translate-x-1/2 grid grid-cols-12 place-content-center h-full">
                <div className="h-52 col-span-3 grid place-content-center aspect-square mx-auto rounded-full ring-8 ring-custWhite/60">
                    <p className="text-white flex flex-col justify-center items-center">
                        <span className="text-6xl font-bold">40+</span>
                        <br />
                        <span className="text-sm font-semibold">Activities</span>
                    </p>
                </div>
                <div className="col-span-9">
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        {
                            dataActivity.map((item, index) => {
                                return (
                                    <CustCardActivity key={index} text={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity;