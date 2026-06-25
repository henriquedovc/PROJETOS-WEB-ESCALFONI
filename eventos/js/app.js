let eventos = [];

const btnCadastrar = document.getElementById("btnCadastrar");
const listaEventos = document.getElementById("listaEventos");
const estatisticas = document.getElementById("estatisticas");

// Função para cadastrar evento
function cadastrarEvento() {
  const titulo = document.getElementById("titulo").value.trim();
  const local = document.getElementById("local").value.trim();
  const vagas = Number(document.getElementById("vagas").value);
  const preco = Number(document.getElementById("preco").value);
  const data = new Date(document.getElementById("data").value);
  const ativo = document.getElementById("ativo").checked;

  // Validações
  if (titulo === "" || local === "") {
    alert("Título e local são obrigatórios.");
    return;
  }

  if (vagas < 0 || preco < 0) {
    alert("Vagas e preço não podem ser negativos.");
    return;
  }

  if (isNaN(data.getTime())) {
    alert("Data inválida.");
    return;
  }

  // Criando objeto evento
  const evento = {
    titulo: titulo,
    local: local,
    vagas: vagas,
    preco: preco,
    ativo: ativo,
    data: data,
    observacao: undefined,
    cancelamento: null
  };

  eventos.push(evento);

  limparCampos();
  listarEventos();
  mostrarEstatisticas();
}

// Listar eventos
function listarEventos() {
  listaEventos.innerHTML = "";

  eventos.forEach((evento) => {
    const div = document.createElement("div");
    div.classList.add("evento");

    div.innerHTML = `
      <h3>${evento.titulo}</h3>
      <p><strong>Local:</strong> ${evento.local}</p>
      <p><strong>Data:</strong> ${evento.data.toLocaleDateString()}</p>
      <p><strong>Preço:</strong> R$ ${evento.preco}</p>
      <p><strong>Status:</strong> ${evento.ativo ? "Ativo" : "Inativo"}</p>
    `;

    // Observações indefinidas
    if (evento.observacao === undefined) {
      div.innerHTML += `<p>Evento não possui observações cadastradas.</p>`;
    }

    // Evento cancelado
    if (evento.cancelamento !== null) {
      div.innerHTML += `
        <p><strong>Evento cancelado.</strong></p>
        <p>Motivo: ${evento.cancelamento}</p>
      `;
    }

    listaEventos.appendChild(div);
  });
}

// Mostrar estatísticas
function mostrarEstatisticas() {
  const eventosAtivos = eventos.filter(evento => evento.ativo);

  const totalArrecadado = eventos.reduce((total, evento) => {
    return total + (evento.vagas * evento.preco);
  }, 0);

  estatisticas.innerHTML = `
    <h2>Estatísticas</h2>
    <p>Total de eventos: ${eventos.length}</p>
    <p>Eventos ativos: ${eventosAtivos.length}</p>
    <p>Valor total possível arrecadado: R$ ${totalArrecadado}</p>
  `;
}

// Limpar formulário
function limparCampos() {
  document.getElementById("titulo").value = "";
  document.getElementById("local").value = "";
  document.getElementById("vagas").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("data").value = "";
  document.getElementById("ativo").checked = false;
}

// Evento do botão
btnCadastrar.addEventListener("click", cadastrarEvento);