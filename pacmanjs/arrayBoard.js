class ArrayBoard {
    constructor(HEIGHT, WIDTH) {
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.x = [];
        for (let i = 0; i < this.HEIGHT; i++) this.x.push(i);
        this.y = [];
        for (let i = 0; i < this.WIDTH; i++) this.y.push(i);
        this.random_x = [];
        this.random_y = [];
        while (this.random_x.length <= 12 && this.random_y.length <= 12) {
            this.random_x.push(this.random_item(this.x));
            this.random_y.push(this.random_item(this.y));
        }
    }
    random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    show() {
        this.random_x.forEach(element => {
            console.log(element);
        });
        this.random_y.forEach(element => {
            console.log(element);
        });
    }

}