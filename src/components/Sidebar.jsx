import { Link } from 'react-router-dom'; // Ensure Link is imported

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">

          <li>
            <Link to="/app/payment">Personal</Link>
          </li>
          <li>
            <Link to="/app/employment">Employment</Link>
          </li>
          <li>
            <Link to="/app/income">Income</Link>
          </li>
          <li>
            <Link to="/app/nic-upload">Upload NIC</Link>
          </li>
          <li>
          <Link to="/app/expenses">Expenses</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;