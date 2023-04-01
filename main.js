//Objetivo resolver o problema do caixeiro viajante usando algoritmo genético.
/*
//Ler cvs com as cordenadas da cidades
const readline= require("readline")
const fs = require("fs");//Para permitir ler e escrever em arquivos 
const { randomInt } = require("crypto");
const { match } = require("assert");

const line = readline.createInterface({
    input : fs.createReadStream("CidadesCaxeiroViajante.csv")
});
line.on("line", (data)=> {//Fica ouvindo a leitura do arquivo
    let csv = data.split(";");
   // console.log(`nome : ${csv[0]} - posição x ${csv[1]} - posição y ${csv[1]} `)
});
*/


//Matriz de adjacência
let cidades=[[0,10,15,5,12],
            [10,0,70,52,27],
            [15,70,0,120,14],
            [5,52,120,0,38],
            [12,27,14,38,0]];

//Criar a população inicial / realiza a codificação dos cromossomos
let caminhos=[];
let cromossomo=[];
let populacao=[];

function shuffle(a){//Embaralha as cidades
    for (let i=a.length-1;i>0;i--){

        const j = Math.floor(Math.random() * (i + 1));
       [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
}


//Distancia dos cromossomos
function distancia(cromos,city=cidades){
let soma=0,x;
let distancia=0;
    //Soma da distancia do cromossomo
    for (let i =0;i<cromos.length-1;i++){
        distancia=city[cromos[i]][cromos[i+1]]
        soma+=distancia;
        x=i;
    }
    //Soma da última cidade para a primeira
    soma+=city[cromos[x]][cromos[0]];
    
return soma;
}


//Gera a população inicial (cromossomo,distância)
function gerarPopulacao(matriz){
let pop=[];
   
    for (let i =0;i<10;i++){
        let cromossomo=[];
        for (let j=0;j<matriz.length;j++){//Adiciona as cidades
            cromossomo.push(j);
        }
        cromossomo=shuffle(cromossomo);

        pop.push(cromossomo,distancia(cromossomo));

      }
      console.log(pop.length);
      return pop;
}


console.log(populacao = gerarPopulacao(cidades));

//Seleção (Roleta)

function selecao(pop){
let sum=0,probabilidade=[];
let coeficiente=0,sumCoenficiente=0;
for(let i =0;i<pop.length;i++){
    if(i%2!=0){//As distancias estão na posição impar do vetor
       // sum+=pop[i]
       sumCoenficiente+=(1/pop[i]);

    }
 }
//console.log(sum);
console.log(sumCoenficiente);

for(let i =0;i<pop.length;i++){
    if(i%2!=0){//As distancias estão na posição impar do vetor
      coeficiente =(1/pop[i]);
     // probabilidade[i]=(coeficiente/sumCoenficiente);
     probabilidade[i]= coeficiente;
    }
 }
const pais=[];
for(let i =0;i<2;i++){
let x=0,y=0;
    //const r = Math.random();
//Pega os dois com maior probabilidade
for(let j=0 ;j<probabilidade.length;j++){
     if(probabilidade[j]>x){
        x=probabilidade[j];
        y=j
     }
}

    pais.push(pop[y-1]);

    probabilidade.splice(y,1);
   console.log(probabilidade.splice(y,1));

   
}

return pais;
}

console.log( selecao(populacao));


//Crossover

//Mutação

//Termino por parada 