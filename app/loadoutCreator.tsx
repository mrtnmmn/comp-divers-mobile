import { ArmorPassiveTouchableSelector } from "@/components/ArmorPassiveTouchableSelector";
import { ArmorTouchableSelector } from "@/components/ArmorTouchableSelector";
import { FactionSelector } from "@/components/FactionSelector";
import { StratagemSelector } from "@/components/StratagemSelector";
import { ThemedText } from "@/components/ThemedText";
import { TouchableSelector } from "@/components/TouchableSelector";
import { useAuth } from "@/contexts/AuthContext";
import { Armor } from "@/interfaces/Armor";
import { ArmorPassive } from "@/interfaces/ArmorPassive";
import { Booster } from "@/interfaces/Booster";
import { Faction } from "@/interfaces/Faction";
import { LoadoutForm, LoadoutRequest } from "@/interfaces/Loadout";
import { PrimaryWeapon } from "@/interfaces/PrimaryWeapon";
import { SecondaryWeapon } from "@/interfaces/SecondaryWeapon";
import { Stratagem } from "@/interfaces/Stratagem";
import { Throwable } from "@/interfaces/Trowable";
import { apiFetch } from "@/utils/api";
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { GestureResponderEvent, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SaveButtonProps {
  title: string
  onPress: ((event: GestureResponderEvent) => void)
}

const SaveButton = ({ title, onPress }: SaveButtonProps) => {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </Pressable>
  )
}

const transformLoadoutFormToRequest = (loadoutForm: LoadoutForm): LoadoutRequest => {
  return {
    name: loadoutForm.name,
    description: loadoutForm.description,
    primaryWeapon: loadoutForm.primaryWeapon?.uuid ?? '',
    secondaryWeapon: loadoutForm.secondaryWeapon?.uuid ?? '',
    throwable: loadoutForm.throwable?.uuid ?? '',
    armor: loadoutForm.armor?.uuid ?? '',
    armorPassive: loadoutForm.armorPassive?.uuid ?? '',
    stratagems: loadoutForm.stratagems.map(s => s.uuid),
    booster: loadoutForm.booster?.uuid ?? '',
    factions: loadoutForm.factions?.map(f => f.uuid) ?? []
  };
}

export default function LoadoutCreator() { 
  const router = useRouter()
  const { token } = useAuth();
  const [data, setData] = useState<any>(null)
  const [form, setForm] = useState<LoadoutForm>({
    name: '',
    description: '',
    armor: null,
    armorPassive: null,
    primaryWeapon: null,
    secondaryWeapon: null,
    throwable: null,
    stratagems: [],
    booster: null,
    factions: []
  })

  useEffect(() => {
    const loadData = async () => {
      if(!token) { 
        return;
      }

      const armorsData = await apiFetch<Armor[]>('/armors', {
        method: 'GET',
        token: token
      })
      const armorPassivesData = await apiFetch<ArmorPassive[]>('/armor-passives', {
        method: 'GET',
        token: token
      })
      const primaryWeaponsData = await apiFetch<PrimaryWeapon[]>('/primary-weapons', {
        method: 'GET',
        token: token
      })
      const secondaryWeaponsData = await apiFetch<SecondaryWeapon[]>('/secondary-weapons', {
        method: 'GET',
        token: token
      })
      const throwablesData = await apiFetch<Throwable[]>('/throwables', {
        method: 'GET',
        token: token
      })
      const stratagemsData = await apiFetch<Stratagem[]>('/stratagems', {
        method: 'GET',
        token: token
      })
      const boostersData = await apiFetch<Booster[]>('/boosters', {
        method: 'GET',
        token: token
      })
      const factionsData = await apiFetch<Faction[]>('/factions', {
        method: 'GET',
        token: token
      })
      setData({
        armorsData,
        armorPassivesData,
        primaryWeaponsData,
        secondaryWeaponsData,
        throwablesData,
        stratagemsData,
        boostersData,
        factionsData
      })
    }
    loadData()
  }, [])

  const handleFormChange = (key: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const saveForm = async () => {
    const body: LoadoutRequest = transformLoadoutFormToRequest(form)

    if(!token) { 
      return;
    }

    const response = await apiFetch<SecondaryWeapon[]>('/loadouts', {
      method: 'POST',
      token: token,
      body
    })

    router.replace('/')
  }

  return (
    <ScrollView style={{backgroundColor: '#151718'}}>
      <View style={styles.container}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.replace('/')}>
              <FontAwesome name="arrow-left" size={30} color="#fff" style={{marginBottom: 25}}/>
            </TouchableOpacity>  
            <ThemedText type="title" style={[styles.titles, {marginBottom: 20, marginLeft: 10}]}>Creating New Loadout:</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.titles}>Loadout name:</ThemedText>
          <TextInput 
            style={styles.input}
            placeholder="Enter loadout name"
            value={form.name}
            onChangeText={text => handleFormChange('name', text)}
            autoCapitalize="sentences"
          />
          <ThemedText type="subtitle" style={styles.titles}>Loadout description:</ThemedText>
          <TextInput 
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder="Enter loadout description"
            value={form.description}
            onChangeText={text => handleFormChange('description', text)}
            autoCapitalize="sentences"
            multiline={true}
            numberOfLines={4}
          />
          <ThemedText type="subtitle" style={styles.titles}>Armor:</ThemedText>
          <ArmorTouchableSelector
            options={data !== null && data.armorsData !== null ? data.armorsData: []} 
            selected={form.armor}
            onSelect={armor => handleFormChange('armor', armor)}
          />
          <ThemedText type="subtitle" style={styles.titles}>Armor Passive:</ThemedText>
          <ArmorPassiveTouchableSelector
            options={data !== null && data.armorPassivesData !== null ? data.armorPassivesData: []} 
            selected={form.armorPassive}
            onSelect={arrmorPassive => handleFormChange('armorPassive', arrmorPassive)}
          />
          <ThemedText type="subtitle" style={styles.titles}>Primary weapon:</ThemedText>
          <TouchableSelector 
            options={data !== null && data.primaryWeaponsData !== null ? data.primaryWeaponsData: []} 
            selected={form.primaryWeapon}
            onSelect={handleFormChange}
            selectionKey={'primaryWeapon'}
          />
          <ThemedText type="subtitle" style={styles.titles}>Secondary weapon:</ThemedText>
          <TouchableSelector 
            options={data !== null && data.secondaryWeaponsData !== null ? data.secondaryWeaponsData: []} 
            selected={form.secondaryWeapon}
            onSelect={handleFormChange}
            selectionKey={'secondaryWeapon'}
          />
          <ThemedText type="subtitle" style={styles.titles}>Throwables:</ThemedText>
          <TouchableSelector 
            options={data !== null && data.throwablesData !== null ? data.throwablesData: []} 
            selected={form.throwable}
            onSelect={handleFormChange}
            selectionKey={'throwable'}
          />
          <ThemedText type="subtitle" style={styles.titles}>Stratagems:</ThemedText>
          <StratagemSelector 
            options={data !== null && data.stratagemsData !== null ? data.stratagemsData : []}
            selected={form.stratagems}
            onChange={stratagems => handleFormChange('stratagems' , stratagems)}
            maxSelections={4}
          />
          <ThemedText type="subtitle" style={styles.titles}>Booster:</ThemedText>
          <TouchableSelector 
            options={data !== null && data.boostersData !== null ? data.boostersData: []} 
            selected={form.booster}
            onSelect={handleFormChange}
            selectionKey={'booster'}
          />
          <ThemedText type="subtitle" style={styles.titles}>Faction:</ThemedText>
          <FactionSelector 
            options={data !== null && data.factionsData !== null ? data.factionsData: []}
            onSelect={factions => handleFormChange('factions', factions)}/>
          <SaveButton title="Save Loadout" onPress={saveForm}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#151718',
    paddingTop: 70,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffe900',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 15,
    color: '#ffe900',
    backgroundColor: '#1e1f21'
  },
  titles: {
    color: "#ffe900",
    marginBottom: 8
  },
  button: {
    backgroundColor: '#ffe900',
    color: '#151718',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 50,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressed: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#151718',
    fontSize: 16,
    fontWeight: '600',
  },
})