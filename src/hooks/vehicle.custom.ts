import { useMutation } from "@tanstack/react-query";
import { customMutator } from "@/lib/api/customMutator";
import type { AssignCustomerWithData200 } from "@/api/schemas";
export interface AssignCustomerWithDataInput {
  id: string;
  data: FormData;
}
export const useAssignCustomerWithDataMutation = () =>
  useMutation<AssignCustomerWithData200, Error, AssignCustomerWithDataInput>({
    mutationFn: ({ id, data }) =>
      customMutator({
        url: `/vehicles/${id}/assign-customer-with-data`,
        method: "PUT",
        data,
      }),
  });
