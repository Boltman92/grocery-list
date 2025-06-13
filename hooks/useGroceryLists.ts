import { groceryApi } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useGroceryItems = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: items = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: groceryApi.getItems,
  });

  const addListMutation = useMutation({
    mutationFn: groceryApi.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      router.replace("/");
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });

  const updateListMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: object }) =>
      groceryApi.updateItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      router.replace("/");
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => groceryApi.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  return {
    // Data
    items,
    isLoading,
    error,
    refetch,

    // Mutations
    addList: addListMutation.mutate,
    updateList: updateListMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    addListSuccess: addListMutation.isSuccess,

    // Loading states
    isAddingItem: addListMutation.isPending,
    isUpdatingItem: updateListMutation.isPending,
    isDeletingItem: deleteItemMutation.isPending,

    // Error states
    addItemError: addListMutation.error,
    updateItemError: updateListMutation.error,
    deleteItemError: deleteItemMutation.error,
  };
};
