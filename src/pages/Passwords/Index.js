import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { PasswordItem } from "./Components/PasswordItem";

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItems: data, removeItem: remove } = useStorage();

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await data("@pass");
      setListPasswords(passwords);
    }

    if (focused) {
      loadPasswords();
    }
  }, [focused]);

  async function handleDeletePassword(item) {
    const updatedList = await remove("@pass", item);
    setListPasswords(updatedList);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>List of Passwords</Text>
        <Text style={styles.title}>{listPasswords.length} items</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <PasswordItem
              index={index + 1}
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingVertical: 20,
    paddingHorizontal: 14,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});