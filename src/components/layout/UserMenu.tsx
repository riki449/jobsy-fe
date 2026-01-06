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

export default function UserMenu() {
  const dispatch = useDispatch();
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
          <span className="text-sm">Kundebruger</span>
          <span className="rounded-md bg-lime-400 px-3 py-1 text-sm font-medium text-black">
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
        TU
      </div>
    </Dropdown>
  );
}
