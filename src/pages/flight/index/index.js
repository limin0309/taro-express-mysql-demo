import React, { useEffect, useState } from "react";

import { View, Text } from "@tarojs/components";
import Tab from "../../../components/Tab";
import "./index.scss";

const FlIGHT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "多程",
    id: 1,
  },
  {
    label: "往返",
    id: 2,
  },
];

const handleTabClick = (id) => {
  console.log(id);
};

export default function Flight() {
  return (
    <View className="flight-container">
      <View className="flight-top">
        <Tab tabList={FlIGHT_TABS} onTabClick={handleTabClick}></Tab>
      </View>
    </View>
  );
}
