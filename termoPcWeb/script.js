//Trabalho elaborado pelo monitor Bruno Buquer

//Array de palavras que vocês devem utilizar! Caso queiram adicionar mais alguma palavra, fiquem à vontade. 

const BancoDePalavras = ["TERMO","CASAL","LIVRO","PEDRA","PORTA","CARRO","AVIAO","NORTE","SULCO","VERDE","PRETO","BRISA","FORTE","DORES","MENTE","CORPO","TEMPO","SABER","PODER","FALAR","ANDAR","COMER","VIVER","OLHAR","DIZER","LEVES","GRAVE","CLARO","TERRA","PLANO","LINHA","PONTO","FORMA","IDEIA","VALOR","SOMAR","SUBIR","JOGAR","CRIAR","AMIGO","FELIZ","RISOS","CHUVA","SOLAR","VENTO","NUVEM","PEDAL","FONTE","CAMPO","LIMPO","SUAVE","MAGIA","SONHO","LOUCO","CERTO","ERRAR","NIVEL","FRASE", "TEXTO","CONTA","CALMA","LONGE","PERTO","ENTRE","ANTES","TARDE","NOITE","HORAS","FIRME","FRACO","RAPTO","LENTO","NOVOS","VELHO","JOVEM","UNICO","CHEIO","VAZIO","ALTOS","BAIXO","LARGO","FINOS","ABRIR","FECHO","SAIDA","RODAR","GIRAR","PARAR","MEXER","TOCAR","OUVIR","PENSO","AGORA","NUNCA","CERCA","PORTO","PRAIA","ILHAS","PEDIR","PEGAR","SOLTO","BUSCA","ACHAR","PERDA","TENTE", "ERROS", "SABIA", "BOING", "METAL", "GALOS", "LONGE", "RITMO"];

//Vamos lá, senhores! Ora de montar o Nosso programinha de TERMO! Verifiquem o documento "Guia de montagem do TERMO" para saberem como fazer o joguinho e não se perder no caminho!

//Quantatidade de tentativas que o usuário terá
let tentativas = 6;

//Gera um número aleatório entre 0 e o tamanho do banco de palavras - 1
const numeroAleatorio = Math.floor(Math.random() * BancoDePalavras.length);

//Seleciona qual será a palavra escolhida para ser advinhada durante o jogo a partir do numero aleatório
const palavraDoJogo = BancoDePalavras[numeroAleatorio];
console.log(palavraDoJogo);

//Pega o endereço id da grid em que as letras ficarão
const grid = document.getElementById("grid");

/**
 * Exibe uma mensagem para o usuário indicando se ele perdeu ou ganhou o jogo
 * @param {string} texto - Conteúdo
 * @param {string} tipo - Classe da mensagem
 */
function mostrarMensagem(texto, tipo = "") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "";
  mensagem.textContent = texto;
  mensagem.className = "";

  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

//Variavel Global que irá conter as letras e quantas vezes elas se repetem
let arrayPalavra = [];

//Conta a quantas vezes determinada letra se repete e coloca no arrayPalavra
//Deve retornar um array assim [["letra", numRepetições], ["letra2", numRepetições2]]
function destrinchaPalavra() {
  arrayPalavra = [];

  for (let letra of palavraDoJogo) {
    let achou = false;

    for (let item of arrayPalavra) {
      if (item[0] === letra) {
        item[1]++;
        achou = true;
      }
    }

    if (!achou) {
      arrayPalavra.push([letra, 1]);
    }
  }
}

/**
 * Verifica quais letras estão corretas e remove do contador de palavras - Verde do termo
 * @param {string} palavraDigitada
 * @returns Array com as posições das letras que estão corretas
 */
function verificaCertos(palavraDigitada) {
  let certinhos = [];

  for (let i = 0; i < 5; i++) {
    if (palavraDigitada[i] === palavraDoJogo[i]) {
      certinhos.push(i);

      for (let item of arrayPalavra) {
        if (item[0] === palavraDigitada[i]) {
          item[1]--;
        }
      }
    }
  }

  return certinhos;
}

/**
 * Verifica quais letras existem, mas estão no local errado
 * @param {string} palavraDigitada
 * @param {array} certinhos
 * @returns Array com as posições das letras que devem ser amarelas
 */
function verificaAmarelos(palavraDigitada, certinhos) {
  let amarelos = [];

  for (let i = 0; i < 5; i++) {
    if (certinhos.includes(i)) continue;

    for (let item of arrayPalavra) {
      if (item[0] === palavraDigitada[i] && item[1] > 0) {
        amarelos.push(i);
        item[1]--;
        break;
      }
    }
  }

  return amarelos;
}

//Junta as letras verdes com as amarelas
function verificaPalavra(palavraDigitada) {
  let cores = ["-", "-", "-", "-", "-"];
  let certinhos = verificaCertos(palavraDigitada);
  console.log(certinhos);

  let amarelin = verificaAmarelos(palavraDigitada, certinhos);
  console.log(amarelin);

  //Marca verdes
  for (let pos of certinhos) {
    cores[pos] = "V";
  }

  //Marca amarelos
  for (let pos of amarelin) {
    cores[pos] = "A";
  }

  console.log(cores);
  return cores;
}

destrinchaPalavra();
console.log(arrayPalavra);

//Chame a função para mostrar o valor de tentativas para o usuário
mostrarMensagem("Tentativas restantes: " + tentativas);

let botao = document.querySelector("#enviar");

botao.addEventListener("click", () => {
  //Pega a palavra digitada pelo usuário, converte tudo para maiúsculo e remove os espaços
  const palavraDigitada = document.getElementById("palavra").value.toUpperCase().trim();

  if (tentativas > 0) {
    //Verifica se a palavra digitada é diferente do tamanho padrão do jogo, que é 5!
    if (palavraDigitada.length !== 5) {
      return alert("Digite 5 letras!");
    } else {

      let cores = verificaPalavra(palavraDigitada);

      //Adiciona as li na tela juntamente com as cores selecionadas!
      for (let i = 0; i < 5; i++) {
        //Crie o elemento li
        const caixaLetra = document.createElement("li");

        //Adicione a classe "caixaLetra"
        caixaLetra.classList.add("caixaLetra");

        //Adicione como conteúdo dessa li o valor da letra da palavraDigitada
        caixaLetra.textContent = palavraDigitada[i];

        switch (cores[i]) {
          case "V":
            caixaLetra.classList.add("correto");
            break;

          case "A":
            caixaLetra.classList.add("existeMasErrado");
            break;

          case "-":
            caixaLetra.classList.add("naoTem");
            break;
        }

        grid.appendChild(caixaLetra);
      }

      //Reseta todas as variaveis para a próxima rodada
      document.getElementById("palavra").value = "";
      destrinchaPalavra();

      //Diminui 1 das tentativas do usuário e informa o novo valor para o usuário
      tentativas--;
      mostrarMensagem("Tentativas restantes: " + tentativas);

      //Verifica vitória ou derrota
      if (palavraDigitada === palavraDoJogo) {
        mostrarMensagem("Você acertou!", "sucesso");
        tentativas = 0;
      } else if (tentativas === 0) {
        mostrarMensagem("Fim de jogo! A palavra era " + palavraDoJogo, "erro");
      }
    }
  }
});

//Função para conseguir enviar a palavra no input pelo enter
document.getElementById("palavra").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});