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
//let caminhos=[];
//let cromossomo=[];
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

//Seleção (os dois com menlhores coeficientes)

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
//console.log(sumCoenficiente);

for(let i =0;i<pop.length;i++){
    probabilidade[i]= 0;

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
    probabilidade.splice(y-1,1);

//console.log(probabilidade);
   
}
return pais;
}

let  pais =[];
console.log("Pais");
console.log(pais= selecao(populacao));


//Crossover(Reprodução) 
//Pega os pais /Não pode repetir a cidades

function crossover (pais){
let posicaoDoCorte =Math.floor (Math.random() * (cidades.length-2)+1);//Posição em que será dividido o cromossomo
console.log(posicaoDoCorte);
let child1=[],childTwo,childOne;
let child2=[];
childOne=pais[0];
childTwo=pais[1];
console.log(child1);
for(let i =0;i<posicaoDoCorte+1;i++){//Primeira metade do cromossomo
child1.push(childOne[i]);
child2.push(childTwo[i]);
}
for(let i =posicaoDoCorte+1;i<cidades.length;i++){//Segunda metade do cromossomo
    child1.push(childTwo[i]);
    child2.push(childOne[i]);
}
console.log("Nova população");
console.log(child1);
console.log(child2);

//Evitar cidades repetidas
//Para encontrar genes duplicados, o código usa uma list comprehension para criar uma nova lista contendo todos os genes iguais ao gene atual (genes[gene]). Em seguida, a função len() é usada para determinar o tamanho dessa lista. Se o tamanho da lista é maior que 1, significa que o gene atual está duplicado.
for (let gene =0 ;gene<cidades.length;gene++){//Caso troque por um valor repitido é executado várias vezes
let repetido=[],repetido2=[],temp;
for(let j=0; j<cidades.length;j++){
    for (let i =0 ;i<cidades.length;i++){

        if(child1[i]==child1[gene]){//Encontrar a repetição
            repetido.push(child1[i]);
            if(repetido.length>1){//tirar a repetição
                temp=child1[i];
                child1[i]=child2[i];
                child2[i]=temp;
            }
            if(child2[i]==child2[gene]){//Encontrar a repetição
                repetido2.push(child2[i]);
                if(repetido2.length>1){//tirar a repetição
                    temp=child2[i];
                    child2[i]=child1[i];
                    child1[i]=temp;
                }
            }
        }
}
    
}
}
console.log("Novos pais sem repetição")
console.log(child1);
console.log(child2);
let child=[];
child[0]=child1;
child[1]=child2;
return child;
}
let child=[];
console.log('Resultado da reprodução', child=crossover(pais));
//Mutação - Sorteia um valor de o a 100 % se corresponder a taxa de mutação altera os genes
function mutacao(mutacaoRate,child){
let child1=[],child2=[],gene1,gene2,temp;
child1=child[0];
child2=child[1];
console.log(mutacaoRate)

if (mutacaoRate >= Math.random()){
      gene1=Math.floor (Math.random() * ((cidades.length-1)-0)+0);
      gene2=Math.floor (Math.random() * ((cidades.length-1)-0)+0);
      temp=child1[gene1];
      child1[gene1]=child1[gene2];
      child1[gene2]=temp;

}

if (mutacaoRate >= Math.random()){
    gene1=Math.floor (Math.random() * ((cidades.length-1)-0)+0);
    gene2=Math.floor (Math.random() * ((cidades.length-1)-0)+0);
    temp=child2[gene1];
    child2[gene1]=child2[gene2];
    child2[gene2]=temp;

}


console.log("Resultado da mutação");
console.log(child1);
console.log(child2);

}
let p=1;
mutacao(0.02,child);

//Adicionar os filhos a população 

 
//Termino por parada 