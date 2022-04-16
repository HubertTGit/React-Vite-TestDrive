
type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};
export const Filter = (props: BoxProps) => {


    return (
        <div className=" w-1/3 flex-auto border border-red-300">
            <h3>Filter</h3>
            {props.children}
        </div>
    )
}