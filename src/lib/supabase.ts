import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

// DB types
export type Store = {
  id: string;
  name: string;
  code: string;
  address: string | null;
  created_at: string;
};

export type User = {
  id: string;
  phone: string;
  name: string;
  birth_date: string | null;
  role: "owner" | "alba";
  created_at: string;
  // id = Supabase Auth UUID (auth.users.id)
};

export type StoreMember = {
  id: string;
  store_id: string;
  user_id: string;
  start_date: string | null;
  wage: number;
  status: "active" | "terminated";
  terminate_date: string | null;
  terminate_reason: string | null;
  created_at: string;
  // joined
  users?: User;
};

export type Attendance = {
  id: string;
  store_id: string;
  user_id: string;
  date: string;
  in_time: string | null;
  out_time: string | null;
  created_at: string;
  // joined
  users?: User;
};
