// ============================================================
// 플바 — TypeScript 타입 정의
// ============================================================

export type UserRole = "owner" | "worker" | "admin";
export type MemberStatus = "pending" | "active" | "left";
export type CampaignStatus = "active" | "paused" | "blind" | "ended";
export type RewardStatus = "pending" | "approved" | "rejected";
export type ChargeStatus = "pending" | "success" | "failed";
export type WithdrawalStatus = "pending" | "processed" | "rejected";
export type NoticeType = "notice" | "closing_photo" | "cs";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  region_city: string | null;
  region_district: string | null;
  region_dong: string | null;
  bank_name: string | null;
  bank_account: string | null;
  created_at: string;
}

export interface Store {
  id: string;
  owner_id: string;
  name: string;
  region_city: string;
  region_district: string;
  region_dong: string;
  address_detail: string | null;
  invite_code: string;
  qr_code_url: string | null;
  hourly_wage: number;
  off_days: number[];
  business_hours_start: string;
  business_hours_end: string;
  created_at: string;
}

export interface StoreMember {
  id: string;
  store_id: string;
  user_id: string;
  status: MemberStatus;
  joined_at: string;
  // 조인 데이터
  store?: Store;
  user?: User;
}

export interface Schedule {
  id: string;
  store_id: string;
  user_id: string;
  work_date: string;
  start_time: string;
  end_time: string;
  hourly_wage: number;
  created_at: string;
  user?: User;
}

export interface WorkLog {
  id: string;
  store_id: string;
  user_id: string;
  clock_in_at: string;
  clock_out_at: string | null;
  auto_clocked_out: boolean;
  working_minutes: number | null;
  calculated_wage: number | null;
  created_at: string;
  store?: Store;
  user?: User;
}

export interface Campaign {
  id: string;
  store_id: string;
  title: string;
  description: string | null;
  menu_name: string | null;
  reward_amount: number;
  platform_fee: number;
  total_budget_count: number;
  used_count: number;
  status: CampaignStatus;
  created_at: string;
  expired_at: string | null;
  store?: Store;
}

export interface RewardLog {
  id: string;
  campaign_id: string;
  user_id: string;
  store_id: string;
  tracking_code: string;
  status: RewardStatus;
  reward_amount: number;
  approved_at: string | null;
  created_at: string;
  campaign?: Campaign;
  store?: Store;
}

export interface StorePoints {
  id: string;
  store_id: string;
  balance: number;
  updated_at: string;
}

export interface PointCharge {
  id: string;
  store_id: string;
  amount: number;
  pg_order_id: string;
  status: ChargeStatus;
  created_at: string;
}

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  bank_name: string;
  bank_account: string;
  status: WithdrawalStatus;
  memo: string | null;
  requested_at: string;
  processed_at: string | null;
  user?: User;
}

export interface Notice {
  id: string;
  store_id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  type: NoticeType;
  created_at: string;
  user?: User;
}

// API 응답 공통 패턴
export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };
