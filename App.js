import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import  dictionary from './Database'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      "word": '',
      "lexicalCategory": "",
      "definition": "",
    };
  }

  

  getWord = (text) => {
    var text = text.toLowerCase();
    try{
      var word = dictionary[text]["word"];
      var lexicalCategory = dictionary[text]["lexicalCategory"];
      var definition = dictionary[text]["definition"]
      this.setState({
        "word": word,
        "lexicalCategory": lexicalCategory,
        "definition": definition
      })
    }
    catch(err){
        alert('sorry , this word is not available right now')
        this.setState({
          text: '',
          isSearchPressed: false
        })
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaProvider>
          <Header
            backgroundColor={'blue'}
            centerComponent={{
              style: { color: 'yellow', fontSize: 18 },
              text: 'Dictionary App',
            }}
          />

          <Text style={styles.text}>Enter Your Word Below</Text>

           <TextInput
            onChangeText={(text) => {
              this.setState({
                text: text,
                word: 'loading...',
                definition: '',
                examples: [],
                isSearchPressed: false,
                lexicalCategory: '',
              });
            }}
            value={this.state.text}
            style={styles.inputStyle}
          />

          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text style={styles.goButton}>Go</Text>
          </TouchableOpacity>

         

          <View style={styles.buttonText}>
            <Text style={styles.details}>Word: {''}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
          </View>

          <View style={styles.buttonText}>
            <Text style={styles.details}>lexicalCategory: {''}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.lexicalCategory}</Text>
          </View>

          <View style={styles.buttonText}>
            <Text style={styles.details}>definition: {''}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
          </View>
        </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputStyle: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    marginLeft: 35,
    backgroundColor: 'purple',
    opacity: 0.75,
    color: 'yellow',
  },

  goButton: {
   width: "55%",
   height: 50,
   marginTop: 20,
   marginLeft: 75,
   fontSize: 24,
   fontWeight: "bold"
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  text: {
    marginTop: 50,
    fontWeight: 'bold',
    marginLeft: 50,
  },

  details: {
    marginLeft: 50,
    fontSize: 20,
  },
});
