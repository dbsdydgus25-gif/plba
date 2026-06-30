export type Role = "alba" | "owner";
export type Theme = "violet" | "lime";
export type WorkState = "before" | "working" | "done";
export type AttendanceStatus = "normal" | "late" | "absent" | "early";

export interface ScheduleCell {
  s: string; // HH:MM
  e: string; // HH:MM | "미정" | "마감"
}

export interface StaffSchedule {
  name: string;
  cells: (ScheduleCell | null)[];
}

export interface OnboardStep {
  id: string;
  title: string;
  body: string;
}

export interface TodayTask {
  id: string;
  label: string;
}

export interface AttendanceRecord {
  name: string;
  avatarColor: string;
  inTime?: string;
  outTime?: string;
  status: AttendanceStatus;
  isManual?: boolean;
}

export interface PayrollItem {
  name: string;
  hourlyWage: number;
  workedHours: number;
  weeklyHoliday: number;
}
