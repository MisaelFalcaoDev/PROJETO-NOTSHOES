document.addEventListener("DOMContentLoaded", function() {
    // Obter o termo de pesquisa da query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get('search');

    const apiUrl = `http://localhost:5000/busca_produto/${encodeURIComponent(searchTerm)}`;

    // Chamar a API para buscar os resultados da pesquisa
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

});

// Função para exibir os resultados na página
function exibirResultados(resultados) {
    const resultadoDiv = document.getElementById('resultadoPesquisa');
    resultadoDiv.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(produto => {
            // Criar uma nova div para cada produto
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');

            // Adicionar os detalhes do produto à div do produto
            produtoDiv.innerHTML = `
                <img src="${produto[6]}" alt="Produto">
                <div class="card-body">
                    <h2 class="card-title">${produto[1]}</h2>
                    <p class="card-price">R$${produto[4]}</p>
                    <p class="card-description" style="display: none;">${produto[3]}</p>
                </div>
            `;

            // Adicionar a div do produto à div de resultados
            resultadoDiv.appendChild(produtoDiv);

            // Criar botões e adicioná-los à div de produtos
            const button1 = document.createElement('button');
            button1.textContent = 'Detalhes';
            button1.addEventListener('click', function() {
                // Expandir a div do produto
                if (produtoDiv.classList.contains('expandido')) {
                    // Se a div já estiver expandida, recolha
                    produtoDiv.classList.remove('expandido');
                    removerDetalhes(produtoDiv);
                } else {
                    // Caso contrário, expanda
                    produtoDiv.classList.add('expandido');
                    exibirDetalhes(produto, produtoDiv);
                }
            });

            //Adiciona o botão à div de produtos
            produtoDiv.appendChild(button1);

            const button2 = document.createElement('favoritos');
            button2.innerHTML = '<img src="../svg/svg-coracao.svg" style="width:25px; height:25px" alt="Adicionar aos Favoritos">';
            produtoDiv.appendChild(button2);

            const button3 = document.createElement('compras');
            button3.innerHTML = '<img src="../svg/svg-carrinho.svg" style="width:25px; height:25px" alt="Adicionar aos Favoritos">';
            produtoDiv.appendChild(button3);
        });
    } else {
        resultadoDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }

    function exibirDetalhes(produto, produtoDiv) {
        // Verificar se os detalhes já foram adicionados
        const detalhesExistem = produtoDiv.querySelector('.detalhes-adicionados');
        
        // Se os detalhes já existirem, remova-os
        if (detalhesExistem) {
            produtoDiv.removeChild(detalhesExistem);
        } else {
            // Adicionar os detalhes completos do produto
            const detalhesDiv = document.createElement('div');
            detalhesDiv.classList.add('detalhes-adicionados'); // Adicionar classe para identificar os detalhes
            detalhesDiv.innerHTML = `
                <p class="card-description">
                    ${produto[3]} <br>
                    Tamanho: ${produto[2]}
                </p>
            `;
            produtoDiv.appendChild(detalhesDiv);
        }
    }
    
    function removerDetalhes(produtoDiv) {
        // Remover apenas os detalhes adicionados
        const detalhesDiv = produtoDiv.querySelector('.detalhes-adicionados');
        if (detalhesDiv) {
            produtoDiv.removeChild(detalhesDiv);
        }
    }
}

