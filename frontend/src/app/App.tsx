import { RouterProvider } from "react-router-dom";
import router from "./app.route";
import { AiProvider } from "./context/ai.context";

const App = () => {
  return (
    <AiProvider>
      <RouterProvider router={router} />
    </AiProvider>
  );
};
export default App;
