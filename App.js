import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");

  const handlePress = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const calculate = () => {
    try {
      // Replace × and ÷ for JS evaluation
      let expression = input.replace(/×/g, '*').replace(/÷/g, '/');
      let result = eval(expression);
      setInput(String(result));
    } catch (e) {
      setInput("Error");
    }
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input || "0"}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.specialBtn} onPress={handleClear}>
          <Text style={styles.specialBtnText}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.specialBtn} onPress={handleBackspace}>
          <Text style={styles.specialBtnText}>⌫</Text>
        </TouchableOpacity>
      </View>

      {buttons.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={btn === "=" ? styles.equalsBtn : styles.btn}
              onPress={() => (btn === "=" ? calculate() : handlePress(btn))}
            >
              <Text style={styles.btnText}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  display: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: "flex-end",
    marginBottom: 10,
  },
  displayText: {
    fontSize: 48,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#333',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  equalsBtn: {
    backgroundColor: '#fe9500',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 28,
    color: 'white',
  },
  specialBtn: {
    backgroundColor: '#555',
    width: 150,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  specialBtnText: {
    fontSize: 24,
    color: 'white',
  },
});