import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/actions/Action";
import Loading from "./Loading";

function Blog() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { reducer } = useSelector((state) => state);
  const { loading } = useSelector((state) => state.loading);

  // const loading = useSelector((loading) => loading);
  // console.log(state);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="Blog">
        <h1>Welcome to Blog</h1>

        <input
          type="text"
          className="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="Go" onClick={() => dispatch(getAllUsers(search))}>
          GO
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="Table">
          {reducer.users?.map((user) => {
            return (
              <div key={user.id} className="TableData">
                <h2>Name: {user.name}</h2>
                <h2>Username: {user.username}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Site: {user.website}</h2>

                <h2>Address: {user.address.street}</h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Blog;
