import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  attachments: string[];
  isStaff: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  category?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  messages?: TicketMessage[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string };
}

export const supportService = {
  createTicket: (data: { subject: string; category?: string; priority?: string; message: string; attachments?: string[] }) =>
    api.post<ApiResponse<SupportTicket>>('/support/tickets', data),

  getMyTickets: (page = 1, limit = 10) =>
    api.get<ApiResponse<SupportTicket[]>>('/support/tickets', { params: { page, limit } }),

  getTicketById: (id: string) =>
    api.get<ApiResponse<SupportTicket>>(`/support/tickets/${id}`),

  replyToTicket: (id: string, message: string, attachments: string[] = []) =>
    api.post<ApiResponse<TicketMessage>>(`/support/tickets/${id}/message`, { message, attachments }),

  // Admin
  getAllTickets: (params: { page?: number; limit?: number; status?: string; priority?: string } = {}) =>
    api.get<ApiResponse<SupportTicket[]>>('/support/admin/tickets', { params }),

  updateTicket: (id: string, data: Partial<SupportTicket>) =>
    api.patch<ApiResponse<SupportTicket>>(`/support/admin/tickets/${id}`, data),

  replyToTicketAdmin: (id: string, message: string, attachments: string[] = []) =>
    api.post<ApiResponse<TicketMessage>>(`/support/admin/tickets/${id}/reply`, { message, attachments }),
};
