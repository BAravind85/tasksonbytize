import axios from "axios";

export const getAllUsers = (query) => async (dispatch) => {
  console.log("getAllUsers", { query });
  dispatch({ type: "LOADING", payload: true });
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    if (query) {
      const filterData = users.data.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      });
      dispatch({ type: "GET_ALL_USERS", payload: filterData });
    } else {
      dispatch({ type: "GET_ALL_USERS", payload: users.data });
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: true });
  }
};
