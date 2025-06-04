import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface SaveLoadoutButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SaveLoadoutButton: React.FC<SaveLoadoutButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start(() => onPress());
  };

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const textColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffe900', '#ffffff'],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={[styles.button, style]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: '#ffe900',
              width: widthInterpolated,
              borderRadius: 8,
            },
          ]}
        />
        <View style={styles.content}>
          <Animated.Text style={[styles.text, textStyle, { color: textColor }]}>
            {title}
          </Animated.Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#a3992e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    zIndex: 1,
  },
});

export default SaveLoadoutButton;