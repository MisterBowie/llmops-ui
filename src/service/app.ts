
import { post } from "@/utils/request";
import { type DebugAppResponse } from "@/models/app";

export const debugApp = (app_id: string, query: string) => {
  return post<DebugAppResponse>(`/app/${app_id}`, { body: query });
};
