import motivationalshocks from '@/assets/images/boosters/0af59c7c-2194-49d8-9df9-5af199132457.svg'
import expertextractionpilot from '@/assets/images/boosters/13ee0176-2ebb-452f-9cb6-6166535dfaf7.svg'
import experimentalinfusion from '@/assets/images/boosters/288df6b2-8eb8-48d0-ab31-e3c0eb4283c9.svg'
import increasedreinforcementbudget from '@/assets/images/boosters/392b0e67-158b-4521-83de-fe7325dd74cc.svg'
import armedresupplypods from '@/assets/images/boosters/4d1a009c-c063-46d4-ac5b-f5277d0976c3.svg'
import deadsprint from '@/assets/images/boosters/4f49e391-ba21-446e-8f34-a82f0a321365.svg'
import flexiblereinforcementbudget from '@/assets/images/boosters/6104d96a-c873-488f-bf12-57ab63ebfdc2.svg'
import uavreconbooster from '@/assets/images/boosters/63cc4d69-19b6-4dd7-923c-df8c02218fe5.svg'
import staminaenhancement from '@/assets/images/boosters/74019b0a-5b64-45f3-8ed0-5d2d50d6f40b.svg'
import localizedconfusion from '@/assets/images/boosters/7dcee553-cc7c-45aa-bcc6-77cf124534b2.svg'
import muscleenhancement from '@/assets/images/boosters/84029b53-39a3-4637-af31-9fe77e409565.svg'
import vitalityenhancement from '@/assets/images/boosters/91d47237-5589-4b9b-b3af-9cb215c62095.svg'
import hellpodspaceoptimization from '@/assets/images/boosters/a8948728-95ac-4112-8413-8d9935803655.svg'
import firebombhellpods from '@/assets/images/boosters/c505df3a-2bed-4ede-bbf3-748610e2626f.svg'

import { SvgProps } from 'react-native-svg'

export const BoosterSvgMapper: Record<string, React.FC<SvgProps>> = {
'a8948728-95ac-4112-8413-8d9935803655': hellpodspaceoptimization,
'91d47237-5589-4b9b-b3af-9cb215c62095': vitalityenhancement,
'63cc4d69-19b6-4dd7-923c-df8c02218fe5': uavreconbooster,
'74019b0a-5b64-45f3-8ed0-5d2d50d6f40b': staminaenhancement,
'84029b53-39a3-4637-af31-9fe77e409565': muscleenhancement,
'392b0e67-158b-4521-83de-fe7325dd74cc': increasedreinforcementbudget,
'6104d96a-c873-488f-bf12-57ab63ebfdc2': flexiblereinforcementbudget,
'7dcee553-cc7c-45aa-bcc6-77cf124534b2': localizedconfusion,
'13ee0176-2ebb-452f-9cb6-6166535dfaf7': expertextractionpilot,
'4f49e391-ba21-446e-8f34-a82f0a321365': deadsprint,
'c505df3a-2bed-4ede-bbf3-748610e2626f': firebombhellpods,
'288df6b2-8eb8-48d0-ab31-e3c0eb4283c9': experimentalinfusion,
'0af59c7c-2194-49d8-9df9-5af199132457': motivationalshocks,
'4d1a009c-c063-46d4-ac5b-f5277d0976c3': armedresupplypods
};