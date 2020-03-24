import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
}/*like when we write this.state in constructor*/ 

const userReducer = (state=INITIAL_STATE,action)=>{/*we should set a specific action to return our new object*/
   switch(action.type){
     case UserActionTypes.SIGN_IN_SUCCESS: 
       return{
         ...state,
         currentUser: action.payload,
         error: null
       };/*we can't just modify like state.currentUser=action.payload because we must return new object to rerender*/
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return{
          ...state,
          currentUser: null,
          error: null
        }; 
      case UserActionTypes.SIGN_IN_FAILURE:
      case UserActionTypes.SIGN_OUT_FAILURE:
      case UserActionTypes.SIGN_UP_FAILURE:
        return{
            ...state,
            error: action.payload
          }
      default:
        return state;
   }
}

export default userReducer;