const novoElemento = (elemento, classe, texto) => {
    const obj = document.createElement(elemento);
    if (classe) obj.classList.add(classe);
    if (texto !== undefined && texto !== null) obj.textContent = texto;
    return obj;
};

const calculaPontuacao = (opinioes) => {
    if (!opinioes || opinioes.length === 0) return "Sem avaliações";
    const soma = opinioes.reduce((acc, op) => acc + op.rating, 0);
    const media = Math.round(soma / opinioes.length);
    return "★".repeat(media) + "☆".repeat(5 - media);
};

const renderizarCatalogo = (listaFilmes) => {
    const catalogo = document.querySelector(".catalogo");
    catalogo.innerHTML = "";

    listaFilmes.forEach(filme => {
        const divFilme = novoElemento("div", "filme");
        const filmeHeader = novoElemento("div", "filme_header");

        const imgPoster = novoElemento("img", "filme_poster");
        imgPoster.src = filme.figura;
        imgPoster.alt = filme.titulo;

        const divFilmeNome = novoElemento("div", "filme_nome");
        const h3Nome = novoElemento("h3", null, filme.titulo);
        const ulGeneros = novoElemento("ul");
        
        filme.generos.forEach(genero => {
            ulGeneros.appendChild(novoElemento("li", null, genero));
        });
        
        const pElenco = novoElemento("p", null, `Elenco: ${filme.elenco.join(", ")}`);

        divFilmeNome.appendChild(h3Nome);
        divFilmeNome.appendChild(ulGeneros);
        divFilmeNome.appendChild(pElenco);

        const divInfo = novoElemento("div", "filme_info");
        
        let classeCor = "livre";
        if (filme.classificacao > 0) {
            classeCor = `anos_${filme.classificacao}`;
        }
        
        const divClassificacao = novoElemento("div", "filme_classificacao", filme.classificacao === 0 ? "L" : filme.classificacao);
        divClassificacao.className = `filme_classificacao ${classeCor}`;
        
        const divPontuacao = novoElemento("div", "filme_pontuacao", calculaPontuacao(filme.opinioes));

        divInfo.appendChild(divClassificacao);
        divInfo.appendChild(divPontuacao);

        filmeHeader.appendChild(imgPoster);
        filmeHeader.appendChild(divFilmeNome);
        filmeHeader.appendChild(divInfo);
        divFilme.appendChild(filmeHeader);

        const pDescricao = novoElemento("p", "filme_descricao", filme.resumo);
        divFilme.appendChild(pDescricao);

        if (filme.titulosSemelhantes && filme.titulosSemelhantes.length > 0) {
            const h4Similares = novoElemento("h4", "filme_similares", "Títulos Similares");
            const ulSimilares = novoElemento("ul", "filme_posters_similares");

            filme.titulosSemelhantes.forEach(idSemelhante => {
                const achouSimilar = listaFilmes.find(f => f.id === idSemelhante);
                if (achouSimilar) {
                    const liSimilar = document.createElement("li");
                    const imgSimilar = document.createElement("img");
                    imgSimilar.src = achouSimilar.figura;
                    imgSimilar.alt = achouSimilar.titulo;
                    liSimilar.appendChild(imgSimilar);
                    ulSimilares.appendChild(liSimilar);
                }
            });

            divFilme.appendChild(h4Similares);
            divFilme.appendChild(ulSimilares);
        }

        catalogo.appendChild(divFilme);
    });
};

const URL_FILMES = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";

fetch(URL_FILMES)
    .then(resposta => {
        if (!resposta.ok) throw new Error("Erro ao carregar dados");
        return resposta.json();
    })
    .then(dados => {
        renderizarCatalogo(dados);
    })
    .catch(erro => {
        console.error(erro);
    });