import type { MenuProps } from "antd";
import React from "react";

import { TbBuildingWarehouse } from "react-icons/tb";
import { VscSymbolVariable } from "react-icons/vsc";
import { RiShieldUserFill } from "react-icons/ri";
import { BsBuilding } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

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
  const key = `sub${String(index + 1)}`;
  const label = subNavKeys[index];
  const reactIcon = React.createElement(icon);

  return {
    key,
    label,
    icon: reactIcon,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
