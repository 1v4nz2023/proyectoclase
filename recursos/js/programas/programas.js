

$(document).ready(function () {
    getParam();
});

function getParam() {

    if (true) {
        iniciarBandeja()
    }else{
        window.location = "/index.html"
    }
}

function iniciarBandeja() {
    console.log("Bandeja de programas esta lista para usar")
}

$(document).ready(function() {
    $('#myTable').dataTable({
        responsive: true,
        "oLanguage": {
            "sInfo" : "Mostrando _START_ de _END_ de _TOTAL_ entradas",// text you want show for info section
            "sSearch": "Buscar ",
            "sLengthMenu": "Mostrando _MENU_ entradas",
            "sInfoFiltered": " - filtrando de  _MAX_ registros",
            "sZeroRecords": "No hay registros que mostrar",
            "sInfoEmpty": "Mostrando _START_ de _END_ de _TOTAL_ entradas",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Atras"

            }
         },
    });
    });

