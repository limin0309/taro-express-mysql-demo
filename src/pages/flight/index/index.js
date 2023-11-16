import React, { useEffect, useState } from "react";

import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import Tab from "../../../components/Tab";
import "./index.scss";
import Taro from "@tarojs/taro";

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
  useEffect(() => {
    getLocationInfo();
  }, []);

  /**
   * 获取经纬度
   * @{param}
   */
  const getLocationInfo = () => {
    console.log("33", Taro);
  };
  return (
    <View className="flight-container">
      <View className="flight-top">
        <Tab
          tabList={FlIGHT_TABS}
          onTabClick={handleTabClick}
          className="flight-index-tab"
        >
          <SwiperItem>
            <View className="demo-text-1">1</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2">2</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3">3</View>
          </SwiperItem>
        </Tab>
      </View>
      <View className="alipay-swiper" style={{ margin: "15px" }}>
        <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
          {[
            {
              id: 1,
              imgUrl: "https://static.runoob.com/images/demo/demo2.jpg",
            },
            {
              id: 2,
              imgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5oaXiGqxZ8B_EZ-oI-vWFLeBrHQfxIKMPt71YYeQ&s",
            },
          ].map((item) => {
            return (
              <SwiperItem key={item.id} className="item">
                <Image className="img" src={item.imgUrl}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
}
