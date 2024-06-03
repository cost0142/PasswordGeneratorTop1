import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export function PasswordItem({ index, data, removePassword }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    setConfirmCancel(false);
  }, [focused, data]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleCancelClick = () => {
    if (confirmCancel) {
      removePassword();
    } else {
      setConfirmCancel(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.index}>{index}-</Text>
      <Text style={styles.text} numberOfLines={1}>
        {isPasswordVisible ? data : "●".repeat(data.length)}
      </Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons
            name={isPasswordVisible ? "eye-off" : "eye"}
            color="yellow"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelClick} style={styles.btn}>
          {confirmCancel ? (
            <MaterialCommunityIcons name="close" color="#ff0000" size={25} />
          ) : (
            <MaterialCommunityIcons
              name="trash-can"
              color="#4DB1FF"
              size={25}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  index: {
    marginRight: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#FFF",
    fontSize: 15,
    letterSpacing: 2,
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});