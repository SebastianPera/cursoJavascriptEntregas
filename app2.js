let carrito2 = [];
const DOMcarrito2 = document.getElementsByClassName("cartProductos");
const DOMtotal = document.getElementById("totalCarrito");
const DOMbotonVaciar = document.getElementById("vaciarCarrito");
const DOMbotonComprar = document.getElementsByClassName("cardInfodepago");
const DOMcantidadCarrito = document.getElementById("cantidadCarrito");



window.addEventListener("DOMContentLoaded", () => fetchData());


// ################### TRAER PRODUCTOS DE LA BASE DE DATOS ###################

const fetchData = async() => {
    try{
        const respuesta = await fetch("../bd.json");

        //Si la respuesta es correcta
        if(respuesta.status === 200){
            const data = await respuesta.json();
            
            
            // ################### RENDERIZAR CARRITO ###################

            function renderizarCarrito(){
                // Vaciar todo el html
                DOMcarrito2[0].textContent = "";

                // Quita los duplicados
                const carritoSinDuplicados = [...new Set(carrito2)];

                carritoSinDuplicados.forEach((item)=>{
                    const miItem = data.filter((itemBaseDatos)=>{
                        return itemBaseDatos.codigo === item;
                    });

                    // Cuenta el número de veces que se repite el producto
                    const numeroRepeticiones = carrito2.reduce((total, itemID) => {
                        // Si coincide los ID incrementar el contador
                        if (itemID === item){
                        return total +=1;
                        }else{
                        return total;
                        } 
                    }, 0);

                    // Crea el item dentro del carrito
                    const itemCarrito = document.createElement("div");
                    itemCarrito.classList.add("cardCarrito");
                    const itemContenedor = document.createElement("div");
                    itemContenedor.classList.add("contenedorImg")
                    const itemImagen = document.createElement("img");
                    itemImagen.src = `../img/productos/${miItem[0].imagen}`
                    const itemNombre = document.createElement("span");
                    itemNombre.classList.add("itemNombre");
                    itemNombre.textContent =`(x ${numeroRepeticiones}) - ${miItem[0].nombre}`;
                    const itemPrecio = document.createElement("span");
                    itemPrecio.classList.add("itemPrecio");
                    itemPrecio.textContent = `$${miItem[0].precio}`;


                    // Boton de borrar
                    const contenedorBoton = document.createElement("div");
                    contenedorBoton.classList.add("contenedorBoton");
                    const miBoton = document.createElement("button");
                    contenedorBoton.appendChild(miBoton);
                    miBoton.classList.add("btn", "btn-danger");
                    miBoton.textContent = "X";
                    miBoton.style.marginLeft = "1rem";
                    miBoton.dataset.item = item;
                    miBoton.addEventListener("click", borrarItemCarrito);

                    // Mezclar nodos
                    itemContenedor.appendChild(itemImagen);
                    itemCarrito.appendChild(itemContenedor);
                    itemCarrito.appendChild(itemNombre);
                    itemCarrito.appendChild(itemPrecio);
                    itemCarrito.appendChild(contenedorBoton);
                    DOMcarrito2[0].appendChild(itemCarrito);
                });
                
                //Mostrar precio total
                DOMtotal.textContent = "Total: $" + Intl.NumberFormat(`de-DE`).format(totalCarrito());

                //Boton Comprar
                botonComprar()

                //Cantidad carrito NAV
                if(carrito2.length > 0){
                DOMcantidadCarrito.textContent = `${carrito2.length}`
                }else{
                    DOMcantidadCarrito.textContent = "";
                }
            }


            // ################### CALCULAR PRECIO TOTAL DEL CARRITO ###################

            function totalCarrito(){
                return carrito2.reduce((total, item)=> {
                const miItem = data.filter((itemBaseDatos)=>{
                    return itemBaseDatos.codigo === item;
                });       
                return total + miItem[0].precio;
                }, 0);
            }


            // ################### BORRAR UN ITEM DEL CARRITO ###################

            function borrarItemCarrito(evento){
                // Obtiene codigo del producto que hay en el boton pulsado
                const id = evento.target.dataset.item;
                // Borra todos los productos
                carrito2 = carrito2.filter((carritoId) => {
                return carritoId !== id;
                });

                //Actualizar LocalStorage
                carritoLocalStorage();
                // Vuelve a renderizar
                renderizarCarrito(); 
            }


            // ################### VACIAR EL CARRITO ###################

            DOMbotonVaciar.addEventListener("click", vaciarCarrito);

            function vaciarCarrito(){
                Swal.fire({
                title: 'Estás seguro?',
                text: "Se vaciará el carrito de compras por completo",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, adelante!'
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    'Borrado!',
                    'Se ha vaciado el carrito de compras',
                    'success'
                    )
                    carrito2 = [];
                    renderizarCarrito();
                    localStorage.clear();
                    botonnComprar.style.display = "none";
                }
                })
            }


            // ################### BOTON COMPRAR ###################

            const botonnComprar = document.createElement("button");
            function botonComprar(){
                (carrito2.length > 0) && (
                botonnComprar.classList.add("btn", "btn-danger"),
                botonnComprar.textContent = "Comprar",
                DOMbotonComprar[0].appendChild(botonnComprar),
                botonnComprar.style.display = "");
                (carrito2.length > 0) || (botonnComprar.style.display = "none");
            }


            // ################### GUARDAR EN LOCALSTORAGE ###################

            function carritoLocalStorage (){
                localStorage.setItem("carrito", JSON.stringify(carrito2));
            }


            // ################### CARGAR DE LOCALSTORAGE ###################

            function getCarritoLocalStorage(){
                localStorage.getItem("carrito") !== null && (carrito2 = JSON.parse(localStorage.getItem("carrito")));
            }


            // ################### INICIAR ###################

            getCarritoLocalStorage();
            renderizarCarrito();
            


        }else if(respuesta.status === 401){
            console.log("Error 401 - La petición no se realizo. Carece de credenciales válidas.")
        }else if(respuesta.status === 404){
            console.log("Error 404 - El contenido que está buscando no existe")
        }else{
            console.log("Error desconocido")
        }
    } catch(error){
    console.log(error)
    }
}