let carrito = [];
const DOMcontainerProductos = document.getElementById("containerProductos");
const DOMcantidadCarrito = document.getElementById("cantidadCarrito");


window.addEventListener("DOMContentLoaded", () => fetchData());


// ################### TRAER PRODUCTOS DE LA BASE DE DATOS ###################

const fetchData = async() => {
    try{
        const respuesta = await fetch("../bd.json");

        //Si la respuesta es correcta
        if(respuesta.status === 200){
            const data = await respuesta.json();
            

            // ################### VISUALIZAR TODOS LOS PRODUCTOS ###################

            function renderizarProductos(data){
                data.forEach((info) => {
                    const DOMcard = document.createElement("div");
                    DOMcard.classList.add("card");
                    const DOMcontainer = document.createElement("div");
                    DOMcontainer.classList.add("row", "m-0");
                    const DOMcontenedorImg = document.createElement("div");
                    DOMcontenedorImg.classList.add("col-5", "my-auto");
                    const DOMimagen = document.createElement("img");
                    DOMimagen.classList.add("card-img", "img-fluid");
                    DOMimagen.src = `../img/productos/${info.imagen}`;
                    DOMimagen.alt = `imagen ${info.nombre}`;
                    const DOMcontenedorInfo = document.createElement("div");
                    DOMcontenedorInfo.classList.add("col-7", "p-0");
                    const DOMcontenedorInfo2 = document.createElement("div");
                    DOMcontenedorInfo2.classList.add("card-body");
                    const DOMtitulo = document.createElement("h3");
                    DOMtitulo.classList.add("card-title");
                    DOMtitulo.textContent = `${info.nombre}`;
                    const DOMprecio = document.createElement("p");
                    DOMprecio.classList.add("card-text");
                    DOMprecio.textContent = `$${info.precio}`;
                    const DOMboton = document.createElement("buttom");
                    DOMboton.classList.add("btn", "btn-primary");
                    DOMboton.textContent = "Añadir al carrito";
                    DOMboton.setAttribute("ID", info.codigo);
                    DOMboton.addEventListener("click", enviarProductoAlCarrito);
        
                    //Armado
                    DOMcontenedorInfo2.appendChild(DOMtitulo);
                    DOMcontenedorInfo2.appendChild(DOMprecio);
                    DOMcontenedorInfo2.appendChild(DOMboton);
                    DOMcontenedorInfo.appendChild(DOMcontenedorInfo2);
                    DOMcontenedorImg.appendChild(DOMimagen);
                    DOMcontainer.appendChild(DOMcontenedorImg);
                    DOMcontainer.appendChild(DOMcontenedorInfo);
                    DOMcard.appendChild(DOMcontainer);
                    DOMcontainerProductos.appendChild(DOMcard);
                })
            }
            

            // ################### FILTRAR PRODUCTOS ###################

            document.querySelectorAll(".filtroItems").forEach(el => {
                el.addEventListener("click", () => {
                  const toFilter = el.textContent;
                  DOMcontainerProductos.innerHTML = "";
                  if(toFilter === "Todos")return renderizarProductos(data);
                  renderizarProductos(data.filter(obj=> obj.categoria === toFilter))
                });
              });
            
            
            // ################### AñADIR UN PRODUCTO AL CARRITO ###################

            function enviarProductoAlCarrito(evento){
                const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                iconColor: `orange`,
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
                Toast.fire({
                icon: 'success',
                title: 'Artículo añadido',
                })
                carrito.push(evento.target.getAttribute("ID"));
                carritoLocalStorage();

                //Cantidad carrito NAV
                DOMcantidadCarrito.textContent = `${carrito.length}`
                console.log(carrito)
            }


            // ################### GUARDAR EN LOCALSTORAGE ###################

            function carritoLocalStorage (){
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }


            // ################### CARGAR DE LOCALSTORAGE ###################

            function getCarritoLocalStorage(){
                localStorage.getItem("carrito") !== null && (carrito = JSON.parse(localStorage.getItem("carrito")));
            }


            // ################### INICIAR ###################

            getCarritoLocalStorage();
            renderizarProductos(data);
            

  
            
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
