import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getEmployeeNotifications,
  getCompanyNotifications,
  getEmployeeUnreadCount,
  getCompanyUnreadCount,
  readNotification,
  deleteNotification,
  NotificationItem,
} from "@/services/notifications/notification-service";
import { AxiosResponse } from "axios";
import { GeneralResponse } from "@/lib/types";

export const useGetNotifications = (userId: string, userType: "USER" | "EMPLOYEE", limit = 10) => {
  const query = useQuery<AxiosResponse<GeneralResponse<NotificationItem[]>>>({
    queryKey: ["notifications", userId, userType, limit],
    queryFn: () =>
      userType === "EMPLOYEE"
        ? getEmployeeNotifications(userId, limit)
        : getCompanyNotifications(userId, limit),
    enabled: !!userId,
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    notifications: query.data?.data?.data ?? [],
  };
};

export const useGetUnreadNotificationsCount = (userId: string, userType: "USER" | "EMPLOYEE") => {
  const query = useQuery<AxiosResponse<GeneralResponse<number>>>({
    queryKey: ["notifications-unread-count", userId, userType],
    queryFn: () =>
      userType === "EMPLOYEE"
        ? getEmployeeUnreadCount(userId)
        : getCompanyUnreadCount(userId),
    enabled: !!userId,
    staleTime: 30 * 1000,
  });

  return {
    ...query,
    unreadCount: query.data?.data?.data ?? 0,
  };
};

export const useReadNotification = (userId?: string, userType?: "USER" | "EMPLOYEE") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => readNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });
};

export const useDeleteNotification = (userId?: string, userType?: "USER" | "EMPLOYEE") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });
};
