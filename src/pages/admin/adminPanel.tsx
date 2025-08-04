"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  Loader2,
  RefreshCw,
  Trash2,
  Edit3,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import UserManagementSkeleton from "@/components/shimmer/userManagementSkeleton";

interface User {
  name: string;
  email: string;
  isVerifiedEmail: boolean;
  isAdminVerifiedUser: boolean;
  panchayatCode: string;
  createdAt: string;
}

interface GetAllViewersResponse {
  success: boolean;
  message: string;
  code: string;
  data: User[];
}

interface VerifyUserResponse {
  success: boolean;
  message: string;
  code: string;
  data?: {
    user: User;
    action: string;
    verifiedBy: {
      id: string;
      email: string;
      name: string;
    };
    timestamp: string;
  };
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
  code: string;
  data?: {
    deletedUser: User;
    deletedBy: {
      id: string;
      email: string;
      name: string;
    };
    timestamp: string;
    sessionsTerminated: number;
  };
}

interface UpdatePanchayatResponse {
  success: boolean;
  message: string;
  code: string;
  data?: {
    user: User;
    previousPanchayatCode: string;
    newPanchayatCode: string;
    updatedBy: {
      id: string;
      email: string;
      name: string;
    };
    timestamp: string;
  };
}

interface ApiError {
  success: false;
  message: string;
  code: string;
}

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [processingUsers, setProcessingUsers] = useState<Set<string>>(
    new Set()
  );
  const [editingPanchayat, setEditingPanchayat] = useState<string | null>(null);
  const [newPanchayatCode, setNewPanchayatCode] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    if (user?.role !== "admin") {
      toast.error("Access Denied", {
        description: "You don't have admin privileges to access this page."
      });
      navigate("/dashboard");
      return;
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, navigate]);

  const fetchUsers = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await axios.get<GetAllViewersResponse>(
        `${Base_Url}/admin/get-all-viewers`,
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
        setUsers(data.data);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const backendData = error.response.data as ApiError;
        const errorMsg = backendData.message || "Failed to fetch users";
        setError(errorMsg);
        // Handle specific error codes
        if (backendData.code === "UNAUTHORIZED") {
          toast.error("Session Expired", {
            description: "Please sign in again."
          });
          logout();
        } else if (backendData.code === "FORBIDDEN") {
          toast.error("Access Denied", {
            description: errorMsg
          });
          navigate("/dashboard");
        }
      } else {
        const errorMessage =
          "Network error. Please check your internet connection.";
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleUserVerification = async (
    email: string,
    userVerification: boolean
  ) => {
    try {
      setProcessingUsers((prev) => new Set(prev).add(email));
      const response = await axios.post<VerifyUserResponse>(
        `${Base_Url}/admin/verify-user`,
        {
          email,
          userVerification
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
        // Update the user in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email
              ? { ...user, isAdminVerifiedUser: userVerification }
              : user
          )
        );
        const action = userVerification ? "accepted" : "rejected";
        toast.success(`User ${action}`, {
          description: data.message
        });
      }
    } catch (error) {
      console.error("User verification error:", error);
      handleApiError(error, "verification");
    } finally {
      setProcessingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(email);
        return newSet;
      });
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      setProcessingUsers((prev) => new Set(prev).add(email));
      const response = await axios.delete<DeleteUserResponse>(
        `${Base_Url}/admin/delete-user`,
        {
          data: { email },
          timeout: 10000,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;
      if (data.success) {
        // Remove user from local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
        toast.success("User Deleted", {
          description: data.message
        });
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error("Delete user error:", error);
      handleApiError(error, "delete");
    } finally {
      setProcessingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(email);
        return newSet;
      });
    }
  };

  const handleUpdatePanchayat = async (
    email: string,
    panchayatCode: string
  ) => {
    try {
      setProcessingUsers((prev) => new Set(prev).add(email));
      const response = await axios.put<UpdatePanchayatResponse>(
        `${Base_Url}/admin/update-panchayat`,
        {
          email,
          panchayatCode
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
        // Update user in local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email
              ? { ...user, panchayatCode: panchayatCode }
              : user
          )
        );
        toast.success("Panchayat Code Updated", {
          description: data.message
        });
        setEditingPanchayat(null);
        setNewPanchayatCode("");
      }
    } catch (error) {
      console.error("Update panchayat error:", error);
      handleApiError(error, "update");
    } finally {
      setProcessingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(email);
        return newSet;
      });
    }
  };

  const handleApiError = (error: unknown, operation: string) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const backendData = error.response.data as ApiError;
      const errorCode = backendData.code;
      const errorMsg = backendData.message;

      // Handle specific error codes from backend
      switch (errorCode) {
        case "UNAUTHORIZED":
          toast.error("Authentication Required", {
            description: errorMsg
          });
          logout();
          break;
        case "FORBIDDEN":
          toast.error("Access Denied", {
            description: errorMsg
          });
          break;
        case "VALIDATION_ERROR":
          toast.error("Validation Error", {
            description: errorMsg
          });
          break;
        case "INVALID_EMAIL":
          toast.error("Invalid Email", {
            description: errorMsg
          });
          break;
        case "USER_NOT_FOUND":
          toast.error("User Not Found", {
            description: errorMsg
          });
          break;
        case "SELF_MODIFICATION_DENIED":
        case "SELF_DELETION_DENIED":
          toast.error("Action Denied", {
            description: errorMsg
          });
          break;
        case "CANNOT_DELETE_ADMIN":
          toast.error("Cannot Delete Admin", {
            description: errorMsg
          });
          break;
        case "USER_HAS_DEPENDENCIES":
          toast.error("Cannot Delete User", {
            description: errorMsg
          });
          break;
        case "INVALID_PANCHAYAT_CODE":
        case "PANCHAYAT_NOT_FOUND":
          toast.error("Invalid Panchayat Code", {
            description: errorMsg
          });
          break;
        case "INVALID_USER_ROLE":
          toast.error("Invalid User Role", {
            description: errorMsg
          });
          break;
        case "NO_CHANGE_REQUIRED":
          toast.info("No Change Required", {
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
          toast.error("Database Error", {
            description: errorMsg
          });
          break;
        case "USER_DELETION_FAILED":
          toast.error("Deletion Failed", {
            description: errorMsg
          });
          break;
        case "PANCHAYAT_UPDATE_FAILED":
          toast.error("Update Failed", {
            description: errorMsg
          });
          break;
        default:
          toast.error(
            `${operation.charAt(0).toUpperCase() + operation.slice(1)} Failed`,
            {
              description: errorMsg || "An unexpected error occurred"
            }
          );
      }
    } else {
      toast.error("Network Error", {
        description: "Please check your internet connection."
      });
    }
  };

  const startEditingPanchayat = (email: string, currentCode: string) => {
    setEditingPanchayat(email);
    setNewPanchayatCode(currentCode);
  };

  const cancelEditingPanchayat = () => {
    setEditingPanchayat(null);
    setNewPanchayatCode("");
  };

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Filter users
  const pendingUsers = users.filter((user) => !user.isAdminVerifiedUser);
  const verifiedUsers = users.filter((user) => user.isAdminVerifiedUser);
  const totalUsers = users.length;

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-violet-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-100 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage user verification requests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => fetchUsers(true)}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="cursor-pointer"
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="cursor-pointer bg-transparent"
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className=" md:h-24 bg-white rounded-lg p-4 shadow-md border">
            <div className="flex flex-row items-center justify-between space-y-0 ">
              <h2 className="text-sm font-medium">Total Users</h2>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                All registered users
              </p>
            </div>
          </div>
          <div className=" md:h-24 bg-white rounded-lg p-4 shadow-md border">
            <div className="flex flex-row items-center justify-between space-y-0 ">
              <h2 className="text-sm font-medium">Pending Requests</h2>
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {pendingUsers.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting verification
              </p>
            </div>
          </div>
          <div className=" md:h-24  bg-white rounded-lg p-4 shadow-md border">
            <div className="flex flex-row items-center justify-between space-y-0 ">
              <h2 className="text-sm font-medium">Verified Users</h2>
              <UserCheck className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {verifiedUsers.length}{" "}
              </div>
              <p className="text-xs text-muted-foreground">Admin approved</p>
            </div>
          </div>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                Verified Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {verifiedUsers.length}
              </div>
              <p className="text-xs text-muted-foreground">Admin approved</p>
            </CardContent>
          </Card> */}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading ? (
          <UserManagementSkeleton />
        ) : (
          /* Users Table */
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="pending"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Clock className="h-4 w-4" />
                    Pending ({pendingUsers.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="verified"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="h-4 w-4" />
                    Verified ({verifiedUsers.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  {pendingUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No pending verification requests
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Panchayat Code</TableHead>
                            <TableHead>Email Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingUsers.map((user) => (
                            <TableRow key={user.email}>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-mono">
                                  {user.panchayatCode}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.isVerifiedEmail
                                      ? "default"
                                      : "destructive"
                                  }
                                  className={`${
                                    user.isVerifiedEmail
                                      ? "bg-green-600 tracking-wide"
                                      : "bg-orange-300 text-black tracking-wide"
                                  }`}
                                >
                                  {user.isVerifiedEmail
                                    ? "Verified"
                                    : "Not Verified"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {formatDate(user.createdAt)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleUserVerification(user.email, true)
                                    }
                                    disabled={
                                      processingUsers.has(user.email) ||
                                      !user.isVerifiedEmail
                                    }
                                    className="bg-green-600 hover:bg-green-700 cursor-pointer"
                                  >
                                    {processingUsers.has(user.email) ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4" />
                                    )}
                                    Accept
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="verified" className="mt-6">
                  {verifiedUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No verified users yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Panchayat Code</TableHead>
                            <TableHead>Email Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {verifiedUsers.map((user) => (
                            <TableRow key={user.email}>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                {editingPanchayat === user.email ? (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={newPanchayatCode}
                                      onChange={(e) =>
                                        setNewPanchayatCode(e.target.value)
                                      }
                                      className="w-32 h-8 text-sm"
                                      placeholder="Enter code"
                                      disabled={processingUsers.has(user.email)}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleUpdatePanchayat(
                                          user.email,
                                          newPanchayatCode
                                        )
                                      }
                                      disabled={
                                        processingUsers.has(user.email) ||
                                        !newPanchayatCode.trim() ||
                                        newPanchayatCode === user.panchayatCode
                                      }
                                      className="h-8 px-2 cursor-pointer"
                                    >
                                      {processingUsers.has(user.email) ? (
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                      ) : (
                                        <Save className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={cancelEditingPanchayat}
                                      disabled={processingUsers.has(user.email)}
                                      className="h-8 px-2 bg-transparent cursor-pointer"
                                    >
                                      <X className="h-3 w-3 " />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="font-mono"
                                    >
                                      {user.panchayatCode}
                                    </Badge>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        startEditingPanchayat(
                                          user.email,
                                          user.panchayatCode
                                        )
                                      }
                                      disabled={processingUsers.has(user.email)}
                                      className="h-6 w-6 p-0 cursor-pointer"
                                    >
                                      <Edit3 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.isVerifiedEmail
                                      ? "default"
                                      : "destructive"
                                  }
                                  className={`${
                                    user.isVerifiedEmail ? "bg-green-600" : ""
                                  }`}
                                >
                                  {user.isVerifiedEmail
                                    ? "Verified"
                                    : "Not Verified"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {formatDate(user.createdAt)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleUserVerification(user.email, false)
                                    }
                                    disabled={processingUsers.has(user.email)}
                                    className="cursor-pointer"
                                  >
                                    {processingUsers.has(user.email) ? (
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                      <UserX className="h-4 w-4 mr-2" />
                                    )}
                                    Revoke
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => confirmDeleteUser(user)}
                                    disabled={processingUsers.has(user.email)}
                                    className="cursor-pointer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="w-96">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{userToDelete?.name}</span> (
                {userToDelete?.email})? This action cannot be undone and will
                terminate all their active sessions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setUserToDelete(null);
                }}
                disabled={
                  userToDelete ? processingUsers.has(userToDelete.email) : false
                }
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  userToDelete && handleDeleteUser(userToDelete.email)
                }
                disabled={
                  userToDelete ? processingUsers.has(userToDelete.email) : false
                }
                className="cursor-pointer"
              >
                {userToDelete && processingUsers.has(userToDelete.email) ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
