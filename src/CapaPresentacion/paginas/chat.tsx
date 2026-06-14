import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


// Definimos la estructura de un mensaje
interface Mensaje {
  id: string;
  texto: string;
  remitente: "usuario" | "bot";
  hora: string;
}

export default function PaginaChat() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      texto: "¡Hola! Soy NexBot. ¿En qué puedo ayudarte hoy?",
      remitente: "bot",
      hora: "10:00 AM",
    }
  ]);


  const seleccionarDocumento = async () => 
{ console.log("¡El botón del clip fue presionado con éxito!");
  try {
    const resultado = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Permite cualquier tipo de archivo (PDF, Word, Excel, etc.)
      copyToCacheDirectory: true,
    });

    // Si el usuario no canceló la selección, aquí tienes los datos del archivo
    if (!resultado.canceled) {
      const archivo = resultado.assets[0];
      console.log("Archivo seleccionado:", archivo.name, archivo.uri);

      // Aquí podrías guardar el archivo en el estado o mandarlo a tu Capa de Negocio
      alert(`Archivo seleccionado: ${archivo.name}`);
    }
  } catch (error) {
    console.log("Error al seleccionar el documento:", error);
  }
};

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;

    const mensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      texto: nuevoMensaje.trim(),
      remitente: "usuario",
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);
    setNuevoMensaje("");

    // Simulamos la respuesta tecnológica del Bot
    setEstaEscribiendo(true);
    setTimeout(() => {
      const respuestaBot: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: "Entendido. Estoy procesando tu solicitud con NexBot Engine v2.4... ⚡",
        remitente: "bot",
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMensajes((prev) => [...prev, respuestaBot]);
      setEstaEscribiendo(false);
    }, 1500);
  };

  // Renderizado de cada globo de mensaje
  const renderItem = ({ item }: { item: Mensaje }) => {
    const esUsuario = item.remitente === "usuario";
    return (
      <View style={[styles.contenedorFila, esUsuario ? styles.filaUsuario : styles.filaBot]}>
        {!esUsuario && (
          <Image 
            source={require("@/assets/images/transparante.jpeg")} 
            style={styles.avatarChat} 
          />
        )}
        <View style={[styles.globo, esUsuario ? styles.globoUsuario : styles.globoBot]}>
          <Text style={[styles.textoMensaje, esUsuario ? styles.textoUsuario : styles.textoBot]}>
            {item.texto}
          </Text>
          <Text style={[styles.textoHora, esUsuario ? styles.horaUsuario : styles.horaBot]}>
            {item.hora}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.contenedorPantalla}>
      {/* 1. HEADER TECNOLÓGICO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBoton}>
          <Ionicons name="arrow-back" size={24} color="#2C1B10" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitulo}>Agente NexBot</Text>
          <View style={styles.contenedorEstado}>
            <View style={styles.puntoEnLinea} />
            <Text style={styles.headerSubtitulo}>En línea</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerBoton}>
          <FontAwesome5 name="ellipsis-v" size={18} color="#2C1B10" />
        </TouchableOpacity>
      </View>

      {/* 2. LISTA DE MENSAJES */}
      <FlatList
        ref={flatListRef}
        data={mensajes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenido}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Indicador de "Escribiendo..." */}
      {estaEscribiendo && (
        <View style={styles.contenedorEscribiendo}>
          <Text style={styles.textoEscribiendo}>NexBot está pensando...</Text>
        </View>
      )}

      {/* 3. INPUT DE TEXTO / BARRA INFERIOR */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.barraEntrada}>
          <View style={styles.contenedorInput}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje a NexBot..."
              placeholderTextColor="#A0A0A0"
              multiline
              value={nuevoMensaje}
              onChangeText={setNuevoMensaje}
            />
            <TouchableOpacity 
                style={styles.botonClip} 
                onPress={seleccionarDocumento} 
                activeOpacity={0.7}>
                <Ionicons name="attach" size={22} color="#5985a9" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.botonEnviar, !nuevoMensaje.trim() && styles.botonEnviarDeshabilitado]} 
            onPress={enviarMensaje}
            disabled={!nuevoMensaje.trim()}
          >
            <Ionicons name="send" size={20} color="#5983b3" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  contenedorPantalla: {
    flex: 1,
    backgroundColor: "#123866", // Fondo beige característico
  },
  header: {
    height: 60,
    backgroundColor: "#3f78be",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#EADFC9",
  },
  headerBoton: {
    padding: 8,
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e8ded8",
  },
  contenedorEstado: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  puntoEnLinea: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E7D32", // Verde tecnológico online
    marginRight: 6,
  },
  headerSubtitulo: {
    fontSize: 12,
    color: "#7A6855",
  },
  listaContenido: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contenedorFila: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  filaUsuario: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  filaBot: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  avatarChat: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#b5afa241",
    marginRight: 8,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#EADFC9",
  },
  globo: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  globoUsuario: {
    backgroundColor: "#61799d", // Café de la marca para el usuario
    borderBottomRightRadius: 2,
  },
  globoBot: {
    backgroundColor: "#798487ca", // Fondo claro para el Bot
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: "#EADFC9",
  },
  textoMensaje: {
    fontSize: 15,
    lineHeight: 20,
  },
  textoUsuario: {
    color: "#000000",
  },
  
  //texto del usuario//
  textoBot: {
    color: "#2C1B10",
  },
  textoHora: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  horaUsuario: {
    color: "#E2D3C5",
  },
  horaBot: {
    color: "#A0A0A0",
  },
  contenedorEscribiendo: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  textoEscribiendo: {
    fontSize: 13,
    color: "#ffffff",
    fontStyle: "italic",
  },
  barraEntrada: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#3f78be",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#EADFC9",
  },
  contenedorInput: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFDF9",
    borderWidth: 1,
    borderColor: "#3f78be",
    borderRadius: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    marginRight: 8,
    maxHeight: 100,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#2C1B10",
    paddingVertical: 8,
    textAlignVertical: "center",
  },
  botonClip: {
    padding: 4,
  },
  botonEnviar: {
    backgroundColor: "#8D623E",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  botonEnviarDeshabilitado: {
    backgroundColor: "#C6B7A2",
  },
});