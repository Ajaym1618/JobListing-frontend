import {configureStore} from '@reduxjs/toolkit';
import userSignUpReducer from './UserSlices/signUpSlice';
import employSignUpReducer from './EmploySlices/signUpSlice';
import userDataReducer from './UserSlices/dataSlice';
import employDataReducer from './EmploySlices/dataSlice';
const store = configureStore({
    reducer:{
        userSignUp: userSignUpReducer,
        employSignUp: employSignUpReducer,
        getData: userDataReducer,
        employData:employDataReducer,
    }
})

export default store;