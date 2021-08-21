import { loadUser } from "../../actions/user";

describe("user action", () => {
  const actionTypeText = "LOAD_USER";

  const user = {
    name: "dilbert",
    username: "dbert",
    imgUrl: "http://dilbert.com",
    devMode: true,
  };

  const expectedAction = {
    type: actionTypeText,
    payload: user,
  };

  beforeEach(() => {
    return {
      actionTypeText,
      user,
      expectedAction,
    };
  });

  it("should create a load user action", () => {
    expect(loadUser(user)).toEqual(expectedAction);
  });

  it("should send the correct action type", () => {
    expect(expectedAction.type).toEqual(actionTypeText);
  });
});
