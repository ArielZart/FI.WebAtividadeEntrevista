$(document).ready(function () {

    $("#CPF").mask('000.000.000-00', { reverse: true });
    $("#CEP").mask('00000-000');
    $("#Telefone").mask('(00) 00000-0000');

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var cpf = $("#CPF").val();

        // Retorno [bool, string] => [validado, mensagem]
        var valido = validaCPF(cpf.toString());
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
                        ModalDialog("Sucesso!", r);
                        $("#formCadastro")[0].reset();
                    }
            });
        }
        else {
            ModalDialog("Ocorreu um erro", valido[1]);
        }
        
    });

    $("#btn_beneficiario").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var url = $(this).data("url"); 
        
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


