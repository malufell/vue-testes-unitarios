/* eslint-disable no-undef */
import NovoLeilao from "@/views/NovoLeilao"
import { mount } from "@vue/test-utils"
import { createLeilao } from '@/http'

/*
- o método 'createLeilao' faz um redirecionamento do usuário para outra rota após a criação de um novo lance
essa parte do router precisa ser mockada no teste, pq o router é uma dependencia externa e não deve ser considerada em teste unitário
- o .find() vai procurar pela classe e o setValue() vai definir os valores que serão passados para NovoLeilao
- depois de execubtar o submit, estou testando se o método createLeilao foi chamado
*/

jest.mock('@/http')
const $router = { push: jest.fn() }

describe('Um novo leilão deve ser criado', () => {
  test('cria novo leilão após submit do formulário', () => {
    createLeilao.mockResolvedValueOnce() //mock do resultado

    const wrapper = mount(NovoLeilao,
      {
        mocks: {
          $router
        }
      })


    wrapper.find('.produto').setValue("título do produto")
    wrapper.find('.descricao').setValue("descrição do produto")
    wrapper.find('.valor').setValue(10)
    wrapper.find('form').trigger('submit')


    expect(createLeilao).toHaveBeenCalled()
  })
})