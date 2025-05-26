import { FactionsSvgMapper } from '@/mappers/FactionsSvgMapper';
import React from 'react';
import { Image, View } from 'react-native';

type Props = {
  factionId: string;
  iconWidth: number;
  iconHeight: number;
};

export const FactionIcon = ({ factionId, iconWidth, iconHeight }: Props) => {
  const imageSource = FactionsSvgMapper[factionId];

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