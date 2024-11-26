import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import tinycolor from 'tinycolor2';
import PropTypes from 'prop-types';

const ProgressBar = ({
  progress = 0,          // Varsayılan değer: %0
  duration = 1000,       // Varsayılan animasyon süresi: 1000ms
  color = '#FFD700',     // Varsayılan renk: Altın sarısı
  width = '100%',        // Varsayılan genişlik: %100
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Kapalı renkler
  const darkerColor = tinycolor(color).darken(5).toString() || '#B8860B';
  const darkerBorderColor = tinycolor(color).darken(5).toString() || '#B8860B';

  const stripesCount = Math.floor((typeof width === 'number' ? width : 300) / 15);

  useEffect(() => {
    // Animasyonu başlat
    Animated.timing(progressAnim, {
      toValue: progress,
      duration,
      useNativeDriver: false,
    }).start();
  }, [progress]); // Sadece progress değiştiğinde tetiklenir

  return (
    <View style={[styles.progressBarBackground, { borderColor: darkerBorderColor, width }]}>
      <Animated.View
        style={[
          styles.progressBarForeground,
          {
            backgroundColor: color,
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      >
        <View style={styles.stripesContainer}>
          {Array.from({ length: stripesCount }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stripe,
                { left: index * 15, width: 10, backgroundColor: darkerColor },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
  },
  progressBarForeground: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
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
    transform: [{ skewX: '-45deg' }],
  },
});

export default ProgressBar;
