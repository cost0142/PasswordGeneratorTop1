import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { PasswordItem } from "./Components/PasswordItem";

export function Passwords() {
  // const { getItems } = UseStorage();
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItems: data, removeItem: remove } = useStorage();
  const { getItems } = useStorage();

  useEffect(
    () => {
      async function loadPasswords() {
        const passwords = await data("@pass");
        setListPasswords(passwords);
      }

      loadPasswords();
    },
    [focused]
  );

  async function handleDeletePassword(item) {
    const passwords = await remove("@pass", item);
    setListPasswords(passwords);
  }

  // async function exportPasswords() {
  //   const filePath = await writePasswordsToFile(listPasswords);

  //   if (filePath) {
  //     const emailOptions = {
  //       subject: "Exported Passwords",
  //       recipients: ["example@example.com"],
  //       body: "Please find the attached file with passwords.",
  //       isHTML: false,
  //       attachmentPaths: [filePath] // Attach the file
  //     };

  //     Mail.mail(emailOptions, error => {
  //       if (error) {
  //         alert("Could not send mail. Please try again later.");
  //         console.error("Mail send error:", error);
  //       } else {
  //         alert("Mail sent successfully!");
  //       }
  //     });
  //   } else {
  //     alert("Failed to create passwords file.");
  //   }
  // }

  // const writePasswordsToFile = async passwords => {
  //   const path = `${RNFS.DocumentDirectoryPath}/passwords.txt`;
  //   const content = passwords
  //     .map((pass, index) => `${index + 1}: ${pass}`)
  //     .join("\n");
  //   try {
  //     await RNFS.writeFile(path, content, "utf8");
  //     return path; // Returns the file path if successful
  //   } catch (error) {
  //     console.error("Failed to write file", error);
  //     return "";
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>List of Passwords</Text>
        <Text style={styles.title}>
          {listPasswords.length} items
        </Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item, index) => index.toString()} // Use index as key if items are not guaranteed unique
          renderItem={({ item, index }) =>
            <PasswordItem
              index={index + 1}
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />}
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
    justifyContent: "space-between"
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14
  }
});
