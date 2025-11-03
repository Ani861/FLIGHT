import dayjs from "dayjs";

export function formatDateTime(iso?: string) {
  if (!iso) return "-";
  return dayjs(iso).format("YYYY-MM-DD HH:mm");
}
