export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}
