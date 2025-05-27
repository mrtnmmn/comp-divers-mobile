import { secondaryPngMapper } from '@/mappers/secondaryPngMapper';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  secondaryId: string,
  iconWidth: number,
  iconHeight: number
};

export const SecondaryIcon = ({ secondaryId, iconWidth, iconHeight }: Props) => {

  const imageSource = secondaryId !== undefined ? secondaryPngMapper[secondaryId] : null;

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
