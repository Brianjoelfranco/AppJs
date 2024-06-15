const selectProducto = document.querySelector("select#productos")
const inputHora = document.querySelector("input#horas")
const selectKilometros = document.querySelector("select#envio")
const botonPagar = document.querySelector("button#pagar")
const alertHora = document.querySelector("div#cuadroDeAlerta")
const spanPrecioFinal = document.querySelector("span#precioFinal")
const spanVerUltimoAlquiler = document.querySelector("span#verUltimoAlquiler")

const arrayHistorial = []

function cargarPrecioProductos(){
    arrayProductos.forEach((producto)=> {
        selectProducto.innerHTML += `<option>${producto.producto}</option>`
    })
}


function cargarPrecioEnvio(){
    arrayEnvio.forEach((envio)=> {
        selectKilometros.innerHTML += `<option>${envio.kilometros}</option>`
        }
    )
}

cargarPrecioProductos()
cargarPrecioEnvio()

function obtenerPrecioProducto(precioProducto){
    let resultado = arrayProductos.find((producto)=> producto.producto === precioProducto)
    return resultado.precio
}
function obtenerPrecioEnvio(precioEnvio){
    let resultado1 = arrayEnvio.find((envio)=> envio.kilometros === precioEnvio)
    return resultado1.precio
}

function precioFinal(){
    let hora = inputHora.value
    let prProduto = obtenerPrecioProducto(selectProducto.value)
    let prEnvio = obtenerPrecioEnvio(selectKilometros.value)
    const totalcarrito = new Totalcarrito(prProduto,hora,prEnvio,iva)
    spanPrecioFinal.textContent = totalcarrito.preciofinal()
}

//LOCAL STORAGE

function recuperarUltimoAlquiler(){
    return JSON.parse(localStorage.getItem("ultimaCotizacion"))
}

function guardarTotalEnLS(){
    const ultimoAlquiler = {
        fecha: new Date().toLocaleString(),
        preciofinal: spanPrecioFinal.textContent
    }

    localStorage.setItem("ultimaCotizacion", JSON.stringify(ultimoAlquiler))
}
//EVENTO
botonPagar.addEventListener("click", ()=>{
    if(selectProducto.value != "Seleccionar..." && selectKilometros.value != "Seleccionar..." && inputHora.value >= 1 && inputHora.value <= 8){
        precioFinal()
        guardarTotalEnLS()
    }else{
        alertHora.textContent = "❌Completa todos los datos solicitados.❌"
        setTimeout(() => {
            alertHora.textContent = ""
        },3000)
    }
})

spanVerUltimoAlquiler.addEventListener("click", ()=>{
    const ultimoAlquilerLS = recuperarUltimoAlquiler()
    
    if(ultimoAlquilerLS !== null){
        alert("Su último alquiler fue el: "+ ultimoAlquilerLS.fecha +"\nCon un valor de: $"+ ultimoAlquilerLS.preciofinal)
    }else{
        alertHora.textContent = "No has realizado un alquiler previamente"
    }
})