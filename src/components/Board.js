import React, { useState, useEffect } from 'react'
import Button from './Button';

export default function Board() {
    let initializeBoard = [
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
        [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],
    ];

    let [board, setBoard] = useState(createRandomBoard);

    useEffect(()=>{
        

    }, [board])

function createRandomBoard(){

    let randomBoard = [];
 
    for (let i ; i < 100; i++) {
        randomBoard[i] = Math.round(Math.random());
        if (randomBoard[i]===1){
            document.getElementsByClassName("col-1 boxButton")[i].style.backgroundColor = 'red';
        }
        else{
            document.getElementsByClassName("col-1 boxButton")[i].style.backgroundColor = 'blue';
        }
    }
}

    function boxClick(position) {

    }

    function resetGame() {
setBoard(createRandomBoard())
    }

    return (
        <div className='container'>
            <h1 className='text-center my-3 text-white'>Welcome to the Battleship Game</h1>
            <h3 className='text-center mb-3 text-white'>Are you ready? Let's go</h3>
            <h4 className='text-center mb-3 text-white'>Press any box to start</h4>
            <div className="tableArea mx-auto">
                

                <div className='row'>

                    {board.map((singleBox, index) => {
                        return (<button className="col-1 boxButton" style={{ width: '10%' }} onClick={() => boxClick(0)} key={index}> {singleBox} </button>)
                    })}

                </div>
                <div class="d-grid gap-2 col-6 mx-auto">

                    <Button className=' btn btn-warning mt-3 mx-auto' OnClick={resetGame} label='Reset' />
                </div>
            </div>
        </div>
    )
}
