import { ThrowablePngMapper } from '@/mappers/ThrowablePngMapper';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  throwableId: string,
  iconWidth: number,
  iconHeight: number
};

export const ThrowableIcon = ({ throwableId, iconWidth, iconHeight }: Props) => {

  const imageSource = throwableId !== undefined ? ThrowablePngMapper[throwableId] : null;

  if (!imageSource) return null;

  return (
    <View>
      <Image
        source={imageSource}
        style={{ width: '100%', height: iconHeight }}
        resizeMode="contain"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 4,
    padding: 3
  },
});
