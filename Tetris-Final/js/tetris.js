(function() {
  //Thiago Moraes
  //Eu não consegui fazer cada peça ser de uma cor diferente,
  //só consegui que a cada execucao mude de cor, clique F5 para testar

  var altura         =   20;
  var largura          =   10;
  var Tabela           =   createTable();
  var matrix          =   gameMatrix(largura,altura);
  var cor = dar_cor_aleatoria();

  var player={ //usaremos para saber a posicao da peça em relacao aos eixos x e y e a pontuacao
    posicao:{ x: 2, y: 2 },
    peca: null,
    pontos:0
  };
  var inferior =1;
  var superior = 10;

  function dar_cor_aleatoria(){ //para sortearmos uma cor aleatoria
    hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
    cor_aleatoria = "#";
    for (i=0;i<6;i++){
      posarray = aleatorio(0,hexadecimal.length);
      cor_aleatoria += hexadecimal[posarray];
    }
    return cor_aleatoria;
  }
  function aleatorio(inferior,superior){ //funcao para sortear um numero aleatório
    numPossibilidades = superior - inferior;
    aleat = Math.random() * numPossibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
  }
  function createPiece(type) { ///criacao das peças T,J,I,O,S,Z,L
    if (type === 'T') {
      return  [
        [0,0,0],
        [1,1,1],
        [0,1,0],
      ];

    }else if (type === 'J') {
      return  [
        [0,1,0],
        [0,1,0],
        [1,1,0],
      ];

    }else if (type === 'I') {
      return  [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
      ];

    }else if (type === 'L') {
      return  [
        [0,1,0],
        [0,1,0],
        [0,1,1],
      ];
    }else if (type === 'O') {
      return  [
        [1, 1],
        [1, 1],
      ];
    }else if (type === 'S') {
      return  [
        [0,1,1],
        [1,1,0],
        [0,0,0],
      ];

    }else if (type ==='Z') {
      return  [
        [1,1,0],
        [0,1,1],
        [0,0,0],
      ];
    }

  }

  function desenhar_Tabela(matriz, offset) { //desenha a matriz com as pecas
    matriz.forEach(function(row, y) {
      row.forEach(function(ptype, x) {
        if (ptype !== 0) {
          Tabela.rows[y + offset.y].cells[x + offset.x].style.backgroundColor = cor ;
        } else {
          Tabela.rows[y].cells[x].style.backgroundColor = "";
        }
      });
    });
  }
  function desenha() {
    desenhar_Tabela(matrix, {x: 0, y: 0});
    desenhar_Tabela(player.peca, player.posicao);    //
  }
  function tempo(){
    var tempo = 5000/10;
    return tempo;
  }
  function Loop(){ //clousure
    setTimeout(() => {
      playerDrop();
      requestAnimationFrame(() => {
        Loop();
      });
    }, tempo());
  }
  function Loop_Principal(matriz) {
    setTimeout(() => {
      desenha(matriz);
      requestAnimationFrame(() => {
        Loop_Principal(matriz);
      });
    },1);
  }

  function playerDrop() {
    player.posicao.y++;
    if (verifica_colisao()) {
      player.posicao.y--;
      merge();
      playerReset();
      Limpar_Linha();
      document.getElementById('pontos').innerText = player.pontos;
    }
  }

  function Limpar_Linha() { //quando completar a linha, limpa e pontua
    var contador = 1;
    prim: for (let y = matrix.length -1; y > 0; --y) {
      for (let x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 0) {
          continue prim;
        }
      }
      var linha = matrix.splice(y, 1)[0].fill(0);
      matrix.unshift(linha);
      ++y;
      player.pontos += contador * 100;
      contador *= 2;
    }
  }

  function merge() {
    player.peca.forEach(function(row, y) {
      row.forEach(function(value, x) {
        if (value !== 0) {
          matrix[y + player.posicao.y][x + player.posicao.x] = value;
        }
      });
    });
  }

  function verifica_colisao() { //verificando colisao das peças
    var peca = player.peca;
    var o = player.posicao;

    for (var  y = 0; y < peca.length; ++y) {
      for (var x = 0; x < peca[y].length; ++x) {

        if ((function(matriz, playertable) {
          if (peca[y][x] !== 0 && (matriz[y + o.y] && matriz[y + o.y][x + o.x]) !== 0) {
            return true;
          }
        })(matrix, peca) == true) {
          return true;
        }
      }
    }
    return false;
  }

  function Mover(offset) { //movendo a peça para os lados
    player.posicao.x += offset;
    if (verifica_colisao()) {
      player.posicao.x -= offset;
    }
  }
  function MoverDown(offset) { //para descer a peça mais rapida
    player.posicao.y += offset;
    if (verifica_colisao()) {
      player.posicao.y -= offset;
    }
  }
  addEventListener("keydown", function(e) { //funcao que recebe os comandos do teclado
    if(e.keyCode == '37') {
      Mover(-1);
    }else if (e.keyCode == '39') {
      Mover(1);
    }else if (e.keyCode == '38') {
      playerrotacionar(1);
    }else if (e.keyCode == '40') {
      MoverDown(1);
    }
  });

  function playerrotacionar(dir) {
    var   pos     = player.posicao.x;
    var     offset  = 1;

    rotacionar(player.peca, dir);
    while (verifica_colisao()) {
      player.posicao.x    += offset;
      if (offset > 0) {
        offset = -(offset+1);

      }else{
        offset = -(offset-1);
      }
      if (offset > player.peca[0].length) {
        rotacionar(player.peca, -dir);
        player.posicao.x = pos;
        return;
      }
    }
  }

  function rotacionar(peca, dir) { //para rotacionar as peças, clique para cima no teclado
    for (let y = 0; y < peca.length; ++y) {
      for (let x = 0; x < y; ++x) {

        (function(peca) {
          [
            peca[x][y],
            peca[y][x],
          ] = [
            peca[y][x],
            peca[x][y],
          ];
        })(peca)
      }
    }

    if (dir > 0) {
      peca.forEach(row => row.reverse());
    } else {
      peca.reverse();
    }
  }

  function gameMatrix(largura, altura) { //cria uma matriz para as peças
    var matrix  = [];
    while (altura--) {
      matrix.push(new Array(largura).fill(0));
    }
    return matrix;
  }

  function playerReset() { /// sorteio aleatorio das pecas e reset do jogo caso a table tenha sido toda preenchida
    var  pecas  = 'ITJLOSZ';
    player.peca    = createPiece(pecas[pecas.length * Math.random() | 0]);
    player.posicao.y    = 0;
    player.posicao.x    = (Tabela.rows[0].cells.length / 2 | 0) - (player.peca[0].length / 2 | 0);

    if (verifica_colisao()) {
      alert("Fim de Jogo");
      matrix.forEach(row => row.fill(0));
      player.pontos = 0;
      document.getElementById('pontos').innerText = player.pontos;
    }
  }

  function createTable() { //cria o tabuleiro
    var Tabela           =   document.createElement('table');
    var body            =   document.createElement('tbody');
    var foot           =   document.createElement('tfoot');
    var pontos        =   document.createElement('td');
    var frow            =   document.createElement('tr');
    pontos.colSpan            = 10;
    pontos.id                 = 'pontos';
    for (var i = 0; i < 20; i++) {
      var row         =   document.createElement('tr');
      for (var j=0; j < 10; j++) {
        var td      =   document.createElement('td');
        row.appendChild(td);
      }
      body.appendChild(row);
    }
    frow.appendChild(pontos);
    foot.appendChild(frow);
    Tabela.appendChild(body);
    Tabela.appendChild(foot);
    return Tabela;
  }
  function CreateProxPecaTable(){ //ytabela de proxima peca
    var tabuleiro = document.getElementsByTagName('div')[1]; //Referencia para o segundo div.
    Tabela = document.createElement('table2');    //Instancia uma tabela.
    var tbdy = document.createElement('tabuleiro');
    for (var i = 0; i < 5; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 5; j++)
      {
        var td = document.createElement('td2');
        var node =document.createTextNode('')
        td.appendChild(node);
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }
    Tabela.appendChild(tbdy);
    tabuleiro.appendChild(Tabela);
    return Tabela;
  }
  function init() {
    playerReset();
    desenha();
    Loop_Principal(matrix);
    Loop(matrix);
    document.getElementById('tabuleiro').appendChild(Tabela);
  }
  init();
})();
