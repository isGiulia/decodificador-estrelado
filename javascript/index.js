let textoUsuario;
document.addEventListener('DOMContentLoaded', () => {
   
  



   
    
   executarComDelay( animarDialogo, 500);
  executarComDelay( animarTexto, 600);  
  
   
    let botoes = document.querySelectorAll('.btns');
    console.log("Botões encontrados:", botoes);

    botoes.forEach(function(botao) {
        botao.addEventListener('click', function(e) {

            let evento = e.target; // Pega o botão alvo
            let identidade = evento.id;

            let imgMenina = document.getElementById('garota-lupa');

            

            if (identidade === 'criptografar' || identidade === 'descriptografar'){
                

                let condicao = verificarPalavras(); //pegar area texto

                if (condicao.resultado === true) {

                    apagarTexto(false);

                    imgMenina.style.opacity = 0;
                    

                    executarComDelay(animarTela, 1000, true); 

                    executarComDelay(animarBotoes, 1500, identidade, botoes); 

                    // executarComDelay(animarImagem, 1600, true ); 
                   
                   
                    
                    // animarBotoes(identidade, botoes);

                    

                    if (identidade === 'criptografar' ) {
                       
                        
                        colocarTela( criptografar(condicao.texto), false);

                    }else{

                        colocarTela( descriptografar(condicao.texto), false);
                        console.log("a pessoa clicou descriptografar " +condicao.texto)

                    }
                   
                }
                else{

                    animarDialogo(condicao);
                    // alert(condicao.mensagem + ": " + condicao.valores)


                }

            }
            else if(identidade === 'voltar'){

                executarComDelay(voltarOuCopiar, 400, identidade, botoes, false);
                // voltar(identidade, botoes);
                imgMenina.style.opacity = 1;

                // executarComDelay(animarImagem, 100, false);
               
            }
            else if(identidade === 'copiar'){

                executarComDelay(voltarOuCopiar, 400, identidade, botoes, true);
                // voltar(identidade, botoes);
                imgMenina.style.opacity = 1;

                
               
            }


             
          
            
        });
    });
});

function pegarTextarea(tipo) {

    if (tipo === true) {
        
        return document.getElementById('areaTexto');
    }
    else{

        return document.getElementById('areaTexto2');

    }
   
}

//PEGAR TEXTO SE HOUVER 
function verificarPalavras() {
    let textarea = pegarTextarea(true);
    let areaTextoValue = textarea.value;

    if (areaTextoValue != "") {

        let regex = /[^a-z\s]/g; 

        let matches = areaTextoValue.match(regex);
        console.log(matches);  // ["!", ",", "1", "2", "3"]

        let textoInvalido = regex.test(areaTextoValue); //true ou false

      
      


        if (textoInvalido) {
           
            return {resultado: false, mensagem: "Este caractere não é permitido: ", valores: matches};

        }else{

            console.log('texto valido: ' + areaTextoValue)

            textoUsuario = areaTextoValue;
           
            return {resultado: true, texto: areaTextoValue};
        }

       

        
    } else {
        return {resultado: false, mensagem:"Mensagem", valores: 'Necessário digitar algum texto'};
    }
};


function animarTela(tipo){

    if (tipo === true ) {

        let card = document.querySelector('main');
       
        card.style.transform = 'rotateY(-180deg)';

    }else{
    
        let card = document.querySelector('main');
        card.style.transform = 'rotateY(-360deg)';
    }
};

//saber qual o botão clicado para tomar providencias 
function animarBotoes(identidade, botoes){
    

    let botoesArray = Array.from(botoes); // de nodeLIST para array

   
    // retirar btns e pegar o campo de texto depois
    if (identidade === 'criptografar' || identidade === 'descriptografar' ) {

        let doisBtns = botoesArray.slice(0,2); // pegar até o length (largura) 2 

        doisBtns.forEach((pegarBtn)=>{

            pegarBtn.classList.add('none');
           
            
        });

        console.log(botoesArray)

        botoesArray.slice(2).forEach((pegarBtn) =>{
            
           
            pegarBtn.classList.remove('none');
           

        }); 
  
    }else{
        console.log("voltar");

        let doisBtns = botoesArray.slice(0,2); // pegar até o length (largura) 2 

        
        botoesArray.slice(2).forEach((pegarBtn) =>{

            pegarBtn.classList.add('none');

        }); 

        doisBtns.forEach((pegarBtn)=>{
            pegarBtn.classList.remove('none');
        });



        
    }

    
};



function apagarTexto(tipo) {

    let textarea;

    if (tipo === true) {
        textarea = pegarTextarea(true);
        textarea.value = ''; // Limpa o conteúdo da `textarea`
    }else{

        textarea = pegarTextarea(false);
        textarea.value = ''; // Limpa o conteúdo da `textarea`
    }
    
   
    
}

function criptografar(texto){

    console.log('texto para criptografar: '+ texto)

    

    let txt = Trocartexto("criptografar");//chamar lista
   
    return texto.split('').map(str => txt[str] || str).join(''); //split separa por unidade, map substitui, join  juntar os elementos


};

function descriptografar(texto){

    console.log('texto para descriptografar: '+ texto)

    let lista = Trocartexto("descriptografar");//chamar lista

    const regex = new RegExp(Object.keys(lista).join('|'), 'g'); //cria uma expressão regular

    
   // voce tem uma lista com regras, toda vez que achar verifique na lista
    return texto.replace(regex, coisa => lista[coisa]);

};

function Trocartexto(tipo){

    const lista = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat"
    }

    const listaInvertida = {

        enter: "e",
        imes: "i",
        ai: "a",
        ober: "o",
        ufat: "u"
    }

    if (tipo === "criptografar") {

        return lista;

    }else{

        return listaInvertida;
    }

};

function colocarTela(texto, tipo) {

   let textarea2 = pegarTextarea(tipo);

    textarea2.value = texto;  
}

function voltarOuCopiar(identidade, botoes, tipo) {

        if (tipo) {
            //é verdade copiar
            let textArea2 = pegarTextarea(false);
            navigator.clipboard.writeText(textArea2.value);
            alert('Texto copiado para a área de transferência!');
          

        }
        apagarTexto(true);
        animarTela(false) ;
        animarBotoes(identidade, botoes);
    
   

   

    
}
function copiar(){

}


function animarDialogo(texto = false){
    let balaoDiv = document.querySelector('.balao');

   

    if(texto === false){
    
   

    balaoDiv.style.opacity = 1;

    executarComDelay( fecharDialogo, 4000);
    
    }else{
    
    
       let balaoH3 = document.getElementById('texto-h3');
        balaoH3.innerText = texto.mensagem + " " + texto.valores ;
        

        balaoDiv.style.opacity = 1;
    
        executarComDelay( fecharDialogo, 6000);
    }

}

function fecharDialogo(){
    let balaoDiv = document.querySelector('.balao');
    balaoDiv.style.opacity = 0;

   

   
    
}



    

function animarTexto() {
    const elementoTexto = document.getElementById("texto-h3");
    const palavra = elementoTexto.textContent.split(" ");
    elementoTexto.innerHTML = palavra.map(letras => `<span class="palavra">${letras}</span>`).join(" ");

    const elementosSpan = document.querySelectorAll("#texto-h3 .palavra");
    let delay = 0;

    elementosSpan.forEach(palavra => {
        setTimeout(() => {
            palavra.classList.add("animate");
        }, delay);
        delay += 300; 
    });
    
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executarComDelay(func, delayMs, ...args) {
    await delay(delayMs);
    func(...args);
}



  