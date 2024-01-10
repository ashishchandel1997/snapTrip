import { useState } from "react";

const getUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};
export default function CurrentUser() {
  const [user, setUser] = useState(getUser());
  const saveUser = (data) => {
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };
  return {
    setUser: saveUser,
    user,
  };
}


