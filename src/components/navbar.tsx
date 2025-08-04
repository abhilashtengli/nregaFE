"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Shield,
  LogOut,
  ChevronDown,
  Home,
  Loader2,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/stores/userAuthStore";
import { Base_Url } from "@/lib/constant";

interface LogoutResponse {
  success: boolean;
  message: string;
  code: string;
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout: logoutFromStore, isAuthenticated } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const toastLoading = toast.loading("Logging out...");

    try {
      // Call backend logout API
      const response = await axios.post<LogoutResponse>(
        `${Base_Url}/logout`,
        {},
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
        // Clear local storage and state
        logoutFromStore();

        toast.dismiss(toastLoading);
        toast.success("Logged out successfully", {
          description: "You have been logged out. See you again soon!"
        });

        // Navigate to signin page
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API fails, clear local state for security
      logoutFromStore();

      toast.dismiss(toastLoading);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        const errorCode = backendData.code;
        // const errorMsg = backendData.message;

        // Handle specific error codes
        switch (errorCode) {
          case "UNAUTHORIZED":
            toast.info("Session expired", {
              description: "You have been logged out."
            });
            break;
          case "LOGOUT_FAILED":
            toast.warning("Logout completed locally", {
              description:
                "Server logout failed, but you've been logged out locally."
            });
            break;
          default:
            toast.warning("Logout completed", {
              description: "You have been logged out locally."
            });
        }
      } else {
        toast.warning("Logout completed", {
          description: "Network error, but you've been logged out locally."
        });
      }

      // Navigate to signin page regardless of API failure
      navigate("/signin", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-sm sm:text-2xl font-bold text-gray-900 font-serif">
                ಗ್ರಾಮ ಪಂಚಾಯತ
              </h1>
            </Link>
          </div>

          {/* Right side - Admin Panel + User Menu */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Admin Panel Button - Only visible for admin users */}
              {user.role === "admin" && (
                <Link to="/admin-panel">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex cursor-pointer items-center space-x-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Button>
                </Link>
              )}

              {/* Mobile Admin Panel Button */}
              {user.role === "admin" && (
                <Link to="/admin-panel" className="sm:hidden">
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center cursor-pointer space-x-2 hover:bg-gray-50 px-3 py-2 rounded-lg"
                    disabled={isLoggingOut}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-medium">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        Welcome
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-32">
                        {user.name.split(" ")[0]}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                      {user.isVerifiedEmail && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin-panel"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <Button variant="ghost" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
