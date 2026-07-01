const currentPlayer = document.querySelector(".jogador");
let selected = [];
let jogador = "X";

const combinacoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function init() {
    selected = Array(10).fill("");
    jogador = "X";
    currentPlayer.textContent = `Vez do jogador: ${jogador}`;

    document.querySelectorAll(".blocos").forEach((bloco) => {
        bloco.textContent = "";
        bloco.disabled = false;
        bloco.removeEventListener("click", blocoClick);
        bloco.addEventListener("click", blocoClick);
    });
}

function blocoClick(event) {
    const bloco = event.currentTarget;
    const index = Number(bloco.dataset.i);

    bloco.textContent = jogador;
    bloco.disabled = true;
    selected[index] = jogador;

    if (check()) {
        return;
    }

    jogador = jogador === "X" ? "O" : "X";
    currentPlayer.textContent = `Vez do jogador: ${jogador}`;
}

function check() {
    const jogadorSelecionado = jogador;
    const marcados = selected
        .map((valor, indice) => (indice > 0 && valor === jogadorSelecionado ? indice : null))
        .filter((valor) => valor !== null);

    for (const pos of combinacoes) {
        if (pos.every((item) => marcados.includes(item))) {
            alert(`O jogador ${jogadorSelecionado} venceu!`);
            init();
            return true;
        }
    }

    if (selected.slice(1).every((item) => item)) {
        alert("Empate!");
        init();
        return true;
    }

    return false;
}

init();
