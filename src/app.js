import { useLaunch } from "@tarojs/taro";
import "./app.scss";
import { Provider } from "react-redux";
import models from "./models";
import createApp from "./dva";

const dvaApp = createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
