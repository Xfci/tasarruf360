import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import tinycolor from 'tinycolor2';

const ProgressBar = ({ progress, duration, color, triggerKey }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Kapalı renkler
  const darkerColor = tinycolor(color || '#FFD700').darken(5).toString(); // Bir ton koyu
  const darkerBorderColor = tinycolor(color || '#FFD700').darken(5).toString(); // Daha koyu sınır rengi
  
  const stripesCount = Math.floor(300 / 15); // 300px genişlikte 15px aralıklarla çizgi

  useEffect(() => {
    // Animasyonu başlat
    Animated.timing(progressAnim, {
      toValue: progress, // Hedef değer (ör. 0.7 = %70)
      duration: duration || 1000, // Varsayılan süre 2000ms
      useNativeDriver: false,
    }).start();
  }, [progress, triggerKey]); // progress veya triggerKey değiştiğinde animasyon tetiklenir

  return (
    <View style={[styles.progressBarBackground, { borderColor: darkerBorderColor }]}>
      <Animated.View
        style={[
          styles.progressBarForeground,
          {
            backgroundColor: color || '#FFD700', // Varsayılan sarı renk
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      >
        {/* Paralel çizgiler */}
        <View style={styles.stripesContainer}>
          {Array.from({ length: stripesCount }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stripe,
                { left: index * 15, width: 10, backgroundColor: darkerColor }, // Çizgileri konumlandır
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden', // Bu gri alanın dışında bir şey görünmemeli
    borderWidth: 2, // Dinamik koyulaştırılmış renk ile güncellenecek
  },
  progressBarForeground: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden', // Çizgilerin yalnızca sarı alanda görünmesini sağlar
    position: 'relative', // Çizgiler için konumlandırma
  },
  stripesContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    top: 0,
    left: 0,
  },
  stripe: {
    position: 'absolute',
    height: '100%',
    transform: [{ skewX: '-45deg' }], // Paralel çizgi efekti
  },
});

export default ProgressBar;
