//Création de la fonction qui permet de pouvoir afficher le tableau en HTML
function createBoard(row, column){
    //Enlever les jetons de la partie précédente
    content.innerHTML="";
    //Créer une table dans le DOM
    let table = document.createElement('table');
    //Chaque case est un élement du tableau comprennant 2 dimensions

    //Parcourir les lignes 
    //(1ère dimension)
    for (let r=0; r<row; r++) {
        //(2ème dimension)
        board[r] = new Array();
        ///Rentrer les élement TR dans le DOM
        let row = document.createElement('tr');
        row.id = "R" + r;

        //Parcourir les colonnes
        //(1ère dimension)
        for (let c=0; c<column; c++) {
            //(2ème dimension)
            board[r][c] = 0;
            ///Rentrer les élement TD dans le DOM
            let column = document.createElement('td');
            column.id = "R" + r + "C" + c;
            row.appendChild(column);
        }
    //Ajouter des lignes au tableaux
    table.appendChild(row);
    }
    //Ajout du tableau au "content" de l'HTML
    content.appendChild(table);
}

//Fonction pour initialé une nouvelle partie.
function newGame(){
    createBoard(row, column);
    createEvent(row, column);
}

//Fonction d'ajout d'evenement au click sur le tableau
function createEvent(row, column) {
    //On créé les evenements sur les cases
    for (let r=0; r<row; r++){
        for (let c=0; c<column; c++) {
            //Ajout d'evenement à la ligne "row"
            let cases = document.getElementById("R" + r + "C" + c);
            //console.log(cases.addEventListener('click', clickEvent));
            cases.addEventListener('click', clickEvent);
        }
    }
}


//Ajout de la fonction du "clickEvent" Les propriétés du jeton
function clickEvent() {
    let l = Number(this.id.charAt(3));  //"charAt" reprends les 3 premiers charactere. "this.id" reprend l'id de l'endroit où on a clické.
    let k = row -1;
    while(k > -1) {
      // console.log(L);
      // console.log(K);
        if(board[k][l] == 0) {
            //alert("help");
           // console.log(board[K][L]);
            let casesMin = document.getElementById("R" + k + "C" + l);
            let div = document.createElement('div');
            //Création des jetons jaune et rouge
            div.className = "player";
            casesMin.appendChild(div);
            div.style.backgroundColor = player == 1 ? "red":"yellow";
            board[k][l] = player;

            //On va verifier la victoire
            verifVictoire(k,l);
            player*=-1;
            k = -1
        } else {
            //console.log(K);
            k--
        }
    }
}

function verifVictoire(i, j){
    //Verification de la victoire en horizontal
    let countLine = 0;
    let h = 0;
    while(h<column) {
        if(board[i][h] == player) {
            countLine++;
            h++;
        } else if (board[i][h] !== player && countLine == 4){
            h++;
        } else {
            countLine = 0;
            h++;
        }
    }
    //Verification de la victoire en vertical
    let countColumn = 0;
    let v = 0;
    while(v<row) {
        if(board[v][j] == player) {
            countColumn++;
            v++;
        } else if (board[v][j] !== player && countColumn == 4){
            v++;
        } else {
            countColumn = 0;
            v++;
        }
    }
    //Verification de la victoire en diagonal
    let countDiag = 0;
    let d =-Math.min(i, j);
    while(i + d < row && j + d < column && i + d >= 0 && j + d >= 0){
        if(board[i+d][j+d] == player){
            countDiag++;
            d++;
        } else if(board[i+d][j+d] !== player && countDiag == 4){
            d++;
        } else {
            countDiag = 0;
            d++;
        }
    }
    //Verification de la victoire anti-diagonal
    let countAntiDiag = 0;
    let a =-Math.min(i, column - 1 - j);
    while(i + a < row && j - a < column && i + a >= 0 && j - a >= 0){
        if(board[i+a][j-a] == player){
            countAntiDiag++;
            a++;
        } else if(board[i+a][j-a] !== player && countAntiDiag == 4){
            a++;
        } else {
            countAntiDiag = 0;
            a++;
        }
    }
    //Affichage de la victoire
    if(countLine >= 4 || countColumn >= 4 || countDiag >= 4 || countAntiDiag >= 4){
        victoires = true;
        //Affichage du vainqueur
        let gagnant = (player == 1)?"red" : "yellow";
        let victoire = document.createElement('div');
        victoire.innerHTML = "<h2>Le vainqueur est "+gagnant+"</h2>";
        content.appendChild(victoire);
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let cases = document.getElementById('R'+ i + 'C' + j);                
                cases.style.backgroundColor = "blue";
                cases.removeEventListener('click', clickEvent);
            }
        }
    }else {
        console.log("Romain est un looser !")
    }
}

//Initialisé le jeu.
let column = 7;
let row = 6;
let board = new Array();
let content = document.getElementById("content");
content.innerHTML="Puissance 4 en javascript | Auteur Jonathan | Date de création 11/10/2022"
let player = 1;
let button = document.getElementById("newGame");

//Ajout d'un gestionnaire d'évenement au CLICK (commande à connaître par <3)
button.addEventListener("click", function(){
    //Par défaut, le joueur n°1 sera en ROUGE
    player = 1;
    newGame();
});