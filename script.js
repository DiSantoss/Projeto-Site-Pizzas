/*1° adicionar as pizzas */
/*1° listar as pizzas */
/* mapear essa lista, fazer uma copia do modelo de pizza, preencher esses dados e jogar na tela.*/
/*em outras palavras vamos clonar a estrutura,preenche os dados e depois jogar na tela */

/*modo abaixo para nao precisar dar um querySelector toda hora */
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);


/* precisamos de uma variavel que irá armazenar a quantidade de itens que temos no modal*/
let modalQt = 1;

/* precisamos de uma variavel que vai armazenar os itens do carrinho, segue abaixo */
let cart = [];

/* modalKey */

/*criando a variavel modalKey */

let modalKey = 0;


const q = (el)=>{
    return document.querySelector(el);
}

const qall = (el) => document.querySelectorAll(el);

/*modo acima para nao precisar dar um querySelector toda hora, e entao ao invez de dar querySelector, voce da um "c" */


/*variavel acima */






pizzaJson.map(function map(item,index){
    /*dando clone*/
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    q('.pizza-area').append( pizzaItem );
  

    /*definindo um atributo e adicionando o valor index a ele */
    pizzaItem.setAttribute('data-key',index);
    /*preencher as informações em pizzaItem */
    /*selecionando a div e a tag img dentro da div */
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    /*preencher com template string e com toFixed para dois valores apos a virgula. */
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    /*nessa aula vamos continuar o processo, fazer a ação de quando clicar em uma pizza,(no maiszinho) abrir o modal com mais informações, para poder add no carrinho ou nao*/
/*deveremos cancelar o evento original do elemento, que é a tag a, vamos selecionar e adicionar um evento */







    pizzaItem.querySelector('a').addEventListener('click', (event) =>{

    event.preventDefault();


    /*closest significa "ache o elemento mais proximo", ou dentro ou fora, vai pegar o elemento mais proximo de .pizza-item */
    /*comando abaixo para ter acesso a pizza que foi clicada com let key */
    let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
    

    /*preenchendo as informações gerais ao clicar  em cada pizza aqui abaixo */

        c('.pizzaBig img').src = pizzaJson[key].img


   c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;


   c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

   c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

   /*fazer desselecionar e selecionar o tamanho da pizza */
   c('.pizzaInfo--size.selected').classList.remove('selected');


   /*preenchendo as informações de tamanho */
   /*forEach significa -> para cada um dos itens eu vou rodar a função tal. */
   cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
        if(sizeIndex == 2) {
            size.classList.add('selected');
        }
        
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

   });


   /* comandos para a parte de quantidade */
   //selecionando qt e atulizando o html dele para oque está na variavel modalQt.

   c('.pizzaInfo--qt').innerHTML = modalQt;



    /*comando para deixar opacity, ou seja, mais transparente, criar uma função setTimeout para fazer  */
    q('.pizzaWindowArea').style.opacity = 0;
    q('.pizzaWindowArea').style.display = 'flex';
    setTimeout(()=>{
        q('.pizzaWindowArea').style.opacity = 1;
    },200);
    


})


});


/*Eventos MODAL  para fechar a windows.*/
/*closeModal faz com que 1° deixa a windows transparente, e com setTimout que ela fique com o
display none em meio segundo que é 500milisegundos */

 function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(()=> {
        c('.pizzaWindowArea').style.display = 'none'
    }, 500);
    
 }

 /*aqui abaixo nos selecionamos com querySelectorAll o botao da pagina web e mobile e usamos o 
 forEach para a cada valor atual(item), adicionar evento de click juntamente com a função closeModal. */

 cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal);
 });


 /*Eventos (click)botao mais e menos da janela, 
 obs:o botao de menos tem que descer até o limite que é 1, o mais nao tem limite.
 - nós ja criamos a variavel que vai corresponder a esse botão que é modalQt */


 c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1) {
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;
} else {
 
}
    
 });
// para o botao de mais basicamente quando clicarmos é para ele aumentar 1, entao é modalQt++;
// apos isso devemos atualizar o valor do modalqt, entao selecionamos a tag ou class e damos o comando com innerhtml para mostrar o valor de modalQt

 c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
 });


 /*Eventos (click) para o tamanho dentro do modal(janelinha)*/

 cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click', ()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});



/* Eventos e comandos para adicionar ao carrinho */
c('.pizzaInfo--addButton').addEventListener('click',()=>{

            // Qual a pizza ?
            //console.log('Pizza: ' +modalKey);
            // Qual o tamanho ?
            let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
            //console.log('Tamanho:'+size);
            // Quantas pizzas ?
                //console.log('Quantidade: '+modalQt);




                //criação da identificação

                let identifier = pizzaJson[modalKey].id+'@'+size;

                /*para verificarmos colocamos o '==' */
                let key = cart.findIndex((item)=>{
                    return item.identifier == identifier
                });


                // adicionando ao carrinho 
                if(key > -1) {
                        cart[key].qt += modalQt;
                } else {
                    
                    cart.push({
                        identifier,
                        id:pizzaJson[modalKey].id,
                        size:size,
                        qt:modalQt,
                        
                    });
                }
                
                updateCart();
                closeModal();
});


/* AGORA vamos fazer um filtro pra poder juntar(juntar os valores iguais) o valor de quantidade de cada objeto do array pizzaJson */

//precisamos primeiro criar uma especie de identificador, que vai ser basicamente alguma stringzinha que vamos fazer juntar o id da pizza com o tamanho dela.

// let identifier = pizzaJson[modalKey].id+'@'+size;

//e no carrinho la em cima acrescentamos esse valor ou seja identifier, entao no carrinho tera essa identificaçao(codigozinho) que represente oque foi clicado(adicionado)

// AGORA devemos criar um verificador(if)para antes de dar o cart.push verificar se ja tenho no carrinho outro item com o mesmo identificador, porque se eu tiver eu nao vou dar um push eu vou simplesmente adicionar a quantidade naquele item que ja tem.

// e para verificar criamos uma variavel let chamada key para identificar se ja tenho um item no meu carrinho
// usamos a função findIndex em cart para procurar um item que vamos colocar nele, no caso o identifier
// a função recebe item(que é cada item do carrinho, e ela faz uma varredura no item do carrinho) e vai verificar se o item no carrinho é igual ao identifier que é a stringzinha de identificação que foi feita.
// ai entao fazemos se achar igual ele retorna o index dele se nao achar vai retornar -1
//se ele achou, eu vou alterar o item, caso contrario, eu adiciono o push. 
// se eu achei, eu simplesmente vou aumentar a quantidade.  -->  cart[key].qt += modalQt; ou cart[key].qt = cart[key].qt + modalQt;

/*let key = cart.findIndex((item)=>{
    return item.identifier = identifier
}); */

/* AGORA nos precisamos fazer que quando adicionarmos algo ao cart, ele apareça na pagina */
// precisamos criar uma funcao que vai atualizar o carrinho, sendo assim devemos acrescentar essa função naquela função de click
// entao vamos la, ao acionar esta função devemos decidir se devemos mostrar o carrinho ou nao, ou seja, uma verifição "se" tem itens no carrinho, se tem itens no carrinho eu vou mostrar o carrinho, se nao tem itens eu vou esconder o carrinho. (ele usa uma classe no css para isso eu pensei em usar o display:none e absolute mas isso iria alterar a posição dos elementos.)
//vamos la no html para verificar, neste caso o carrinho está dentro da tag "aside" 
// o comando que devemos fazer é selecionar a tag aside, ir em classlist de aside e adicionar a class 'show' caso contrario ao invez de add vamos remover
//agora devemos mostrar os itens, onde os itens ficam dentro de aside ?
//agora faremos um for de item a item, para exibir ele na dela
// nesse for nos temos o id do item e vamos procurar esse id dentro de pizzaJson e vamos retornar o item inteiro. 
//resumindo -> se o tamanho do cart for maior que 1, seleciona aside e adiciona 'show' e também 

c('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click',()=>{
   
        c('aside').style.left = '100vw';
  
}); 




    function updateCart(){
        
         c('.menu-openner span').innerHTML = cart.length;

        if(cart.length > 0) {

        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id;
            });

            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName = cart[i].size;

            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;

            }

            let pizzaName = `${pizzaItem.name} ${pizzaSizeName} `

                cartItem.querySelector('img').src = pizzaItem.img;
                cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

                cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                    cart[i].qt++;
                    updateCart();
                });
                   

                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                    if(cart[i].qt > 1) {
                        cart[i].qt--;
                        
                    } else {
                        cart.splice(i,1);
                        
                    }
                    updateCart();
                });
         

               
                 
                




                c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;



        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {

        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';

    }
}

/*AGORA VAMOS PREENCHER OS ITENS DO NOSSO CARRINHO */
//vamos clonar o cartitem que está estruturado no html dentro da tag modals e exibilo na tela :
// let cloneCart = c('.models .cart--item').cloneNode(true)
// agora vamos adicionar esse clone ao cart usando o append.
// mas claro que temos que colocar entre cloneCart e o append as informações.
// continuando no append, para que nao fique acrescentando sempre mais um item quando ele for igual, nós colocamos o comando para sempre que adicionarmos ao carrinho, zere e atualize com a informação nova, com isso colocamos o comando
// c('.cart').innerHTML = ''; logo abaixo do comando c('aside').classList.add('show');

//agora vamos acrescentar as informações no carrinho
// para imagem cartItem.querySelector('img').src = pizzaItem.img;
// para o nome cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name;
// e vamos concatenar ao nome o tamanho. com isso criaremos uma variavel chamada pizzaName
// nessa variavel pizzaName tera um template string com nome da pizza e o tamanho da pizza, só que para o tamanho nao ficar com a posição
// faremos um switch para ao invez de tamanho 0 , ser tamanho  P. e para isso criaremos uma variavel com nome pizzaSizeName
// faremos um comando para alterar a quantidade do carrinho, no que diz respeito a quantidade de pizzas adicionada ao carrinho.
// agora ainda em cart, vamos fazer comandos para que o mais e menos dentro do carrinho comecem a funcionar.
//cart--item-qtmenos').addEventListener('click',()=>{cart[i].qt++;updateCart();});
//quando chegar em 1, para remover usamos o metodo splice em array. cart.splice(i, 1);

/*AGORA VAMOS colocar as informações de valores*/
//la em updateCart antes do for, nos podemos criar as variaveis que vamos precisar subtotal,desconto,total
// e ai dentro do for, preencheremos o subtotal e só depois do for que preenchemos desconto(quevai depender do subtotal) e o total que vai depender do subtotal e do desconto e depois colocamos na tela essas informações
//o subtotal é criado antes do for porque deve calcular todos os subtotais, e o desconto é criado depois do for porque o desconto precisa do subtotal, e o total é o subtotal menos o desconto
// E AGORA podemos preencher na tela esses valores.



/*AGORA VAMOS VER OQUE PRECISAMOS FAZER PARA DESENVOLVER A PARTE MOBILE */
//Precisamos fazer com que quando adicionarmos algo ao carrinho, a informação apareça no mobile também
//Entao devemos ir para a função de updateCart para acrescentar o comando que ira levar a informação para essa parte da estrutura da pagina
//entao oque vamos fazer, vamos atras de onde esse valor está na estrutura html/css, vamos atrás da tag específica que contém o valor da "quantidade de produtos"(neste caso) e vamos dar o comando que é selecionar a tag, dar um inner HTML para alterar o seu html e colocar o valor de cart.length, que retorna o tamanho desse array que é o carrinho.

// c('.menu-openner span').innerHTML = cart.length
//tudo que for feito no carrinho vai rodar o updateCart entao colocamos la dentro esse comando.

//AGORA VAMOS fazer um evento de  click para o carrinho no mobile. nesse exemplo usamos a alteração de estilo left, e nao display.
//nele selecionamos a tag da estrutura html/css e adicionamos o evento de click dando a função de quando o tamanho do cart for maior que 0 para ir em aside e trocar o estilo dele para left com valor de 0
/*
c('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});  

*/
// AGORA PRECISAMOS fazer um comando para fechar o menu, 
/*
c('.menu-close').addEventListener('click',()=>{

        c('aside').style.left = '0';

});
*/
//E AGORA TAMBÉM PODEMOS colocar um comando para que feche o menu quando a quantidade chegar a ser menor que 1, ou igual a zero
// para isso aproveitamos a função de update, e no else colocamos o comando




