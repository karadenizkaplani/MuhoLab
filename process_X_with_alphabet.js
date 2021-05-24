
function associateSymbolGroups() {
	var line1, line2, line3;
	var left, right;
	var row11, row12;
	var xpx = [];
//	xpx.push( ["",1,""] );
	left = "0";
	right = "1";
	var j = 0;
	var currj = 0;
	var currj2 = 0;
	var sum = 0;
	var concat = "";
	var rowLength = 0;
	var j_1 = 0;
	var currgroup = 0;
	var currgroup2 = 0;
    var table = document.getElementById('alphabet');
    var group = document.getElementById('associatedGroups');
    for (var i = 0, n = table.rows.length; i < n; i++) {
        	if( i > 0){
        		line1 = table.rows[i].cells[0].innerHTML;
        		line2 = table.rows[i].cells[1].innerHTML;
        		var line2_split = line2.split('/');
        		var line21 = line2_split[0];
        		var line22 = line2_split[1];
        		line3 = parseFloat(line21) / parseFloat(line22);
        		xpx.push( [ line1, line3, "" ]);
        	}
    }
    xpx.sort(compareSecondColumn);
	currj = xpx.length - 1; //left
	currj2 = xpx.length - 2; //right
	
    for( var i = 1, n = group.rows.length; i < n; i++){
      if(currgroup == 0){
    	  currgroup = group.rows[i].cells.length - 1;
      }
      
//      j=1;
      while( j < xpx.length ){
    	  j_1 = j + 1;
    	  if(i % 3 == 1){    		  
 			  row11 = xpx[j][1]; 
 		      group.rows[i].cells[j_1].innerHTML = row11;  
 		      if( j_1 == currgroup){
 		    	 currgroup2 = currgroup - 1;
 		         sum = parseFloat( group.rows[i].cells[currgroup2].innerHTML ) + parseFloat( group.rows[i].cells[j_1].innerHTML );
 		         currgroup-=1;
		    	 currgroup2-=1;
 		      }
 		  } 
 		  if(i % 3 == 2){ 			  
 			  row12 = xpx[j][0]; 
 		      group.rows[i].cells[j].innerHTML = row12;		     
 		     if( j == currj ){
 		    	 concat = group.rows[i].cells[currj2].innerHTML.concat("", group.rows[i].cells[j].innerHTML);
 		     }

 		  }
 		  if(i % 3 == 0){			
 			 if( j == currj ){
 			    group.rows[i].cells[currj2].innerHTML = left;
 			    group.rows[i].cells[j].innerHTML = right;
                
 			 }
 		  }
    	 j++; 
      }
 	  if( i % 3 == 0 && sum > 0 && i < group.rows.length - 1){
 		  xpx[j-2][1] = sum;
 		  xpx[j-2][0] = concat;		  
 		  xpx.pop();
 	 	  xpx.sort(compareSecondColumn);
 	 	  sum = 0;
 	 	  concat = "";
 	      currj-=1;
 	      currj2-=1;
 	  }
      j=0;
 	}
    document.getElementById('associatedGroups').style.visibility="visible";
}

function hiddenAssociateSymbolGroups() {
	document.getElementById('associatedGroups').style.visibility="hidden";
}


function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
          return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
function showCodewordResults(){
	var group = document.getElementById('associatedGroups');
	var table = document.getElementById('alphabet');
	var codeWord = document.getElementById('codeWord');
	var x;
	var letterall;
	var letterx;
	for (var j = group.rows.length - 2, n = 2; j > 1; j-=3) {  
        for (var i = 1, n = table.rows.length; i < n; i++) {
			for(var k=0; k<group.rows[j].cells.length; k++){
			   letterall = group.rows[j].cells[k].innerHTML;
			   letterx = table.rows[i].cells[0].innerHTML;
			    var pos = letterall.indexOf(letterx);
				  if(pos !== -1 || letterall == letterx ){ 
					 if(pos !== -1){
					     var letter = group.rows[j].cells[k].innerHTML.charAt(pos);
					  }
					  else{
					       letter = letterx;
					    } 
				      for(x in codeWord["rows"]){
						  var px = parseFloat(x);
					      if(isNumeric(x) && px > 0){
				            var string = codeWord["rows"][px].cells[1].innerHTML;
				            var cellValue =  group.rows[j+1].cells[k].innerHTML;
				            if( codeWord.rows[px].cells[0].innerHTML == letter ){
				    	      var newString = string.concat("", cellValue);
						      codeWord.rows[px].cells[1].innerHTML = newString;
						      string = "";
						      cellValue = "";
						      newString = "";
				            }
					      }
			         }
		      } 	
		  }  
	    }
	}
	document.getElementById('codeWord').style.visibility="visible";
}
function hideCodewordResults(){
	document.getElementById('codeWord').style.visibility="hidden";
}
function showCodeWordLength() {
	var codeWord = document.getElementById('codeWord');
	var table = document.getElementById('alphabet')
	var len = 0;
	var a;
	var input = document.getElementsByName('array[]');
	var line1, line2;
	var sum = 0;
	for(var i=1; i<codeWord.rows.length; i++ ){
		len = codeWord.rows[i].cells[1].innerHTML.length;
		for(var j=1; j<table.rows.length; j++){
			if( codeWord.rows[i].cells[0].innerHTML == table.rows[j].cells[0].innerHTML){
				line1 = table.rows[j].cells[1].innerHTML;
        		var line1_split = line1.split('/');
        		var line11 = line1_split[0];
        		var line12 = line1_split[1];
        		line2 = parseFloat(line11) / parseFloat(line12);
				value = line2 * len;
				input[i-1].value = value; 
				sum = sum + value;
			}
		}
	}
	document.getElementById("sum").value = sum;
	document.getElementById("sum2").value = sum;
	document.getElementById("sum3").value = sum;
	document.getElementById('form3').style.visibility="visible";
  }
function hideCodeWordLength(){
	document.getElementById('form3').style.visibility="hidden";
}
function showEntropy(){
	var table = document.getElementById('alphabet');
	var input = document.getElementsByName('array2[]');
	var line1, line2;
	var entrophy = 0;
	for(var i=1; i<table.rows.length; i++){
		line1 = table.rows[i].cells[1].innerHTML;
		var line1_split = line1.split('/');
		var line11 = line1_split[0];
		var line12 = line1_split[1];
		line2 = parseFloat(line11) / parseFloat(line12);
		value = ( -1 ) * ( line2 * Math.log2(line2) );
		input[i-1].value = value; 
		entrophy = entrophy + value;
	}
	document.getElementById("entrophy").value = entrophy;
	document.getElementById("entrophy2").value = entrophy;
	document.getElementById("entrophy3").value = entrophy;
	document.getElementById("result").value = document.getElementById("sum2").value -  document.getElementById("entrophy2").value;
	document.getElementById("result2").value = document.getElementById("result").value;
	document.getElementById("result3").value = ( document.getElementById("sum3").value / document.getElementById("entrophy3").value ) - 1;
	document.getElementById("result3_percent").value = document.getElementById("result3").value * 100;
	document.getElementById('form4').style.visibility="visible";
    
}
function hideEntropy(){
	document.getElementById('form4').style.visibility="hidden";
}
function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
}
function getSum(){
	 return document.getElementById("sum").value;
}
function getEnthropy(){
	 return document.getElementById("entrophy").value;
}
function showLengthCodeWord(letter){
	var table = document.getElementById('alphabet');
	var input = document.getElementsByName('array3[]');
	var currj = j;
	var len = 0;
	var sum = 0;
	for( var i = 0, n = table.rows.length; i < n; i++){
	   if(i == 0){
		  for(var j=2; j<table.rows[i].cells.length; j++){
			  if( letter.value == table.rows[i].cells[j].innerText){
				  var currj = j;
				  break;
			  }
		  }
		   
	   }
	   if(i>0){
		   var line1 = table.rows[i].cells[1].innerHTML;
		   var line1_split = line1.split('/');
		   var line11 = line1_split[0];
		   var line12 = line1_split[1];
		   len = table.rows[i].cells[currj].innerHTML.length;
		   line2 = parseFloat(line11) / parseFloat(line12);
		   value = line2 * len;
		   input[i-1].value = value;
		   sum = sum + value;
	   }
	   
	}
	document.getElementById("sum4").value = sum;
	document.getElementById('form5').style.visibility="visible";
}
function hideLengthEntropy(){
	document.getElementById('form5').style.visibility="hidden";
}
    