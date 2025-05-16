import DefaultStratagem from '@/assets/images/stratagems/orbital_railcannon_strike.svg';
import { stratagemSvgMapper } from '@/mappers/stratagemSvgMapper';
import React from 'react';
import { View } from 'react-native';

type Props = {
  stratagemId: string;
  iconWidth: number,
  iconHeight: number
};

export const StratagemIcon = ({ stratagemId, iconWidth, iconHeight }: Props) => {

  const SvgIcon = stratagemSvgMapper[stratagemId] || DefaultStratagem;

  if (!SvgIcon) return null;

  return (
    <View>
      <SvgIcon width={iconWidth} height={iconHeight} />
    </View>
  );
};
