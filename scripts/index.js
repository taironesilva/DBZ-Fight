/* Aqui criamos as variáveis capturando os valores que virão preenchidos do HTML*/

let hero = document.getElementsByName('hero')
let evil = document.getElementsByName('evil')

/* -------------------------------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------------------------------- 
   - Aqui temos um loop que será responsável por alterar a imagem do herói no HTML.
   - A variável será um array com 2 elementos (input radio), tendo os valores possíveis = "vegeta" ou "goku".
   - A partir do hero.value, podemos manipular a tag "img" que se encontra no elemento de id = 'leftImage' e com isso
     alternar entre os heróis.
*/
for (var i = 0; i < hero.length; i++) {
  hero[i].addEventListener('change', function () {
    let img = document.getElementById('leftImage')
    if (this.value == 'vegeta') {
      img.src = 'assets/images/vegeta.jpg'
    } else {
      img.src = 'assets/images/goku.jpg'
    }
  })
}

/* -------------------------------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------------------------------- 
   - Aqui temos um loop que será responsável por alterar a imagem do vilão no HTML.
   - A variável será um array com 2 elementos (input radio), tendo os valores possíveis = "freeza" ou "cell".
   - A partir do evil.value, podemos manipular a tag "img" que se encontra no elemento de id = 'rightImage' e com isso
     alternar entre os vilões.
*/
for (var i = 0; i < evil.length; i++) {
  evil[i].addEventListener('change', function () {
    let img = document.getElementById('rightImage')
    if (this.value == 'cell') {
      img.src = 'assets/images/cell.jpg'
    } else {
      img.src = 'assets/images/freeza.jpg'
    }
  })
}

/* -------------------------------------------------------------------------------------------------------------------------- */
