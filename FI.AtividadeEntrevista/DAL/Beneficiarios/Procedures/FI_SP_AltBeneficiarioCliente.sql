CREATE PROC FI_SP_AltBeneficiarioCliente
    @NOME          VARCHAR (50) ,
    @CPF           VARCHAR (14)	,
	@Id            BIGINT		,
	@IDCliente     BIGINT
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		NOME = @NOME, 
		CPF = @CPF,
		IDCLIENTE = @IDCliente
	WHERE ID = @Id
END
