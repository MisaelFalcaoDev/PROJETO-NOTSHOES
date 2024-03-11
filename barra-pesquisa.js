// Função para buscar um produto pelo nome
function buscarProduto() {
    // Obter o valor da barra de pesquisa
    const termoPesquisa = document.getElementById('barraPesquisa').value;

    // Verificar se a pesquisa não está vazia
    if (termoPesquisa.trim() !== '') {
        // Substitua 'sua_api_de_busca' pelo endpoint real da sua API de busca
        const apiUrl = `http://localhost:5000/busca_produto/${encodeURIComponent(termoPesquisa)}`;

        // Fazer a requisição usando fetch
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o produto');
                }
                return response.json();
            })
            .then(dados => {
                // Exibir os resultados na div 'resultadoPesquisa'
                exibirResultados(dados);
            })
            .catch(error => {
                console.error('Erro na busca do produto:', error);
                exibirResultados([]);
            });
    } else {
        alert('Digite o nome do produto antes de pesquisar.');
    }
}

// Função para exibir os resultados na página
function exibirResultados(resultados) {
    const resultadoDiv = document.getElementById('resultadoPesquisa');
    resultadoDiv.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(produto => {
            resultadoDiv.innerHTML += `<p>${produto[1]} - Tamanho: ${produto[2]}, Preço: R$${produto[3]}, Estoque: ${produto[4]}</p>`;
        });
    } else {
        resultadoDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
}