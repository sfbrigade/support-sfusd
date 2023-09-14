// // Example for redux

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../store/slices/counterSlice";
// import { RootState } from "@/store/store";

// export default function CounterComponent() {
//   const count = useSelector((state: RootState) => state.counter);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <button onClick={() => dispatch(decrement())}>-</button>
//       {count}
//       <button onClick={() => dispatch(increment())}>+</button>
//     </div>
//   );
// }
