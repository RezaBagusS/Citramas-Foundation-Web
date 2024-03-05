import { configureStore } from "@reduxjs/toolkit";
import keywordSearchReducers from "./slices/reduxKeywordSearchSlices";
import toasterReducers from "./slices/reduxToasterSlices";

const store = configureStore({
    reducer: {
        keywordSearch: keywordSearchReducers,
        toaster: toasterReducers
    },
    // middleware: [popupFunctionsMiddleware]
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;