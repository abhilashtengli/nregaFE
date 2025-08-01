"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useAuthStore } from "@/stores/userAuthStore";
import { Base_Url } from "@/lib/constant";

// Form validation schema
const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

interface FormErrors {
  [key: string]: string;
}

interface SigninResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    email: string;
    isVerifiedEmail: boolean;
    role: string;
    sessionId: string;
    isAdminVerifiedUser: boolean;
  };
  message: string;
  code: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

export default function SigninPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setUser, isAuthenticated, clearError } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: string })?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear form error when user starts typing
    if (formError) {
      setFormError(null);
      clearError();
    }
  };

  const validateForm = (): boolean => {
    try {
      signinSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0]?.toString();
          if (path) {
            newErrors[path] = issue.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setFormError(null);
    clearError();

    try {
      const response = await axios.post<SigninResponse>(
        `${Base_Url}/signin`,
        {
          email: formData.email.trim(),
          password: formData.password
        },
        {
          timeout: 10000, // 10 second timeout
          withCredentials: true, // Important for cookies
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;

      if (data.success && data.data) {
        // Store user data
        setUser({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          isVerifiedEmail: data.data.isVerifiedEmail,
          isAdminVerifiedUser: data.data.isAdminVerifiedUser,
          sessionId: data.data.sessionId
        });

        toast.success("Signed in successfully", {
          description: `Welcome back, ${data.data.name}!`
        });

        // Navigate to dashboard
        const from =
          (location.state as { from?: string })?.from || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Signin error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        const errorCode = backendData.code;
        const errorMsg = backendData.message;

        setFormError(errorMsg);

        // Handle specific error codes from backend
        switch (errorCode) {
          case "INVALID_CREDENTIALS":
            toast.error("Invalid Credentials", {
              description: errorMsg
            });
            break;
          case "USER_NOT_VERIFIED":
            toast.error("Email verification required", {
              description: errorMsg
            });
            break;
          case "USER_NOT_VERIFIED_BY_ADMIN":
            toast.error("Account verification required", {
              description: errorMsg
            });
            break;
          case "NETWORK_ERROR":
            toast.error("Network Error", {
              description: errorMsg
            });
            break;
          case "TIMEOUT_ERROR":
            toast.error("Request Timeout", {
              description: errorMsg
            });
            break;
          case "DATABASE_ERROR":
            toast.error("Service Unavailable", {
              description: errorMsg
            });
            break;
          case "SIGNIN_FAILED":
            toast.error("Signin Failed", {
              description: errorMsg
            });
            break;
          default:
            toast.error("Signin Failed", {
              description: errorMsg || "An unexpected error occurred"
            });
        }
      } else {
        // Handle network errors or other axios errors
        const errorMessage =
          "Network error. Please check your internet connection.";
        setFormError(errorMessage);
        toast.error("Network Error", {
          description: errorMessage
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pt-8">
          <div className="flex items-center justify-center mb-2">
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className={formErrors.email ? "border-red-500" : ""}
                required
                autoComplete="email"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={formErrors.password ? "border-red-500" : ""}
                  required
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Account not verified?{" "}
                <Link
                  to="/request-verify-email"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Verify account
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
