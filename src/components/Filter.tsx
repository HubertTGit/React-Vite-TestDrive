
type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};
export const Filter = (props: BoxProps) => {


    return (
        <div className="shrink-0">
            <h3>Filter</h3>
            {props.children}
        </div>
    )
}