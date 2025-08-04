"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
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
import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import Header from "@/components/Header";

// Form validation schema matching backend
const signupValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "Password must contain uppercase, lowercase, number and special character"
    }),
  panchayatCode: z.string().min(1, { message: "Panchayat code is required" })
});

interface FormErrors {
  [key: string]: string;
}

interface SignupResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    email: string;
    role: string;
    panchayatCode: string;
  };
  message: string;
  code?: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
  errors?: unknown;
}

interface FetchError extends Error {
  status?: number;
  response?: {
    status: number;
    data?: ApiError;
  };
}

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    panchayatCode: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { isAuthenticated } = useAuthStore();

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
    }
  };

  const validateForm = (): boolean => {
    try {
      signupValidation.parse(formData);
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

  const getErrorMessage = (error: FetchError, data?: ApiError): string => {
    if (data?.message) {
      return data.message;
    }
    const status = error.response?.status || error.status;
    if (status === 409) {
      return "User already exists with this email address.";
    }
    if (status === 400) {
      return "Invalid input data. Please check all fields.";
    }
    if (status === 429) {
      return "Too many requests. Please try again later.";
    }
    if (status && status >= 500) {
      return "Server error. Please try again later.";
    }
    if (error.name === "TypeError" || !status) {
      return "Network error. Please check your internet connection.";
    }
    return "An unexpected error occurred. Please try again.";
  };

  const handleApiError = (data: ApiError): void => {
    switch (data.code) {
      case "VALIDATION_ERROR":
        toast.error("Validation Error", {
          description: "Please check all fields and try again."
        });
        break;
      case "INVALID":
        toast.error("User Already Exists", {
          description: "An account with this email already exists."
        });
        break;
      case "INVALID_PANCHAYAT_CODE":
        toast.error("Invalid Panchayat Code", {
          description: "Please enter a valid panchayat code."
        });
        break;
      case "EMAIL_SEND_FAILED":
        toast.warning("Account Created", {
          description:
            "Account created but verification email failed. Please contact support."
        });
        break;
      case "SIGNUP_FAILED":
        toast.error("Signup Failed", {
          description: "Unable to create account. Please try again later."
        });
        break;
      default:
        toast.error("Signup Failed", {
          description: data.message || "An unexpected error occurred."
        });
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

    try {
      const response = await axios.post<SignupResponse>(
        `${Base_Url}/signup`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          panchayatCode: formData.panchayatCode.trim()
        },
        {
          timeout: 15000, // 15 second timeout
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data: SignupResponse = response.data;

      if (data.success && data.data) {
        toast.success("Account Created Successfully!", {
          description: "Please check your email for verification code."
        });

        // Navigate to verification page with email
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        const errorMessage = data.message || "Signup failed. Please try again.";
        setFormError(errorMessage);

        if (data.code) {
          handleApiError({
            success: false,
            message: data.message,
            code: data.code
          });
        } else {
          toast.error("Signup Failed", {
            description: errorMessage
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      const fetchError = error as FetchError;
      const apiError = fetchError.response?.data;

      if (apiError && apiError.code) {
        handleApiError(apiError);
        setFormError(apiError.message);
      } else {
        const errorMessage = getErrorMessage(fetchError, apiError);
        setFormError(errorMessage);
        toast.error("Signup Failed", {
          description: errorMessage
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-l from-blue-100 via-violet-50 to-white px-2">
      <Header/>
      <div className="h-[80%]  flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex items-center justify-center mb-2">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Fill in the details to create your account
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
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={formErrors.name ? "border-red-500" : ""}
                  required
                  autoComplete="name"
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
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
                <Label htmlFor="panchayatCode">
                  Panchayat Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="panchayatCode"
                  name="panchayatCode"
                  type="text"
                  placeholder="Enter your panchayat code"
                  value={formData.panchayatCode}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={formErrors.panchayatCode ? "border-red-500" : ""}
                  required
                  autoComplete="off"
                />
                {formErrors.panchayatCode && (
                  <p className="text-sm text-red-500">
                    {formErrors.panchayatCode}
                  </p>
                )}
                <p className="text-[11px] tracking-wide text-gray-500">
                  Enter the valid panchayat code provided to you
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={formErrors.password ? "border-red-500" : ""}
                    required
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 cursor-pointer top-0 h-full px-3 py-2 hover:bg-transparent"
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
                <p className="text-[11px] tracking-wide text-gray-500">
                  Password must contain uppercase, lowercase, number and special
                  character
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Need to verify your email?{" "}
                  <Link
                    to="/request-verify-email"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Request verification code
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
