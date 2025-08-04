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
import Header from "@/components/Header";

// Form validation schema
const requestVerifyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

interface FormErrors {
  [key: string]: string;
}

interface RequestVerifyEmailResponse {
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

export default function RequestVerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: ""
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
      requestVerifyEmailSchema.parse(formData);
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
    if (status === 400) {
      return "Please enter a valid email address.";
    }
    if (status === 403) {
      return "Contact admin to verify your account.";
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
        `${Base_Url}/request-verify-email`,
        {
          email: formData.email.trim()
        },
        {
          withCredentials: true, // Important for cookies
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data: RequestVerifyEmailResponse = await response.data;

      if (data.success) {
        toast.success("Verification code sent!", {
          description: "Please check your email for the verification code."
        });

        // Navigate to verify email page with email parameter
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        const fetchError = {
          name: "FetchError",
          message: "Request failed"
        } as FetchError;
        const errorMessage = getErrorMessage(fetchError, data as ApiError);
        setFormError(errorMessage);

        // Handle specific error codes
        if (data.code === "INVALID_EMAIL") {
          toast.error("Invalid Email", {
            description: "Please enter a valid email address."
          });
        } else if (data.code === "EMAIL_ALREADY_VERIFIED") {
          toast.info("Already Verified", {
            description: "Your email is already verified."
          });
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else if (data.code === "USER_NOT_VERIFIED") {
          toast.error("Account Not Verified", {
            description: "Contact admin to verify your account."
          });
        } else if (data.code === "EMAIL_SEND_FAILED") {
          toast.error("Email Send Failed", {
            description: "Failed to send verification email. Please try again."
          });
        } else if (data.code === "INTERNAL_SERVER_ERROR") {
          toast.error("Server Error", {
            description: "Internal server error. Please try again later."
          });
        }
      }
    } catch (error) {
      console.error("Request verify email error:", error);
      const fetchError = error as FetchError;
      const errorMessage = getErrorMessage(fetchError);
      setFormError(errorMessage);

      toast.error("Request Failed", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen  bg-gradient-to-r from-blue-100 via-violet-50 to-white px-2">
      <Header />
      <div className="h-[80%] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Request Verification Code
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address to receive a verification code
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
                <p className="text-[11px] tracking-wide text-gray-500">
                  We'll send a 6-digit verification code to this email address
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full mt-7 cursor-pointer bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Sending Code..." : "Send Verification Code"}
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
