let par = 0
let impar = 0

for (i = 0; i < 30; i++) {
  let defenseChance = Math.random() < 0.4 % 2 == 0
  if (defenseChance) {
    par++
  } else {
    impar++
  }
}

console.log(`True: ${par} - False: ${impar}`)
