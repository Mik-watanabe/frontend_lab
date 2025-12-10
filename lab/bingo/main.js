
`use strict`

{
    const COLUMN_NUM = 5;
    function createColumn(col) {
        const source = [];

        for (let i = 0; i < 15; i++) {
            source[i] = i + 1 + 15 * col;
        }

        const column = [];

        for (let i = 0; i < COLUMN_NUM; i++) {
            column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
        }
        return column;
    }

    function createColumns() {
        const columns = [];
        for (let i = 0; i < COLUMN_NUM; i++) {
            columns[i] = createColumn(i);
        }
        columns[2][2] = "FREE";
        return columns;
    }

    function createBingo(columns) {
        const bingo = [];
        for (let row = 0; row < COLUMN_NUM; row++) {
            bingo[row] = [];
            for (let col = 0; col < COLUMN_NUM; col++) {
                bingo[row][col] = columns[col][row];
            }
        }
        return bingo;
    }

    function renderBingo(bingo) {
        const bingoCard = document.querySelector("tbody");
    
        bingo.forEach((row) => {
            const tr = document.createElement("tr");
            row.forEach((col) => {
                const td = document.createElement("td");
                td.textContent = col;
                tr.appendChild(td);
            })
            bingoCard.appendChild(tr);
        })
    }


    const columns =createColumns();
    const bingo = createBingo(columns);
    renderBingo(bingo);


}