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

let repeticoes=0;

//Seleção (os dois com menlhores coeficientes)
//while(repeticoes<5){
function selecao(pop){
let sum=0,probabilidade=[];
let coeficiente=0,sumCoenficiente=0;

console.log("População",pop);

for(let i =0;i<pop.length;i++){
    probabilidade[i]= 0;

    if(i%2!=0){//As distancias estão na posição impar do vetor
    coeficiente =(1/pop[i]);
    //probabilidade[i]=(coeficiente/sumCoenficiente);
     probabilidade[i] = coeficiente;
    }
}

console.log("Probabilidade",probabilidade);

let pais=[];
for(let i =0;i<2;i++){
let x=0,y=0;
//Pega os dois com maior probabilidade
for(let j=0 ;j<probabilidade.length;j++){
     if(probabilidade[j]>=x){
        x=probabilidade[j];
        y=j
    }
}
console.log("valor adicionado a população ",pop[y-1]);

pais.push(pop[y-1]);
/*
if(i==0){
    pais.push(pop[y-1]);
}
if(i==1){
    pais.push(pop[y-1]);
}
*/
  
console.log("Valor excluído",probabilidade.splice(y,1));
console.log("Valor excluído",probabilidade.splice(y-1,1));

//probabilidade.splice(y,1);
//probabilidade.splice(y-1,1);

//console.log(y);
console.log(probabilidade);
   
}
return pais;
}

let  pais =[];
//console.log("Pais");
//console.log(pais= selecao(populacao));
pais= selecao(populacao);

//Crossover(Reprodução) 
//Pega os pais /Não pode repetir a cidades

function crossover (pais){
let posicaoDoCorte =Math.floor (Math.random() * (cidades.length-3)+1);//Posição em que será dividido o cromossomo
//console.log(posicaoDoCorte);
let child1=[];
let childTwo=[];let childOne=[];
let child2=[];
//childOne=pais[0];
//childTwo=pais[1];

 
var arr = pais.map(function(obj) {
    return Object.keys(obj).map(function(key) {
        return obj[key];
    });
});
console.log(arr[0]);
console.log(arr[1]);
childOne=arr[0];
childTwo=arr[1];


//Primeiro filho
//Primeira metade do cromossomo
//child1=childOne.slice(0,posicaoDoCorte);
child1=childOne.slice(0,posicaoDoCorte);

/*
if (Array.isArray(childOne)) {
    child1=childOne.slice(0,posicaoDoCorte);
} else {
    console.log('The value 1 is not an array');
}
*/
for(let i =posicaoDoCorte;i<childTwo.length;i++){  
    let gene = childTwo[i];
    if (! child1.includes(gene)){
        child1.push(gene);
    }
}
//Copia os genes restantes garantindo que não a repetição
for (let i =0;i<childOne.length;i++){
    let gene = childOne[i];
    if (!child1.includes(gene)){
        child1.push(gene);
    }
    else{
        for  (let j =0;j<childTwo.length;j++){
            let gene2 = childTwo[j];
                if (!child1.includes(gene2)){
                    child1.push(gene2);
                    break
                }                  
        }
    }
}

//segundo filho.
child2=childTwo.slice(0,posicaoDoCorte);

/*
if (Array.isArray(childTwo)) {
    child2=childTwo.slice(0,posicaoDoCorte);
} else {
    console.log('The value 2 is not an array');
}
*/
for(let i =posicaoDoCorte;i<childOne.length;i++){  
    let gene = childOne[i];
    if (! child2.includes(gene)){
        child2.push(gene);
    }
}

//Copia os genes restantes garantindo que não a repetição
for (let i =0;i<childTwo.length;i++){
    let gene = childTwo[i];
    if (!child2.includes(gene)){
        child2.push(gene);
    }
    else{
        for(let j =0;j<childOne.length;j++){
            let gene2 = childOne[j];
                if (!child2.includes(gene2)){
                    child2.push(gene2);
                    break
                }                     
        }
    }
}


//console.log("Filhos sem repetição ");
//console.log(child1);
//console.log(child2);

let child=[];
child[0]=child1;
child[1]=child2;
return child;
}


let child=[];
//console.log('Resultado da reprodução', child=crossover(pais));
child=crossover(pais);

//Mutação - Sorteia um valor de o a 100 % se corresponder a taxa de mutação altera os genes
function mutacao(mutacaoRate,child){
let child1=[],child2=[],gene1,gene2,temp;
child1=child[0];
child2=child[1];
//console.log(mutacaoRate)

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


//console.log("Resultado da mutação");
//console.log(child1);
//console.log(child2);
let CHILD=[];
CHILD[0]=child1;
CHILD[1]=child2;

return CHILD;

}

child = mutacao(0.02,child);

//Abordagem elitista: Os melhores indivíduos da população atual são mantidos inalterados na nova geração, enquanto os filhos gerados substituem os indivíduos menos aptos da população atual.

function novaPopulacao(pop,pais,child){
//Abordagem elitista

let maior=0,x=0;  
for (let i =0;i<pop.length;i++){
    if(i%2!=0){
    if (pop[i]>maior){
        maior=pop[i];
        x=i;
    }
    }
}
    pop[x-1]=child[0];
    pop[x]=distancia(child[0]);
  
    maior=0;x=0;
    for (let i =0;i<pop.length;i++){
        if(i%2!=0){
        if (pop[i]>maior){
            maior=pop[i];
            x=i;
        }
    }
}
        pop[x-1]=child[1];
        pop[x]=distancia(child[1]);
    
  
//Abordagem geracional
/*
for (let i =0 ;i<pop.length;i++){
    if (pop[i]==pais[0] ){
        pop[i]=child[0];
        pop[i+1]=distancia(child[0]);
    }
    if (pop[i]==pais[1]){
        pop[i]=child[1];
        pop[i+1]=distancia(child[1]);    
    }

}
*/
//console.log(distancia(child[0]));
//console.log(distancia(child[1]));

//console.log("Nova população",pop);

return pop;

}
populacao= novaPopulacao(populacao,pais,child);
 
//Melhor resultado de cada geração
function menorDistancia(pop){
    //Limite de gerações 1000 repetições
console.log("Geração :",repeticoes); 
let menor=400;  
for (let i =0;i<pop.length;i++){
    if (pop[i]<menor){
        menor=pop[i];
    }

}
console.log(menor);
   
}

menorDistancia(populacao);

//repeticoes++;
//}

while(repeticoes<1000){
    child=crossover(pais);
    child = mutacao(0.02,child);
    console.log("População nova", populacao= novaPopulacao(populacao,pais,child));
    //populacao= novaPopulacao(populacao,pais,child);
    menorDistancia(populacao);



    repeticoes++;

}