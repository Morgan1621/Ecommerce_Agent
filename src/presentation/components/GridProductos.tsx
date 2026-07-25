import { StyleSheet, View } from 'react-native';
import { ItemCarrito, Producto } from '../domain/entities/types';
import { TarjetaProducto } from './TarjetaProducto';

type Props = {
  productos: Producto[];
  carrito: ItemCarrito[];
  onProductoSelect: (p: Producto) => void;
  onAgregarCarrito: (p: Producto) => void;
};

export function GridProductos({ productos, carrito, onProductoSelect, onAgregarCarrito }: Props) {
  return (
    <View style={s.grid}>
      {productos.map(p => (
        <View key={p.id} style={s.gridItem}>
          <TarjetaProducto
            producto={p}
            onPress={() => onProductoSelect(p)}
            enCarrito={carrito.some(c => c.producto.id === p.id)}
            onAgregar={() => onAgregarCarrito(p)}
          />
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  gridItem: { width: '47%' },
});
