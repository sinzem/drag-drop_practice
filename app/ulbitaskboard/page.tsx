"use client";

import Link from "next/link";
import { DragEvent, JSX, useState } from "react";
import MainPageLink from "../components/MainPageLink/MainPageLink";

type ITask = {
    id: number;
    title: string;
}

type IBoard = {
    id: number;
    title: string;
    items: ITask[];
}

export default function UlbiTVTaskBoard(): JSX.Element {

    const [boards, setBoards] = useState<IBoard[]>([
        {id: 1, title: "To do", items: [{id: 1, title: "Go to shop"}, {id: 2, title: "Throw out trash"}, {id: 3, title: "To eat"}]},
        {id: 2, title: "To check", items: [{id: 4, title: "Code review"}, {id: 5, title: "Factorial task"}, {id: 6, title: "Fibonacci task"}]},
        {id: 3, title: "Done", items: [{id: 7, title: "Make video"}, {id: 8, title: "Mount video"}, {id: 9, title: "Render video"}]}
    ]);
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [currentItem, setCurrentItem] = useState<ITask | null>(null);

    function dragOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (e.currentTarget.className === 'item') {
            e.currentTarget.style.boxShadow = '0 4px 5px yellow';
        }
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, board: IBoard, item: ITask) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, board: IBoard, item: ITask) {
        e.preventDefault();

        if (!currentBoard || !currentItem) return;

        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard?.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map(b => {
            if (b.id === board.id) return board;
            if (b.id === currentBoard.id) return currentBoard;
            return b;
        }))

        e.currentTarget.style.boxShadow = 'none';
    }

    function dropCardHandler(e: DragEvent<HTMLDivElement>, board: IBoard) {
        if (!currentItem || !currentBoard) return;

        board.items.push(currentItem);
        const currentIndex = currentBoard?.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);

        setBoards(boards.map(b => {
            if (b.id === board.id) return board;
            if (b.id === currentBoard.id) return currentBoard;
            return b;
        }));

        e.currentTarget.style.boxShadow = 'none';
    }

    return (
        <div>
            <MainPageLink />

            <div className='w-[100%] h-[100vh] flex items-center justify-center'>
                {boards.map(board => 
                    <div 
                        key={board.id}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board)}
                        className="board min-w-[300px] min-h-[400px] border-5 border-[lightgray] px-2.5 py-5 rounded-xl m-2.5 flex items-center flex-col"
                    >
                        <div className="text-2xl text-bold">{board.title}</div>
                        {board.items.map(item => 
                            <div
                                key={item.id} 
                                draggable="true"
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                className="item w-full border-2 border-[lightpink] p-2.5 rounded-[6px] my-1.5 cursor-grab bg-foreground text-background"
                            >
                                {item.title}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
