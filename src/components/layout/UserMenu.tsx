"use client";

import { Dropdown, Menu } from "antd";
import {
  UserOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "@/src/store/authSlice";
import { useAuth } from "@/src/hooks/useAuth";
import { getUserName } from "@/src/utils/utils";
import { UserType } from "@/src/types/login";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { accountName, userType } = useAuth();
  const isCompany = userType === UserType.COMPANY;

  const activeStyle =
    "rounded-md bg-lime-400 px-3 py-1 text-sm font-medium text-black";
  const inactiveStyle = "text-sm";

  const userName = getUserName(accountName || "") || "-";

  const items: MenuProps["items"] = [
    {
      key: "plan",
      label: (
        <div className="flex items-center gap-2">
          <StarOutlined />
          <span>
            Basis{" "}
            <span className="text-green-600 font-semibold cursor-pointer">
              opgrader nu
            </span>
          </span>
        </div>
      ),
    },
    { type: "divider" },

    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Din profilsiden",
    },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: "Support",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log ud",
      danger: true,
      onClick: () => {
        dispatch(logout());
      },
    },
    { type: "divider" },

    {
      key: "switch",
      label: (
        <div className="flex items-center justify-between gap-2">
          <span className={isCompany ? inactiveStyle : activeStyle}>
            Kundebruger
          </span>
          <span className={isCompany ? activeStyle : inactiveStyle}>
            Firmabruger
          </span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      className="jobsy-user-dropdown"
    >
      <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-sm font-medium">
        {userName}
      </div>
    </Dropdown>
  );
}
