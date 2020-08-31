/**
 * Retorna todos os registros de beneficiarios da tabela.
 * @param {any} id IDCliente caso seja necessario, por padrão é 0.
 * @returns {Array} Array com todos os registros encontrados na tabela de beneficiarios
 */
function getAllRegistrosExistentes(id = 0) {
    var registros = $("#modal table tbody tr");
    var lista = [];
    $(registros).each((i, e) => {
        var idTr = e.id.split("_")[1];
        var objBeneficiarioModel = {
            "Id": $(e).find("#id_beneficiario_list_" + idTr).text(),
            "IdCliente": id,
            "Nome": $(e).find("#nome_beneficiario_list_" + idTr).text(),
            "CPF": $(e).find("#cpf_beneficiario_list_" + idTr).text()
        };

        lista.push(objBeneficiarioModel);
    });

    return lista;
}

/**
 * Retorna um array contendo todos os ids dos registro que ja existiam no banco mas foram apagados
 * @returns {Array} Array com todos os id dos registros
 * */
function getListaDeletados() {
    var lista = $("#ListaDeletados").val();
    if (lista !== "") {
        return lista.split(",");
    }
    else {
        return new Array();
    }
}


/**
 * Chama um modal para apresentar uma mensagem
 * @param {any} titulo Titulo do modal 
 * @param {any} texto Texto a ser apresentado
 */
function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var textoModal = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(textoModal);
    $('#' + random).modal('show');
}