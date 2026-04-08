function play(userChoice) {

    const computerChoice = Math.floor((Math.random() * 3) + 1);

    const map = {
        1: { name: "Pedra", icon: "💎" },
        2: { name: "Papel", icon: "📄" },
        3: { name: "Tesoura", icon: "✂️" }
    };

    document.getElementById("choices-made").innerHTML = 
        `Você: <strong>${map[userChoice].icon}</strong> vs PC: <strong>${map[computerChoice].icon}</strong>`;

    const winnerText = document.getElementById("winner-text");
    const explanation = document.getElementById("explanation");

    if (userChoice === computerChoice) {
        winnerText.innerText = "Empate!";
        explanation.innerText = "Ambos escolheram o mesmo item.";
    } 
    else if (
        (userChoice === 1 && computerChoice === 3) || // Pedra quebra tesoura
        (userChoice === 3 && computerChoice === 2) || // Tesoura corta papel
        (userChoice === 2 && computerChoice === 1)    // Papel cobre a pedra
    ) {
        winnerText.innerText = "Você Venceu!";
        explanation.innerText = getMessage(userChoice, computerChoice);
    } 
    else {
        winnerText.innerText = "O Computador Venceu!";
        explanation.innerText = getMessage(computerChoice, userChoice);
    }
}

// Função auxiliar para exibir as frases solicitadas
function getMessage(winner, loser) {
    if (winner === 1 && loser === 3) return "Pedra quebra tesoura";
    if (winner === 3 && loser === 2) return "Tesoura corta papel";
    if (winner === 2 && loser === 1) return "Papel cobre a pedra";
    return "";
}