import { BoosterSvgMapper } from '@/mappers/BoosterSvgMapper';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  boosterId: string,
  iconWidth: number,
  iconHeight: number
};

export const BoosterIcon = ({ boosterId, iconWidth, iconHeight }: Props) => {

  const SvgIcon = BoosterSvgMapper[boosterId];

  if (!SvgIcon) return null;

  return (
    <View>
      <SvgIcon width={iconWidth} height={iconHeight} />
    </View>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 4,
    padding: 3
  },
});
