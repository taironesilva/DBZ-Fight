/* Aqui criamos as variáveis capturando os valores que virão preenchidos na URL (hero e evil)*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const hero = urlParams.get('hero') //hero name
const evil = urlParams.get('evil') //evil name

var li = document.createElement('li') //Criamos o elemento "li" para adicionar aos logs

/* -------------------------------------------------------------------------------------------------------------------------- 
  -Aqui renderizamos os lutadores da partida.  Alteramos o gif do jogador de acordo com os valores que virão preenchidos na URL (get method)
  - Também alteramos o nome do jogador na barra de life
 */

let heroGif = document.getElementById('herogif')
let evilGif = document.getElementById('evilgif')
let heroTitle = document.getElementById('heroTitle')
let evilTitle = document.getElementById('evilTitle')

if (hero == 'vegeta') {
  heroGif.src = 'assets/images/vegeta-normal.gif'
  heroTitle.innerHTML = hero
  heroChosen = new Vegeta()
} else {
  heroGif.src = 'assets/images/goku-normal.gif'
  heroTitle.innerHTML = hero
  heroChosen = new Goku()
}

if (evil == 'freeza') {
  evilGif.src = 'assets/images/freeza-normal.gif'
  evilTitle.innerHTML = evil
  evilChosen = new Freeza()
} else {
  evilGif.src = 'assets/images/cell-normal.gif'
  evilTitle.innerHTML = evil
  evilChosen = new Cell()
}

/* -------------------------------------------------------------------------------------------------------------------------- */

//Calcula a Porcentagem de vida do Personagem selecionado de acordo com o definido na Classe
let heroChosenLifePCT = (heroChosen.life / heroChosen.maxlife) * 100
let evilChosenLifePCT = (evilChosen.life / evilChosen.maxlife) * 100

//Função que será executada quando o usuário clicar no botão "Realizar ataque"
function atacar() {
  let hoAttacks = Math.random() < 0.5 % 2 == 0 ? 'heroi' : 'vilao' //Sorteia quem vai atacar aleatoriamente
  let defender = Math.random() < (evilChosen.defense / 100) % 2 == 0 //Sorteia se o golpe será defendido aleatoriamente (true ou false)
  let attackFactor = (Math.random() * 0.5).toFixed(2) //Calcula o fator de ataque que será multiplicado pelo ataque especificado na classe
  let dammage //Valor total do calculo (attackFactor X attack) que será usado para criar dano

  //Se hoAttacks == heroi, o Herói atacará. Caso contrário será o Vilão.
  if (hoAttacks == 'heroi') {
    if (!defender) {
      //Caso a defesa seja false
      dammage = (attackFactor * heroChosen.attack).toFixed(2) //Valor total do calculo (attackFactor X attack) que será usado para criar dano
      evilChosenLifePCT -= dammage //Subtrai o valor do dano da porcentagem de vida do Vilão

      //Renderiza a nova porcentagem do Vilão em tela depois do dano sofrido
      document.querySelector('.evil .bar').style.width = `${evilChosenLifePCT}%`

      //Adicionamos o log do ataque em tela
      document
        .querySelector('.log ul')
        .appendChild(
          li
        ).innerHTML += `<li>${heroChosen.name} atacou, ${evilChosen.name} não defendeu. ${dammage} de dano!</li>`

      //Após o Vilão sofrer o ataque e não conseguir defender, iremos verificar se ele está morto. Em caso positivo, atualizar a tela com o personagem morto
      if (evilChosenLifePCT <= 0) {
        evilChosenLifePCT = 0 //Não faz sentido uma vida negativa, portanto setamos para 0
        evilChosen.vivo = false //O Vilão se torna morto

        //Aqui renderizamos de fato a imagem do Vilão morto em tela
        if (evilChosen.name == 'Freeza') {
          evilGif.src = 'assets/images/freeza-dead.png'
        } else {
          evilGif.src = 'assets/images/cell-dead.png'
        }

        //Renderiza a nova porcentagem do Vilão em tela depois do dano sofrido
        document.querySelector(
          '.evil .bar'
        ).style.width = `${evilChosenLifePCT}%`

        //Adicionamos o log notificando a morte do Vilão em tela
        document
          .querySelector('.log ul')
          .appendChild(
            li
          ).innerHTML += `<li> O vilão ${evilChosen.name} está morto!</li>`

        //Como o Vilão está morto, iremos desativar o botão "Realizar ataque"
        document.querySelector(
          '.atacar'
        ).disabled = `{opacity: 0.6; cursor: not-allowed}`

        //Aqui iremos renderizar o botão "Revanche" que está com "display: none" para "display: flex"
        document.querySelector('.revanche').style = `display = {flex}`
      }
    } else {
      dammage = 0
      document
        .querySelector('.log ul')
        .appendChild(
          li
        ).innerHTML += `<li>${heroChosen.name} atacou, ${evilChosen.name} defendeu. ${dammage} de dano!</li>`
    }
  } else {
    //O ataque será realizado pelo Vilão
    if (!defender) {
      //Caso a defesa seja false
      dammage = (attackFactor * evilChosen.attack).toFixed(2) //Valor total do calculo (attackFactor X attack) que será usado para criar dano
      heroChosenLifePCT -= dammage //Subtrai o valor do dano da porcentagem de vida do Herói

      //Renderiza a nova porcentagem do Herói em tela depois do dano sofrido
      document.querySelector('.hero .bar').style.width = `${heroChosenLifePCT}%`

      //Adicionamos o log do ataque em tela
      document
        .querySelector('.log ul')
        .appendChild(
          li
        ).innerHTML += `<li>${evilChosen.name} atacou, ${heroChosen.name} não defendeu. ${dammage} de dano!</li>`

      //Após o Herói sofrer o ataque e não conseguir defender, iremos verificar se ele está morto. Em caso positivo, atualizar a tela com o personagem morto
      if (heroChosenLifePCT <= 0) {
        heroChosenLifePCT = 0
        heroChosen.vivo = false

        //Aqui vericamos qual o Heroi que está lutando e renderizamos a imagem do Heroi morto em tela
        if (heroChosen.name == 'Vegeta') {
          heroGif.src = 'assets/images/vegeta-dead.png'
        } else {
          heroGif.src = 'assets/images/goku-dead.png'
        }

        //Renderiza a nova porcentagem do Herói em tela depois do dano sofrido
        document.querySelector(
          '.hero .bar'
        ).style.width = `${heroChosenLifePCT}%`

        //Adicionamos o log notificando a morte do Herói em tela
        document
          .querySelector('.log ul')
          .appendChild(
            li
          ).innerHTML += `<li> O Herói ${heroChosen.name} está morto!</li>`

        //Como o Herói está morto, iremos desativar o botão "Realizar ataque"
        document.querySelector(
          '.atacar'
        ).disabled = `{opacity: 0.6; cursor: not-allowed}`

        //Aqui iremos renderizar o botão "Revanche" que está com "display: none" para "display: flex"
        document.querySelector('.revanche').style = `display = {flex}`
      }
    } else {
      dammage = 0
      document
        .querySelector('.log ul')
        .appendChild(
          li
        ).innerHTML += `<li>${heroChosen.name} atacou, ${evilChosen.name} defendeu. ${dammage} de dano!</li>`
    }
  }
}
