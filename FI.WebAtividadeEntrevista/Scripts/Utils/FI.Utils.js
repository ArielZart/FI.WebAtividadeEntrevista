function getAllRegistrosExistentes() {
    var registros = $("#modal table tbody tr");
    var lista = [];
    $(registros).each((i, e) => {
        var idTr = e.id.split("_")[1];
        var objBeneficiarioModel = {
            "Id": 0,
            "IdCliente": 0,
            "Nome": $(e).find("#nome_beneficiario_list_" + idTr).text(),
            "CPF": $(e).find("#cpf_beneficiario_list_" + idTr).text()
        };

        lista.push(objBeneficiarioModel);
    });

    return lista;
}


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