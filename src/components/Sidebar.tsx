import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBolt,
  faUserGroup,
  faRectangleList,
  faGear,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const menuItems = [
    { label: "Reports", icon: faArrowTrendUp, id: "reports" },
    { label: "Library", icon: faBolt, id: "library" },
    { label: "People", icon: faUserGroup, id: "people" },
    { label: "Activities", icon: faRectangleList, id: "activities" },
  ];

  return (
    <aside className="w-43 h-full bg-white flex flex-col items-start py-4 px-3">
      {/* Logo */}
      <div className="mb-7">
        <img src="/logo-tesla.png" alt="Tesla Logo" className="h-5 ml-1" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 w-full">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center space-x-2 pl-3 pr-1 py-1.5 rounded-lg cursor-pointer ${
                activePage === item.id
                  ? "bg-blue-100 text-blue-500 font-medium" // Light blue background and text
                  : "hover:bg-gray-100 text-gray-700" // Gray hover for inactive items
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} className="text-sm" />
              <span className="text-xs">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Support Section */}
        <div className="w-full mt-10">
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide pl-3">
            Support
          </div>

          <nav className="space-y-2 w-full mt-2">
            <div className="flex items-center space-x-2 pl-3 pr-1 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FontAwesomeIcon icon={faLightbulb} className="text-sm" />
              <span className="text-xs">Get Started</span>
            </div>
            <div className="flex items-center space-x-2 pl-3 pr-1 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="text-sm" />
              <span className="text-xs">Settings</span>
            </div>
          </nav>
        </div>
      </nav>

      {/* User Info */}
      <div className="flex flex-col items-start w-full px-3 mt-4">
        <img src="/profile.jpg" className="w-10 h-10 rounded-full mb-2" />
        <p className="text-xs font-semibold text-gray-800">Umang Goyal</p>
        <p className="text-[10px] text-gray-500">goyalumang910@gmail.com</p>
      </div>
    </aside>
  );
};

export default Sidebar;
