import React from "react";
import { Menu, Dropdown, Row, Typography, Space } from "antd";
import { DownOutlined } from "@/components/icons";
import { useTypedActionCreators, useTypedSelector } from "@/client-state/store";
import * as ducks from "@/client-state/ducks";

import "./style.module.less";

const TopNav = () => {
  const actionCreators = useTypedActionCreators();
  const user = useTypedSelector(ducks.userAccount.selectors.user);

  return (
    <>
      <Row className="top-nav">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  actionCreators.apiClient.clearAuthToken();
                }}
              >
                Sign out
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
        >
          <Space size={20} style={{ cursor: "pointer" }}>
            <Typography.Text>{user.email}</Typography.Text>
            <DownOutlined />
          </Space>
        </Dropdown>
      </Row>
    </>
  );
};

export default TopNav;
