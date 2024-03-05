import { configureStore } from "@reduxjs/toolkit";
import keywordSearchReducers from "./slices/reduxKeywordSearchSlices";

const store = configureStore({
    reducer: {
        keywordSearch: keywordSearchReducers,
    },
    // middleware: [popupFunctionsMiddleware]
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;