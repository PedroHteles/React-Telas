from re import escape
import re
from api import app,engine
from api.admin.models import modelo_veiculos,cdas,cda_padrao_abastecimentos
from api.admin.pesquisa import pesquisa_banco
from flask import Flask,request,jsonify 
import simplejson as json
from sqlalchemy.sql import select

@app.route('/dadosPadraoAbastec', methods=['GET'])
def modelos():
    conn = engine.connect()
    results = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec id, cpa1.id_cda idCda, cpa1.id_modelo_veiculo idModeloVeiculo ,modelo_veiculos.descricao nomeModeloVeiculo , cdas.descricao nomeCda,cpa1.qtd_litros_abastec_padrao qtdLitrosAbastecPadrao,cpa1.media_padrao mediaPadrao
FROM cda_padrao_abastecimentos cpa1 
inner join cdas on cdas.id_cda =  cpa1.id_cda 
inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo 
union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 
FROM cdas cda, modelo_veiculos mv 
where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo);''')
    return  json.dumps({'Tabela':results.all()}),200



# @app.route('/editar', methods=['PATCH'])
# def editar():
#     request_data = json.loads(request.data)
#     media = request_data['dadosForm']['mediaAbastecimento']
#     litros = request_data['dadosForm']['qtdLitros']
#     id_cda_padrao = request_data['dadosForm']['idCdaAbastecimento']
#     idCdaSelec = request_data['select']['idCdaSelec']
#     idVeiculoSelec = request_data['select']['idVeiculoSelec']
#     abastecimentoZerado = request_data['select']['abastecimentoZerado']
#     conn = engine.connect()

#     if (type(media) == float or type(media) == int) and type(litros) == int and type(id_cda_padrao) == int:
#         s = select(cda_padrao_abastecimentos).where(cda_padrao_abastecimentos.c.id_cda_padrao_abastec == id_cda_padrao)
#         result = conn.execute(s)
#         if media < 100 and result.one() != []:
#             try:
#                 tmt = cda_padrao_abastecimentos.update().where(cda_padrao_abastecimentos.c.id_cda_padrao_abastec == id_cda_padrao).values(qtd_litros_abastec_padrao=litros,media_padrao=media)
#                 conn.execute(tmt)
#                 return json.dumps({'dadosForm': pesquisa_banco(idCdaSelec,idVeiculoSelec,abastecimentoZerado,conn)}),201
#             except:
#                 return jsonify({'status': 'erro ao inserir objeto'}),400
#         else:
#             return jsonify({'status': 'media nao pode ser maior que 99,99 '}),400
#     else:
#         return jsonify({'status': 'inserir apenas numeros'}),403


# @app.route('/criar', methods=['PATCH'])
# def criar():
#     request_data = json.loads(request.data)
#     media = request_data['dadosForm']['mediaAbastecimento']
#     litros = request_data['dadosForm']['qtdLitros']
#     id_cda = request_data['dadosForm']['idCda']
#     id_modelo = request_data['dadosForm']['idModelo']
#     idCdaSelec = request_data['select']['idCdaSelec']
#     idVeiculoSelec = request_data['select']['idVeiculoSelec']
#     abastecimentoZerado = request_data['select']['abastecimentoZerado']
    
#     conn = engine.connect()

#     if (type(media) == float or type(media) == int) and type(litros) == int:
#         s = select(cda_padrao_abastecimentos.c.id_cda, cda_padrao_abastecimentos.c.id_modelo_veiculo).where(cda_padrao_abastecimentos.c.id_cda == id_cda,cda_padrao_abastecimentos.c.id_modelo_veiculo == id_modelo)
#         result = conn.execute(s)
#         if result.all() == []:
#             try: 
#                 ins = cda_padrao_abastecimentos.insert().values(id_cda=id_cda,id_modelo_veiculo=id_modelo,qtd_litros_abastec_padrao=litros,media_padrao=media)
#                 conn.execute(ins)
#                 s = select(cda_padrao_abastecimentos.c.id_cda_padrao_abastec).where(cda_padrao_abastecimentos.c.id_cda == id_cda,cda_padrao_abastecimentos.c.id_modelo_veiculo == id_modelo)
#                 result = conn.execute(s)

#                 if results != []:
#                     return json.dumps({'dadosForm': pesquisa_banco(idCdaSelec,idVeiculoSelec,abastecimentoZerado,conn)}),201
#                 else:
#                    return jsonify({'status': 'ao inserir / retornar obj'}),400  
#             except:
#                 return jsonify({'status': 'erro'}),400
#         else:
#             return jsonify({'status': 'item ja inserido'}),400
#     else:
#         return jsonify({'status': 'erro'}),403









    
if __name__ == '__main__':
    app.run(debug=True)