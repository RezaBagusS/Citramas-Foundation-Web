interface CustTagTittleProps {  
    text: string;
}

const CustTagTittle = ({text}:CustTagTittleProps) => {
    return (
        <div className="flex gap-3 justify-start items-center">
            <span className="h-2 w-20 rounded-full bg-custPrimary"></span>
            <h1 className="text-xl md:text-3xl whitespace-nowrap italic font-bold text-custPrimary">{text}</h1>
            <span className="h-2 w-full rounded-full bg-custPrimary"></span>
        </div>
    )
}

export default CustTagTittle;