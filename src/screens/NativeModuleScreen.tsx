// src/screens/NativeModuleScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeModules } from "react-native";

const { DeviceModule } = NativeModules;

const NativeModuleScreen: React.FC = () => {
  const [osVersion, setOSVersion] = useState<string>("");

  const fetchOSVersion = async () => {
    try {
      const version = await DeviceModule.getOSVersion();
      setOSVersion(version);
    } catch (error) {
      console.error("Error fetching OS version:", error);
      setOSVersion("Error fetching version");
    }
  };

  useEffect(() => {
    fetchOSVersion();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device OS Version</Text>
      <Text style={styles.version}>{osVersion}</Text>
      <Button title="Refresh Version" onPress={fetchOSVersion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  version: { fontSize: 18, color: "#333", marginBottom: 20 },
});

export default NativeModuleScreen;
