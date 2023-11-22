import { PureComponent, useEffect, useState } from "react";

import Taro from "@tarojs/taro";
import { connect, useDispatch } from "react-redux";
import { View, Text } from "@tarojs/components";

import "./index.scss";

// @connect(({ flightIndex }) => ({
//   ...flightIndex,
// }))

export default function CityItem(props) {
  const dispatch = useDispatch();

  // cityList:每个字母所包含的城市列表
  // label：字母
  const { cityList, label } = props;
  const onCityClick = (cityInfo) => {
    const { cityType } = props;
    const { cityId, cityName, airportName } = cityInfo;
    dispatch({
      type: "flightIndex/updateState",
      payload:
        cityType === "depart"
          ? {
              dptCityId: cityId,
              dptAirportName: airportName,
              dptCityName: cityName,
            }
          : {
              arrCityId: cityId,
              arrAirportName: airportName,
              arrCityName: cityName,
            },
    });
    // Taro.navigateBack();
  };

  return (
    <View className="list-item" id={label}>
      <Text className="label">{label}</Text>
      {cityList?.map((item) => {
        return (
          <View
            key={item.id}
            className="name"
            onClick={() => onCityClick(item)}
          >
            {`${item.cityName}（${item.airportName}）`}
          </View>
        );
      })}
    </View>
  );
}
