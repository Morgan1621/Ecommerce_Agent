import { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../domain/entities/types';

interface CampoTextoProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  esPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onSubmitEditing?: () => void;
}

export function CampoTexto({
  label, value, onChangeText, placeholder = '',
  esPassword = false, keyboardType = 'default',
  autoCapitalize = 'sentences', onSubmitEditing,
}: CampoTextoProps) {
  const [verPass, setVerPass] = useState(false);

  return (
    <View style={s.wrap}>
      <Text style={s.label}>{label}</Text>

      {esPassword ? (
        <View style={s.passWrap}>
          <TextInput
            style={[s.input, { flex: 1, borderWidth: 0 }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textMuted2}
            secureTextEntry={!verPass}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={() => setVerPass(!verPass)} style={s.eyeBtn}>
            <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>
              {verPass ? '🙈' : '👁'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={s.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted2}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap:    { marginBottom: 14 },
  label:   { color: COLORS.textMuted, fontSize: 12, fontWeight: '500', marginBottom: 6 },
  input:   { backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
  passWrap:{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14 },
  eyeBtn:  { padding: 6 },
});
