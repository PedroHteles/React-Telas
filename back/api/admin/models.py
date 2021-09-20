from sqlalchemy import  MetaData, Table, Column, Integer,VARCHAR
from sqlalchemy.dialects.mysql import \
        DECIMAL, DECIMAL,SMALLINT, \
        TINYTEXT, VARCHAR
from api import engine

meta = MetaData()
modelo_veiculos = Table(
    'modelo_veiculos' , meta,   
    Column('id_modelo',Integer, primary_key=True, nullable=False),
    Column('descricao' ,VARCHAR(40),nullable=False)
)
cdas = Table(
    'cdas', meta,  
    Column('id_cda',Integer, primary_key=True, nullable=False),
    Column('descricao',VARCHAR(40),nullable=False)
)
cda_padrao_abastecimentos = Table(
    'cda_padrao_abastecimentos', meta,  
    Column('id_cda_padrao_abastec',Integer, primary_key=True, nullable=False),
    Column('id_cda',TINYTEXT, nullable=False),
    Column('id_modelo_veiculo', SMALLINT,nullable=False),
    Column('qtd_litros_abastec_padrao',SMALLINT,nullable=False),
    Column('media_padrao' ,DECIMAL(4, 2),nullable=False)
)
meta.create_all(engine)

