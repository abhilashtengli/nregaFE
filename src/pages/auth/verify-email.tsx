import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
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

// Form validation schema
const verifyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits")
});

interface FormErrors {
  [key: string]: string;
}

interface VerifyEmailResponse {
  success: boolean;
  message: string;
  code: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

interface FetchError extends Error {
  status?: number;
  response?: {
    status: number;
    data?: ApiError;
  };
}

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    code: ""
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

  // Check if email is provided in URL params or redirect
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const emailFromParams = searchParams.get("email");
//     if (emailFromParams) {
//       setFormData((prev) => ({ ...prev, email: emailFromParams }));
//     } else {
//       // If no email provided, redirect to request verify email page
//       toast.error("Email required", {
//         description: "Please provide your email address first."
//       });
//       navigate("/request-verify-email");
//     }
//   }, [location.search, navigate]);

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
      verifyEmailSchema.parse(formData);
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
    if (status === 404) {
      return "User not found. Please check your email address.";
    }
    if (status === 400) {
      return "Invalid or expired verification code.";
    }
    if (status === 429) {
      return "Too many requests. Please try again later.";
    }
    if (status && status >= 500) {
      return "Server error. Please try again later.";
    }
    return "An unexpected error occurred. Please try again.";
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
      const response = await axios.post(
        `${Base_Url}/verify-email`,
        {
          email: formData.email.trim(),
          code: formData.code
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      const data: VerifyEmailResponse = await response.data;

      if (data.success) {
        toast.success("Email verified successfully!", {
          description: "Now contact admin to verify your account and sign in."
        });

        // Redirect to signin page after successful verification
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        const fetchError = {
          name: "FetchError",
          message: "Request failed"
        } as FetchError;
        const errorMessage = getErrorMessage(fetchError, data as ApiError);
        setFormError(errorMessage);

        // Handle specific error codes
        if (data.code === "USER_NOT_FOUND") {
          toast.error("User Not Found", {
            description: "Please check your email address."
          });
        } else if (data.code === "EMAIL_ALREADY_VERIFIED") {
          toast.info("Already Verified", {
            description: "Your email is already verified."
          });
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else if (data.code === "VERIFICATION_CODE_EXPIRED") {
          toast.error("Code Expired", {
            description: "Please request a new verification code."
          });
        } else if (data.code === "INVALID_VERIFICATION_CODE") {
          toast.error("Invalid Code", {
            description: "Please check your verification code."
          });
        } else if (data.code === "VERIFICATION_CODE_MISSING") {
          toast.error("Code Missing", {
            description: "Please request a new verification code."
          });
        }
      }
    } catch (error) {
      console.error("Verify email error:", error);
      const fetchError = error as FetchError;
      const errorMessage = getErrorMessage(fetchError);
      setFormError(errorMessage);

      toast.error("Verification Failed", {
        description: errorMessage
      });
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

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/request-verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email.trim()
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Verification code sent!", {
          description: "Please check your email for the new code."
        });
      } else {
        toast.error("Failed to send code", {
          description: data.message || "Please try again later."
        });
      }
    } catch (error) {
      console.error("Resend code error:", error);
      toast.error("Failed to send code", {
        description: "Please try again later."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pt-8">
          <div className="flex items-center justify-center mb-2">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email address
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
              <p className="text-[11px] tracking-wide text-gray-500 text-center">
                Check your email for the 6-digit verification code
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
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent cursor-pointer"
              onClick={handleResendCode}
              disabled={isLoading}
            >
              Resend Verification Code
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
  );
}
