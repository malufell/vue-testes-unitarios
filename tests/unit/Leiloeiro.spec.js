/* eslint-disable no-undef */
import Leiloeiro from "@/views/Leiloeiro"
import { mount } from "@vue/test-utils"
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

/*
esse componente Leiloeiro faz chamada com o axios pra buscar dados na API
no teste unitário vamos usar mock pra simular essa chamada
-mockResolvedValueOnce() simula a chamada do getLeilao e getLances
-flushPromises() é utilizado para aguardar até que todas as promises tenham sido resolvidas, ele é necessário porque 'getLeilao' e 'getLances' são assíncronos!
*/

jest.mock('@/http')

const leilao = {
  produto: "título do produto",
  lanceInicial: 50,
  descricao: "descrição do produto"
}

const lances = [
  {
    id: 1,
    valor: 500,
    data: '2021-10-06',
    leilao_id: 1
  }, {
    id: 2,
    valor: 100,
    data: '2021-10-06',
    leilao_id: 2
  }, {
    id: 3,
    valor: 250,
    data: '2021-10-06',
    leilao_id: 3
  }, {
    id: 4,
    valor: 200,
    data: '2021-10-06',
    leilao_id: 4
  },
]

describe('Leiloeiro inicia um leilão que ainda não possui lances', () => {
  test('exibe alerta quando não existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao) //mock do resultado
    getLances.mockResolvedValueOnce([]) //array vazio de lances

    const wrapper = mount(Leiloeiro, {
      propsData: { id: 1 }
    })

    await flushPromises()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Leiloeiro exibe os valores existentes', () => {
  test('possui uma lista de lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: { id: 1 }
    })

    await flushPromises()
    const listaLances = wrapper.find('.list-inline')
    expect(listaLances.exists()).toBe(true)
  })

  test('não exibe alerta de "sem lances"', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: { id: 1 }
    })

    await flushPromises()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(false)
  })
})


describe('Leiloeiro exibe os valores do menor e maior lances', () => {
  test('exibe maior lance do leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: { id: 1 }
    })

    await flushPromises()
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain('Maior lance: R$ 500')
  })

  test('exibe menor lance do leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: { id: 1 }
    })

    await flushPromises()
    const maiorLance = wrapper.find('.menor-lance')
    expect(maiorLance.element.textContent).toContain('Menor lance: R$ 100')

  })
})