var START_NODE_ROW
var START_NODE_COL
var END_NODE_ROW
var END_NODE_COL
let wallSet = new Set([100, 101, 102, 103, 104, 105, 85, 65, 25, 5, 200, 201, 202, 203, 204, 205, 206, 226, 246, 266, 286, 306, 326, 386, 390, 370, 350, 330, 310, 311, 313, 314,315,316,317,318,319])

function resetPoints(){
    START_NODE_ROW = ""
    START_NODE_COL = ""

    END_NODE_ROW = ""
    END_NODE_COL = ""

    startpoint = (document.getElementById('startpoint').selectedOptions[0].value).split(",")
    endpoint = (document.getElementById('endpoint').selectedOptions[0].value).split(",")

    START_NODE_ROW = startpoint[0]
    START_NODE_COL = startpoint[1]

    END_NODE_ROW = endpoint[0]
    END_NODE_COL = endpoint[1]

    document.getElementById('visualize').style.display = "none";
}


//display grid in web
function displayGrid(gr){
$("#container").empty()
  const nodes = []
 for (var row =0; row< 20; row++) {
   const currentRow = [];
   //rows, columns,
    for (var col= 0; col < 20; col++) {

      if (gr[row][col].row === START_NODE_ROW && gr[row][col].col === START_NODE_COL && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell start-node'></div>");
      }
      else if (gr[row][col].row === END_NODE_ROW && gr[row][col].col ===END_NODE_COL && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell final-node'></div>");
      }
      else if (gr[row][col].isVisited == true && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell visited-node'></div>");
      }
      else if (gr[row][col].isShortest == true){
        $("#container").append("<div class='cell shortest-node'></div>");
      }
      else if(gr[row][col].isWall == true){
        $("#container").append("<div class='cell wall-node'></div>");
      }
      else{
        $("#container").append("<div class='cell unvisit'></div>");
      }
    }
    console.log("updated grid")
}
//size of cell
   $(".cell").width(1500/20);
   $(".cell").height(900/20);
   $(".dummyCell").width(1500/20);
   $(".dummyCell").height(900/20);

return nodes;
}


// function that builds a grid in the "container"
function createGrid(size) {
  const nodes = []
  for (var row =0; row< size; row++) {
    const currentRow = [];
    //rows, columns,
     for (var col= 0; col < size; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === END_NODE_ROW && col === END_NODE_COL,
          distance:Infinity,
          isVisited:false,
          isWall:false,
          previousNode: null,
          isShortest: false,
        }
         currentRow.push(currentNode);
     }
  nodes.push(currentRow);
 }
return nodes;
};


// function that clears the grid
function refreshGrid(){
    $(".cell").css("background-color",'');
};


//function that contains wall draw logic
function wallDraw(setWall){
  var mouseStillDown = true;
  //When mouse clicked
  $(".cell").mousedown(function() {
    mouseStillDown = true;
    if ($(this).hasClass("unvisit")){
    $(this).css("background-color", "black");
    setWall.add($(this).index())
    }
    mouseHeldDown();
     });


//Function runs when mouse is clicked and held
 function mouseHeldDown() {
       //returns if mouse is not clicked
     if (!mouseStillDown) { return; }
     //when entering a cell, the background changes to black
     $(".cell").on('mouseenter',function () {
       if ($(this).hasClass("unvisit")){
        $(this).css("background-color", "black");
        setWall.add($(this).index())
      }
      });
     //runs mouseHeldDown function every 100millseconds
     if (mouseStillDown) {   interval = setTimeout(mouseHeldDown,100); }
 }
 //when mouse click is up
 $(".cell").mouseup(function (event) {
   //turns off mouse enter function and stops changing color to black.
   $(".cell").off('mouseenter');
  mouseStillDown = false;
  mouseHeldDown();
});
return setWall
}


//animate grid Function
function animateDijkstra(visitedNodesInOrder,nodesInShortestPath,g){
  const newGrid = g.slice();
  k=0
  for(let i =0; i< visitedNodesInOrder.length; i++){
      const nodenode = visitedNodesInOrder[i];
      const newNode = {
        ...nodenode,
        isVisited: true,
        isShortest: nodesInShortestPath[k].row == visitedNodesInOrder[i].row && nodesInShortestPath[k].col == visitedNodesInOrder[i].col
      };
      newGrid[nodenode.row][nodenode.col] = newNode;
      if (nodesInShortestPath[k].row == visitedNodesInOrder[i].row && nodesInShortestPath[k].col == visitedNodesInOrder[i].col){
        if (k!=nodesInShortestPath.length-1)
            k+=1;
        //console.log(k)
      }
  }
displayGrid(newGrid);
console.log(newGrid);
}

//visualize dijstras algorithm Function
function visualizeDijkstras(g) {
  resetPoints()
  const startNode = g[START_NODE_ROW][START_NODE_COL]
  const finishNode = g[END_NODE_ROW][END_NODE_COL]
  const visitedNodesInOrder = dijkstra(g,startNode,finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  //console.log(nodesInShortestPathOrder)
  animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder,g);
}


//update Nodes function called only when wall
function updateNodes(set,grids){
  if (set.size == 0){
    console.log("set is empty")
    return grids;
  }
  else{
    k=0
    for (let i=0; i<grids.length;i++)
    {
      for (let j=0;j<grids.length;j++)
      {
          if(set.has(k)==true){
            grids[i][j].isWall=true
          }
          k+=1
      }
    }
return grids;
  }

}

function drawWall(){
  alert('test')
  console.log(wallSet)
  wallDraw(wallSet)
}


//main function
$(document).ready(function() {
//make grid
    grids = createGrid(20);
//display grid
displayGrid(grids);
//wall draw
    $(".whole-grid").hover(function(){
      wallSet = wallDraw(wallSet);
      //console.log(wallSet);
      grids = updateNodes(wallSet,grids)
      //console.log(grids)
    });

  //grid
    $(".newGrid").click(function() {
       this.grids = createGrid(20)
       displayGrid(this.grids)
       wallSet = new Set()
       //console.log(this.grids)
       location.reload();
    });
  //visualize dijstras
  $(".visualize").click(function() {
        visualizeDijkstras(grids);
        console.log("done")
  });
});
