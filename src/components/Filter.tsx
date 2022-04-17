
type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};
export const Filter = (props: BoxProps) => {
    return (
        <div className="w-1/4 py-5 pl-5 text-xs">
            <h3 className=" text-sm font-semibold">Filter</h3>
            {props.children}
        </div>
    )
}