import { useState } from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import { ModalPassword } from "../../components/modal";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Home({ navigation }) {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Definição de conjuntos de caracteres
  let lowerAndNumbers = "abcdefghijklmnopqrstuvwxyz0123456789"; // Letras minúsculas e números
  let specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?"; // Caracteres especiais
  let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras maiúsculas

  function generatePassword() {
    let password = [];
    password.push(
      specialChars.charAt(Math.floor(Math.random() * specialChars.length))
    );
    password.push(
      uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length))
    );
    while (password.length < size) {
      password.push(
        lowerAndNumbers.charAt(
          Math.floor(Math.random() * lowerAndNumbers.length)
        )
      );
    }
    // Embaralhar a senha para distribuir aleatoriamente os caracteres especiais e maiúsculos
    password = shuffleArray(password).join("");

    setPasswordValue(password);
    setModalVisible(true);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca de elementos
    }
    return array;
  }

  function handleLogout() {
    // Passando parâmetros para a tela de Login para limpar/resetar estados
    navigation.navigate("Login", { resetPassword: true });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{size} Caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={8} // Ajuste o mínimo para garantir espaço para caracteres especiais e maiúsculas
          maximumValue={20}
          minimumTrackTintColor="#FFC933"
          maximumTrackTintColor="orange"
          thumbTintColor="#392de9"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity style={styles.btn} onPress={generatePassword}>
          <Text style={styles.textBtn}>Generate password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "red", marginTop: 30 }]}
          onPress={handleLogout}
        >
          <Text style={styles.textBtn}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword
          password={passwordValue}
          handleClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginTop: 40,
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%"
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginBottom: 60
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8
  },
  btn: {
    backgroundColor: "#392de9",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20
  },
  textBtn: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },
  title: {
    fontSize: 30,
    marginBottom: 20
  }
});
