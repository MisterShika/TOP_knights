class Node{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.children = [];
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getChildren(){
        return this.children;
    }

    addChild(node){
        this.children.push(node);
    }
}

//Controller
class Knight{
    constructor(x, y){
        this.visited = [];

        this.root = new Node(x, y);

        this.destination = null;

        if(this.inBounds(this.x, this.y) == false){
            throw new Error("Provided coordinates out of bounds");
        }

        this.addVisited(this.root);
    }

    getRoot(){
        return this.root;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getVisited(){
        return this.visited;
    }

    setDestination(x, y){
        let destinationNode = new Node(x, y);
        this.destination = destinationNode;
    }

    addVisited(node){
        this.visited.push([node.getX(), node.getY()]);
    }

    checkVisited(nodeX, nodeY){
        let visited = this.getVisited();
        for(const [x, y] of visited){
            if (nodeX === x && nodeY === y){
                return true;
            }
        }
        return false;
    }

    inBounds(x, y){
        if(x > 8 || y > 8 || x < 1 || y < 1){
            return false;
        }else{
            return true;
        }
    }

    moveNode(x, y, currentNode){
        if(this.inBounds(x, y) == true && this.checkVisited(x, y) == false){
            if(x == this.destination.getX() && y == this.destination.getY()){
                console.log("FOUND");
                //Display path
            }
            let moveNode = new Node(x, y);
            currentNode.addChild(moveNode);
            this.addVisited(moveNode);
        }
    }

    moveUpLeft(node){
        let x = node.getX() - 1;
        let y = node.getY() + 2;
        this.moveNode(x, y, node);
    }

    moveUpRight(node){
        let x = node.getX() + 1;
        let y = node.getY() + 2;
        this.moveNode(x, y, node);
    }

    moveRightUp(node){
        let x = node.getX() + 2;
        let y = node.getY() + 1;
        this.moveNode(x, y, node);
    }

    moveRightDown(node){
        let x = node.getX() + 2;
        let y = node.getY() - 1;
        this.moveNode(x, y, node);
    }

    moveDownRight(node){
        let x = node.getX() + 1;
        let y = node.getY() - 2;
        this.moveNode(x, y, node);
    }

    moveDownLeft(node){
        let x = node.getX() - 1;
        let y = node.getY() - 2;
        this.moveNode(x, y, node);
    }

    moveLeftUp(node){
        let x = node.getX() - 2;
        let y = node.getY() + 1;
        this.moveNode(x, y, node);
    }

    moveLeftDown(node){
        let x = node.getX() - 2;
        let y = node.getY() - 1;
        this.moveNode(x, y, node);
    }

    moveAll(node){
        this.moveUpLeft(node);
        this.moveUpRight(node);
        this.moveRightUp(node);
        this.moveRightDown(node);
        this.moveDownRight(node);
        this.moveDownLeft(node);
        this.moveLeftUp(node);
        this.moveLeftDown(node);
    }

    findPath(x, y){
        this.setDestination(x, y);
        this.moveAll(this.getRoot());
    }
}

const knightTest = new Knight(1,1);
knightTest.findPath(3, 2);
//console.log(knightTest.checkVisited(2, 8));
console.log(knightTest.getRoot());
console.log(knightTest.getVisited());