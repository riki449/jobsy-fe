"use client";

import { useAuthModal } from "@/src/components/layout/AuthModalContext";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useAuthStore } from "@/src/features/auth/store/authStore";
import { UserType } from "@/src/features/auth/types";
import { getUserName } from "@/src/utils/utils";
import {
  CustomerServiceOutlined,
  LogoutOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

export default function UserAvatarMenu() {
  const { logout } = useAuthStore();
  const { accountName, userType } = useAuth();
  const isCompany = userType === UserType.COMPANY;
  const userName = getUserName(accountName || "")?.slice(1) || "-";
  const { openLogin } = useAuthModal();

  const activeStyle =
    "rounded-md bg-lime-400 px-3 py-1 text-sm font-medium text-black cursor-not-allowed";
  const inactiveStyle = "text-sm";

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
      onClick: () => {
        // Add support link logic
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log ud",
      danger: true,
      onClick: () => {
        logout();
        // Force reload or redirect to ensure clean state if needed
        window.location.href = "/login";
      },
    },
    { type: "divider" },

    {
      key: "switch",
      label: (
        <div className="flex items-center justify-between gap-2">
          <span
            className={isCompany ? inactiveStyle : activeStyle}
            onClick={() => {
              if (!isCompany) return;
              openLogin();
            }}
          >
            Kundebruger
          </span>
          <span
            className={isCompany ? activeStyle : inactiveStyle}
            onClick={() => {
              if (isCompany) return;
              openLogin();
            }}
          >
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
      <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-sm font-medium select-none">
        {userName}
        {/* Optional: Add an arrow icon here if requested */}
      </div>
    </Dropdown>
  );
}
