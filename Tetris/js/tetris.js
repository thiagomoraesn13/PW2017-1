(function () {  //Funcao imediata.

	var table;
	var loop, loop2;
	var y,x;
	var fps;
	var parada = 1;
	var parada2 =10;
	var sizeOfX = 20;
	var sizeOfY = 10;

	var matrix = new Array(sizeOfX);
	for (var i=0;i<sizeOfX;i++) {
		matrix[i] = new Array(sizeOfY);
	}
	for(var i =0;i<20;i++){
		for (var j = 0; j < 10;j++) {
			matrix[i][j] = 1;
		}
	}

	function init () {
		fps = 2;
		y=2;x=2;
		type = 'T';
		createTable();

		loop = setInterval(colorTable, 1000/fps);

	}
	//
	// function init2(){
	//
	// 	type = 'P';
	// 	clearInterval(loop);
	// 	x=2;
	// 	loop = setInterval(colorTable2, 1000/fps);
	//
	// }
	//
	//
	function init1(){
		//clearInterval(loop);
		x=2,y=2;
		loop = setInterval(colorTable, 1000/fps);
	}

	addEventListener("keydown", function(e) {
		if (e.key == "ArrowLeft") {
			if(y>=2){
				y --;
			}
		} else if (e.key == "ArrowRight") {
			if(y<=7){
				y ++;
			}
		}
		// }else if (e.key =="ArrowDown") {
		// 	x++;
		// }
		// }else if (e.key =="ArrowUp") {
		// 	//	x++;
		// 	// init2();
		// 	// colorTable2();
		// }


	})
	function createTable(){
		var tabuleiro = document.getElementsByTagName('div')[1]; //Referencia para o segundo div.
		table = document.createElement('table');    //Instancia uma tabela.
		table.style.height = '100%';
		table.style.width = '20%';
		table.padding = '10%';
		var tbdy = document.createElement('tabuleiro');
		for (var i = 0; i < 20; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 10; j++)
			{
				var td = document.createElement('td');
				var node =document.createTextNode('')
				td.appendChild(node);
				tr.appendChild(td);
			}
			tbdy.appendChild(tr);
		}
		table.appendChild(tbdy);
		tabuleiro.appendChild(table);
	}

	function clean(){
		for(var i = 1;i<20 ;i++){
			for(var j = 1;j<10 ;j++){
				if(matrix[i][j] != 0){
					document.querySelector("tr:nth-child(" + (i) + ") td:nth-child(" + (j) + ")").style.backgroundColor = "";
				}
			}
		}
	}
	function colorTable(){

		clean();
		x++;
		if(type == 'T'){
			var items = [
				[x-1, y],
				[x-1, y+1],
				[x-1, y+2],
				[x, y+1],
			];

			for (var i = items.length - 1; i >= 0; i--){
				document.querySelector("tr:nth-child(" + items[i][0] + ") td:nth-child(" + items[i][1] + ")").style.backgroundColor = "blue";
			}

			if(x+2 >= 21){

				clearInterval(loop);
				matrix[x-1][y] = 0;
				matrix[x-1][y+1] = 0;
				matrix[x-1][y+2] = 0;
				matrix[x][y+1] = 0;
				type = 'O' ;
				init1();

			}
		}
		if(type == 'O'){
			var items = [
				[x-1, y],
				[x-1, y+1],
				[x, y],
				[x, y+1],
			];
			for (var i = items.length - 1; i >= 0; i--) {
				document.querySelector("tr:nth-child(" + items[i][0] + ") td:nth-child(" + items[i][1] + ")").style.backgroundColor = "orange";
			}

			//
			if(x+2 >= 21){
				clearInterval(loop);
				matrix[x-1][y] = 0;
				matrix[x-1][y+1] = 0;
				matrix[x][y] = 0;
				matrix[x][y+1] = 0;
				type = 'L' ;
				init1();
			}}
			if(type == 'L'){
				var items = [
					[x-1, y],
					[x, y],
					[x+1, y],
					[x+1, y+1],
				];
				for (var i = items.length - 1; i >= 0; i--) {
					document.querySelector("tr:nth-child(" + items[i][0] + ") td:nth-child(" + items[i][1] + ")").style.backgroundColor = "red";
				}
				if(x+2 >= 21){
					clearInterval(loop);
					matrix[x-1][y] = 0;
					matrix[x][y] = 0;
					matrix[x+1][y] = 0;
					matrix[x+1][y+1] = 0;
					type = 'I' ;
					init1();

				}
			}
			if(type == 'I'){
				var items = [
					[x-1, y],
					[x, y],
					[x+1, y],
					[x+2, y],
				];
				for (var i = items.length - 1; i >= 0; i--) {
					document.querySelector("tr:nth-child(" + items[i][0] + ") td:nth-child(" + items[i][1] + ")").style.backgroundColor = "green";
				}
				if(x+2 >= 21){
					clearInterval(loop);
					matrix[x-1][y] = 0;
					matrix[x][y] = 0;
					matrix[x+1][y] = 0;
					matrix[x+1][y+1] = 0;

				}
			}


		}
		init();

	})();
