import { createBrowserRouter } from "react-router-dom";
import AiBattleArena from "./ui/AiBattleArena";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AiBattleArena />,
  },
]);

export default router;
