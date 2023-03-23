import { Provider } from "react-redux";
import { store } from "entities/store";

export const WithStorage = (component: () => React.ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>;
