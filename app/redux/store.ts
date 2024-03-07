import { configureStore } from "@reduxjs/toolkit";
import keywordSearchReducers from "./slices/reduxKeywordSearchSlices";
import toasterReducers from "./slices/reduxToasterSlices";
import activeActivityReducers from "./slices/reduxActiveActivitySlices";
import openImageReducers from "./slices/reduxOpenImageSlices";
import mobileMenuReducers from "./slices/reduxMobileMenuSlices";

const store = configureStore({
    reducer: {
        keywordSearch: keywordSearchReducers,
        toaster: toasterReducers,
        activeActivity: activeActivityReducers,
        openImage: openImageReducers,
        mobileMenu: mobileMenuReducers,
    },
    // middleware: [popupFunctionsMiddleware]
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;