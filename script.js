// var consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/")
//   .then((res) => res.json())
//   .then((r) => {
//     if (r.erro) {
//       throw Error("Esse CEP não existe.");
//     } else {
//       console.log(r);
//     }
//   })
//   .catch((error) => console.log(error))
//   .finally(msg => console.log('Processamento concluído!'));

// console.log(consultaCEP);

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPconvertida = await consultaCEP.json();

    if (consultaCEPconvertida.erro) {
      throw Error("CEP não existente!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");

    cidade.value = consultaCEPconvertida.localidade;
    logradouro.value = consultaCEPconvertida.logradouro;
    estado.value = consultaCEPconvertida.uf;

    console.log(consultaCEPconvertida);

    return consultaCEPconvertida;
  } catch (erro) {
    mensagemErro.innerHTML = "<p>CEP Inválido. Tente novamente!</p>";
  }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(res => console.log(res));
