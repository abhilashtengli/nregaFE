"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Lock, ArrowLeft } from "lucide-react";
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
import Header from "@/components/Header";

// Form validation schema
const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "Password must contain uppercase, lowercase, number and special character"
    })
});

interface FormErrors {
  [key: string]: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  code: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resendCodeLoader, setResendCodeLLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  //   Check if email is provided in URL params or redirect
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setFormData((prev) => ({ ...prev, email: emailFromParams }));
    } else {
      // If no email provided, redirect to forgot password page
      toast.error("Email required", {
        description: "Please provide your email address first."
      });
      navigate("/forgot-password");
    }
  }, [location.search, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // For code input, only allow numbers and limit to 6 digits
    if (name === "code") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

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
      resetPasswordSchema.parse(formData);
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
      const response = await axios.post<ResetPasswordResponse>(
        `${Base_Url}/forget-password-verify-code`,
        {
          email: formData.email.trim(),
          code: formData.code,
          newPassword: formData.newPassword
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
        // Handle success
        switch (data.code) {
          case "PASSWORD_UPDATED":
            toast.success("Password updated successfully!", {
              description: data.message
            });
            // Redirect to signin page after successful password reset
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
            break;
          default:
            toast.success("Success", {
              description: data.message
            });
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        const errorCode = backendData.code;
        const errorMsg = backendData.message;

        setFormError(errorMsg);

        // Handle specific error codes from backend
        switch (errorCode) {
          case "EMAIL_REQUIRED":
            toast.error("Email Required", {
              description: errorMsg
            });
            break;
          case "CODE_REQUIRED":
            toast.error("Code Required", {
              description: errorMsg
            });
            break;
          case "NEW_PASSWORD_REQUIRED":
            toast.error("Password Required", {
              description: errorMsg
            });
            break;
          case "INVALID_CREDENTIALS":
            toast.error("Invalid Credentials", {
              description: errorMsg
            });
            break;
          case "VERIFICATION_CODE_REQUESTED":
            toast.info("Request Processed", {
              description: errorMsg
            });
            break;
          case "VERIFICATION_CODE_MISSING":
            toast.error("Code Missing", {
              description: errorMsg
            });
            break;
          case "VERIFICATION_EXPIRY_MISSING":
            toast.error("Verification Error", {
              description: errorMsg
            });
            break;
          case "VERIFICATION_CODE_EXPIRED":
            toast.error("Code Expired", {
              description: errorMsg
            });
            break;
          case "INVALID_VERIFICATION_CODE":
            toast.error("Invalid Code", {
              description: errorMsg
            });
            break;
          case "WEAK_REQUIRED":
            toast.error("Weak Password", {
              description: errorMsg
            });
            break;
          case "INTERNAL_SERVER_ERROR":
            toast.error("Server Error", {
              description: errorMsg
            });
            break;
          default:
            toast.error("Reset Failed", {
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

  const handleResendCode = async (): Promise<void> => {
    if (!formData.email) {
      toast.error("Email required", {
        description: "Please provide your email address."
      });
      return;
    }
    setResendCodeLLoader(true);

    try {
      const response = await axios.post(
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
        toast.success("Reset code sent!", {
          description: "Please check your email for the new code."
        });
      }
    } catch (error) {
      console.error("Resend code error:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        toast.error("Failed to send code", {
          description: backendData.message || "Please try again later."
        });
      } else {
        toast.error("Failed to send code", {
          description: "Please try again later."
        });
      }
    } finally {
      setResendCodeLLoader(false);
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-r from-blue-100 via-violet-50 to-white px-2">
      <Header />

      <div className="h-[80%] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter the verification code and your new password
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
                <Label htmlFor="code">
                  Verification Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={formData.code}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`text-center text-lg tracking-widest ${
                    formErrors.code ? "border-red-500" : ""
                  }`}
                  required
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                {formErrors.code && (
                  <p className="text-sm text-red-500">{formErrors.code}</p>
                )}
                <p className="text-xs text-gray-500 text-center">
                  Check your email for the 6-digit reset code
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  New Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={formErrors.newPassword ? "border-red-500" : ""}
                    required
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute cursor-pointer right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                {formErrors.newPassword && (
                  <p className="text-sm text-red-500">
                    {formErrors.newPassword}
                  </p>
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
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent cursor-pointer"
                onClick={handleResendCode}
                disabled={resendCodeLoader}
              >
                {resendCodeLoader ? "Sending..." : "Resend Reset Code"}
              </Button>

              <div className="text-center space-y-2">
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
