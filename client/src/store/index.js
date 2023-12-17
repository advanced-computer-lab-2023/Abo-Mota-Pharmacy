import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { guestApi } from "./apis/guestApi.js";
import { pharmacistApi } from "./apis/pharmacistApi.js";
import { patientApi } from "./apis/patientApi.js";
import { adminApi } from "./apis/adminApi.js";
import { commonApi } from "./apis/commonApi";
import { stripeApi } from "./apis/stripeApi";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isAuthenticatedPharmacy", "userRolePharmacy"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    [guestApi.reducerPath]: guestApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [pharmacistApi.reducerPath]: pharmacistApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(guestApi.middleware)
      .concat(pharmacistApi.middleware)
      .concat(patientApi.middleware)
      .concat(adminApi.middleware)
      .concat(commonApi.middleware)
      .concat(stripeApi.middleware);
  },
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export {
  useRegisterPharmacistMutation,
  useRegisterPatientMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useRequestOtpMutation,
} from "./apis/guestApi";

export {
  useGetPharmacistQuery,
  useAddMedicineMutation,
  useEditMedicineMutation,
  useGetAllMedicinesQuery,
  useChangePharmacistPasswordMutation,
  useGetSalesReportsQuery,
  useArchiveMedicineMutation,
  useUnarchiveMedicineMutation,
} from "./apis/pharmacistApi";

export {
  useGetPatientQuery,
  useGetMedicinesQuery,
  useGetPharmacistsQuery,
  usePayByWalletMutation,
  useCreateOrderMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useAddDeliveryAddressMutation,
  useGetOrdersQuery,
  useChangePatientPasswordMutation,
  useCancelOrderMutation,
  useLinkWithClinicMutation,
  useUpdatePrescriptionsQuantityMutation,
} from "./apis/patientApi";

export {
  useFetchPharmacistsQuery,
  useFetchApplicationsQuery,
  useRemoveAdminMutation,
  useRemovePatientMutation,
  useRemovePharmacistMutation,
  useAddAdminMutation,
  useFetchPatientsQuery,
  useHandleApplicationMutation,
  useChangeAdminPasswordMutation,
} from "./apis/adminApi";

export {
  useSendNotificationMutation,
  useSendEmailMutation,
  useFetchNotificationQuery,
  useFetchLoggedInQuery,
} from "./apis/commonApi";

export { useCreatePaymentIntentMutation, useFetchStripeConfigQuery } from "./apis/stripeApi";

export { login, logout } from "./slices/userSlice.js";
