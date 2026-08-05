import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  companyId: string | null;
  employeeId: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  readBy: string[];
}

export const getEmployeeNotifications = (employeeId: string, limit = 10) => {
  return httpClient.get(`${URLS.notifications.get_employee_notifications(employeeId)}?skip=0&take=${limit}`);
};

export const getCompanyNotifications = (companyId: string, limit = 10) => {
  return httpClient.get(`${URLS.notifications.get_company_notifications(companyId)}?skip=0&take=${limit}`);
};

export const getEmployeeUnreadCount = (employeeId: string) => {
  return httpClient.get(URLS.notifications.get_employee_unread_count(employeeId));
};

export const getCompanyUnreadCount = (companyId: string) => {
  return httpClient.get(URLS.notifications.get_company_unread_count(companyId));
};

export const readNotification = (notificationId: string) => {
  return httpClient.patch(URLS.notifications.read_notification(notificationId));
};

export const deleteNotification = (notificationId: string) => {
  return httpClient.delete(URLS.notifications.delete_notification(notificationId));
};
