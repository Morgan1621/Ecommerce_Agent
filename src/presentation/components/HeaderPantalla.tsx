import {
  StyleSheet,
  Text, TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../domain/entities/types';

interface HeaderPantallaProps {
  titulo: string;
  subtitulo?: string;
  onBack?: () => void;
  accionDerecha?: {
    icono: string;
    onPress: () => void;
    badge?: boolean;
  };
  accionDerecha2?: {
    icono: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function HeaderPantalla({
  titulo, subtitulo, onBack,
  accionDerecha, accionDerecha2, style,
}: HeaderPantallaProps) {
  return (
    <View style={[s.header, style]}>

      {/* Izquierda: back o logo */}
      <View style={s.izquierda}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={s.backBtn}>
            <Text style={s.backIcon}>←</Text>
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={s.titulo}>{titulo}</Text>
          {subtitulo ? <Text style={s.subtitulo}>{subtitulo}</Text> : null}
        </View>
      </View>

      {/* Derecha: acciones opcionales */}
      {(accionDerecha || accionDerecha2) && (
        <View style={s.derecha}>
          {accionDerecha2 && (
            <TouchableOpacity onPress={accionDerecha2.onPress} style={s.iconBtn}>
              <Text style={s.iconBtnText}>{accionDerecha2.icono}</Text>
            </TouchableOpacity>
          )}
          {accionDerecha && (
            <TouchableOpacity onPress={accionDerecha.onPress} style={s.iconBtn}>
              <Text style={s.iconBtnText}>{accionDerecha.icono}</Text>
              {accionDerecha.badge && <View style={s.badgeDot} />}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: COLORS.bgCard, borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  izquierda: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  backBtn:   { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1a2535', borderWidth: 1, borderColor: COLORS.borderMuted, alignItems: 'center', justifyContent: 'center' },
  backIcon:  { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  titulo:    { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  subtitulo: { color: COLORS.primary, fontSize: 9, letterSpacing: 3, marginTop: 1 },
  derecha:   { flexDirection: 'row', gap: 8 },
  iconBtn:   { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1a2535', borderWidth: 1, borderColor: COLORS.borderMuted, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  iconBtnText:{ fontSize: 15 },
  badgeDot:  { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, borderWidth: 1.5, borderColor: COLORS.bgCard },
});
