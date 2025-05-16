import HeavyMachineGun from '@/assets/images/stratagems/618ee980-aaaf-499d-afc4-c4a0a816b9e4.svg';
import Railgun from '@/assets/images/stratagems/a21139a2-4ecb-4f0c-91b9-6cb1c2155729.svg';

import { SvgProps } from 'react-native-svg';

export const stratagemSvgMapper: Record<string, React.FC<SvgProps>> = {
  'a21139a-4ecb-4f0c-91b9-6cb1c2155729': Railgun,
  '618ee980-aaaf-499d-afc4-c4a0a816b9e4': HeavyMachineGun,
};