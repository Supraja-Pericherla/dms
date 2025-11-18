import { SettingOutlined, TeamOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const UserRolePage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState("");

  const roles = [
    {
      key: "1",
      name: "Admin",
      color: "#ff4d4f",
      icon: <SettingOutlined style={{ fontSize: 36, color: "#ff4d4f" }} />,
      description: "Full access to manage users, content, and system settings.",
      permissions: ["Create", "Edit", "Delete", "View"],
    },
    {
      key: "2",
      name: "Member",
      color: "#1677ff",
      icon: <TeamOutlined style={{ fontSize: 36, color: "#1677ff" }} />,
      description:
        "Can add and edit content, but cannot modify system settings.",
      permissions: ["Edit", "View"],
    },
    {
      key: "3",
      name: "Viewer",
      color: "#52c41a",
      icon: <EyeOutlined style={{ fontSize: 36, color: "#52c41a" }} />,
      description: "Read-only access to view available data and reports.",
      permissions: ["View"],
    },
  ];

  const handleCardClick = (roleName) => {
    localStorage.setItem("selectedRole", roleName);

    navigate("/landing", { state: { role: roleName } });
  };

  return (
    <div className="role-page">
      <div className="role-header">
        <h1>Choose Your Role</h1>
        <p>
          Select your access level to manage documents with appropriate
          permissions. Each role has different capabilities and restrictions.
        </p>
      </div>

      <div className="role-grid">
        {roles.map((role) => (
          <div key={role.key} className="role-card-wrapper">
            <div
              className={`role-card ${
                hoveredCard === role.key ? "hovered" : ""
              }`}
              data-role={role.name}
              onClick={() => handleCardClick(role.name)}
              onMouseEnter={() => setHoveredCard(role.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="role-icon-wrapper">{role.icon}</div>
              <h3>{role.name}</h3>
              <p>{role.description}</p>

              <div className="role-perms">
                {role.permissions.map((perm) => (
                  <span key={perm} className="role-tag">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRolePage;
