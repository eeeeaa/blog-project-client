import { useDataGet } from "../common/urlFetcher";
import { useState } from "react";
import { User } from "../../model/userUiModel";
const userUri = `${import.meta.env.VITE_BLOG_API_URL}/users`;

//TODO add create, update, and delete user

export const useGetUsers = () => {
  const { data, error, loading } = useDataGet(userUri);
  const [users, setUsers] = useState([]);
  if (data) {
    setUsers(data.users.map((val) => new User(val.username)));
  }

  return { users, error, loading };
};

export const useGetOneUser = (userId) => {
  const { data, error, loading } = useDataGet(`${userUri}/${userId}`);
  const [user, setUser] = useState(null);
  if (data) {
    setUser(data.user.username);
  }
  return { user, error, loading };
};
