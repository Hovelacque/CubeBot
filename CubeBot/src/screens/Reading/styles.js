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
        alignItems: "center"
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
      }
});

export default styles;