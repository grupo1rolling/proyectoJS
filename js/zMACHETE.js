/*  Very Important Information  */
/*    */
/*  funcion flecha   */
botonVaciar.addEventListener('click', ()=>{
          vaciarCarrito();
});

/* 
en el HTML: 
  <script src="../js/app.js" type="module"></script> 
Llamado a la funcion desde alguna parte el app.js de tipo module 
<a href="#" 
    class="btn btn-green mt-3" 
    id="botonComprar" 
    onclick="comprarProd(${index})">
    Añadir al carro
</a>

Se DEBE definir la funcion como GLOBAL con window.NOMBRE_DE_LA_FUNCION=function () {...cuerpo de la funcion ...}
*/
window.comprarProd= function (i) {
    console.log ("escribir la funcion que se tiene que ejecutar cuando se presiona click en el boton")
    }



    function listarCarrito() {
        if (carrito.lenght = 0) {
            alert ("carrito vacio");
            } else {
            console.log (`CARRITO.LENGHT = ${carrito.lenght}`)
        
            let items = document.getElementById("items");
            carrito.map (function (p,i) {
            let linea = ` 
            <tr>
                <th scope="row">${i+1}</th>
                <td>${p._idProd}</td>
                <td>${p._nomProd}</td>
                <td>${p._precioProd}</td>
                <td><button id="btnBorrarItem" 
                    data-codigo="${p._idProd}" 
                    title="eliminar producto" 
                    type="button" class="btn btn-outline-danger btn-sm">
                    <i id="borrarItem" 
                    data-codigo="${i}" 
                    class="fa fa-window-close-o">
                    </i>
                    </button>
                </td>
            </tr>`   
            items.innerHTML += linea;
            });
        } //del else carrito con compras
    }
    
    