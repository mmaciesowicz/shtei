// import { useState } from "react";
// import { Chessboard } from "./react-shteiboard/src";
// import { Chess } from "./shtei.js/src/chess";

// export default function App() {
//   var starting_fen = "r3Kq3r/2mbnnbm2/pppppppppp/10/10/10/10/PPPPPPPPPP/2MBNNBM2/R3kQ3R"
//     // const [game, setGame] = useState(new Chess());
//   return (
//     <div>
//       <Chessboard position={starting_fen}/>
//     </div>
    
//   );
// }

// export default function App() {
//   return (
//     <div>
//       <Chessboard id="BasicBoard" />
//     </div>
//   );
// }

import { useState } from "react";
import { Chess, Move, Square } from "./shtei.js/src/chess";
import { Chessboard } from "./react-shteiboard/src";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess("r3Kq3r/2mbnnbm2/pppppppppp/10/10/10/10/PPPPPPPPPP/2MBNNBM2/R3kQ3R"));

  function makeAMove(move: string | { from: string; to: string; promotion?: string }) {
    // const gameCopy = { ...game };
    const gameCopy = game;
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves({square: 'e2'});
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}