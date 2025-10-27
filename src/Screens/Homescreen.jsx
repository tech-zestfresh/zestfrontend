import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import locationText from "./locationtext";
const { width } = Dimensions.get("window");
const isTablet = width >= 768; // Responsive check

const categories = [
  { title: "Fresh Fruits & Vegetable", image: require("../assets/zestfresh.png"), bg: "#E6F9EE" },
  { title: "Cooking Oil & Ghee", image: require("../assets/zestfresh.png"), bg: "#FFF4E5" },
  { title: "Meat & Fish", image: require("../assets/zestfresh.png"), bg: "#FFE9E9" },
  { title: "Bakery & Snacks", image: require("../assets/zestfresh.png"), bg: "#FFF1F8" },
  { title: "Dairy & Eggs", image: require("../assets/zestfresh.png"), bg: "#FFFBEA" },
  { title: "Beverages", image: require("../assets/zestfresh.png"), bg: "#E9F6FF" },
];

const ExploreScreen = () => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={{
        width: isTablet ? "30%" : "48%",
        backgroundColor: item.bg,
        borderRadius: 16,
        padding: isTablet ? 25 : 15,
        marginBottom: 30,
        alignItems: "center",
        margin: isTablet ? "1.5%" : "1%",
        
      }}
    >
      <Image
        source={item.image}
        style={{
          width: isTablet ? 120 : 80,
          height: isTablet ? 120 : 80,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          fontWeight: "600",
          color: "#333",
          fontSize: isTablet ? 18 : 14,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      
      <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: "#fff" }}>
  <View style={{ flexDirection: "row", justifyContent:"center", alignItems: "center"
  }}>
    <Text style={{ fontSize: isTablet ? 16 : 14, color: "#555", marginRight: 5 }}>
      📍 {locationText}
    </Text>
    <Text
      style={{
        fontSize: isTablet ? 28 : 22,
        fontWeight: "600",
        textAlign: "left",
      }}
    >
      Find Products
    </Text>
  </View>


        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F2F2F2",
            marginHorizontal: 20,
            borderRadius: 12,
            alignItems: "center",
            paddingHorizontal: 10,
            height: isTablet ? 55 : 45,
          }}
        >
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            placeholder="Search Store"
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: isTablet ? 18 : 16,
            }}
          />
        </View>
      </View>

      {/* Category Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={renderCategory}
        numColumns={isTablet ? 3 : 2}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: 100, // space for bottom nav
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Sticky Bottom Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "#eee",
          paddingVertical: 10,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: isTablet ? 70 : 60,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Ionicons name="home-outline" size={isTablet ? 26 : 22} color="#777" />
          <Text style={{ fontSize: isTablet ? 14 : 12 }}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <Ionicons name="compass" size={isTablet ? 26 : 22} color="#00A86B" />
          <Text style={{ fontSize: isTablet ? 14 : 12, color: "#00A86B" }}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <Ionicons name="cart-outline" size={isTablet ? 26 : 22} color="#777" />
          <Text style={{ fontSize: isTablet ? 14 : 12 }}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <Ionicons name="heart-outline" size={isTablet ? 26 : 22} color="#777" />
          <Text style={{ fontSize: isTablet ? 14 : 12 }}>Favourite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <Ionicons name="person-outline" size={isTablet ? 26 : 22} color="#777" />
          <Text style={{ fontSize: isTablet ? 14 : 12 }}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

