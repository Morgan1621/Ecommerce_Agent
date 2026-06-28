import { COLORS, ItemCarrito, Producto, Usuario } from '@/domain/entities/types';
import { NavInferior } from '@/presentation/components';
import { PantallaCarrito, PantallaPerfil } from '@/presentation/screens/pantallaCarritoYPerfil';
import { PantallaChatBot } from '@/presentation/screens/pantallaChatBot';
import { PantallaLogin } from '@/presentation/screens/pantallaLogin';
import { PantallaRegistro } from '@/presentation/screens/pantallaRegistro';
import { PantallaTienda } from '@/presentation/screens/pantallaTienda';
import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';

type Flujo = 'login' | 'registro' | 'app';
type Tab   = 'tienda' | 'chatbot' | 'carrito' | 'perfil';

const USUARIOS_INICIALES: Usuario[] = [
  { nombre: 'Jordan Díaz', email: 'jordan@eccommerce.com', password: 'demo123' },
];

export default function App() {
  const [flujo, setFlujo]                 = useState<Flujo>('login');
  const [usuarios, setUsuarios]           = useState<Usuario[]>(USUARIOS_INICIALES);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [tab, setTab]                     = useState<Tab>('tienda');
  const [carrito, setCarrito]             = useState<ItemCarrito[]>([]);

  // ── Funciones ──
  function agregarCarrito(p: Producto) {
    setCarrito(prev => {
      const ex = prev.find(c => c.producto.id === p.id);
      if (ex) return prev.map(c => c.producto.id === p.id ? { ...c, cantidad: c.cantidad + 1 } : c);
      return [...prev, { producto: p, cantidad: 1 }];
    });
  }
  function actualizarCantidad(id: number, d: number) {
    setCarrito(prev => prev.map(c => c.producto.id === id ? { ...c, cantidad: c.cantidad + d } : c).filter(c => c.cantidad > 0));
  }
  const cantCarrito = carrito.reduce((s, c) => s + c.cantidad, 0);

  // ── Login ──
  if (flujo === 'login') return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <PantallaLogin
        usuarios={usuarios}
        onLogin={(u) => { setUsuarioActual(u); setFlujo('app'); }}
        onIrRegistro={() => setFlujo('registro')}
        onContinuarSinCuenta={() => { setUsuarioActual(null); setFlujo('app'); }}
      />
    </View>
  );

  // ── Registro ──
  if (flujo === 'registro') return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <PantallaRegistro
        onRegistro={(u) => { setUsuarios(p => [...p, u]); setUsuarioActual(u); setFlujo('app'); }}
        onIrLogin={() => setFlujo('login')}
        onContinuarSinCuenta={() => { setUsuarioActual(null); setFlujo('app'); }}
      />
    </View>
  );

  // ── App principal ──
  let pantalla: React.ReactNode;
  if (tab === 'tienda')       pantalla = <PantallaTienda onProductoSelect={() => {}} onCategoriaSelect={() => {}} carrito={carrito} onAgregarCarrito={agregarCarrito} />;
  else if (tab === 'chatbot') pantalla = <PantallaChatBot onVerProducto={() => {}} carrito={carrito} onAgregarCarrito={agregarCarrito} />;
  else if (tab === 'carrito') pantalla = <PantallaCarrito carrito={carrito} onActualizarCantidad={actualizarCantidad} onEliminar={(id) => setCarrito(p => p.filter(c => c.producto.id !== id))} onProductoSelect={() => {}} />;
  else                        pantalla = <PantallaPerfil usuario={usuarioActual} onLogout={() => { setUsuarioActual(null); setFlujo('login'); setCarrito([]); setTab('tienda'); }} />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>{pantalla}</View>
      <NavInferior activo={tab} onCambioTab={t => setTab(t)} cantCarrito={cantCarrito} />
    </View>
  );
}