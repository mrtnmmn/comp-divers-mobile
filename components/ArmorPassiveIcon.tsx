import { passivePngMapper } from '@/mappers/passiveSvgMapper';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  passiveId: string,
  iconWidth: number,
  iconHeight: number
};

export const ArmorPassiveIcon = ({ passiveId, iconWidth, iconHeight }: Props) => {

  const imageSource = passiveId !== undefined ? passivePngMapper[passiveId] : null;

  if (!imageSource) return null;

  return (
    <View>
      <Image
        source={imageSource}
        style={{ width: iconWidth, height: iconHeight }} 
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
