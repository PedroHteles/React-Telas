from flask import jsonify

def pesquisa_banco(id_cda,veiculos,id_cda0,conn):
    if type(id_cda) == int and type(veiculos) == int and type(id_cda0) == int:
        if id_cda0 == 0:
            if veiculos == 0 and id_cda == 0:
                result = conn.execute("SELECT cpa1.id_cda_padrao_abastec,cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.media_padrao != 0 and cpa1.media_padrao !=0 order by cda_descricao asc;")
                return result.all()
            elif veiculos == 0:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda and cdas.id_cda = {id_cda} inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and cda.id_cda = {id_cda} ''')
                return result.all()
            elif id_cda == 0:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo and modelo_veiculos.id_modelo = {veiculos} union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and  mv.id_modelo = {veiculos}''')
                return result.all()
            else:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda and cpa1.id_cda = {id_cda} inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo and modelo_veiculos.id_modelo = {veiculos} union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and  mv.id_modelo = {veiculos} and cda.id_cda = {id_cda}''')
                return result.all()
        elif id_cda0 == 1:
            if veiculos == 0 and id_cda == 0:
                result = conn.execute("select null id_cda_padrao_abastec , cda.id_cda, mv.id_modelo id_modelo_veiculo, mv.descricao veiculo_descricao , cda.descricao cda_descricao,0 qtd_litros_abastec_padrao,0 media_padrao FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) order by cda.id_cda asc;").all()
                if result != []:
                    return result
                else:
                    result=[]
                    return result
            elif veiculos == 0:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec,cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.media_padrao = 0 and cpa1.media_padrao = 0 and cpa1.id_cda = {id_cda} union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and cda.id_cda = {id_cda} order by cda_descricao asc;''').all()
                if result != []:
                    return result
                else:
                    dados_pesquisa= []
                    return dados_pesquisa
            elif id_cda == 0:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec,cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.media_padrao = 0 and cpa1.media_padrao = 0  and modelo_veiculos.id_modelo = {veiculos} union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and mv.id_modelo  = {veiculos} order by cda_descricao asc;''').all()
                if result != []:
                    return result
                else:
                    dados_pesquisa= []
                    return dados_pesquisa
            else:
                result = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec,cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.media_padrao = 0 and cpa1.media_padrao = 0 and cpa1.id_cda = {id_cda} and modelo_veiculos.id_modelo = {veiculos} union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and cda.id_cda = {id_cda} and mv.id_modelo = {veiculos} order by cda_descricao asc;''').all()
                if result != []:
                    return result
                else:
                    result=[]
                    return result
    else:
        return jsonify({'status': 'erro'}),403