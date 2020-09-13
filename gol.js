let screenWidth=screen.width;
let screenHeight=screen.height;

let gridSize=20;  
let golCanvas=document.getElementById('golCanvas');
const ctx = golCanvas.getContext('2d');

let grids_arr= new Array();
var gridLocation;
 
function init(){
    setCanvasSize();
    createGrids(1,2);
}

function setCanvasSize(){
    // document.body.scrollTop = 0; 
    // document.body.style.overflow = 'hidden';
    // document.body.style.margin = '0px';
    golCanvas.width=screenWidth;
    golCanvas.height=screenHeight;
}

function createGrids(){
    gridLocation=[];
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
    gridLocation=[];
    var new_grids_arr=new Array();
     
    for(i=0;i<grids_arr.length;i++){
        var rows=new Array();
        for(j=0;j<grids_arr[i].length;j++){
            var currentCellState=grids_arr[i][j];
            var totalneighbours=0;


            if((j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i][j+1];                
            }else{
                totalneighbours=totalneighbours+grids_arr[i][0];                
            }

            if((j-1)>=0){                
               totalneighbours=totalneighbours+grids_arr[i][j-1];                
            }else{
                totalneighbours=totalneighbours+grids_arr[i][grids_arr[i].length-1];                
            }

            if((i+1)<=grids_arr.length-1){                
                
               totalneighbours=totalneighbours+grids_arr[i+1][j];               
            }else{
                totalneighbours=totalneighbours+grids_arr[0][j];               
            }
            
            if((i-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i-1][j];
            }else{
                totalneighbours=totalneighbours+grids_arr[grids_arr.length-1][j];
            }
            


            if((i+1)<=grids_arr.length-1 && (j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i+1][j+1];                
            }else{
                 
                if((j+1)<=grids_arr[i].length-1){
                    totalneighbours=totalneighbours+grids_arr[0][j+1]; 
                }else{
                    totalneighbours=totalneighbours+grids_arr[0][0]; 
                }
                
                
            }

            if((i+1)<=grids_arr.length-1 && (j-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i+1][j-1];
            }else{
                if((j-1)>=0){
                    totalneighbours=totalneighbours+grids_arr[0][j-1];
                }else{
                    totalneighbours=totalneighbours+grids_arr[0][grids_arr[i].length-1];
                }
                
            }


            if((i-1)>=0 && (j+1)<=grids_arr[i].length-1){                
                totalneighbours=totalneighbours+grids_arr[i-1][j+1];                
            }else{
                if( (j+1)<=grids_arr[i].length-1){
                    totalneighbours=totalneighbours+grids_arr[grids_arr.length-1][j+1];  
                }else{
                    totalneighbours=totalneighbours+grids_arr[grids_arr.length-1][0];
                }
                
            }

            if((i-1)>=0 && (j-1)>=0){                
                totalneighbours=totalneighbours+grids_arr[i-1][j-1];                
            }else{
                if( (j-1)>=0){
                    totalneighbours=totalneighbours+grids_arr[grids_arr.length-1][j-1];        
                }else{
                    totalneighbours=totalneighbours+grids_arr[grids_arr.length-1][grids_arr[i].length-1];        
                }
                 
            }


            if(totalneighbours<2){
                currentCellState=0;
            }else if(totalneighbours>=2 && totalneighbours<=3 ){
                
                if(totalneighbours==3){
                    if(currentCellState==0){
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
        var gridCordinates=new Array();
        for(j=0;j<grids_arr[i].length;j++){
            ctx.beginPath();
           
            if(grids_arr[i][j]==1){
                //the cell is alive
                ctx.fillStyle = "#FFFFFF";                
            }else{
                //the cell is dead
                ctx.fillStyle = "#000000"; 
            }
            ctx.strokeStyle = "#000000";     
            ctx.strokeRect(j+x, i+y, gridSize, gridSize);
            ctx.fillRect(j+x, i+y, gridSize, gridSize);           
            gridCordinates[j]=[j+x,i+y]; 
            x=x+gridSize;
        }
        gridLocation[i]=gridCordinates;
         
        y=y+gridSize;
    }    
    
} 

golCanvas.addEventListener('click', (e) => {
   
    var clickX = e.layerX;
    var clickY = e.layerY;
   
    var element;
    
    for(i=0;i<gridLocation.length;i++){         
        for(j=0;j<gridLocation[i].length;j++){ 
            var xBoxWidth=gridLocation[i][j][0]+gridSize;
            var yBoxHeight=gridLocation[i][j][1]+gridSize;
            
            if(clickX>=gridLocation[i][j][0] && clickX<=xBoxWidth && clickY>=gridLocation[i][j][1] && clickY<=yBoxHeight){
                ctx.beginPath();
                ctx.fillStyle = "#FFFFFF"; 
                ctx.fillRect(gridLocation[i][j][0], gridLocation[i][j][1], gridSize, gridSize);   
                grids_arr[i][j]=1;
                return false; 
            }
            
        }
        
        
    }
       
    
});

window.setInterval(function(){
    evaluteState();
  }, 10);

init();
