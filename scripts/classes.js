/* -------------------------------------------------------------------------------------------------------------------------- 
   - Aqui criamos a Classe Character que será um modelo com os atributos que servirão para todos os personagens.
*/
class Character {
  _life = 1
  maxlife = 1
  attack = 0
  defense = 0
  vivo = true

  constructor(name) {
    this.name = name
  }

  get life() {
    return this._life
  }
  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife
    return this.life
  }
}

/* -------------------------------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------------------------------- 
   - Aqui criamos as classes herdando (extends) os atributos da classe (Super) Character.
   - Também personalizamos os atributos para cada personagem.
*/
class Goku extends Character {
  constructor() {
    super('Goku')
    this.life = 130
    this.attack = 50
    this.defense = 50
    this.maxlife = this.life
    this.vivo = this.vivo
  }
}

class Vegeta extends Character {
  constructor() {
    super('Vegeta')
    this.life = 120
    this.attack = 50
    this.defense = 30
    this.maxlife = this.life
    this.vivo = this.vivo
  }
}

class Freeza extends Character {
  constructor() {
    super('Freeza')
    this.life = 100
    this.attack = 40
    this.defense = 40
    this.maxlife = this.life
    this.vivo = this.vivo
  }
}

class Cell extends Character {
  constructor() {
    super('Cell')
    this.life = 120
    this.attack = 40
    this.defense = 30
    this.maxlife = this.life
    this.vivo = this.vivo
  }
}
