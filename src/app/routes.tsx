import { createBrowserRouter } from "react-router";
import Welcome from "./pages/Welcome";
import NewHome from "./pages/NewHome";
import Locals from "./pages/Locals";
import ParkingDetails from "./pages/ParkingDetails";
import Reservation from "./pages/Reservation";
import ReservationConfirmed from "./pages/ReservationConfirmed";
import CheckIn from "./pages/CheckIn";
import CheckInSuccess from "./pages/CheckInSuccess";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: NewHome,
  },
  {
    path: "/locals",
    Component: Locals,
  },
  {
    path: "/parking/:id",
    Component: ParkingDetails,
  },
  {
    path: "/reservation",
    Component: Reservation,
  },
  {
    path: "/reservation/confirmed",
    Component: ReservationConfirmed,
  },
  {
    path: "/checkin",
    Component: CheckIn,
  },
  {
    path: "/checkin/success",
    Component: CheckInSuccess,
  },
  {
    path: "/checkout",
    Component: CheckoutSuccess,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
