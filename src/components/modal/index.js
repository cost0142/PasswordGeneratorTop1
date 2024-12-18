import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import useStorage from "../../hooks/useStorage";
import { TouchableOpacity } from "react-native-gesture-handler";

export function ModalPassword({ password, handleClose }) {
  const { saveItems } = useStorage();
  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);

    await saveItems("@pass", password);
    alert("Password SAVED and successfully COPIED to your Clipboard.");
    handleClose();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}> Generated Password </Text>

        <Pressable
          style={styles.innerPassword}
          onLongPress={handleCopyPassword}
        >
          <Text style={styles.text}>{password}</Text>
        </Pressable>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleClose}>
            <Text
              style={[
                styles.textbtn,
                {
                  borderRadius: 8,
                  paddingBottom: 15,
                  paddingTop: 15
                }
              ]}
            >
              Close
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnSave]}
            onPress={handleCopyPassword}
          >
            <Text style={styles.textSave}>Save/Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24, 24, 24, 0.75)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "#FFF",
    width: "85%",
    padding: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 3,
    fontSize: 20,
    fontWeight: "bold"
  },
  btnArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  btnSaveText: {
    color: "#FFF",
    fontWeight: "bold"
  },
  textSave: {
    color: "#FFF",
    fontWeight: "bold"
  },
  textbtn: {
    color: "#000",
    fontWeight: "bold",
    borderWidth: 1,

    borderRadius: 8,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    paddingTop: 15
  },
  btn: {
    alignItems: "center",
    marginBottom: 14,
    marginTop: 14,
    padding: 8
  },
  btnSave: {
    backgroundColor: "#392DE9",
    borderRadius: 8,
    paddingBottom: 15,
    paddingTop: 15
  },
  copyBtnBackground: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingBottom: 15,
    paddingTop: 15
  }
});
