export type PlbaSession = {
  userId: string;
  userName: string;
  storeId: string;
  storeName: string;
};

export function getSession(): PlbaSession | null {
  if (typeof window === "undefined") return null;
  const userId = localStorage.getItem("plba_user_id");
  const userName = localStorage.getItem("plba_user_name");
  const storeId = localStorage.getItem("plba_store_id");
  const storeName = localStorage.getItem("plba_store_name");
  if (!userId || !storeId) return null;
  return { userId, userName: userName ?? "", storeId, storeName: storeName ?? "" };
}

export function clearSession() {
  localStorage.removeItem("plba_user_id");
  localStorage.removeItem("plba_user_name");
  localStorage.removeItem("plba_store_id");
  localStorage.removeItem("plba_store_name");
}

// 데모용: 테스트 세션 강제 설정 (홍길동)
export function setDemoSession() {
  localStorage.setItem("plba_user_id", "00000000-0000-0000-0000-000000000010");
  localStorage.setItem("plba_user_name", "홍길동");
  localStorage.setItem("plba_store_id", "00000000-0000-0000-0000-000000000001");
  localStorage.setItem("plba_store_name", "카페 플바");
}
