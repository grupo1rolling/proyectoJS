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

    /*
    let botonVaciar = document.querySelector('#botonVaciar');
    let botonVaciar = document.getElementById('botonVaciar');
*/
   

 // IMPORTANTE para saber donde estamos: alert ('El pathname actual: '+window.location.pathname);  