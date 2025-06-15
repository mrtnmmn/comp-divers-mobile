//Armor passives
import peakphysique from '@/assets/images/passives/0a9d5171-ba90-4585-8bcb-f320d9837c28.png'
import fortified from '@/assets/images/passives/12d71fad-e979-404a-aab3-fba475cbbf0f.png'
import extrapadding from '@/assets/images/passives/2cc710a3-9964-4e59-9d90-113c39207025.png'
import engineeringkit from '@/assets/images/passives/2e52f0e1-1d15-45b1-ad90-c029dc838fe2.png'
import inflammable from '@/assets/images/passives/49b7e9bd-be44-4e52-9d84-e2d149fc1815.png'
import scout from '@/assets/images/passives/58a9f084-edac-4512-a184-242f387a19a8.png'
import gunslinger from '@/assets/images/passives/5b3a3d63-1ed4-45c2-bc77-0dab4844e859.png'
import integratedexplosives from '@/assets/images/passives/68245c97-f418-4d61-9d65-c05c3bfffeb6.png'
import medkit from '@/assets/images/passives/6ed9ed77-6c4f-4b7b-8555-17ec912e9d99.png'
import advancedfiltration from '@/assets/images/passives/abd8552b-d3e0-491f-8255-72773482f0bf.png'
import unflinching from '@/assets/images/passives/b4a6e483-6695-46f8-983b-c39cd78ed385.png'
import siegeready from '@/assets/images/passives/c4c5f59e-1291-4466-a650-d3c2a8b196ff.png'
import acclimated from '@/assets/images/passives/d75ed2ef-bb8b-47aa-b725-3927589d3888.png'
import servoassisted from '@/assets/images/passives/da89050a-adb2-4c9b-a498-8226404faf0f.png'
import electricalconduit from '@/assets/images/passives/f5e6841b-734d-4033-84f7-ac51ede231a9.png'
import democracyprotects from '@/assets/images/passives/fb62b41b-c1eb-45b2-a454-4baf5e3bf207.png'

export const passivePngMapper: Record<string, number> = {
  //Armor passives
'abd8552b-d3e0-491f-8255-72773482f0bf': advancedfiltration, 
'fb62b41b-c1eb-45b2-a454-4baf5e3bf207': democracyprotects,
'f5e6841b-734d-4033-84f7-ac51ede231a9': electricalconduit,
'2e52f0e1-1d15-45b1-ad90-c029dc838fe2': engineeringkit,
'2cc710a3-9964-4e59-9d90-113c39207025': extrapadding,
'12d71fad-e979-404a-aab3-fba475cbbf0f': fortified,
'49b7e9bd-be44-4e52-9d84-e2d149fc1815': inflammable,
'6ed9ed77-6c4f-4b7b-8555-17ec912e9d99': medkit,
'0a9d5171-ba90-4585-8bcb-f320d9837c28': peakphysique,
'58a9f084-edac-4512-a184-242f387a19a8': scout,
'da89050a-adb2-4c9b-a498-8226404faf0f': servoassisted,
'b4a6e483-6695-46f8-983b-c39cd78ed385': unflinching,
'c4c5f59e-1291-4466-a650-d3c2a8b196ff': siegeready,
'd75ed2ef-bb8b-47aa-b725-3927589d3888': acclimated,
'68245c97-f418-4d61-9d65-c05c3bfffeb6': integratedexplosives,
'5b3a3d63-1ed4-45c2-bc77-0dab4844e859': gunslinger
};