import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Body from "./pages/Body";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors closeButton duration={3000} />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
