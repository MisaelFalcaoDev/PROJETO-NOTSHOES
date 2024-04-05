async function enviarDadosCadastro() {
    const nome = document.getElementById("nomeCliente").value;
    const email = document.getElementById("emailCliente").value;
    //const cpf = document.getElementById("cpfCliente").value;
    const senha = document.getElementById("senhaCliente").value;

    const data = {
        nome: nome,
        email: email,
        senha: senha,
       // cpf: cpf
    };

    try {
        const response = await fetch('/criar_login_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        const responseData = await response.json();
        alert(responseData.message); // Exibe a mensagem retornada pela API
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
}



// function enviarDadosCadastro() {
   
//     const nome = document.getElementById("nomeCliente").value;
//     const email = document.getElementById("emailCliente").value;
//     const cpf = document.getElementById("cpfCliente").value;
//     const senha = document.getElementById("senhaCliente").value;
//     const rua = document.getElementById("ruaCliente").value;
//     const bairro = document.getElementById("bairroCliente").value;
//     const cidade = document.getElementById("cidadeCliente").value;

//     const data = {
//         nome: nome,
//         email: email,
//         senha: senha,
//         cpf: cpf,
//         rua: rua,
//         bairro: bairro,
//         cidade: cidade
//     };


//     fetch('/criar_login_cliente', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro na solicitação POST');
//         }
//         return response.json();
//     })
//     .then(data => {
//         alert(data.message); // Exibe a mensagem retornada pela API
//     })
//     .catch(error => {
//         console.error('Erro ao enviar solicitação:', error);
//         alert('Erro ao cadastrar cliente. Por favor, tente novamente.');
//     });
// }
/*
function cataInformacoes(){
   

    enviarDadosCadastro(data);
}*/