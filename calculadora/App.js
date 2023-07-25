import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  function calculator() {
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed) // Mostra no Console a tecla pressionada

    if (buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/") {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return

      case '+/-': // Deixar o numero positivo ou negativo
        // Primeiro há uma verificação se existe algum operador além do primeiro número
        console.log("Verificação de inclusão de operador na string")
        if (currentNumber.includes('+') | currentNumber.includes("-") | currentNumber.includes("x") | currentNumber.includes("/")) {
          // Transformar a variavel em array de string
          const splitNumbers = currentNumber.split(' ')
          // Convertendo número em positivo ou negativo
          splitNumbers[0] *= -1
          // Adicionando alteração na array e transformando em uma única string
          let n = splitNumbers.join(" ")
          // Setando no currentNumber o novo valor
          setCurrentNumber(n.toString())
          //console.log('currentNumber: ' + currentNumber)
          return
        }
        // Convertendo número em positivo ou negativo
        setCurrentNumber((currentNumber * -1).toString())
        console.log(currentNumber)
        return

      case '%': // Cálculo de porcentagem
        console.log("Verificação da array")
        // Transformar a variavel em array de string
        const splitNumbers2 = currentNumber.split(' ')
        console.log('Array da string : ' + splitNumbers2)
        if (splitNumbers2[0] != null && splitNumbers2[2] != null) {
          console.log('Inicio da operação de porcentagem')
          // Declaração da variável com os elementos da array e converter para tipo float
          let n1 = parseFloat(splitNumbers2[0])
          console.log('n1: ' + n1)
          let n2 = parseFloat(splitNumbers2[2])
          console.log('n2: ' + n2)
          // Calculo de porcentagem
          let percentage = n1 * n2 / 100
          splitNumbers2.splice(2, 1, percentage.toString())
          let result = splitNumbers2.join(" ")
          setCurrentNumber(result.toString())
          //console.log(result)
          //console.log('Array da string : ' + splitNumbers2)  
          console.log('currentNumber: ' + currentNumber)
          console.log("Fim da operação de porcentagem")
          return

        }
        // Comando em caso de não ter o número no qual será a porcentagem
        console.log('Sem numeros suficientes para o calculo')
        let z = '0'
        setLastNumber(currentNumber + " " + " = ") // Armazenando o lastNumber e adicionando o '%' para feedback
        setCurrentNumber(z) // Armazenando em currentNumber resultado da operação  
        console.log('currentNumber: ' + currentNumber)
        console.log("Fim da operação de porcentagem")
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) =>
          button === '=' ? // Mapeamento do botão =
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#3dd0e3' }]}>
              <Text style={[styles.textButton, { color: "white", fontSize: 30 }]}>{button}</Text>
            </TouchableOpacity>
            : // Mapeamento dos outros botões
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
              <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'black' : '#0093a6' }]}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },
  resultText: {
    color: "#282F38",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText: {
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  }
});