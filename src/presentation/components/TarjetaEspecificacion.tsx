import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../domain/entities/types';

interface Spec {
  etiqueta: string;
  valor: string;
}

interface TarjetaEspecificacionProps {
  specs: Spec[];
  titulo?: string;
}

export function TarjetaEspecificacion({ specs, titulo }: TarjetaEspecificacionProps) {
  return (
    <View style={s.wrap}>
      {titulo && <Text style={s.titulo}>{titulo}</Text>}
      <View style={s.card}>
        {specs.map((spec, i) => (
          <View
            key={i}
            style={[s.fila, i !== specs.length - 1 && s.filaBorde]}
          >
            <Text style={s.etiqueta}>{spec.etiqueta}</Text>
            <Text style={s.valor}>{spec.valor}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { marginBottom: 16 },
  titulo:    { color: COLORS.text, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 10 },
  card:      { backgroundColor: COLORS.bgCard, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderMuted, overflow: 'hidden' },
  fila:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  filaBorde: { borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  etiqueta:  { color: COLORS.textMuted, fontSize: 13 },
  valor:     { color: COLORS.text, fontSize: 13, fontWeight: '600' },
});
