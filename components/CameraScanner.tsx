import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";

interface CameraScannerProps {
  onScan: (text: string) => void;
  isScanning: boolean;
}

export function CameraScanner({ onScan, isScanning }: CameraScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      // Animated scanning line
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isScanning]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#2d9039", "#1c6b28"]}
          style={styles.permissionCard}
        >
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan ingredient labels and check Sattvic compliance
          </Text>
          <Pressable onPress={requestPermission} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!hasScanned && isScanning) {
      setHasScanned(true);
      onScan(data);
      setTimeout(() => setHasScanned(false), 2000);
    }
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code128", "code39"],
        }}
      >
        <View style={styles.overlay}>
          {/* Corner Brackets */}
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated Scan Line */}
            {isScanning && (
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslateY }] },
                ]}
              >
                <LinearGradient
                  colors={["transparent", "#62cc6f", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.scanLineGradient}
                />
              </Animated.View>
            )}
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <LinearGradient
              colors={["rgba(28, 75, 37, 0.95)", "rgba(28, 107, 40, 0.95)"]}
              style={styles.instructionsCard}
            >
              <Text style={styles.instructionsText}>
                {isScanning
                  ? "📱 Point camera at ingredient label or barcode"
                  : "✓ Scan complete! Check results below"}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c4b25",
  },
  message: {
    color: "#ffffff",
    fontSize: 16,
  },
  permissionCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: "center",
    maxWidth: 320,
    margin: 20,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 15,
    color: "#e1f8e6",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#1c6b28",
    fontSize: 16,
    fontWeight: "600",
  },
  cameraContainer: {
    height: 400,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scanFrame: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 250,
    height: 250,
    marginLeft: -125,
    marginTop: -125,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#62cc6f",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
  },
  scanLineGradient: {
    flex: 1,
  },
  instructionsContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  instructionsCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  instructionsText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
