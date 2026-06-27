import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { COLORS, ItemCarrito, PRODUCTOS, Producto } from '../../domain/entities/types';
import { TarjetaProducto } from '../components';

const CATEGORIAS = [
  { nombre: 'Componentes', emoji: '🖥️', color: '#00BFFF' },
  { nombre: 'Equipos',     emoji: '💻', color: '#7B61FF' },
  { nombre: 'Periféricos', emoji: '⌨️', color: '#00FFD4' },
  { nombre: 'Gaming',      emoji: '🎮', color: '#FF6B35' },
];

function buscar(q: string): Producto[] {
  const palabras = q.toLowerCase().split(/\s+/).filter(p => p.length > 1);
  return PRODUCTOS.filter(p => {
    const t = `${p.nombre} ${p.descripcion} ${p.tags.join(' ')}`.toLowerCase();
    return palabras.some(w => t.includes(w));
  });
}

export function PantallaTienda({
  onProductoSelect, onCategoriaSelect, carrito, onAgregarCarrito,
}: {
  onProductoSelect: (p: Producto) => void;
  onCategoriaSelect: (cat: string) => void;
  carrito: ItemCarrito[];
  onAgregarCarrito: (p: Producto) => void;
}) {
  const [busqueda, setBusqueda] = useState('');
  const filtrados = busqueda.trim() ? buscar(busqueda) : [];
  const destacados = PRODUCTOS.filter(p => p.badge).slice(0, 4);

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerTop}>
          <View>
            <Text style={s.logo}><Text style={{ color: COLORS.primary }}>Ecc</Text>ommerce</Text>
            <Text style={s.logoSub}>TIENDA</Text>
          </View>
          <View style={s.headerIcons}>
            <TouchableOpacity style={s.iconBtn}>
              <Text style={s.iconBtnText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.iconBtn}>
              <Text style={s.iconBtnText}>🤍</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar productos..."
            placeholderTextColor={COLORS.textMuted}
          />
          {!!busqueda && (
            <TouchableOpacity onPress={() => setBusqueda('')}>
              <Text style={{ color: COLORS.textMuted, fontSize: 16, paddingHorizontal: 8 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {busqueda.trim() ? (
          <View style={s.section}>
            <Text style={s.sectionHint}>{filtrados.length} resultado(s) para "{busqueda}"</Text>
            {filtrados.length === 0 ? (
              <View style={s.empty}>
                <Text style={s.emptyText}>Sin resultados</Text>
              </View>
            ) : (
              <View style={s.grid}>
                {filtrados.map(p => (
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
            )}
          </View>
        ) : (
          <>
            {/* Categorías */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>CATEGORÍAS</Text>
              <View style={s.catGrid}>
                {CATEGORIAS.map(cat => (
                  <TouchableOpacity
                    key={cat.nombre}
                    onPress={() => onCategoriaSelect(cat.nombre)}
                    style={[s.catCard, { borderColor: `${cat.color}22` }]}
                    activeOpacity={0.8}
                  >
                    <Text style={{ fontSize: 22, marginBottom: 6 }}>{cat.emoji}</Text>
                    <Text style={[s.catNombre, { color: cat.color }]}>{cat.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Ofertas Destacadas */}
            <View style={s.section}>
              <View style={s.sectionRow}>
                <Text style={s.sectionTitle}>OFERTAS DESTACADAS</Text>
                <View style={s.badge}>
                  <Text style={s.badgeText}>⚡ Hasta 40% dto.</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                {destacados.map(p => {
                  const dto = Math.round(((p.precioOriginal - p.precio) / p.precioOriginal) * 100);
                  return (
                    <TouchableOpacity
                      key={p.id}
                      onPress={() => onProductoSelect(p)}
                      style={s.ofertaCard}
                      activeOpacity={0.85}
                    >
                      <View style={s.ofertaImgWrap}>
                        <View style={s.ofertaImgPlaceholder}>
                          <Text style={{ fontSize: 28 }}>🖥️</Text>
                        </View>
                        <View style={s.ofertaDto}>
                          <Text style={s.ofertaDtoText}>-{dto}%</Text>
                        </View>
                      </View>
                      <View style={{ padding: 10 }}>
                        <Text style={s.ofertaNombre} numberOfLines={2}>{p.nombre}</Text>
                        <Text style={s.ofertaPrecio}>C${p.precio.toLocaleString()}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Para Ti */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>PARA TI  📈</Text>
              <View style={[s.grid, { marginTop: 10 }]}>
                {PRODUCTOS.slice(0, 6).map(p => (
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
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:          { flex: 1, backgroundColor: COLORS.bg },
  header:             { backgroundColor: COLORS.bgCard, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  headerTop:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  logo:               { fontSize: 18, fontWeight: '900', color: COLORS.text, letterSpacing: 1 },
  logoSub:            { fontSize: 9, color: `${COLORS.primary}99`, letterSpacing: 4, marginTop: 1 },
  headerIcons:        { flexDirection: 'row', gap: 8 },
  iconBtn:            { padding: 8, borderRadius: 12, backgroundColor: '#1a2535', borderWidth: 1, borderColor: COLORS.borderMuted },
  iconBtnText:        { fontSize: 14 },
  searchWrap:         { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F1E35', borderRadius: 14, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 12 },
  searchIcon:         { fontSize: 14, marginRight: 8, color: COLORS.textMuted },
  searchInput:        { flex: 1, paddingVertical: 11, color: COLORS.text, fontSize: 14 },
  section:            { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 },
  sectionTitle:       { color: COLORS.text, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 12 },
  sectionRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionHint:        { color: COLORS.textMuted, fontSize: 12, marginBottom: 14 },
  catGrid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard:            { width: '47%', backgroundColor: COLORS.bgCard, borderRadius: 16, borderWidth: 1, padding: 16, alignItems: 'flex-start' },
  catNombre:          { fontSize: 12, fontWeight: '700' },
  badge:              { backgroundColor: 'rgba(229,57,53,0.12)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText:          { color: '#EF5350', fontSize: 10, fontWeight: '700' },
  ofertaCard:         { width: 148, marginRight: 12, backgroundColor: COLORS.bgCard, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderMuted, overflow: 'hidden' },
  ofertaImgWrap:      { height: 130, backgroundColor: '#0F1E35', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  ofertaImgPlaceholder:{ alignItems: 'center', justifyContent: 'center' },
  ofertaDto:          { position: 'absolute', top: 8, right: 8, backgroundColor: '#E53935', borderRadius: 20, paddingHorizontal: 6, paddingVertical: 2 },
  ofertaDtoText:      { color: '#fff', fontSize: 9, fontWeight: '700' },
  ofertaNombre:       { color: COLORS.text, fontSize: 11, fontWeight: '500', lineHeight: 14, marginBottom: 6 },
  ofertaPrecio:       { color: COLORS.primary, fontSize: 11, fontWeight: '700' },
  grid:               { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  gridItem:           { width: '47%' },
  empty:              { alignItems: 'center', paddingVertical: 40 },
  emptyText:          { color: COLORS.textMuted, fontSize: 14 },
});
