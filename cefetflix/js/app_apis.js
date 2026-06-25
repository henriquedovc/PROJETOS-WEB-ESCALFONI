const resultados = document.querySelector("#resultados");

const mostrarErro = (mensagem) => {
    resultados.innerHTML = `<p style="color:red; font-family:Arial; margin:20px;">${mensagem}</p>`;
};

const criarCardFilme = (filme) => {
    resultados.innerHTML = "";
    
    const divFilme = document.createElement("div");
    divFilme.classList.add("filme");

    const filmeHeader = document.createElement("div");
    filmeHeader.classList.add("filme_header");

    const imgPoster = document.createElement("img");
    imgPoster.classList.add("filme_poster");
    imgPoster.src = filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/120x80?text=Sem+Foto";
    imgPoster.alt = filme.Title;

    const divFilmeNome = document.createElement("div");
    divFilmeNome.classList.add("filme_nome");

    const h3Nome = document.createElement("h3");
    h3Nome.textContent = filme.Title;

    const pElenco = document.createElement("p");
    pElenco.textContent = `Elenco: ${filme.Actors}`;

    divFilmeNome.appendChild(h3Nome);
    divFilmeNome.appendChild(pElenco);

    const divInfo = document.createElement("div");
    divInfo.classList.add("filme_info");

    const divClassificacao = document.createElement("div");
    divClassificacao.classList.add("filme_classificacao", "livre");
    divClassificacao.textContent = filme.Rated;

    const divPontuacao = document.createElement("div");
    divPontuacao.classList.add("filme_pontuacao");
    divPontuacao.textContent = `Nota: ${filme.imdbRating}`;

    divInfo.appendChild(divClassificacao);
    divInfo.appendChild(divPontuacao);

    filmeHeader.appendChild(imgPoster);
    filmeHeader.appendChild(divFilmeNome);
    filmeHeader.appendChild(divInfo);
    divFilme.appendChild(filmeHeader);

    const pDescricao = document.createElement("p");
    pDescricao.classList.add("filme_descricao");
    pDescricao.textContent = filme.Plot;
    divFilme.appendChild(pDescricao);

    resultados.appendChild(divFilme);
};

const criarCardPais = (pais) => {
    resultados.innerHTML = "";

    const divPais = document.createElement("div");
    divPais.classList.add("filme");

    const paisHeader = document.createElement("div");
    paisHeader.classList.add("filme_header");

    const imgBandeira = document.createElement("img");
    imgBandeira.classList.add("filme_poster");
    imgBandeira.src = pais.flags.svg || pais.flags.png;
    imgBandeira.alt = pais.name.common;

    const divPaisNome = document.createElement("div");
    divPaisNome.classList.add("filme_nome");

    const h3Nome = document.createElement("h3");
    h3Nome.textContent = pais.name.common;

    const pCapital = document.createElement("p");
    pCapital.textContent = `Capital: ${pais.capital ? pais.capital.join(", ") : "N/A"}`;

    divPaisNome.appendChild(h3Nome);
    divPaisNome.appendChild(pCapital);

    const divInfo = document.createElement("div");
    divInfo.classList.add("filme_info");

    const divRegiao = document.createElement("div");
    divRegiao.classList.add("filme_classificacao", "anos_10");
    divRegiao.style.width = "auto";
    divRegiao.style.padding = "0 5px";
    divRegiao.textContent = pais.region;

    divInfo.appendChild(divRegiao);

    paisHeader.appendChild(imgBandeira);
    paisHeader.appendChild(divPaisNome);
    paisHeader.appendChild(divInfo);
    divPais.appendChild(paisHeader);

    const pDescricao = document.createElement("p");
    pDescricao.classList.add("filme_descricao");
    pDescricao.textContent = `Nome Oficial: ${pais.name.official}. População aproximada de ${pais.population.toLocaleString('pt-BR')} habitantes.`;
    divPais.appendChild(pDescricao);

    resultados.appendChild(divPais);
};

document.querySelector("#btnFilme").addEventListener("click", () => {
    const chaveUser = document.querySelector("#apiKey").value.trim();
    const termoBusca = document.querySelector("#buscaInput").value.trim();

    if (!chaveUser) {
        alert("Por favor, insira a sua chave da API para buscar filmes!");
        return;
    }
    if (!termoBusca) {
        alert("Digite o nome de um filme!");
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${chaveUser}&t=${encodeURIComponent(termoBusca)}`;

    fetch(url)
        .then(res => res.json())
        .then(dados => {
            if (dados.Response === "False") {
                mostrarErro("Filme não encontrado!");
                return;
            }
            criarCardFilme(dados);
        })
        .catch(() => mostrarErro("Erro ao buscar filme."));
});

document.querySelector("#btnPais").addEventListener("click", () => {
    const termoBusca = document.querySelector("#buscaInput").value.trim();

    if (!termoBusca) {
        alert("Digite o nome de um país!");
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(termoBusca)}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(dados => {
            criarCardPais(dados[0]);
        })
        .catch(() => mostrarErro("País não encontrado!"));
});