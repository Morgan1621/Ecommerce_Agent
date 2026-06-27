// src/app/index.tsx
import { PantallaLogin } from '@/presentation/screens/';
import { View } from 'react-native';

export default function PantallaInicial() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A1220' }}>
      <PantallaLogin 
        onLogin={(usuario) => console.log('Login:', usuario)} 
        onIrRegistro={() => console.log('Registro')} 
        onContinuarSinCuenta={() => console.log('Invitado')} 
        usuarios={[]} 
      />
    </View>
  );
}