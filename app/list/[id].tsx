import { EditableContainer } from "@/features/addList/components/EditableContainer";
import { FooterComponent } from "@/features/addList/components/FooterComponent";
import { HeaderComponent } from "@/features/addList/components/HeaderComponent";
import { Items } from "@/features/addList/types";
import { useGroceryListById } from "@/hooks/useGroceryListById";
import { useGroceryItems } from "@/hooks/useGroceryLists";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

const date = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const formattedDate = date.toLocaleDateString("en-US", options);

export default function AddListScreen() {
  const { id } = useLocalSearchParams();
  const { listInfo, isLoading } = useGroceryListById(id.toString());
  const { addList, updateList } = useGroceryItems();

  const [listName, setListName] = useState(formattedDate);
  const [items, setItems] = useState<Items>([]);

  useEffect(() => {
    if (id !== "new" && listInfo) {
      setListName(listInfo.title);
      setItems(listInfo.items);
    }
  }, [id, listInfo]);

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.createdAt !== id));
  };

  const handleSaveList = () => {
    if (id !== "new") {
      updateList({
        id: typeof id === "string" ? id : id[0],
        updates: { title: listName, items },
      });
    } else {
      addList({ title: listName, items });
    }
  };

  const setItem = (id: string, name: string, amount: number) => {
    setItems(
      items.map((item) =>
        item.createdAt === id ? { ...item, name, amount } : item
      )
    );
  };

  const disabledSave = !!items.find(
    (item) => item.name.length === 0 || item.amount <= 0
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.createdAt}
          renderItem={({ item }) => (
            <EditableContainer
              item={item}
              handleDeleteItem={handleDeleteItem}
              setItem={setItem}
            />
          )}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          contentContainerStyle={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 16,
          }}
          ListHeaderComponent={
            <HeaderComponent
              items={items}
              setItems={setItems}
              listName={listName}
              setListName={setListName}
            />
          }
          ListFooterComponent={
            items.length > 0 ? (
              <FooterComponent
                handleSaveList={handleSaveList}
                disabled={disabledSave}
              />
            ) : null
          }
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
