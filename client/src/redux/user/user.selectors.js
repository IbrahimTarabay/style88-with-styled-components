/*A selector is a function that accepts Redux state as an argument and returns data that is derived from that state. 
Selectors can provide performance optimizations to your application
 and can also help you encapsulate your global state tree. If your application is growing large and unwieldy,
 you may benefit from creating your own selectors or using a library such as Reselect*/

 /*this will make sure that our component
  is not getting rerender when the state changes that's unrelated to it*/
import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);