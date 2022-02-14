import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
        const tableData = [...state.tableData]; 
        // 얕은 복사
        tableData[action.row] = [...tableData[action.row]]
        tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      }
    }
    case SET_TURN: {
        return {
            ...state,
            turn: state.turn === 'O' ? 'X' : 'O'
        }
    }
    case RESET_GAME: {
        return{
            ...state,
            turn: 'O',
            tableData: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
            recentCell: [-1, -1],
        }
    }
    default:
        return state;
}};
    

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
      const [row, cell] = recentCell;
      if (row < 0) {
          return;
      }
      let win = false;
      if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
          win = turn;
      }
      if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
        win = turn;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
        win = turn;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
        win = turn;
    }

    if (win) {
        dispatch({ type:SET_WINNER, winner: turn, })
        dispatch({ type: RESET_GAME})
    } else{
        let all = true; //draw
        tableData.forEach((row)=> {
            row.forEach((cell)=> {
                if (!cell) {
                    all = false;
                }
            })
        })
        if (all) {
            dispatch({ type: RESET_GAME})
        } else{
        dispatch({type: SET_TURN})
    }}
  }, [recentCell])

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} Win!</div>}
    </>
  )
};

export default TicTacToe;