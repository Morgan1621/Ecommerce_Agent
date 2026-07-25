import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, Producto } from '../domain/entities/types';

type Props = {
  producto: Producto;
  cantidad: number;
  onEliminar: (id: number) => void;
  onActualizarCantidad: (id: number, delta: number) => void;
  onProductoSelect: (p: Producto) => void;
};

export function ItemCarrito({ producto, cantidad, onEliminar, onActualizarCantidad, onProductoSelect }: Props) {
  return (
    <View style={s.item}>
      <TouchableOpacity onPress={() => onProductoSelect(producto)} style={s.itemImg}>
        <Image source={{ uri: producto.imagen }} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={s.itemCat}>{producto.categoria}</Text>
        <Text style={s.itemNombre} numberOfLines={2}>{producto.nombre}</Text>
        <Text style={s.itemPrecio}>C${(producto.precio * cantidad).toLocaleString()}</Text>
      </View>
      <View style={s.itemActions}>
        <TouchableOpacity onPress={() => onEliminar(producto.id)}>
          <Text style={{ color: '#EF5350', fontSize: 16 }}>🗑</Text>
        </TouchableOpacity>
        <View style={s.counter}>
          <TouchableOpacity onPress={() => onActualizarCantidad(producto.id, -1)} style={s.counterBtn}>
            <Text style={s.counterBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={s.counterNum}>{cantidad}</Text>
          <TouchableOpacity onPress={() => onActualizarCantidad(producto.id, 1)} style={s.counterBtn}>
            <Text style={s.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  item: { flexDirection: 'row', gap: 12, padding: 12, backgroundColor: COLORS.bgCard, borderRadius: 18, borderWidth: 1, borderColor: COLORS.borderMuted },
  itemImg: { width: 64, height: 64, borderRadius: 12, overflow: 'hidden', backgroundColor: '#0F1E35' },
  itemCat: { color: COLORS.primary, fontSize: 10, fontWeight: '600', marginBottom: 2 },
  itemNombre: { color: COLORS.text, fontSize: 12, fontWeight: '600', lineHeight: 15, marginBottom: 4 },
  itemPrecio: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
  itemActions: { alignItems: 'flex-end', justifyContent: 'space-between' },
  counter: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderMuted, overflow: 'hidden' },
  counterBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  counterBtnText: { color: COLORS.textMuted, fontSize: 14, fontWeight: '700' },
  counterNum: { color: COLORS.text, fontSize: 12, fontWeight: '700', width: 20, textAlign: 'center' },
});
