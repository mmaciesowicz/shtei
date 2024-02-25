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
import { Chess, Square} from "./shtei.js/src/chess";
import { Chessboard } from "./react-shteiboard/src";
import { PromotionPieceOption } from "./react-shteiboard/src/chessboard/types";

export default function App() {
  
  const [game, setGame] = useState(new Chess('r3Kq3r/2mbnnbm2/pppppppppp/10/10/10/10/PPPPPPPPPP/2MBNNBM2/R3kQ3R w - 0 1'));
  //const [game, setGame] = useState(new Chess());

  function makeAMove(move: string | { from: string; to: string; promotion?: string }) {
    //const gameCopy = { ...game };
    let gameCopy = game;
    const result = gameCopy.move(move);
    if (result !== null) {
      setGame(new Chess(game.fen()));
    }
    
    
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves({verbose: true });
    console.log(game.moves({verbose: true, xray: true}));
    // console.log(possibleMoves);
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    // for (let i=0; i<possibleMoves.length; i++) {
    //   setTimeout(() => {
    //     const move = makeAMove({
    //       from: possibleMoves[i].from,
    //       to: possibleMoves[i].to,
    //     });
    //     game.undo();
    //     //setGame(new Chess(game.fen()));
    //   }, 5000);
      
    // }
    const move = makeAMove({
      from: possibleMoves[randomIndex].from,
      to: possibleMoves[randomIndex].to,
      // promotion: "q",
    });
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      //promotion: "q", 
    });
    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    //makeRandomMove();
    return true;
  }

  function onPromote(promoteFromSquare?: Square | undefined, promoteToSquare?: Square | undefined, piece?: PromotionPieceOption) {
    if (piece && promoteFromSquare && promoteToSquare) {
      const move = makeAMove({
        from: promoteFromSquare,
        to: promoteToSquare,
        promotion: piece?.charAt(1).toLowerCase()});
      // illegal move
      if (move == null) return false;
      setTimeout(makeRandomMove, 200);
      return true;
    }
    
    return false;
  }
  // function onPromoteCheck(sourceSquare: Square, targetSquare: Square, piece: Piece) {
  //   console.log("piece: ", piece);
  //   return true;
  // }  
  return <Chessboard position={game.fen()} onPieceDrop={onDrop} onPromotionPieceSelect={onPromote}/>;
  //return <Chessboard position={game.fen()} onPieceDrop={onDrop} onPromotionCheck={onPromoteCheck}/>;

}