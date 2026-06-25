let paises = [];
let paisesFiltrados = [];

async function carregarPaises() {
  try {
    const resposta = await fetch("https://restcountries.com/v3.1/all");
    paises = await resposta.json();
    paisesFiltrados = [...paises];

    mostrarPaises();
    mostrarEstatisticas();
  } catch (erro) {
    console.error("Erro ao carregar países:", erro);
  }
}

function mostrarPaises() {
  const lista = document.getElementById("listaPaises");
  if (!lista) return;
  lista.innerHTML = "";

  paisesFiltrados.forEach((pais) => {
    const div = document.createElement("div");
    div.classList.add("pais");

    div.innerHTML = `
      <img src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}">
      <h3>${pais.name.common}</h3>
      <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "Sem capital"}</p>
      <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
    `;

    div.addEventListener("click", () => mostrarDetalhes(pais.name.common));
    lista.appendChild(div);
  });
}

function aplicarFiltroRegiao() {
  const filtroRegiao = document.getElementById("filtroRegiao");
  const campoBusca = document.getElementById("campoBusca");

  const regiao = filtroRegiao ? filtroRegiao.value : "";
  const texto = campoBusca ? campoBusca.value.toLowerCase() : "";

  paisesFiltrados = paises.filter((pais) => {
    const nomeValido = pais.name.common.toLowerCase().includes(texto);
    const regiaoValida = regiao === "" || pais.region === regiao;
    return nomeValido && regiaoValida;
  });

  mostrarPaises();
  mostrarEstatisticas();
}

const campoBuscaEl = document.getElementById("campoBusca");
if (campoBuscaEl) {
  campoBuscaEl.addEventListener("input", aplicarFiltroRegiao);
}

const filtroRegiaoEl = document.getElementById("filtroRegiao");
if (filtroRegiaoEl) {
  filtroRegiaoEl.addEventListener("change", aplicarFiltroRegiao);
}

function ordenarPorNome() {
  paisesFiltrados.sort((a, b) => a.name.common.localeCompare(b.name.common));
  mostrarPaises();
}

function ordenarPorPopulacao() {
  paisesFiltrados.sort((a, b) => b.population - a.population);
  mostrarPaises();
}

function ordenarPorArea() {
  paisesFiltrados.sort((a, b) => (b.area || 0) - (a.area || 0));
  mostrarPaises();
}

const btnNome = document.getElementById("btnOrdenarNome");
if (btnNome) btnNome.addEventListener("click", ordenarPorNome);

const btnPop = document.getElementById("btnOrdenarPopulacao");
if (btnPop) btnPop.addEventListener("click", ordenarPorPopulacao);

const btnArea = document.getElementById("btnOrdenarArea");
if (btnArea) btnArea.addEventListener("click", ordenarPorArea);

function mostrarEstatisticas() {
  const estatisticas = document.getElementById("estatisticas");
  if (!estatisticas) return;

  const populacaoTotal = paisesFiltrados.reduce((total, pais) => total + pais.population, 0);
  const areaTotal = paisesFiltrados.reduce((total, pais) => total + (pais.area || 0), 0);

  const mediaPopulacao = paisesFiltrados.length ? populacaoTotal / paisesFiltrados.length : 0;
  const mediaArea = paisesFiltrados.length ? areaTotal / paisesFiltrados.length : 0;

  estatisticas.innerHTML = `
    <h2>📊 Estatísticas</h2>
    <p><strong>População total:</strong> ${populacaoTotal.toLocaleString()}</p>
    <p><strong>Área total:</strong> ${areaTotal.toLocaleString()} km²</p>
    <p><strong>Média de população:</strong> ${Math.round(mediaPopulacao).toLocaleString()}</p>
    <p><strong>Média de área:</strong> ${Math.round(mediaArea).toLocaleString()} km²</p>
  `;
}

function mostrarDetalhes(nomePais) {
  const pais = paises.find((p) => p.name.common === nomePais);
  if (!pais) return;

  const moedas = pais.currencies ? Object.keys(pais.currencies).join(", ") : "Sem informações";
  const idiomas = pais.languages ? Object.values(pais.languages).join(", ") : "Sem informações";
  const fronteiras = pais.borders ? pais.borders.join(", ") : "Sem fronteiras";

  alert(`
País: ${pais.name.common}
Sub-região: ${pais.subregion || "Sem informações"}
Moedas: ${moedas}
Idiomas: ${idiomas}
Fronteiras: ${fronteiras}
  `);
}

carregarPaises();
