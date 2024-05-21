import React, { useState, useCallback } from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";

import { ProjectOutlined } from "@/components/icons";

const SideNav = () => {
  const [collapsed, toggleCollapsed] = useState(false);
  const invert = useCallback(() => toggleCollapsed(!collapsed), []);

  return (
    <Layout.Sider width={250} className="nav-bar" collapsible trigger={null} collapsed={collapsed} onCollapse={invert}>
      <Menu>
        <Menu.Item key="contracts" icon={<ProjectOutlined className="font-size-medium" />}>
          <Link className="font-size-medium" to="/contracts">
            Contracts
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideNav;
