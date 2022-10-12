import type { MenuProps } from "antd";
import React from "react";

import { TbBuildingWarehouse } from "react-icons/tb";
import { VscSymbolVariable } from "react-icons/vsc";
import { RiShieldUserFill } from "react-icons/ri";
import { BsBuilding } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import MenuItem from "antd/lib/menu/MenuItem";

const subNavKeys = ["Authentication", "Users", "Assets", "Units", "Companies"];

export const nav: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

export const sidenav: MenuProps["items"] = [
  RiShieldUserFill,
  FaUsers,
  VscSymbolVariable,
  TbBuildingWarehouse,
  BsBuilding,
].map((icon, index) => {
  const key = `sidenav${String(index + 1)}`;
  const label = subNavKeys[index];
  const reactIcon = React.createElement(icon);

  return {
    key,
    label,
    icon: reactIcon,

    children:
      label === "Authentication"
        ? ["Sign In", "Sign Out"].map((label, j) => {
            const subKey = index * 2 + j + 1;
            return {
              key: subKey,
              label,
            };
          })
        : ["Create", "Search All", "Search by Id", "Update", "Delete"].map((label, j) => {
            const subKey = index * 5 + j + 1;
            return {
              key: subKey,
              label,
            };
          }),
  };
});

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as unknown as MenuItem;
}
