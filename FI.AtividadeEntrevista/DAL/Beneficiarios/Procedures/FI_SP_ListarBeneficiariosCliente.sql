﻿CREATE PROC FI_SP_ListarBeneficiariosCliente
	@IDCliente BIGINT
AS
BEGIN	
	SELECT ID, NOME, CPF, IDCLIENTE  FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE = @IDCliente
END