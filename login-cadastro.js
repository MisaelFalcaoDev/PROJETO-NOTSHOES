document.addEventListener("DOMContentLoaded", function() {
    //precisa adicionar a lógica de verificação de usuário
    document.getElementById("login").addEventListener("click", function() {
        window.location.href = "tela-usuario.html?search=";
    });
    
    //leva à tela de informações para o usuário preencher
    document.getElementById("cadastro").addEventListener("click", function() {
        window.location.href = "tela-usuario.html?search=";
    });
});
      