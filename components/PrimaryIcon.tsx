import { primaryPngMapper } from '@/mappers/primarySvgMapper';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  primaryId: string,
  iconWidth: number,
  iconHeight: number
};

export const PrimaryIcon = ({ primaryId, iconWidth, iconHeight }: Props) => {

  const imageSource = primaryId !== undefined ? primaryPngMapper[primaryId] : null;

  if (!imageSource) return null;

  return (
    <View>
      <Image
        source={imageSource}
        style={{ width: '100%', height: 200 }}
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
