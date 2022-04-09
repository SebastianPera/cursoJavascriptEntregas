//CARRITO
class Articulo{
    constructor(nombre, precio, categoria, codigo, cantidad){
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.categoria = categoria;
        this.codigo = codigo;
        this.cantidad = cantidad;
    }

    precioTotal(){
        return this.precio * 1.21;
    }
}
let baseDatosArticulos = [];

baseDatosArticulos.push(new Articulo("Smart TV Hitachi 50''", 79907, "Audio/Video", "A001", 3));
baseDatosArticulos.push(new Articulo("Heladera Samsung Rt38k59", 200784, "Electrodomésticos y AC", "E001", 5));
baseDatosArticulos.push(new Articulo("Notebook ASUS X515JA", 84999, "Audio/Video", "A002", 8));
baseDatosArticulos.push(new Articulo("Equipo de música Sony", 35000, "Audio/Video", "A003", 2));
baseDatosArticulos.push(new Articulo("Auriculares Sony MDR-ZX110", 4999, "Audio/Video", "A004", 9));
baseDatosArticulos.push(new Articulo("Lavarropas Samsung W65m0", 92032, "Electrodomésticos y AC", "E002", 1));
baseDatosArticulos.push(new Articulo("Aire Acondicionado TCL", 82795, "Electrodomésticos y AC", "E003", 5));
baseDatosArticulos.push(new Articulo("Afeitadora Philips Aquatouch", 7245, "Cuidado Personal", "C001", 6));
baseDatosArticulos.push(new Articulo("Kit Philips Brp505/00", 12063, "Cuidado Personal", "C002", 2));
baseDatosArticulos.push(new Articulo("Depiladora Philips Bre712/00", 14125, "Cuidado Personal", "C003", 7));
baseDatosArticulos.push(new Articulo("Secador De Pelo Remington", 6313, "Cuidado Personal", "C004", 5));
baseDatosArticulos.push(new Articulo("Pileta circular Sol de Verano", 49403, "Hogar y Jardín", "H001", 3));
baseDatosArticulos.push(new Articulo("Futón 3 cuerpos", 32800, "Hogar y Jardín", "H002", 2));
baseDatosArticulos.push(new Articulo("Cama de 1 plaza blanca", 22409, "Hogar y Jardín", "H003", 2));
baseDatosArticulos.push(new Articulo("Escritorio de trabajo", 19480, "Hogar y Jardín", "H004", 3));
baseDatosArticulos.push(new Articulo("Bicicleta Gribom 3060 R26", 46795, "Más Categorías", "M001", 8));
baseDatosArticulos.push(new Articulo("Conservadora 32 L", 3980, "Más Categorías", "M002", 15));
baseDatosArticulos.push(new Articulo("Parlante Sanyo Bth25", 14452, "Audio/Video", "A005", 23));
baseDatosArticulos.push(new Articulo("Heladera Samsung Rt32k507", 130183, "Electrodomésticos y AC", "E004", 5));
baseDatosArticulos.push(new Articulo("Freezer Philco 2 Puertas", 115034, "Electrodomésticos y AC", "E005", 4));


let usuario = prompt("¡Bienvenido/a! Por favor ingresa tu nombre.");

// Elegir artículos y ver total
function comprar(){
    let listaArticulos = "";
    for (let i = 0; i < baseDatosArticulos.length; i++) {
        listaArticulos += `Ingresá ${i+1} para ${baseDatosArticulos[i].nombre}  - PRECIO: $${baseDatosArticulos[i].precio}\n`
    }

    let eleccion = prompt(`${usuario}, seleccioná los artículos que deseas comprar:\n\n${listaArticulos}`);
    let total = 0;

    while(!(eleccion == "FINALIZAR" || eleccion == "Finalizar" || eleccion == "finalizar")){

        alert(`${usuario} tu artículo elegido es ${baseDatosArticulos[eleccion-1].nombre}`);
        total+= Math.round(baseDatosArticulos[eleccion-1].precioTotal());
        eleccion = prompt(`${usuario}, querés seguir comprando?\nSeleccioná otro artículo o de lo contrario digitá FINALIZAR.\n\n${listaArticulos}`);
    }
    alert(`Total a pagar $${total}`);
}

// Ver Stock - menos de 4
function stockBajo(){
    let listaPocoStock = "";
    const pocoStock = baseDatosArticulos.filter(x => x.cantidad <= 4);
    for (const articulo of pocoStock) {
        listaPocoStock += `Artículo: ${articulo.nombre}\nCódigo: ${articulo.codigo}\nCantidad: ${articulo.cantidad}\n\n`
    }
    alert(listaPocoStock);
}


//Ordenar por cantidad
function ordenarPorCantidad(){
    let listaCantidad = "";
    const ordenadosCantidad = baseDatosArticulos.map(x => x);
    ordenadosCantidad.sort((a, b) => a.cantidad - b.cantidad);
    for (const articulo of ordenadosCantidad) {
        listaCantidad += `${articulo.nombre} (${articulo.codigo}) - Cantidad: ${articulo.cantidad}\n`
    }
    alert(listaCantidad);
}


//Buscar un producto por código
function buscarProducto(){
    let ingresado = prompt("Para buscar un producto ingrese el código del mismo:");
    const articuloBuscado = baseDatosArticulos.filter(x => x.codigo.includes(ingresado.toUpperCase()));
    
    for (const articulo of articuloBuscado) {
        alert(`${articulo.nombre} (${articulo.codigo}) - Cantidad: ${articulo.cantidad}`);
    }
}


let opciones = prompt(`¡Hola ${usuario}!, por favor seleccioná una de las opciones del menú:\n
A- Lista de artículos. Simular compra.
B- Artículos con bajo stock.
C- Ordenar artículos por cantidad.
D- Buscar un artículo por su código.
E- Para salir.`).toUpperCase();

while(opciones !="E"){
    switch(opciones){
        case "A":
            comprar();
            break;
        case "B":
            stockBajo();
            break;
        case "C":
            ordenarPorCantidad();
            break;
        case "D":
            buscarProducto();
            break;
        default:
            alert("Ingresó una opción inválida");
            break;   
    }
    opciones = prompt(`¡Hola ${usuario}!, por favor seleccioná una de las opciones del menú:\n
    A- Lista de artículos. Simular compra.
    B- Artículos con bajo stock.
    C- Ordenar artículos por cantidad.
    D- Buscar un artículo por su código.
    E- Para salir.`).toUpperCase();
}