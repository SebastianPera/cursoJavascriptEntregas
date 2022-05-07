let carrito = [];
const DOMitems = document.getElementById("items");
const DOMcarrito = document.getElementById("carrito");
const DOMtotal = document.getElementById("total");
const DOMbotonVaciar = document.getElementById("boton-vaciar");
const DOMbotonComprar = document.getElementById("col-carrito");


fetch("./bd.json")
.then(res => res.json())
.then(data => {
    
  // ################### VISUALIZAR TODOS LOS PRODUCTOS ###################

  function renderizarProductos(){
    data.forEach((info) => {
      // Estructura
      const card = document.createElement("div");
      card.classList.add("card", "col-sm-6");
    
      // Body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
    
      // Titulo
      const cardTitulo = document.createElement("h6");
      cardTitulo.classList.add("card-title");
      cardTitulo.textContent = info.nombre;

      // Precio
      const cardPrecio = document.createElement("p");
      cardPrecio.classList.add("card-text");
      cardPrecio.textContent = `$${info.precio}`;

      // Boton
      const cardBoton = document.createElement("button");
      cardBoton.classList.add("btn", "btn-primary");
      cardBoton.textContent = "Añadir al carrito";
      cardBoton.setAttribute("ID", info.codigo);
      cardBoton.addEventListener("click", enviarProductoAlCarrito);

      // Armado
      cardBody.appendChild(cardTitulo);
      cardBody.appendChild(cardPrecio);
      cardBody.appendChild(cardBoton);
      card.appendChild(cardBody);
      DOMitems.appendChild(card);
      document.body.style.marginTop = "3rem";
      items.style.display = "flex";
      items.style.gap = "0rem"
    });
  }


  // ################### AñADIR UN PRODUCTO AL CARRITO ###################

  function enviarProductoAlCarrito(evento){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
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
      title: 'Artículo añadido'
    })
    carrito.push(evento.target.getAttribute("ID"));
    renderizarCarrito();
    carritoLocalStorage();
    botonComprar();
  }


  // ################### RENDERIZAR CARRITO ###################

  function renderizarCarrito(){
    // Vaciar todo el html
    DOMcarrito.textContent = "";

    // Quita los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item)=>{
      const miItem = data.filter((itemBaseDatos)=>{
        return itemBaseDatos.codigo === item;
      });

      // Cuenta el número de veces que se repite el producto
      const numeroRepeticiones = carrito.reduce((total, itemID) => {
        // Si coincide los ID incrementar el contador
        if (itemID === item){
          return total +=1;
        }else{
          return total;
        } 
      }, 0);

      // Crea el item dentro del carrito
      const itemCarrito = document.createElement("li");
      itemCarrito.classList.add("list-group-item", "text-right", "mx-1", "my-1");
      itemCarrito.textContent = `${numeroRepeticiones} x ${miItem[0].nombre}\n$${miItem[0].precio}`;
      itemCarrito.style.display = "flex"

      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-5");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);

      // Mezclar nodos
      itemCarrito.appendChild(miBoton);
      DOMcarrito.appendChild(itemCarrito);
    });
    
    //Mostrar precio total
    DOMtotal.textContent = Intl.NumberFormat(`de-DE`).format(totalCarrito());
  }


  // ################### CALCULAR PRECIO TOTAL DEL CARRITO ###################

  function totalCarrito(){
    return carrito.reduce((total, item)=> {
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
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    // Vuelve a renderizar
    renderizarCarrito();
    //Actualizar LocalStorage
    carritoLocalStorage();
  }


  // ################### VACIAR EL CARRITO ###################

  // Evento vaciar carrito
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
        carrito = [];
        renderizarCarrito();
        localStorage.clear();
        botonnComprar.style.display = "none";
      }
    })
  }


  // ################### BOTON COMPRAR ###################

  const botonnComprar = document.createElement("button");
  function botonComprar(){
    (carrito.length === 1) && (
    botonnComprar.classList.add("btn", "btn-danger"),
    botonnComprar.textContent = "Comprar",
    DOMbotonComprar.appendChild(botonnComprar),
    botonnComprar.style.display = "")
  }


  // ################### GUARDAR EN LOCALSTORAGE ###################

  function carritoLocalStorage (){
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


  // ################### CARGAR EN LOCALSTORAGE ###################

  function getCarritoLocalStorage(){
    localStorage.getItem("carrito") !== null && (carrito = JSON.parse(localStorage.getItem("carrito")));
  }


  // ################### INICIAR ###################

  getCarritoLocalStorage();
  renderizarProductos();
  renderizarCarrito();
})