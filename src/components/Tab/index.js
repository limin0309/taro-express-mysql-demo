import { View, Swiper } from "@tarojs/components";
import { PureComponent, useEffect, useState } from "react";

import "./index.scss";
// tabList = [
//   {
//     label: String,
//     id: Number,
//   }
// ]
export default function Tab(props) {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const { initTab } = props;

    if (initTab == undefined) {
      setCurrentId(tabList?.[0]?.["id"]);
    } else {
      setCurrentId(initTab);
    }
  }, []);

  const handleClick = (id) => {
    setCurrentId(id);
    props.onTabClick?.(id);
  };
  const handleChange = (e) => {
    const id = e.detail.current;
    setCurrentId(id);
    props.onChange?.(e); // 将当前id传递到外部
  };
  const { className, tabList, children } = props;

  const innerStyle = {
    width: `${100 / tabList?.length}%`,
    transform: `translateX(${currentId * 100}%)`,
  };
  return (
    <View className={`tab-container ${className}`}>
      {/* tab选项卡 */}
      <View className="tab-bar">
        {tabList?.map((item) => {
          return (
            <View
              className={`tab-item ${currentId === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </View>
          );
        })}
        <View className="scroll-bar" style={innerStyle}></View>
      </View>
      {/* 选项卡内容 */}
      <Swiper
        current={currentId}
        className="tab-content"
        onChange={handleChange}
      >
        {children}
      </Swiper>
    </View>
  );
}
