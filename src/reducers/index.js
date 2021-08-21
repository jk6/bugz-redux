import { combineReducers } from "redux";
import { apps, app } from "./apps";
import { user } from "./user";
import { tickets, ticket } from "./tickets";
import { comments } from "./comments";
import { showTicketModal } from "./modals";

export default combineReducers({
  apps,
  user,
  tickets,
  comments,
  app,
  ticket,
  showTicketModal,
});
