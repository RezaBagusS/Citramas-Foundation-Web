interface CustCardActivityProps {
    text: string;
}

const CustCardActivity = ({ text }: CustCardActivityProps) => {
    return (
        <div className="relative text-sm md:text-base lg:text-xl bg-custWhite/80 hover:bg-slate-200/70 group overflow-hidden cursor-pointer grid place-content-center transition-all duration-150 px-3 md:px-5 py-3 md:py-4 ring-2 ring-custPrimary/30">
            <p className="text-gray-700 font-medium text-start">
                {text}
            </p>
            <span className="absolute grid place-content-center text-custWhite w-11/12 -right-full transition-all duration-300 group-hover:right-0 h-full bg-gray-700">
                See More {`>>`}
            </span>
        </div>
    );
}

export default CustCardActivity;