import { stratagemSvgMapper } from '@/mappers/stratagemSvgMapper';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  stratagemId: string,
  iconWidth: number,
  iconHeight: number
};

export const StratagemIcon = ({ stratagemId, iconWidth, iconHeight }: Props) => {

  const SvgIcon = stratagemSvgMapper[stratagemId];

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
    borderColor: '#49ADC9',
    padding: 3
  },
});
