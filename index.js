function acaoFiltro(cardFiltro) {
    var filtro = cardFiltro.innerText;
    window.location.href = "resultados.html?search=" + encodeURIComponent(filtro);
}
function acao(cardFiltro) {
    var filtro = cardFiltro.innerText;
    window.location.href = "resultados.html?search=" + encodeURIComponent(filtro);
}