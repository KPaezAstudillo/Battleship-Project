import React, { useState, useEffect } from 'react'
import Button from './Button';

export default function Board() {

    //Initialize both human and CPU boards with predetermined ship positions:
    let humanBoard =
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            1, 0, 0, 1, 1, 0, 0, 0, 0, 0,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            1, 1, 1, 1, 0, 0, 0, 0, 0, 0
        ];

    let cpuBoard =
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            0, 0, 1, 1, 1, 1, 1, 0, 0, 0,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            0, 0, 0, 0, 0, 0, 1, 1, 0, 0,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,

            0, 0, 0, 1, 1, 1, 1, 0, 0, 1
        ];

    //useState to show/hide rules
    let [rules, setRules] = useState(false);
    //Initializing counts, to tell who will win, human or CPU (Victory comes with 18 shots);
    let [humanCount, setHumanCount] = useState(0);
    let [cpuCount, setCpuCount] = useState(0);

    //Gets human board disabled when it's CPU'S turn (not implemented yet)
//and shows a message when it's each player's turn:
    let [cpuTurn, setCpuTurn] = useState(false);

    //useState to change button label when you decide to show/hide ships:
    let [hideShips, setHideShips] = useState(false);

    // adds borders to the board boxes:
    useEffect(() => {
        for (let i = 0; i < 200; i++) {
            document.getElementsByClassName('col-1 boxButton')[i].style.border = 'solid';
        }
    }, [])

    //Function reveals background color when clicked, and add counts if there is a ship inside the box:
    function boxClick(position, value) {

        setCpuTurn(!cpuTurn);

        if (value === 1) {
            document.getElementById(position).style.backgroundColor = 'red';
            setHumanCount(humanCount + 1);
            //console.log(humanCount)
        }
        else {
            document.getElementById(position).style.backgroundColor = 'gray';

        }

        if (humanCount === 18) {
            alert("YOU WIN!");
            resetGame();
        }

        setTimeout(cpuGame, 800); //CPU 'delay' for a more realistic game experience

    }

    //Cleans board and resets count:
    const resetGame = () => {
        setCpuTurn(false);
        setHumanCount(0);
        setCpuCount(0);
        setHideShips(false);
        for (let i = 0; i < 200; i++) {
            document.getElementsByClassName('col-1 boxButton')[i].style.backgroundColor = '#e9e9ed';
            document.getElementById(i).style.border = 'solid';
        }
    }

    //When the user presses the button to reveal ships
    const showShips = () => {
        setHideShips(!hideShips);


        if (hideShips) {
            for (let i = 0; i < 100; i++) {
                if (humanBoard[i] === 1) {
                    document.getElementById(i).style.border = 'solid';
                }

            }
        }
        else {
            for (let i = 0; i < 100; i++) {
                if (humanBoard[i] === 1) {
                    document.getElementById(i).style.borderColor = 'orange';
                }

            }
        }

    }

    //CPU turn:
    const cpuGame = () => {

        //random number to get one position for
        let randomPosition = Math.floor(Math.random() * (100));

        if (cpuBoard[randomPosition] === 1) {
            //IDs in cpu board start at 100, so we have to add 100 to the random number to get the position we want in cpu board
            document.getElementById(randomPosition + 100).style.backgroundColor = 'red';
            setCpuCount(cpuCount + 1);


        }
        else {
            document.getElementById(randomPosition + 100).style.backgroundColor = 'gray';

        }

        if (cpuCount === 18) {
            alert("CPU WIN! TRY NEXT TIME");
            resetGame();
        }
        setCpuTurn(false);
    }

    return (
        <>
            < div className='row'>
                {/* Instructions */}
                <Button className='btn btn-warning' label='Psst! Take a look at the Rules Here' onClick={() => { setRules(!rules) }} />
                {rules &&
                    <div className='mx-auto my-auto '>
                        <div className="card bg-warning">
                            <div className="card-body fs-5">
                                The object of Battleship is to try and sink all of the other player's before they sink all of your ships. You try and hit them by calling out the coordinates of one of the squares on the board.  The other player (CPU in this case) also tries to hit your ships by calling out coordinates.  When all of the squares that one of your ships occupies have been hit, the ship will be sunk.

                            </div>
                        </div>
                    </div>
                }
                {/* Headings */}
                <h1 className='text-center my-3 text-white'>Battleship</h1>
                <h3 className='text-center mb-3 text-white'>Are you ready? Let's go</h3>
                {(cpuTurn ? <h4 className='text-center mb-3 text-white'>CPU's turn</h4> : <h4 className='text-center mb-3 text-white'>Your turn</h4>)}

                {/* Board area for human to play: */}
                <div className='col-xl-3 mx-auto'>
                    <h4 className='text-center mb-3 text-white'>You Play Here! </h4>
                    <div className='row'>

                        {humanBoard.map((singleBox, index) => {
                            return (<button className={"box-1 col-1 boxButton"} id={index} style={{ width: '10%', height: '7vh' }} onClick={() => boxClick(index, singleBox)} key={index}>  </button>)
                        })}

                    </div>
                </div>



                {/* Board area for CPU to Play */}
                <div className='col-xl-3 mx-auto'>
                    <h4 className='text-center mb-3 text-white'>CPU Plays Here</h4>
                    <div className='row'>

                        {cpuBoard.map((singleBox, index) => {
                            return (<button className={"box-2 col-1 boxButton"} id={index + 100} style={{ width: '10%', height: '7vh' }} key={index}> </button>)
                        })}
                        {/* we add 100 to IDs in this board to difference them from the first board */}
                    </div>
                </div>
            </div>

            {/* Reset Game and Show Ships buttons: */}
            <div className=" col-2 mx-auto">
                <Button className=' btn btn-warning mt-3 mx-auto' onClick={resetGame} label='Reset' />
                <Button className=' btn btn-secondary mt-3 ms-2' onClick={showShips} label={(hideShips ? 'Hide Ships' : 'Show Ships')} />
            </div>
        </>
    )
}
