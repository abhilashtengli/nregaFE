import { Toaster } from "sonner";
import SimpleTestComponent from "./TestingPage";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <div className="">
        <SimpleTestComponent />
      </div>
    </>
  );
}

export default App;
