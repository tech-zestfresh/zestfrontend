import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.location}>Dhaka, Banassre</Text>
      <Text style={styles.sectionTitle}>Fresh Vegetables</Text>
      <Text style={styles.offer}>Get Up To 40% OFF</Text>

      <View style={styles.productRow}>
        <ProductCard name="Organic Bananas" price="$4.99" weight="1kg" />
        <ProductCard name="Red Apple" price="$4.99" weight="1kg" />
      </View>

      <Text style={styles.sectionTitle}>Best Selling</Text>
      <View style={styles.productRow}>
        <ProductCard name="Bell Pepper Red" price="$4.99" weight="1kg" />
        <ProductCard name="Ginger" price="$4.99" weight="250gm" />
      </View>

      <Text style={styles.sectionTitle}>Groceries</Text>
      <View style={styles.productRow}>
        <ProductCard name="Pulses" price="$4.99" weight="1kg" />
        <ProductCard name="Rice" price="$4.99" weight="1kg" />
      </View>
    </ScrollView>
  );
};

const ProductCard = ({ name, price, weight }) => (
  <View style={styles.card}>
    

    <Text style={styles.name}>{name}</Text>
    <Text style={styles.weight}>{weight}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  location: { fontSize: 16, color: '#666', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  offer: { fontSize: 16, color: 'green', marginBottom: 20 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  image: { height: 100, width: '100%', backgroundColor: '#ddd' },
  name: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  weight: { fontSize: 14, color: '#888' },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
});

export default HomeScreen;