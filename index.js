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
  
  let carrito = [];
  const DOMitems = document.getElementById("items");
  const DOMcarrito = document.getElementById("carrito");
  const DOMtotal = document.getElementById("total");
  const DOMbotonVaciar = document.getElementById("boton-vaciar");
  
  
  // Visualizar todos los productos 
  function renderizarProductos(){
    baseDatosArticulos.forEach((info) => {
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
  
  // Evento para añadir un producto al carrito
  function enviarProductoAlCarrito(evento){
    carrito.push(evento.target.getAttribute("ID"));
    renderizarCarrito();
    carritoLocalStorage();
  }
  
  function renderizarCarrito(){
    // Vaciar todo el html
    DOMcarrito.textContent = "";
  
    // Quita los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
  
    carritoSinDuplicados.forEach((item)=>{
      const miItem = baseDatosArticulos.filter((itemBaseDatos)=>{
        return itemBaseDatos.codigo === item;
      });
  
      // Cuenta en número de veces que se repite el producto
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
  
      // Mezclamos nodos
      itemCarrito.appendChild(miBoton);
      DOMcarrito.appendChild(itemCarrito);
    });
    //Mostrar precio total
    
    DOMtotal.textContent = Intl.NumberFormat(`de-DE`).format(totalCarrito());
    // DOMtotal.textContent = totalCarrito();
  
  }
  
  // Evento para borrar un item del carrito
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
  
  // Calcular el precio total de los productos en carrito
  function totalCarrito(){
    return carrito.reduce((total, item)=> {
      const miItem = baseDatosArticulos.filter((itemBaseDatos)=>{
        return itemBaseDatos.codigo === item;
      });
      return total + miItem[0].precio;
    }, 0);
  }
  
  // Vaciar Carrito
  function vaciarCarrito(){
    carrito = [];
    renderizarCarrito();
    localStorage.clear();
  }
  
  //Guardar en localStorage
  function carritoLocalStorage (){
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  //Cargar de localStorage
  function getCarritoLocalStorage(){
    if(localStorage.getItem("carrito") !== null){
      //carga la información
      carrito = JSON.parse(localStorage.getItem("carrito"));
    }
  }
  
  // Evento vaciar carrito
  DOMbotonVaciar.addEventListener("click", vaciarCarrito);
  
  // INICIAR
  getCarritoLocalStorage();
  renderizarProductos();
  renderizarCarrito();