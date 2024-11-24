import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const widthAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (progress < 0 || progress > 1) {
      console.error('Progress value must be between 0 and 1.');
      return;
    }

    Animated.timing(widthAnim, {
      toValue: progress * 80, // Progress 0-1 arasında, yüzde için %80 genişlik (container genişliği ile uyumlu)
      duration: 500,
      useNativeDriver: false, // `width` animasyonu için `false` gerekir
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[styles.progressBar, { width: widthAnim }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  barContainer: {
    width: '80%', // Container genişliği
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
});

export default ProgressBar;
