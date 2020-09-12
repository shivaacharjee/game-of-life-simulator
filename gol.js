let screenWidth=screen.width;
let screenHeight=screen.height;

let gridSize=10; //20x20 pixel wide
let golCanvas=document.getElementById('golCanvas');
const ctx = golCanvas.getContext('2d');

let grids_arr= new Array();

 
function init(){
    setCanvasSize();
    createGrids(1,2);
}

function setCanvasSize(){
    document.body.scrollTop = 0; 
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0px';
    golCanvas.width=screenWidth;
    golCanvas.height=screenHeight;
}

function createGrids(){
    
    for(i=0;i<screenHeight/gridSize;i++){
        var rows=new Array();
        for(j=0;j<screenWidth/gridSize;j++){  
            var cellValue=Math.round(Math.random());          
            rows[j]=cellValue;
        }
        grids_arr[i]=rows;
    }
    renderGrids(false);
}

function evaluteState(){
    var new_grids_arr=new Array();
     
    for(i=0;i<grids_arr.length;i++){
        var rows=new Array();
        for(j=0;j<grids_arr[i].length;j++){
            var currentCellState=grids_arr[i][j];
            var totalneighbours=0;


            if((j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i][j+1];                
            }
            if((j-1)>=0){                
               totalneighbours=totalneighbours+grids_arr[i][j-1];                
            }

            if((i+1)<=grids_arr.length-1){                
                
               totalneighbours=totalneighbours+grids_arr[i+1][j];               
            }
            
            if((i-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i-1][j];
            }
            
            if((i+1)<=grids_arr.length-1 && (j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i+1][j+1];                
            }

            if((i+1)<=grids_arr.length-1 && (j-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i+1][j-1];
            }
            if((i-1)>=0 && (j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i-1][j+1];                
            }

            if((i-1)>=0 && (j-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i-1][j-1];                
            }


            if(totalneighbours<2){
                currentCellState=0;
            }else if(totalneighbours>=2 && totalneighbours<=3 ){
                if(totalneighbours==3){
                    if(currentCellState==0){
                        currentCellState=1;
                    }else{
                        currentCellState=1;
                    }
                }
            }else if(totalneighbours>3){
                currentCellState=0;
            }
            rows[j]=currentCellState;
        }
        new_grids_arr[i]=rows;
    }




    renderGrids(new_grids_arr);
}

function renderGrids(grids_data){
    if(grids_data==false){

    }else{
        grids_arr=grids_data;
    }
    var y=0;
    for(i=0;i<grids_arr.length;i++){
        var x=0;
        for(j=0;j<grids_arr[i].length;j++){

            if(grids_arr[i][j]==1){
                //the cell is alive
                ctx.fillStyle = "#7CFC00";
            }else{
                //the cell is dead
                ctx.fillStyle = "#DC143C";
                
            }
            ctx.beginPath();
            ctx.fillRect(j+x, i+y, gridSize, gridSize);           
            x=x+gridSize;
        }
        y=y+gridSize;
    }    
    
} 
window.setInterval(function(){
    evaluteState();
  }, 500);

init();
