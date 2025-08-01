import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Body from "./pages/Body";
import Home from "./pages/Home";
import SimpleTestComponent from "./TestingPage";
import { useAuthStore } from "./stores/userAuthStore";
import { useEffect } from "react";
import SignupPage from "./pages/auth/signup";
import SigninPage from "./pages/auth/signin";
import RequestVerifyEmailPage from "./pages/auth/request-email-verification";
import VerifyEmailPage from "./pages/auth/verify-email";
import ProtectedRoute from "./pages/auth/protectedRoute";
import FallbackRedirect from "./pages/auth/fallbackRedirect";

function App() {
  const { isAuthenticated, fetchUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [fetchUser, isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors closeButton duration={3000} />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/test" element={<SimpleTestComponent />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/request-verify-email"
              element={<RequestVerifyEmailPage />}
            />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<FallbackRedirect />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
