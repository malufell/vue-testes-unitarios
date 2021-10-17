/* eslint-disable no-undef */
import Leilao from "@/components/Leilao"
import { mount } from "@vue/test-utils"

/*
testando se o componente é montado com as informações corretas:
*/
const leilao = {
  produto: "título do produto",
  lanceInicial: 50,
  descricao: "descrição do produto"
}

describe('leilão exibe dados do produto', () => {
  test('exibe os dados corretos do produto no card', async () => {
    const wrapper = mount(Leilao, {
      propsData: { leilao }
    })

    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const description = wrapper.find('.card-text').element

    expect(header.textContent).toContain(leilao.produto)
    expect(title.textContent).toContain(leilao.lanceInicial)
    expect(description.textContent).toContain(leilao.descricao)
  })
})