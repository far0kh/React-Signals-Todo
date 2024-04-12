import { setInputValue } from "./Todos";

const Sidebar = () => {
  console.log("Sidebar rerendered")
  return (
    <div className="sidebar">
      <nav className="nav">
        <h4 className="nav-title">Default Tasks</h4>
        <ul className="nav-list">
          {new Array(9).fill(null).map((_item, index) => (
            <li className="nav-item" key={index} onClick={() => setInputValue(`Task ${index + 1}`)}>
              Task {index + 1}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
