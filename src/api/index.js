import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
const baseUrl = "https://swapi.dev/api/people/";
const alerter = (
  title = "Message",
  message = "Hi, I am the default alerter.",
  refresh = false
) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Close",
        onClick: () => {
          if (refresh) window.location.reload();
        },
      },
    ],
  });
};
const handleError = (error) => {
  let err = {
    status: "",
    message:
      "Failed to receive response from the server. Please try again later or contact support.",
  };

  if (error && error.response && error.response.status && error.response.data) {
    err.status = error.response.status ?? "";
    err.message = error.response.data.error ?? "";

    console.error(error.response);
    alerter("", err.message);
  } else {
    alerter("Something went wrong", err.message);
  }

  return null;
};
const getData = async (page = 1) => {
  let Response = await axios.get(`${baseUrl}?page=${page}`).catch(handleError);
  return Response.data;
};

export default getData;
