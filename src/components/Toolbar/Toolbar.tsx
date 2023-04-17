import './Toolbar.css';

type ToolbarProps = {
    children: React.ReactNode
}

const Toolbar = (props: ToolbarProps) => (
    <div className="toolbar">
       {props.children}
    </div>
);

export default Toolbar;