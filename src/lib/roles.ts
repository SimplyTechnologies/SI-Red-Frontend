import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function Roles() {
  const { role } = useAuthStore();
  useEffect(() => {
    useAuthStore.getState().loadFromStorage();
  }, []);
  return role;
}
