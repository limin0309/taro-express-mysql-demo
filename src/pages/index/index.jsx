import React, { useEffect, useState } from "react";

import { View, Text } from "@tarojs/components";
import "./index.scss";
import FlightIndex from "../flight/index";
import NoExploit from "../../components/NoExploit";

const DEFAULT_TAB_LIST = [
  { title: "机票", tab: "flight", index: 0 },
  { title: "火车票", tab: "train", index: 1 },
  { title: "酒店", tab: "hotle", index: 2 },
  { title: "汽车票", tab: "bus", index: 3 },
];

export default function Index() {
  const [tabIndex, setTabIndex] = useState(0);

  const switchTab = (index) => {
    setTabIndex(index);
  };
  const innerStyle = {
    width: `${100 / DEFAULT_TAB_LIST.length}%`,
    transform: `translateX(${tabIndex * 100}%)`,
  };
  return (
    <View className="index-container">
      <View className="top">
        <View className="index-tab">
          {DEFAULT_TAB_LIST.map((item) => (
            <View
              key={item.tab}
              className={`index_tab_item ${item.tab} ${
                tabIndex === item.index ? "current" : ""
              }`}
              onClick={() => switchTab(item.index)}
            >
              {item.title}
            </View>
          ))}
        </View>
        <View className="scrollbar" style={innerStyle}></View>
      </View>
      {DEFAULT_TAB_LIST[tabIndex]["tab"] === "flight" ? (
        <FlightIndex />
      ) : (
        <NoExploit />
      )}
    </View>
  );
}
