import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  buttonText: {
    fontSize: 14
  },

  linha: {
    flex: 1,
    flexDirection: 'row',
  },
  mira: {
    flex: 1,    
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'green',
    borderWidth: 1
  },

  imagem: {
    flex: 1,
    margin: 5,
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});

export default styles;