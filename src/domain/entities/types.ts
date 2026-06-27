export type Tab = 'chatbot' | 'carrito' | 'tienda' | 'perfil';
export type FlujoPantalla = 'login' | 'registro' | 'app';

export interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioOriginal: number;
  rating: number;
  resenas: number;
  imagen: string;
  badge?: string;
  categoria: string;
  descripcion: string;
  specs: { etiqueta: string; valor: string }[];
  tags: string[];
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface MensajeChat {
  id: number;
  rol: 'bot' | 'usuario';
  texto: string;
  hora: string;
  productos?: Producto[];
}

export const COLORS = {
  bg: '#0A0A0A',
  bgCard: '#0D1525',
  bgCard2: '#0a1628',
  primary: '#00BFFF',
  primaryDark: '#0060CC',
  border: 'rgba(0,191,255,0.15)',
  borderMuted: 'rgba(255,255,255,0.08)',
  text: '#E8EDF5',
  textMuted: '#5A7A9A',
  textMuted2: '#3A5570',
  red: '#E53935',
  green: '#34D399',
  amber: '#FBBF24',
};

export const PRODUCTOS: Producto[] = [
  {
    id: 1, nombre: 'Kingston Fury Beast DDR5 32GB 6000MHz', precio: 3490, precioOriginal: 4800,
    rating: 4.8, resenas: 1243, categoria: 'Componentes',
    imagen: 'https://images.unsplash.com/photo-1542978709-19c95dc3bc7e?w=400&h=400&fit=crop',
    badge: 'Más vendido', descripcion: 'Memoria RAM DDR5 32GB de alta velocidad para gaming y workstations.',
    specs: [{ etiqueta: 'Tipo', valor: 'DDR5' }, { etiqueta: 'Capacidad', valor: '32GB' }, { etiqueta: 'Velocidad', valor: '6000MHz' }],
    tags: ['ram', 'memoria', 'ddr5', '32gb', 'kingston'],
  },
  {
    id: 2, nombre: 'SSD NVMe Samsung 990 Pro 1TB M.2', precio: 2490, precioOriginal: 3500,
    rating: 4.9, resenas: 4321, categoria: 'Componentes',
    imagen: 'https://images.unsplash.com/photo-1756836857570-127b0408b676?w=400&h=400&fit=crop',
    badge: 'Más vendido', descripcion: 'SSD NVMe Gen4 con velocidades de 7450 MB/s.',
    specs: [{ etiqueta: 'Interfaz', valor: 'PCIe Gen4' }, { etiqueta: 'Lectura', valor: '7450 MB/s' }, { etiqueta: 'Capacidad', valor: '1TB' }],
    tags: ['ssd', 'nvme', 'samsung', '1tb'],
  },
  {
    id: 3, nombre: 'Tarjeta Gráfica RTX 4070 SUPER 12GB ASUS', precio: 16990, precioOriginal: 21000,
    rating: 4.9, resenas: 872, categoria: 'Componentes',
    imagen: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=400&fit=crop',
    badge: 'Top', descripcion: 'GPU NVIDIA RTX 4070 SUPER con 12GB GDDR6X.',
    specs: [{ etiqueta: 'VRAM', valor: '12GB GDDR6X' }, { etiqueta: 'CUDA', valor: '7168 cores' }, { etiqueta: 'TDP', valor: '220W' }],
    tags: ['gpu', 'rtx', '4070', 'nvidia'],
  },
  {
    id: 4, nombre: 'Laptop Gaming ASUS ROG Strix G16 RTX 4070', precio: 34999, precioOriginal: 42000,
    rating: 4.8, resenas: 987, categoria: 'Equipos',
    imagen: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
    badge: 'Más vendido', descripcion: 'Laptop gaming con RTX 4070 y pantalla QHD 240Hz.',
    specs: [{ etiqueta: 'CPU', valor: 'Intel i9-13980HX' }, { etiqueta: 'GPU', valor: 'RTX 4070 8GB' }, { etiqueta: 'RAM', valor: '16GB DDR5' }],
    tags: ['laptop', 'gaming', 'asus', 'rog'],
  },
  {
    id: 5, nombre: 'Teclado Mecánico Keychron Q1 Pro QMK', precio: 2890, precioOriginal: 3900,
    rating: 4.9, resenas: 4231, categoria: 'Periféricos',
    imagen: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&h=400&fit=crop',
    badge: 'Más vendido', descripcion: 'Teclado mecánico wireless QMK/VIA con junta flotante.',
    specs: [{ etiqueta: 'Layout', valor: '75% 84 teclas' }, { etiqueta: 'Switches', valor: 'Gateron' }, { etiqueta: 'Batería', valor: '4000mAh' }],
    tags: ['teclado', 'mecanico', 'keychron'],
  },
  {
    id: 6, nombre: 'Mouse Gaming Logitech G Pro X Superlight 2', precio: 2490, precioOriginal: 3500,
    rating: 4.8, resenas: 2987, categoria: 'Periféricos',
    imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    badge: 'Top', descripcion: 'Mouse gaming ultra ligero de 60g con sensor HERO 2.',
    specs: [{ etiqueta: 'Peso', valor: '60g' }, { etiqueta: 'Sensor', valor: 'HERO 2 32K DPI' }, { etiqueta: 'Batería', valor: '95h' }],
    tags: ['mouse', 'gaming', 'logitech'],
  },
];
