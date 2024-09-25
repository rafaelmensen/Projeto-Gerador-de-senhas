8// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Após refatoração
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 11).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = lengthInput.value;

  // Após refatoração
  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos
generatePasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(function () {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});



import pandas as pd

# Lendo as planilhas
planilha01 = pd.read_excel('planilha01.xlsx')
planilha02 = pd.read_excel('planilha02.xlsx')

# Filtrando os dados
# Mantendo apenas as colunas necessárias
dados_planilha01 = planilha01[['apólice', 'CPF']]
dados_planilha02 = planilha02[['apólice', 'CPF']]

# Mesclando as duas planilhas para encontrar os CPFs que são iguais e apólices que são diferentes
resultado = pd.merge(dados_planilha01, dados_planilha02, on='CPF', suffixes=('_planilha01', '_planilha02'))

# Filtrando onde as apólices são diferentes
resultado_filtrado = resultado[resultado['apólice_planilha01'] != resultado['apólice_planilha02']]

# Copiando as linhas filtradas para a nova planilha (pode ser planilha02 ou outra)
resultado_filtrado.to_excel('planilha_resultado.xlsx', index=False)

print("As linhas foram copiadas para 'planilha_resultado.xlsx'.")

