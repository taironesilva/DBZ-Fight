/* Aqui criamos as variáveis capturando os valores que virão preenchidos na URL*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const hero = urlParams.get('hero') //hero name
const evil = urlParams.get('evil') //evil name

/* -------------------------------------------------------------------------------------------------------------------------- 
  -Aqui configuramos os lutadores da partida e alteramos o gif do jogador de acordo com os valores que virão preenchidos na URL
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

let heroChosenLifePCT = (heroChosen.life / heroChosen.maxlife) * 100
let evilChosenLifePCT = (evilChosen.life / evilChosen.maxlife) * 100

function atacar() {
  let hoAttacks = Math.random() < 0.5 % 2 == 0
  let attackFactor = (Math.random() * 0.5).toFixed(2)
  let dammage

  //Se for par o Herói atacará, senão será o vilão
  if (!hoAttacks) {
    defenseChance = Math.random() < (evilChosen.defense / 100) % 2 == 0
    if (!defenseChance) {
      dammage = (attackFactor * heroChosen.attack).toFixed(2)
      evilChosenLifePCT -= dammage
    }
  } else if (hoAttacks) {
    defenseChance = Math.random() < (heroChosen.defense / 100) % 2 == 0
    if (!defenseChance) {
      dammage = (attackFactor * evilChosen.attack).toFixed(2)
      heroChosenLifePCT -= dammage
    }
  }

  //Chama a Função para atualizar a luta
  uptadeTela()

  //Chama a Função para atualizar os logs
  updateLogs(hoAttacks, defenseChance, dammage)

  //Apaga parâmetros
  hoAttacks = null
  defenseChance = null
}

function uptadeTela() {
  if (evilChosenLifePCT <= 0) {
    evilChosenLifePCT = 0
    evilChosen.vivo = false
    console.log('O vilão está morto')
    if (evilChosen.name == 'Freeza') {
      evilGif.src = 'assets/images/freeza-dead.png'
    } else {
      evilGif.src = 'assets/images/cell-dead.png'
    }

    document.querySelector(
      '.atacar'
    ).disabled = `{opacity: 0.6; cursor: not-allowed}`
    document.querySelector('.revanche').style = `display = {flex}`
  }

  if (heroChosenLifePCT <= 0) {
    heroChosenLifePCT = 0
    heroChosen.vivo = false
    console.log('O Herói está morto')
    if (heroChosen.name == 'Vegeta') {
      heroGif.src = 'assets/images/vegeta-dead.png'
    } else {
      heroGif.src = 'assets/images/goku-dead.png'
    }
    document.querySelector(
      '.atacar'
    ).disabled = `{opacity: 0.6; cursor: not-allowed}`
    document.querySelector('.revanche').style = `display = {flex}`
  }

  document.querySelector('.hero .bar').style.width = `${heroChosenLifePCT}%`
  document.querySelector('.evil .bar').style.width = `${evilChosenLifePCT}%`
}

function updateLogs(hoAttacks, defenseChance, dammage) {
  console.log(heroChosen.vivo, evilChosen.vivo)
  if (heroChosen.vivo && evilChosen.vivo) {
    if (hoAttacks) {
      atacante = heroChosen.name
      defensor = evilChosen.name
    } else {
      atacante = evilChosen.name
      defensor = heroChosen.name
    }

    if (defenseChance) {
      defenseChance = 'conseguiu defender'
    } else {
      defenseChance = 'não conseguiu defender'
    }

    if (dammage === undefined) {
      dammage = 0
    }
    document.querySelector(
      '.log li'
    ).innerHTML += `<li>${atacante} atacou, ${defensor} ${defenseChance}. ${dammage} de dano!</li>`
  } else if (!heroChosen.vivo) {
    document.querySelector(
      '.log li'
    ).innerHTML += `<li> O Herói ${heroChosen.name} está morto!</li>`
  } else {
    document.querySelector(
      '.log li'
    ).innerHTML += `<li> O vilão ${evilChosen.name} está morto!</li>`
  }
}
/*TODO: Atualizar o log*/
