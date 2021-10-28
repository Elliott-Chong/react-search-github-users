import React, { useState } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
// - [Root Endpoint](https://api.github.com)
// - [Get User](https://api.github.com/users/wesbos)
// - [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
// - [Followers](https://api.github.com/users/john-smilga/followers)
// - [Rate Limit](https://api.github.com/rate_limit)
const GithubContext = React.createContext();

export const GithubProvider = ({ children }) => {
  const [githubUser, setgithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const [searchLeft, setSearchLeft] = useState(0);

  const checkRate = async () => {
    let wha = await fetch("https://api.github.com/rate_limit");
    let response = await wha.json();
    console.log(response);
    setSearchLeft(response.rate.remaining);
    console.log(response.rate.remaining);
    if (response.rate.remaining === 0) {
      setError({ show: true, msg: "no more search left" });
    }
  };

  const fetchUser = async (user) => {
    checkRate();
    setError({ show: false, msg: "" });
    setLoading(true);
    let yes = await fetch(`https://api.github.com/users/${user}`);
    let response = await yes.json();
    if (response.message === "Not Found") {
      setError({ show: true, msg: "no user found with that username" });
      setLoading(false);
      return;
    }
    setgithubUser(response);
    let yes1 = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100`
    );
    let response1 = await yes1.json();
    setRepos(response1);
    let yes2 = await fetch(`https://api.github.com/users/${user}/followers`);
    let response2 = await yes2.json();
    setFollowers(response2);
    setLoading(false);
  };

  React.useEffect(() => {
    checkRate();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        fetchUser,
        error,
        searchLeft,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export const useGlobalContext = () => {
  return React.useContext(GithubContext);
};
