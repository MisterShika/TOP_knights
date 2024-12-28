class Node{
    constructor(x, y, parent){
        this.x = x;
        this.y = y;
        this.children = [];
        this.parent = parent;
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

    getParent(){
        return this.parent;
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
        this.visited.push(node);
    }

    checkVisited(nodeX, nodeY){
        let visited = this.getVisited();
        for(const node of visited){
            if (nodeX === node.getX() && nodeY === node.getY()){
                return true;
            }
        }
        return false;
    }

    getDestination(){
        return this.destination;
    }

    destinationExists(){
        let destination = this.getDestination();
        let visited = this.getVisited();
        for(const node of visited){
            if(node.getX() === destination.getX() && node.getY() === destination.getY()){
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
            let moveNode = new Node(x, y, currentNode);
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

    getFinal(){
        let destination = this.getDestination();
        let visited = this.getVisited();
        for(const node of visited){
            if(node.getX() === destination.getX() && node.getY() === destination.getY()){
                return node;
            }
        }
    }

    printPath(node){
        if(node.getParent() == null){
            return;
        }
        console.log(`[X: ${node.getX()}, Y: ${node.getY()}]`);
        this.printPath(node.getParent());
    }

    findPath(x, y){
        console.log(`Finding path to ${x}, ${y}`);
        this.setDestination(x, y);
        this.pathingFunction(0);
        this.printPath(this.getFinal());
    }

    pathingFunction(start){
        let newArray = this.getVisited();
        let currentLength = newArray.length;
        newArray = newArray.slice(start);
        for(let space of newArray){
            this.moveAll(space);
        }
        if(this.destinationExists() == true){
            return;
        }
        this.pathingFunction(currentLength);
    }


}

const knightTest = new Knight(1,1);
knightTest.findPath(7, 7);
//console.log(knightTest.checkVisited(2, 8));
//console.log(knightTest.getRoot());
// console.log(knightTest.getVisited());