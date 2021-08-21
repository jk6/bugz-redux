import { user } from "../../reducers/user";

describe("user reducer", () => {
  const userObj = {
    id: 1,
    name: "dilbert",
    username: "db3",
    imgUrl: "",
    devMode: true,
  };

  const action = {
    type: "LOAD_USER",
    payload: userObj,
  };

  beforeEach(() => {
    return {
      userObj,
      action,
    };
  });

  it("should return correct user state", () => {
    const initialState = {};
    const result = user(initialState, action);
    let expectedPropertyLength = Object.keys(action.payload).length;

    expect(result).toBe(action.payload);
    expect(result.name).toEqual(action.payload.name);
    expect(Object.keys(result)).toHaveLength(expectedPropertyLength);
  });

  it("should return default state when not given an existing action type", () => {
    const result = user({}, "SOME_UNKNOWN_TYPE");

    expect(result).toEqual({});
  });
});
