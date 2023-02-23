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

    //Initializing counts, to tell who will win, human or CPU (Victory comes with 18 shots);
    let [humanCount, setHumanCount] = useState(0);
    let [cpuCount, setCpuCount] = useState(0);

    //Gets human board disabled when it's CPU'S turn:
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

        if (value === 1) {
            document.getElementById(position).style.backgroundColor = 'red';
            setHumanCount(humanCount + 1);
            //console.log(humanCount)
        }
        else {
            document.getElementById(position).style.backgroundColor = 'blue';

        }

        if (humanCount === 18) {
            alert("YOU WIN!");
            resetGame();
        }
    }

    //Cleans board and resets count:
    const resetGame = () => {
        setHumanCount(0);
        setHideShips(false);
        for (let i = 0; i < 100; i++) {
            document.getElementsByClassName('box-1 col-1 boxButton')[i].style.backgroundColor = '#e9e9ed';
            document.getElementById(i).style.border = 'solid';
        }
    }

    //When the user presses the button to reveal ships
    const showShips = () => {
        setHideShips(!hideShips);
        console.log(hideShips);

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



    }


    return (
        <>
            < div className='row'>

                {/* Headings */}
                <h1 className='text-center my-3 text-white'>Welcome to the Battleship Game</h1>
                <h3 className='text-center mb-3 text-white'>Are you ready? Let's go</h3>
                <h4 className='text-center mb-3 text-white'>You start</h4>

                {/* Board area for human to play: */}
                <div className='container w-25 '>        
                    <div className="tableArea mx-auto">
                        <h4 className='text-center mb-3 text-white'>Human Plays Here! </h4>
                        <div className='row'>

                            {humanBoard.map((singleBox, index) => {
                                return (<button className={"box-1 col-1 boxButton"} id={index} style={{ width: '10%', height: '7vh' }} onClick={() => boxClick(index, singleBox)} key={index}>  </button>)
                            })}

                        </div>
                    </div>
                </div>

                 {/* Board area for CPU to Play */}
                <div className='container w-25'>                  
                    <div className="tableArea mx-auto">
                        <h4 className='text-center mb-3 text-white'>CPU Plays Here</h4>
                        <div className='row'>

                            {cpuBoard.map((singleBox, index) => {
                                return (<button className={"box-2 col-1 boxButton"} id={index + 100} style={{ width: '10%', height: '7vh' }} key={index}>  </button>)
                            })}
                            
                        </div>
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
