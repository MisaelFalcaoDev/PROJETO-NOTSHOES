
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", function() {
        var searchTerm = document.getElementById("barr").value;
        window.location.href = "resultados.html?search=" + encodeURIComponent(searchTerm);
    });
});
      