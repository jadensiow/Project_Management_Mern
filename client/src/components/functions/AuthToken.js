import axios from "axios";

const AuthToken = (token) => {
  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default AuthToken;
