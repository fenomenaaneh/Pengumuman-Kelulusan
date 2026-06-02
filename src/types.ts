export interface StudentResult {
  name: string;
  status: 'LULUS' | 'TIDAK LULUS';
  message: string;
}

export interface AnnouncementResponse {
  success: boolean;
  data?: StudentResult;
  error?: string;
}
