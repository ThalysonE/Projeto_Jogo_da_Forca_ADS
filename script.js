let fundComp=["algoritmo","programador","binario","informatica"];
let lingProg=["javascript","java","python","php"];
let web=["html", "css", "frontend","backend","fullstack"];

let elementFundC=4; 
let elementLingP=4;   //Número de elementos em cada array
let elementWeb=5;

let indice1=Math.floor(Math.random()*3); // Escolhe um número aletório para o indice 1 da matriz

let indice2;

if(indice1==0){
    indice2=Math.floor(Math.random()*elementFundC)
} else if(indice1==1){
    indice2=Math.floor(Math.random()*elementLingP)   // Escolhe um número aletório para o indice 2 da matriz
} else{
    indice2=Math.floor(Math.random()*elementWeb)
}

let palavras=[fundComp,lingProg,web];
let palavra = palavras[indice1][indice2]; // Retorna uma palavra aleatória
console.log(palavra)

let tentativas = 6; // quantidade de tentativas
let acertos = 0; //  quantidade de acertos 
let imagem = 0; // variavel para carregar cada imagem da forca
let posicao; // utilizada para percorrer cada letra da palavra
let alfabeto = "abcdefghijklmnopqrstuvwxyz"; // possiveis caracteres (string unica)
let letras = alfabeto.split(""); // armazenar array com as letras (divide cada letra do alfabeto com split tornando em um array)

for (posicao = 0; posicao < palavra.length; posicao++) { // definir o tamanha da palavra
    let span = document.createElement("span"); // espacos de cada letra 
    span.setAttribute('id', posicao); // utilizado para não criar um botao para cada letra no html
    let div = document.getElementById("palavra"); // "" 
    div.appendChild(span); // ""
}

for (posicao = 0; posicao < letras.length; posicao++) { // percorrer o array letras para criar os botões das letras
    let botao = document.createElement("button"); // criar o botao de cada letra no html
    let letra = document.createTextNode(letras[posicao]); // divisao das letras do alfabeto 
    
    botao.appendChild(letra); // utilizado para adicionar as letras ao button 
    botao.setAttribute('onclick', 'escolheLetra(\''+letras[posicao]+'\')'); // onclick chama a funcao escolhe letra a cada vez que um botao e clicado
    botao.setAttribute('id', letras[posicao]); 

    let div = document.getElementById("letras");
    div.appendChild(botao);
}

function escolheLetra(letra) {

    let acertou = false;

    for (posicao = 0; posicao < palavra.length; posicao++) { // verificar se a letra existe na palavra
        if (letra === palavra[posicao]) {
            let span = document.getElementById(posicao); // adicionar letra na posicao do id
            let l = document.createTextNode(letra);

            span.appendChild(l);

            let botao = document.getElementById(letra);
            botao.setAttribute('class', 'certa'); // class para alterar o css se letra certa
            botao.removeAttribute('onclick'); // torna o botao escolhido nao clicavel 

            acertos++; // contagem de acertos
            acertou = true; // acertos se verdadeiro 
        }
    }

    if (acertou === false) { // acertos se falso 
        imagem++; // adicionar imagem da forca
        document.getElementById("forca").src = "imagens/forca-"+imagem+".png";

        var botao = document.getElementById(letra);
        botao.setAttribute('class', 'errada'); // class para alterar o css se letra errada 
        botao.removeAttribute('onclick'); // torna o botao escolhido nao clicavel

        tentativas--; // diminuir as tentativas se a letrar estiver errada 
    }

    if (tentativas === 0) { // verificar se o jogo acabou / se usuario errou a palavra
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Você perdeu!"); // mensagem de derrota
        mensagem.appendChild(t1);

        let botao = document.createElement("button"); // botao para jogar novamente
        let t2 = document.createTextNode("jogar novamente");
        
        botao.appendChild(t2);
        botao.setAttribute('class', 'novo-bt'); // class para alterar no css
        botao.setAttribute('onclick', 'window.location.reload()'); // jogar novamente recarregando a pagina

        let div = document.getElementById("novo"); // criar  div "novo" no html de forma automatica
        div.appendChild(mensagem);
        div.appendChild(botao);
    }

    if (acertos === palavra.length) { // verificar se o jogo acabou / se usuario acertou a palavra
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Você venceu!"); // mensagem de vitoria
        mensagem.appendChild(t1);

        let botao = document.createElement("button"); // botao para jogar novamente
        let t2 = document.createTextNode("jogar novamente");
        
        botao.appendChild(t2);
        botao.setAttribute('class', 'novo-bt'); // class para alterar no css
        botao.setAttribute('onclick', 'window.location.reload()'); // jogar novamente recarregando a pagina

        let div = document.getElementById("novo"); // criar  div "novo" no html de forma automatica
        div.appendChild(mensagem);
        div.appendChild(botao)
    }

    if(tentativas  === -1){
        window.location.reload()
    }

let btDica = document.getElementById("btDica"); //Botão dica
let divDica = document.getElementById("dica");
let mensagemDica=" ";
let botaoAcionado = false // Variável auxiliar para o loop ser realizado apenas uma vez

btDica.addEventListener('click',function Dica(){  //Teste da palavra com os arrays para retornar a dica 
    if(!botaoAcionado){
        for(let v=0;v<=2;v++){
            if(v==0){
                for(let z=0; z < elementFundC; z++){
                    if(palavra == palavras[0][z]){
                        mensagemDica = document.createTextNode("Fundamentos da Computação") // Retorna a meensagem da dica 
                        divDica.appendChild(mensagemDica)
                    }
                }
            }else if(v==1){  
                for(let z=0; z < elementLingP; z++){
                    if(palavra == palavras[1][z]){
                        mensagemDica = document.createTextNode("Linguagem de Programação") // Retorna a dica a mensagem da dica
                        divDica.appendChild(mensagemDica)
                    }
                }
            }else{  
                for(let z=0; z < elementWeb; z++){
                    if(palavra == palavras[2][z]){
                        mensagemDica = document.createTextNode("Progamação WEB") // Retorna a dica a mensagem da dica
                        divDica.appendChild(mensagemDica)
                    }
                }
            }
        }
        botaoAcionado = true
    }   
})


let btNovaPalavra=document.getElementById("btEnviar")

btNovaPalavra.addEventListener('click',function adicionarPalavras(){ //FUNCAO DE ADICIONAR PALAVRAS
    let assunto=document.getElementById("assunto").value
    let novaPalavra=document.getElementById("novaPalavra").value

    if(assunto=='1'){
        lingProg.push(novaPalavra)
        elementLingP++
    } else if(assunto=='2'){
        fundComp.push(novaPalavra)
        elementFundC++
    } else if(assunto=='3'){
        web.push(novaPalavra)
        elementWeb++
    } else{
        alert("Digite uma opção válida")
    }
    console.log(palavras)
})



    



} 
