"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
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
import Header from "@/components/Header";

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

interface FormErrors {
  [key: string]: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  code: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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
      forgotPasswordSchema.parse(formData);
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

    try {
      const response = await axios.post<ForgotPasswordResponse>(
        `${Base_Url}/forgot-password`,
        {
          email: formData.email.trim()
        },
        {
          timeout: 10000,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;

      if (data.success) {
        // Handle specific success codes
        switch (data.code) {
          case "RESET_CODE_SENT":
            toast.success("Reset code sent!", {
              description: data.message
            });
            // Navigate to reset password page with email
            navigate(
              `/reset-password?email=${encodeURIComponent(formData.email)}`
            );
            break;
          case "VERIFICATION_CODE_REQUESTED":
            toast.info("Request processed", {
              description: data.message
            });
            // Still navigate to reset password page
            navigate(
              `/reset-password?email=${encodeURIComponent(formData.email)}`
            );
            break;
          default:
            toast.success("Success", {
              description: data.message
            });
            navigate(
              `/reset-password?email=${encodeURIComponent(formData.email)}`
            );
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        const errorCode = backendData.code;
        const errorMsg = backendData.message;

        setFormError(errorMsg);

        // Handle specific error codes from backend
        switch (errorCode) {
          case "EMAIL_MISSING_FIELD":
            toast.error("Email Required", {
              description: errorMsg
            });
            break;
          case "INVALID_EMAIL":
            toast.error("Invalid Email", {
              description: errorMsg
            });
            break;
          case "EMAIL_NOT_VERIFIED":
            toast.error("Email Not Verified", {
              description: errorMsg
            });
            break;
          case "USER_NOT_VERIFIED_BY_ADMIN":
            toast.error("Account Not Verified", {
              description: errorMsg
            });
            break;
          case "EMAIL_SEND_FAILED":
            toast.error("Email Send Failed", {
              description: errorMsg
            });
            break;
          case "INTERNAL_SERVER_ERROR":
            toast.error("Server Error", {
              description: errorMsg
            });
            break;
          default:
            toast.error("Request Failed", {
              description: errorMsg || "An unexpected error occurred"
            });
        }
      } else {
        // Handle network errors
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
    <div className="h-screen bg-gradient-to-r from-blue-100 via-violet-50 to-white px-2">
      <Header />

      <div className="h-[80%] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address to receive a password reset code
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
                <p className="text-xs text-gray-500">
                  We'll send a password reset code to this email address
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 mt-5">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Sending Reset Code..." : "Send Reset Code"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  {"Don't have an account? "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Sign up
                  </Link>
                </p>
                <Link
                  to="/signin"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
