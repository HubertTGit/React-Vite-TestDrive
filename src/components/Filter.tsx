
type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};
export const Filter = (props: BoxProps) => {
    return (
        <div className=" md:py-5 md:pl-5 px-5 py-2 text-xs flex md:flex-col md:w-1/4 md:justify-start w-full flex-row justify-between">
            <h3 className=" text-sm font-semibold md:block hidden">Filter</h3>
            {props.children}
        </div>
    )
}