export const Tooltip = ({
    message, children
}) => {
    return (
        <div className="relative flex flex-col items-center group">
            {children}
            <div className="absolute bottom-0 flex flex-col items-center hidden p-4  mb-8 mr-52 w-96 group-hover:flex">
                <p className="relative z-10 p-2 text-xs leading-none border bg-white whitespace-no-wrap  shadow-lg rounded-md">{message}</p>
            </div>
        </div>
    );
};