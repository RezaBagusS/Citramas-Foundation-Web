const SkeletonTab = () => {
    return Array.from({ length: 4 }).map((_, index) => {
        return (
            <div key={index}
                className={`relative w-full animate-pulse text-sm flex overflow-hidden items-center gap-5 p-8 z-30 bg-gray-200 border drop-shadow-sm rounded-md transition-all duration-150
                    
                `}
            >
            </div>
        )
    })
}

export default SkeletonTab