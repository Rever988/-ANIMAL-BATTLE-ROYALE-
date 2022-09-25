const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque") 
const sectionReiniciar = document.getElementById('reiniciar') 
const botonMascotaJugador = document.getElementById('boton-mascota') 

sectionReiniciar.style.display = 'none'  
const botonReiniciar = document.getElementById('boton-reiniciar') 

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")  
const spanMascotaJugador = document.getElementById('mascota-jugador') 

const spanMascotaEnemigo = document.getElementById('mascota-enemigo') 

const spanVidasJugador = document.getElementById('vidas-jugador')  
const spanVidasEnemigo = document.getElementById('vidas-enemigo') 

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-Del-Jugador')
const ataquesDelEnemigo = document.getElementById('ataques-Del-Enemigo')   
const contenedorTarjetas = document.getElementById('contenedorTarjetas')  
const contenedorAtaques = document.getElementById('contenedorAtaques') 

const sectionVerMapa = document.getElementById('ver-mapa') 
const mapa = document.getElementById('mapa')


let jugadorId = null 
let enemigoId = null
let animales = []
let animalesEnemigos = []
let ataqueJugador = [] 
let ataqueEnemigo = []
let opcionDeAnimales
let inputPezLuna
let inputOsoPardo
let inputAguilaReal  
let mascotaJugador  
let mascotaJugadorObjeto
let ataquesAnimalBattleRoyale 
let ataquesAnimalBattleRoyaleEnemigo 
let botonFuego
let botonAgua
let botonTierra 
let botones = [] 
let indexAtaqueJugador
let indexAtaqueEnemigo 
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3  
let vidasEnemigo = 3  
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './FotosAnimales/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



class AnimalBattleRoyale {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre 
        this.foto = foto 
        this.vida = vida 
        this.ataques = []
        this.ancho = 50
        this.alto = 50 
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0 
        this.velocidadY = 0


    }

    pintarAnimal() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let pezluna = new AnimalBattleRoyale('PezLuna', './FotosAnimales/manbou.png', 5, './FotosAnimales/cabezaPez04.png')  

let osopardo = new AnimalBattleRoyale('OsoPardo', './FotosAnimales/de6ff9efa6853c21fc9d5a05cc688e55-ilustracion-de-oso-pardo-sentado.png', 5, './FotosAnimales/cabeza.png')

let aguilareal = new AnimalBattleRoyale('AguilaReal', './FotosAnimales/eagle-310452_960_720.png', 5, './FotosAnimales/cabezaAguila25.png')   


const PEZLUNA_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }, 
]

pezluna.ataques.push(...PEZLUNA_ATAQUES)  


const OSOPARDO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

osopardo.ataques.push(...OSOPARDO_ATAQUES)  


const AGUILAREAL_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

aguilareal.ataques.push(...AGUILAREAL_ATAQUES)  


animales.push(pezluna,osopardo,aguilareal)  


function iniciarJuego() { 

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    animales.forEach((animal) => { 
        opcionDeAnimales = `
        <input type="radio" name="mascota" id=${animal.nombre} />
        <label class="tarjeta-de-animalbattleroyale" for=${animal.nombre}>
            <p>${animal.nombre}</p>
            <img src=${animal.foto} alt=${animal.nombre}> 
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeAnimales  

    inputPezLuna = document.getElementById('PezLuna') 
    inputOsoPardo = document.getElementById('OsoPardo')
    inputAguilaReal = document.getElementById('AguilaReal')  

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador) 

    botonReiniciar.addEventListener('click', reiniciarJuego)  

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch("http://192.168.100.2:8080/unirse") 
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() { 
    if (inputPezLuna.checked) {  
       spanMascotaJugador.innerHTML = inputPezLuna.id 
       mascotaJugador = inputPezLuna.id 
    } else if (inputOsoPardo.checked) {
        spanMascotaJugador.innerHTML = inputOsoPardo.id
        mascotaJugador = inputOsoPardo.id
    } else if (inputAguilaReal.checked) { 
        spanMascotaJugador.innerHTML = inputAguilaReal.id  
        mascotaJugador = inputAguilaReal.id 
    } else {
        alert('Selecciona una mascota') 
        return
    }


    sectionSeleccionarMascota.style.display = 'none'

    seleccionarAnimal(mascotaJugador)

    extraerAtaques(mascotaJugador) 
    sectionVerMapa.style.display = 'flex'
    iniciarMapa() 

}

function seleccionarAnimal(mascotaJugador) {
    fetch(`http://192.168.100.2:8080/ANIMALBATTLEROYALE/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            animal: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) { 
    let ataques
    for (let i = 0; i < animales.length; i++) {
        if (mascotaJugador === animales[i].nombre) {
            ataques = animales[i].ataques 
        }
        
    } 
    mostrarAtaques(ataques) 
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesAnimalBattleRoyale = `
        <button id=${ataque.id} class="boton-de-ataque-elemento BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesAnimalBattleRoyale
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra') 
    botones = document.querySelectorAll('.BAtaque') 
} 

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
                
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.100.2:8080/ANIMALBATTLEROYALE/${jugadorId}/ataques`, {
        method: "post", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)

}

function obtenerAtaques() {
    fetch(`http://192.168.100.2:8080/ANIMALBATTLEROYALE/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesAnimalBattleRoyaleEnemigo = enemigo.ataques
    secuenciaAtaque() 
    
}

function ataqueAleatorioEnemigo() { 
    console.log('Ataques enemigo', ataquesAnimalBattleRoyaleEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesAnimalBattleRoyaleEnemigo.length -1) 
    
    if(ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')  

    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA') 

    } else {
        ataqueEnemigo.push('TIERRA') 
    } 
    console.log(ataqueEnemigo)
    iniciarPelea()  
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) { 
        combate()
    }
} 

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador] 
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] 
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE🤝🏻") 
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo

        } 
        
    }

     revisarVidas() 
} 

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("!!Esto Fue Un Empate😅😇!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("¡¡Felicidades Ganaste🎉🥳🙌🏻¡¡") 
    } else {
        crearMensajeFinal("Ops, Lo siento Acabas de Perder🤕😓")
    }

}


function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p') 
    let nuevoAtaqueDelEnemigo = document.createElement('p') 

    sectionMensajes.innerHTML = resultado  
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo 

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador) 
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  

}

function crearMensajeFinal(resultadoFinal) {  
    sectionMensajes.innerHTML = resultadoFinal   

    sectionReiniciar.style.display = 'block'   


}


function reiniciarJuego() {
    location.reload() 
}



function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() { 

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarAnimal()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        animalesEnemigos.forEach(function (animal) {
            animal.pintarAnimal()
            revisarColision(animal)
        })

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.2:8080/ANIMALBATTLEROYALE/${jugadorId}/posicion`, {
        method: "post", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    animalesEnemigos = enemigos.map(function (enemigo) {
                        let animalEnemigo = null
                        const animalNombre = enemigo.animal.nombre || ""
                        if (animalNombre === "PezLuna") {
                             animalEnemigo = new AnimalBattleRoyale('PezLuna', './FotosAnimales/manbou.png', 5, './FotosAnimales/cabezaPez04.png', enemigo.id)  
                        } else if (animalNombre === "OsoPardo") {
                             animalEnemigo = new AnimalBattleRoyale('OsoPardo', './FotosAnimales/de6ff9efa6853c21fc9d5a05cc688e55-ilustracion-de-oso-pardo-sentado.png', 5, './FotosAnimales/cabeza.png', enemigo.id)
                        } else if (animalNombre === "AguilaReal") {
                             animalEnemigo = new AnimalBattleRoyale('AguilaReal', './FotosAnimales/eagle-310452_960_720.png', 5, './FotosAnimales/cabezaAguila25.png', enemigo.id)
                        }

                        animalEnemigo.x = enemigo.x
                        animalEnemigo.y = enemigo.y

                        return animalEnemigo
                    })
                    

                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5 
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft': 
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break  
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < animales.length; i++) {
        if (mascotaJugador === animales[i].nombre) {
            return animales[i] 
        }
        
    } 
}

function revisarColision(enemigo) { 
    const arribaEnemigo = 
        enemigo.y
    const abajoEnemigo = 
        enemigo.y + enemigo.alto
    const derechaEnemigo = 
        enemigo.x + enemigo.ancho
    const izquierdaEnemigo = 
        enemigo.x 

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo) 
}


window.addEventListener('load', iniciarJuego) 


