//CARRITO
class Articulo{
    constructor(producto,precio){
        this.producto = producto;
        this.precio = parseInt(precio);
    }

    precioTotal(){
        return this.precio * 1.21;
    }
}

const producto1 = new Articulo("Smart TV Hitachi 50''",79907);
const producto2 = new Articulo("Heladera Samsung Rt38k59",200784);
const producto3 = new Articulo("Notebook ASUS X515JA",84999);
const producto4 = new Articulo("Equipo de música Sony",35000);
const producto5 = new Articulo("Auriculares Sony MDR-ZX110",4999);
const producto6 = new Articulo("Lavarropas Samsung W65m0",92032);
const producto7 = new Articulo("Aire Acondicionado TCL",82795);

let productosElegidos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7];

let nombre = prompt("¡Bienvenido/a! Por favor ingresa tu nombre.");

let eleccion = prompt(
    `¡Hola ${nombre}!, bienvenido/a a la tienda de COMFY HOUSE.\nSeleccioná los artículos que deseas comprar:
    
    Ingresá 1 para ${producto1.producto} - precio: $${producto1.precio}
    Ingresá 2 para ${producto2.producto} - precio: $${producto2.precio}
    Ingresá 3 para ${producto3.producto} - precio: $${producto3.precio}
    Ingresá 4 para ${producto4.producto} - precio: $${producto4.precio}
    Ingresá 5 para ${producto5.producto} - precio: $${producto5.precio}
    Ingresá 6 para ${producto6.producto} - precio: $${producto6.precio}
    Ingresá 7 para ${producto7.producto} - precio: $${producto7.precio}`)

let total = 0;

function eleccionDeProducto(){
    while(eleccion != "FINALIZAR"){

        alert(`${nombre} tu artículo elegido es ${productosElegidos[eleccion-1].producto}`);

        total+= Math.round(productosElegidos[eleccion-1].precioTotal());

        eleccion = prompt(
            `${nombre}, querés seguir comprando?\nSeleccioná otro artículo o de lo contrario digitá FINALIZAR.

        Ingresá 1 para ${producto1.producto} - precio: $${producto1.precio}
        Ingresá 2 para ${producto2.producto} - precio: $${producto2.precio}
        Ingresá 3 para ${producto3.producto} - precio: $${producto3.precio}
        Ingresá 4 para ${producto4.producto} - precio: $${producto4.precio}
        Ingresá 5 para ${producto5.producto} - precio: $${producto5.precio}
        Ingresá 6 para ${producto6.producto} - precio: $${producto6.precio}
        Ingresá 7 para ${producto7.producto} - precio: $${producto7.precio}`)
    }
    alert(`Total a pagar $${total}`);
}

eleccionDeProducto();

