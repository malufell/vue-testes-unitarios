/* eslint-disable no-undef */
import Avaliador from "@/views/Avaliador"
import { mount, RouterLinkStub } from "@vue/test-utils"
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

/*
O router-link é uma dependência desse componente, para simular ela é utilizado o 'RouterLinkStub'
O componente chama getLeiloes, por isso ele é resolvido com o mock
*/
jest.mock('@/http')
const leiloes = [{
  produto: "título do produto",
  lanceInicial: 50,
  descricao: "descrição do produto"
}, {
  produto: "título segundo produto",
  lanceInicial: 55,
  descricao: "descrição segundo produto"
}]

describe('Avalidor se conecta com a API', () => {
  test('mostra os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('não há leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})