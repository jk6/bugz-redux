import { toggleTicketModal } from "../../actions/modals";

describe("modals action", () => {
  const actionTypeText = "TOGGLE_TICKET_MODAL";
  const bool = true;

  const expectedAction = {
    type: actionTypeText,
    payload: bool,
  };

  beforeEach(() => {
    return {
      bool,
      expectedAction,
    };
  });

  it("should send the correct action type", () => {
    expect(expectedAction.type).toEqual(actionTypeText);
  });

  it("should send the correct new value in the payload", () => {
    expect(toggleTicketModal(bool)).toEqual(expectedAction);
  });
});
