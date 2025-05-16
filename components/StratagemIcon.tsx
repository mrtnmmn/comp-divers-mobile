import DefaultStratagem from '@/assets/images/stratagems/orbital_railcannon_strike.svg';
import { stratagemSvgMapper } from '@/mappers/stratagemSvgMapper';
import React from 'react';
import { View } from 'react-native';

type Props = {
  stratagemId: string;
};

export const StratagemIcon = ({ stratagemId }: Props) => {

  const SvgIcon = stratagemSvgMapper[stratagemId] || DefaultStratagem;

  if (!SvgIcon) return null;

  return (
    <View>
      <SvgIcon width={70} height={70} />
    </View>
  );
};
