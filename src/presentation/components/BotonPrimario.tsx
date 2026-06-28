import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../domain/entities/types';

interface BotonPrimarioProps {
  texto: string;
  onPress: () => void;
  cargando?: boolean;
  disabled?: boolean;
  variante?: 'primario' | 'secundario' | 'peligro' | 'outline';
  icono?: string;
  style?: ViewStyle;
}

export function BotonPrimario({
  texto, onPress, cargando = false,
  disabled = false, variante = 'primario',
  icono, style,
}: BotonPrimarioProps) {

  const estiloBoton = {
    primario:   { backgroundColor: COLORS.primary,              borderColor: COLORS.primary },
    secundario: { backgroundColor: 'rgba(0,191,255,0.05)',      borderColor: COLORS.border },
    peligro:    { backgroundColor: 'rgba(229,57,53,0.15)',      borderColor: 'rgba(229,57,53,0.4)' },
    outline:    { backgroundColor: 'rgba(0,0,0,0.2)',           borderColor: COLORS.borderMuted },
  }[variante];

  const estiloTexto = {
    primario:   '#ffffff',
    secundario: COLORS.primary,
    peligro:    '#EF5350',
    outline:    COLORS.textMuted,
  }[variante];

  const sombra = variante === 'primario'
    ? { shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 }
    : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || cargando}
      activeOpacity={0.85}
      style={[s.boton, estiloBoton, sombra, disabled && s.disabled, style]}
    >
      {cargando ? (
        <ActivityIndicator color={estiloTexto} size="small" />
      ) : (
        <Text style={[s.texto, { color: estiloTexto }]}>
          {icono ? `${icono}  ${texto}` : texto}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  boton:   { paddingVertical: 14, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  texto:   { fontWeight: '700', fontSize: 14 },
  disabled:{ opacity: 0.5 },
});
