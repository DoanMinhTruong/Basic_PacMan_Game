class Board {
    constructor(WIDTH, HEIGHT) {
        this.score = document.getElementById("score");
        this.score.setAttribute("style", 'color: black');
        this.board = document.getElementById("main");
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.randomBoard = new ArrayBoard(this.HEIGHT, this.WIDTH);
        this.randomX = this.randomBoard.random_x;
        this.randomY = this.randomBoard.random_y;
        this.myBoard = new Array(this.HEIGHT);
        this.keyDown = new KeyboardEvent("null");
        for (let i = 0; i < this.HEIGHT; i++) {
            this.myBoard[i] = new Array(this.WIDTH);
            for (let j = 0; j < this.WIDTH; j++) {
                this.myBoard[i][j] = 0;
            }
        }
        for (let i = 0; i < this.randomX.length; i++) {
            this.myBoard[this.randomX[i]][this.randomY[i]] = 1;
        }
        this.indexOfPacX = parseInt(this.HEIGHT / 2);
        this.indexOfPacY = parseInt(this.WIDTH / 2);
        this.myBoard[parseInt(this.HEIGHT / 2)][parseInt(this.WIDTH / 2)] = 2;
        this.draw();
        this.listenKey();
        this.win = false;
    }
    listenKey() {
        document.body.addEventListener('keyup', (keyy) => {
            this.keyDown = keyy;
            switch (this.keyDown.code) {
                case "KeyA":
                    {
                        if (this.indexOfPacY != 0) {
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 0;
                            this.indexOfPacY = this.indexOfPacY - 1;
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 2;
                        }
                        break;
                    }
                case "KeyD":
                    {
                        if (this.indexOfPacY != this.WIDTH - 1) {
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 0;
                            this.indexOfPacY = this.indexOfPacY + 1;
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 2;
                        }
                        break;
                    }
                case "KeyS":
                    {
                        if (this.indexOfPacX != this.HEIGHT - 1) {
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 0;
                            this.indexOfPacX = this.indexOfPacX + 1;
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 2;
                        }
                        break;
                    }
                case "KeyW":
                    {
                        if (this.indexOfPacX != 0) {
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 0;
                            this.indexOfPacX = this.indexOfPacX - 1;
                            this.myBoard[this.indexOfPacX][this.indexOfPacY] = 2;
                        }
                        break;
                    }
                case Default:
                    break;

            }
            this.update();

        });

    }

    // loop() {
    //     this.update();
    //     this.draw();
    //     setTimeout(() => this.loop(), 50);
    // }
    clearScreen() {
        this.board.innerHTML = '';
    }
    update() {
        this.clearScreen();
        this.draw();
        let res = 11 - this.countFood();
        if (res != 11) {
            this.score.innerHTML = "Score : " + res;
        }
        else {
            this.win = true;
            this.score.innerHTML = "You Win! press any key to continue..";
            this.clearScreen();
            this.board = new Board(this.WIDTH, this.HEIGHT);
        }

    }

    countFood() {
        var count = 0;
        for (let i = 0; i < this.HEIGHT; i++) {
            for (let j = 0; j < this.WIDTH; j++) {
                if (this.myBoard[i][j] == 1) count++;
            }
        }
        return count;
    }
    drawPacman() {
        var e = document.createElement("div");
        e.setAttribute("class", "pacman");
        e.innerHTML = "2";
        switch (this.keyDown.code) {
            case "KeyA":
                {
                    e.setAttribute("style", "background-image: url('pacmana.png');");
                    break;
                }
            case "KeyS":
                {
                    e.setAttribute("style", "background-image: url('pacmans.png');");
                    break;
                }
            case "KeyW":
                {
                    e.setAttribute("style", "background-image: url('pacmanw.png');");
                    break;
                }
            case "KeyD":
                {
                    e.setAttribute("style", "background-image: url('pacmand.png');");
                    break;
                }

        }
        this.board.append(e);
    }
    draw() {
        for (let i = 0; i < this.HEIGHT; i++) {
            for (let j = 0; j < this.WIDTH; j++) {
                if (this.myBoard[i][j] == 0) {
                    var e = document.createElement("div");
                    e.setAttribute("class", "square");
                    e.innerHTML = "0";
                    this.board.appendChild(e);
                }
                else if (this.myBoard[i][j] == 1) {
                    var e = document.createElement("div");
                    e.setAttribute("class", "food");
                    e.innerHTML = "1";
                    this.board.appendChild(e);
                }
                else if (this.myBoard[i][j] == 2) {
                    this.drawPacman();
                }
            }
            this.board.append(document.createElement("br"));
        }
    }

}