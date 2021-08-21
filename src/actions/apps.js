import axios from "axios";
import * as types from "./actionTypes";

export function loadApps(apps) {
  return {
    type: types.LOAD_APPS,
    payload: {
      apps,
    },
  };
}

export function selectApp(selected, bool) {
  return {
    type: types.SELECT_APP,
    payload: {
      app: {
        selected,
        appSelected: bool,
      },
    },
  };
}

export function loadFetchApps(url) {
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => dispatch(loadApps(response)))
      .catch((err) => console.log(err.toString()));
  };
}
