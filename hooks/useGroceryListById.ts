import { groceryApi } from "@/services/api";
import { ListResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGroceryListById = (id: string) => {
  const queryClient = useQueryClient();

  const {
    data: listInfo,
    isLoading,
    error,
    refetch,
  } = useQuery<ListResponse>({
    queryKey: ["lists", id],
    queryFn: () => groceryApi.getItemById(id),
    enabled: id !== "new",
  });

  const toggleBoughtMutation = useMutation({
    mutationFn: ({
      id,
      itemId,
      currentStatus,
    }: {
      id: string;
      itemId: string;
      currentStatus: boolean;
    }) => {
      const updatedList = listInfo?.items.map((item) =>
        item.createdAt === itemId ? { ...item, bought: currentStatus } : item
      );
      const updatedData = { ...listInfo, items: updatedList };

      return groceryApi.updateItem(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (error) => {
      console.error("Error toggling bought status:", error);
    },
  });

  return {
    listInfo,
    isLoading,
    error,
    refetch,
    toggleBought: toggleBoughtMutation.mutate,
  };
};
