import { stratagemSvgMapper } from '@/mappers/stratagemSvgMapper';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  stratagemId: string,
  stratagemType: string,
  iconWidth: number,
  iconHeight: number
};

export const StratagemIcon = ({ stratagemId, stratagemType, iconWidth, iconHeight }: Props) => {

  const SvgIcon = stratagemSvgMapper[stratagemId];
  const stratagemBorderColor = stratagemType === 'offensive' ? '#DE7B6C' : (stratagemType === 'defensive' ? '#679552' : '#49ADC9')

  if (!SvgIcon) return null;

  return (
    <View style={[styles.iconContainer, {minHeight: iconHeight, minWidth: iconWidth, borderColor: stratagemBorderColor}]}>
      <SvgIcon width={iconWidth} height={iconHeight} />
    </View>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 3,
    padding: 3,
  },
});
