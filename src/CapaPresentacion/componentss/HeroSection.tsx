import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HeroSection() {
  return (
    <View className="px-6 py-12">

      <Text className="text-5xl font-bold text-[#3B2413]">
        Ecommerce Agent
      </Text>

      <Text className="mt-4 text-lg text-gray-700">
        Tu asistente inteligente para consultas sobre productos,
        pedidos y soporte de tienda.
      </Text>

      <Pressable
        className="bg-[#8B5E3C] mt-8 rounded-xl p-4"
        onPress={() => router.push("/Chatbot")}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Comenzar Chat
        </Text>
      </Pressable>

    </View>
  );
}