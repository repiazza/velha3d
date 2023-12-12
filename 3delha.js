const DEBUG_FLAG = 1;
var playerName = "";
var playerPiece = "X";
var player2Piece = "O";
var PCPiece = player2Piece;
var winnerFound = false;
function consoleTrace(msg) {
  if (DEBUG_FLAG) console.log(msg);
}

// tnw tn tne    |
//  tw tc  te <--|  Concatenar todos ids com fld (field)
// tsw ts tse    |

// cnw cn cne    |
//  cw cc  ce <--|  Concatenar todos ids com fld (field)
// csw cs cse    |

// bnw bn bne    |
//  bw bc  be <--|  Concatenar todos ids com fld (field)
// bsw bs bse    |

const winnerSequences = [
  [
    ["tnw", "tn", "tne"], // Linhas
    ["tw", "tc", "te"],
    ["tsw", "ts", "tse"],
    ["tne", "te", "tse"], // Colunas
    ["tnw", "tw", "tsw"],
    ["tn", "tc", "ts"],
    ["tsw", "tc", "tne"], // Diagonais
    ["tnw", "tc", "tse"],
  ],

  [
    ["cnw", "cn", "cne"], // Linhas
    ["cw", "cc", "ce"],
    ["csw", "cs", "cse"],
    ["cne", "ce", "cse"], // Colunas
    ["cnw", "cw", "csw"],
    ["cn", "cc", "cs"],
    ["csw", "cc", "cne"], // Diagonais
    ["cnw", "cc", "cse"],
  ],
  [
    ["bnw", "bn", "bne"], // Linhas
    ["bw", "bc", "be"],
    ["bsw", "bs", "bse"],
    ["bne", "be", "bse"], // Colunas
    ["bnw", "bw", "bsw"],
    ["bn", "bc", "bs"],
    ["bsw", "bc", "bne"], // Diagonais
    ["bnw", "bc", "bse"],
  ],
  [
    ["tnw", "cnw", "bnw"], // Point West
    ["tw", "cw", "bw"],
    ["tsw", "bsw", "bsw"],
    ["tn", "cn", "bn"], // Point Center
    ["tc", "cc", "bc"],
    ["tne", "cne", "bne"],
    ["te", "ce", "be"], // Point East
    ["tse", "cse", "bse"],
    ["tnw", "cc", "bse"], // diagonais Main
    ["tne", "cc", "bsw"], // diagonais Oposite
    ["tnw", "cw", "bsw"], // Arestas
    ["tsw", "cw", "bnw"], // Arestas
    ["tnw", "cw", "bsw"], // Arestas
    ["tsw", "cw", "bnw"], // Arestas
    ["tn", "cc", "bs"], // Arestas
    ["bn", "cc", "ts"], // Arestas
    ["tne", "ce", "bse"], // Arestas
    ["tse", "ce", "bne"], // Arestas
    ["tsw", "cs", "bse"], // Arestas
    ["bsw", "cs", "tse"], // Arestas
  ],
];
function doTurn() {
  playerPiece = playerPiece == "X" ? "O" : "X";
}

function outputPElement(piece, objelem) {
  var p = document.createElement("p");
  color = "";
  if (piece == "X") color = "red";
  else if (piece == "O") color = "blue";

  p.style.color = color;
  p.style.margin = "0px";
  p.innerHTML = piece;
  objelem.appendChild(p);
}

function doCheckWinner() {
  var xArr = new Array();
  var oArr = new Array();
  document.querySelectorAll("td").forEach((element) => {
    if (element.innerHTML != "") {
      if (element.childNodes[0].textContent == "X") xArr.push(element.id);
      if (element.childNodes[0].textContent == "O") oArr.push(element.id);
    }
  });
  var msg = "";
  winnerSequences.map((row) => {
    row.map((innerrow) => {
      console.debug("winnerSequences innerrow=" + innerrow);

      if (innerrow.every((square) => xArr.includes(square))) {
        msg = "VENCEDOR: Jogador PC(peça X) ";
        if (!gameMode) msg = "VENCEDOR: Jogador P1(peça X) ";

        alert(msg);
        winnerFound = true;
        return;
      }
      if (innerrow.every((square) => oArr.includes(square))) {
        msg = "VENCEDOR: Jogador PC(peça O) ";
        if (!gameMode) msg = "VENCEDOR: Jogador P2(peça O) ";

        alert(msg);
        winnerFound = true;
        return;
      }
    });
  });
}

function handleQuadrant() {
  // Clique em um quadrante do jogo...
  // if (this.childNodes[0].textContent != "&nbsp;") return;
  if (this.textContent != "") return;

  // this.innerHTML = playerPiece;
  // this.childNodes[0].remove();
  outputPElement(playerPiece, this);
  this.style.animation = "scale 0.5s forwards";

  doCheckWinner(); // Verificamos Vencedores ou VELHA

  doTurn(); // Alternancia de TURNo
}

document.addEventListener("DOMContentLoaded", function () {
  consoleTrace("DOMContentLoaded -- init");
  document.querySelectorAll("td").forEach((element) => {
    element.addEventListener("click", handleQuadrant);
  });
  playerName = prompt("Informe o seu nome:", "");
  gameMode = confirm(
    'Modo dois jogadores(P1xP2).\n"OK" para confirmar ou\n' +
      '"Cancel" para modo versus maquina(P1xPC)',
    ""
  );
  consoleTrace(
    "playerName=[" + playerName + "] playerName=[" + gameMode + "]s"
  );

  // drawInitialBoard("boardcreate", readyHandler);
});
