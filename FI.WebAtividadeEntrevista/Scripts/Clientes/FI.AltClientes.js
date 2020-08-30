
$(document).ready(function () {

    $("#CPF").mask('000.000.000-00', { reverse: true });
    $("#CEP").mask('00000-000');
    $("#Telefone").mask('(00) 0000-0000');

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var cpf = $("#CPF").val();

        // Retorno [bool, string] => [validado, mensagem]
        var valido = validaCPF(cpf.toString());
        console.log(valido);
        if (valido[0]) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "CPF": $(this).find("#CPF").val()
                },
                error:
                    function (r) {
                        if (r.status === 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status === 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                        window.location.href = urlRetorno;
                    }
            });
        }
        else {
            ModalDialog("Ocorreu um erro", valido[1]);
        }


    });

    $("#btn_beneficiario").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var url = $(this).data("url");
        console.log(url);

        var listaRegistros = getAllRegistrosExistentes();
        if (listaRegistros.length > 0) {
            var idCount = $("#IdCont").val();
            $.ajax(url, {
                method: "POST",
                data: { "beneficiarioViewModel": { "listaBeneficiarios": listaRegistros, "ultimoIdGerado": idCount, "beneficiario": null } },
                success: (data) => {
                    $("#modal").modal({ show: true, backdrop: "static" });
                    $("#CPFBeneficiario").mask('000.000.000-00', { reverse: true });
                }
            });
        }
        else {
            $.ajax(url, {
                method: "GET",
                success: (data) => {
                    $("#modal").modal({ show: true, backdrop: "static" }).html(data);
                    $("#CPFBeneficiario").mask('000.000.000-00', { reverse: true });
                }
            });
        }


    });

});

//function ModalDialog(titulo, texto) {
//    var random = Math.random().toString().replace('.', '');
//    var textoModal = '<div id="' + random + '" class="modal fade">                                                               ' +
//        '        <div class="modal-dialog">                                                                                 ' +
//        '            <div class="modal-content">                                                                            ' +
//        '                <div class="modal-header">                                                                         ' +
//        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
//        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
//        '                </div>                                                                                             ' +
//        '                <div class="modal-body">                                                                           ' +
//        '                    <p>' + texto + '</p>                                                                           ' +
//        '                </div>                                                                                             ' +
//        '                <div class="modal-footer">                                                                         ' +
//        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
//        '                                                                                                                   ' +
//        '                </div>                                                                                             ' +
//        '            </div><!-- /.modal-content -->                                                                         ' +
//        '  </div><!-- /.modal-dialog -->                                                                                    ' +
//        '</div> <!-- /.modal -->                                                                                        ';

//    $('body').append(textoModal);
//    $('#' + random).modal('show');
//}
