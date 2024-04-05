/*IGNOREM POIS NÃO ESTÁ EM FUNCIONAMENTO*/
document.getElementById('produtoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = {
        nomeProduto: document.getElementById('nomeProduto').value,
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value,
        estoqueProduto: document.getElementById('estoque').value,
        preco: document.getElementById('preco').value,
        desconto: document.getElementById('desconto').value
    };

    fetch('/criar_produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Exibe a mensagem de sucesso ou erro
        // Limpar formulário após o envio bem-sucedido
        document.getElementById('produtoForm').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar o produto.');
    });
});