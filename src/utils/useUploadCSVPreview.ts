// src/api/vehicle/useUploadCSVPreview.ts
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { uploadCSVPreview } from "./uploadCSVPreview";
import type { ParsedVehicleUpload } from "@/api/schemas";

export const useUploadCSVPreview = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ParsedVehicleUpload[],
    TError,
    FormData,
    TContext
  >
): UseMutationResult<ParsedVehicleUpload[], TError, FormData, TContext> => {
  return useMutation<ParsedVehicleUpload[], TError, FormData, TContext>(
    uploadCSVPreview, // mutationFn
    options // mutation options
  );
};
