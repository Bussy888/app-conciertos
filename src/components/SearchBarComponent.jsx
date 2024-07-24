import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = ({ onSearch, onFilter, locations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    location: null, // Utilizamos null para indicar que no se ha seleccionado ninguna ubicación específica inicialmente
    categories: [],
    priceRange: [0, 100],
  });

  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
      navigation.navigate('SearchScreen', { query: searchQuery });
    }
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    navigation.navigate('SearchScreen', { filters });
    setModalVisible(false);
  };

  const handleLocationChange = (itemValue) => {
    if (itemValue === 'all') {
      // Si se selecciona "All locations", reseteamos el filtro de ubicación
      setFilters({ ...filters, location: null });
    } else {
      // De lo contrario, actualizamos el filtro con la ubicación seleccionada
      setFilters({ ...filters, location: itemValue });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} >
        <LinearGradient
          colors={['#6ED0E0', '#E04989']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.filterButton}>
          <Icon name="filter" size={20} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter events</Text>
            <Text style={styles.label}>Location</Text>
            <Picker
              selectedValue={filters.location === null ? 'all' : filters.location}
              style={styles.picker}
              onValueChange={handleLocationChange}
              dropdownIconColor="#ffffff"
            >
              <Picker.Item label="All locations" value="all" /> 
              {locations.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
            <Text style={styles.label}>Event Category</Text>
            <View style={styles.categoriesContainer}>
              {['Concert', 'Theater', 'Dance'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    filters.categories.includes(category) && styles.categoryButtonActive,
                  ]}
                  onPress={() => {
                    setFilters((prevFilters) => {
                      const newCategories = prevFilters.categories.includes(category)
                        ? prevFilters.categories.filter((c) => c !== category)
                        : [...prevFilters.categories, category];
                      return { ...prevFilters, categories: newCategories };
                    });
                  }}
                >
                  <Text style={styles.categoryButtonText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Ticket Price</Text>
            <View style={styles.priceRangeContainer}>
              <Text style={styles.priceRangeText}>${filters.priceRange[0]} - ${filters.priceRange[1]}</Text>
              <Text style={styles.label}>Max Price</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                step={10}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#1EB1FC"
                thumbTintColor="#1EB1FC"
                value={filters.priceRange[1]}
                onValueChange={(value) => setFilters({ ...filters, priceRange: [filters.priceRange[0], value] })}
              />
              <Text style={styles.label}>Min Price</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                step={10}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#1EB1FC"
                thumbTintColor="#1EB1FC"
                value={filters.priceRange[0]}
                onValueChange={(value) => setFilters({ ...filters, priceRange: [value, filters.priceRange[1]] })}
              />
            </View>
            <Button title="Apply filters" onPress={handleApplyFilters} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  filterButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#444',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 8,
    margin: 5,
  },
  categoryButtonActive: {
    backgroundColor: '#777',
  },
  categoryButtonText: {
    color: '#fff',
  },
  priceRangeContainer: {
    marginBottom: 20,
  },
  priceRangeText: {
    color: '#fff',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default SearchBar;
