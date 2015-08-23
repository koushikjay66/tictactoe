


  var mainGameArr=[];
  var listOfSelectedIndex=[];
  var listOfAvailableIndex=[];
  var sizeOfavailableIndex=0;
  mainGameArr[0]=[];
  mainGameArr[1]=[];
  mainGameArr[2]=[];

  /*
    Initialize all the indexes with 0
    Also Initialize all the available Index with Index Number
  */
  for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        mainGameArr[i][j]=0;
        var temp=i+""+j;
        listOfAvailableIndex[sizeOfavailableIndex]=temp;
        sizeOfavailableIndex++;
      }
  }
  //alert(sizeOfavailableIndex);

  // Initialize all the available Index


  // When the user select a box for the game this function will be called .
  //userSelect function takes the id and calculates the row and column selected for the game
  // Then make the postion in mainGameArr 0 or one ;

  function userSelect(k){
    var userSelectedRow=parseInt(k.id[0]);
    var userSelectedColumn=parseInt(k.id[1]);
  //  alert(userSelectedRow+" "+userSelectedColumn);
    mainGameArr[userSelectedRow][userSelectedColumn]=1;
    var x=listOfAvailableIndex.indexOf(userSelectedRow+""+userSelectedColumn);
    listOfAvailableIndex.splice(x, 1);
    sizeOfavailableIndex--;
    listOfSelectedIndex.push(k.id);
    k.value="O";// Beggars can't be choosers
    k.disabled=true;
  //  displayResult();
    computerSelection(userSelectedRow, userSelectedColumn);
  //  displayResult();
  }




  function computerSelection(r, c){
    var userStatus=r+""+c;// User just inserted in this index
    //alert(userStatus);
    var diagonalValue=0;

    /* The below loop Checks if user has already selected 2 indexes .
    If the user is already selected 2 indexes then it will autometically
    fillup the third index , preventing user from winning easily
    */
    for (var i = 0; i <3; i++) {

      var rowValue=0;
      var columnValue=0;


      /* checks if the user already done with filling 2 indexes of a column*/

      for (var k = 0; k < 3; k++) {

          columnValue=columnValue+parseInt(mainGameArr[k][i]);
          //alert(columnValue);
          if (columnValue==2) {// for checking whether filledup two indexes.
            var selectedR;
            if (mainGameArr[0][i]==0) {
              selectedR=0;
            }else if (mainGameArr[1][i]==0) {
              selectedR=1;
            }else{
              selectedR=2;
            }
          //  alert("I will put here :Row: " +selectedR+" Column "+i);
          if (ifselected(selectedR, i)) {
            document.getElementById(selectedR+""+i).value="X";
            document.getElementById(selectedR+""+i).disabled=true;
            listOfSelectedIndex.push(selectedR+""+i);
            var x=listOfAvailableIndex.indexOf(selectedR+""+i);
            listOfAvailableIndex.splice(x, 1);
            sizeOfavailableIndex--;
            mainGameArr[selectedR][i]=10;
            return "";
          }
        }
      }


        /* checks if the user already done with filling 2 indexes of a Row*/
      for (var j = 0; j <3; j++) {

          rowValue=rowValue+ parseInt(mainGameArr[i][j]);
          if (rowValue==2) {
          // alert("I will put here :Row: " +i+" Column "+mainGameArr[i].indexOf(0));
           if (ifselected(i, mainGameArr[i].indexOf(0))) {
             document.getElementById(i+""+mainGameArr[i].indexOf(0)).value="X";
             document.getElementById(i+""+mainGameArr[i].indexOf(0)).disabled=true;
             listOfSelectedIndex.push(i+""+mainGameArr[i].indexOf(0));
             var x=listOfAvailableIndex.indexOf(i+""+mainGameArr[i].indexOf(0));
             listOfAvailableIndex.splice(x, 1);
             sizeOfavailableIndex--;
             mainGameArr[i][mainGameArr[i].indexOf(0)]=10;
              return "";
           }
          }
      }
    }// End of big for loop . Done Checking row wise and column wise

    /*
      The next part is checking diagonally
    */
    // This one checks toTheRight Diagonally
    var countRD=0;
    var selected=0;
    while(countRD<3){
      diagonalValue=diagonalValue+mainGameArr[countRD][countRD];
      if (diagonalValue==2) {
        if (mainGameArr[0][0]==0) {
          selected=0;
        }else if (mainGameArr[1][1]==0) {
          selected=1;
        }else{
          selected=2;
        }
      //  alert("I will put here D:Row: " +selected+" Column "+selected);
        if (ifselected(selected, selected)) {
          document.getElementById(selected+""+selected).value="X";
          document.getElementById(selected+""+selected).disabled=true;
          listOfSelectedIndex.push(selected+""+selected);
          var x=listOfAvailableIndex.indexOf(selected+""+selected);
          listOfAvailableIndex.splice(x, 1);
          sizeOfavailableIndex--;
          mainGameArr[selected][selected]=10;
        return "";
      }
      }
      countRD++;
    }

    // This one checks toTheLeft Diagonally
    var countLDR=0;
    var countLDC=2;
    var selectedR=0;
    var selectedC=0;
    var diagonalValue=0;
    while(countLDC>=0){
      diagonalValue=diagonalValue+mainGameArr[countLDR][countLDC];
      if (diagonalValue==2) {
        if (mainGameArr[0][2]==0) {
          selectedR=0;
          selectedC=2;
        }else if (mainGameArr[1][1]==0) {
          selectedR=1;
          selectedC=1;
        }else{
          selectedR=2;
          selectedC=0;
        }
        if (ifselected(selectedR, selectedC)) {
          document.getElementById(selectedR+""+selectedC).value="X";
          document.getElementById(selectedR+""+selectedC).disabled=true;
          listOfSelectedIndex.push(selectedR+""+selectedC);
          var x=listOfAvailableIndex.indexOf(selectedR+""+selectedC);
          listOfAvailableIndex.splice(x, 1);
          sizeOfavailableIndex--;
          mainGameArr[selectedR][selectedC]=10;
        return "";
        }
        //alert("I will put here D:Row: " +selectedR+" Column "+selectedC);
      }
      countLDR++;
      countLDC--;
    }// Finished Checking Diagonally

    /*
      Now as there is now way to fill a left space for a row or a column or giagonally
      I (AI) will try to fill up using my knowledge. My creator (Koushik Jay) gives me
      that ability.
    */

    /*
      1. I will try to put in the opposite direction the user fill up
    */
    //alert("Vuala");
    var newPos=userStatus[1]+""+userStatus[0];
    if (newPos==userStatus) {
      if (ifselected((parseInt(userStatus[1])+1)%3, (parseInt(userStatus[0])+1)%3)) {
        //Code here to insert;

      //alert("GUGU"+(parseInt(userStatus[1])+2)%3);
      document.getElementById((parseInt(userStatus[1])+1)%3+""+(parseInt(userStatus[0])+1)%3).value="X";
      document.getElementById((parseInt(userStatus[1])+1)%3+""+(parseInt(userStatus[0])+1)%3).disabled=true;
      listOfSelectedIndex.push((parseInt(userStatus[1])+1)%3+""+(parseInt(userStatus[0])+1)%3);
      var x=listOfAvailableIndex.indexOf((parseInt(userStatus[1])+1)%3+""+(parseInt(userStatus[0])+1)%3);
      listOfAvailableIndex.splice(x, 1);
      sizeOfavailableIndex--;
      mainGameArr[(parseInt(userStatus[1])+1)%3][(parseInt(userStatus[0])+1)%3]=10;
    return "";
      }
    }
    if (ifselected(parseInt(userStatus[1]), parseInt(userStatus[0]))) {
      //Code here to insert;
      //alert("I will put here : "+userStatus[1]+"Column: "+userStatus[0]);
      document.getElementById(userStatus[1]+""+userStatus[0]).value="X";
      document.getElementById(userStatus[1]+""+userStatus[0]).disabled=true;
      listOfSelectedIndex.push(userStatus[1]+""+userStatus[0]);
      var x=listOfAvailableIndex.indexOf(userStatus[1]+""+userStatus[0]);
      listOfAvailableIndex.splice(x, 1);
      sizeOfavailableIndex--;
      mainGameArr[userStatus[1]][userStatus[0]]=10;
      return "";
    }

    if (sizeOfavailableIndex!=1) {
      var y=Math.floor(Math.random()*(sizeOfavailableIndex-1));
      var y=listOfAvailableIndex[y];
      document.getElementById(y[0]+""+y[1]).value="X";
      document.getElementById(y[0]+""+y[1]).disabled=true;
      listOfSelectedIndex.push(y[0]+""+y[1]);
      var x=listOfAvailableIndex.indexOf(y[0]+""+y[1]);
      listOfAvailableIndex.splice(x, 1);
      sizeOfavailableIndex--;
      mainGameArr[y[0]][y[0]]=10;
      return "";
    }
    if (sizeOfavailableIndex==1) {
      var y=listOfAvailableIndex[0];
      document.getElementById(y[0]+""+y[1]).value="X";
      document.getElementById(y[0]+""+y[1]).disabled=true;
      listOfSelectedIndex.push(y[0]+""+y[1]);
      var x=listOfAvailableIndex.indexOf(y[0]+""+y[1]);
      listOfAvailableIndex.splice(x, 1);
      sizeOfavailableIndex--;
      mainGameArr[y[0]][y[0]]=10;
      return "";
    }

  }// End of function

  /*
      Every time you want to fill up and index you need to call this function .
      What it does is check if the index is already taken
      if the index is already filled up then it will return false
      Else it will return true . So that you can insert into that index.
      Happy Inserting :)
  */
  function ifselected(r, c){
    var check=r+""+c;
    if (listOfSelectedIndex.indexOf(check)==-1) {
      return true;
    }
    return false;
  }

  function displayResult(){
    var diagonalValue=0;
    for (var i = 0; i <3; i++) {
      var rowValue=0;
      var columnValue=0;


      /* checks if the user already done with filling 2 indexes of a column*/

      for (var k = 0; k < 3; k++) {
        columnValue=columnValue+parseInt(mainGameArr[k][i]);

        if (columnValue==3) {// for checking whether filledup two indexes.
          alert("You have won!");
        }
        else if (columnValue==30){
          alert("You Loose! I won!:P");
        }
      }

        /* checks if the user already done with filling 2 indexes of a Row*/
      for (var j = 0; j <3; j++) {
        rowValue=rowValue+ parseInt(mainGameArr[i][j]);
        if (rowValue==3) {
          alert("You have won!");
          return "";
        }else if (columnValue==30){
          alert("You Loose! I won!:P");
          return "";
        }
      }
    }// End of big for loop . Done Checking row wise and column wise

    /*
      The next part is checking diagonally
    */
    // This one checks toTheRight Diagonally
    var countRD=0;
    var selected=0;
    while(countRD<=3){
      diagonalValue=diagonalValue+mainGameArr[countRD][countRD];
      if (diagonalValue==3) {

        alert("You Won!");
        return "";
      }else if (diagonalValue==30){
        alert("You Loose! I won!:P");
        return "";
      }

      countRD++;
    }

    // This one checks toTheLeft Diagonally
    var countLDR=0;
    var countLDC=2;
    var selectedR=0;
    var selectedC=0;
    var diagonalValue=0;
    while(countLDC>=0){
      diagonalValue=diagonalValue+mainGameArr[countLDR][countLDC];
      diagonalValue=diagonalValue+mainGameArr[countRD][countRD];
      if (diagonalValue==3) {

        alert("You Won!");
        return "";
      }else if (diagonalValue==30){
        alert("You Loose! I won!:P");
        return "";
      }
      countLDR++;
      countLDC--;
    }// Finished Checking Diagonally

  }
