/* eslint-disable no-undef */
import Lance from "@/components/Lance"
import { mount } from "@vue/test-utils"

/*
- o teste verifica o comportamento do componente, simulando o que acontece com ele
- const wrapper vai representar o componente montado
- const input vai verificar se há um elemento 'input' no componente (pois é onde o usuário digita o valor que será testado)
- wrapper.trigger simula o envio do formulário
- const lancesEmitidos vai monitorar o disparo do evento 'novo-lance'
- se valor negativo, nenhum evento pode ser emitido (toBeUndefined)
- se valor positivo, o evento deve ter sido emitido uma única vez (toHaveLength(1))
*/

describe('lance sem valor mínimo', () => {
  test('verifica se o componente foi montado', () => {
    const wrapper = mount(Lance);
    expect(wrapper).toBeTruthy()
  })

  test('não aceita lance com valor negativo', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input')
    input.setValue(-100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('aceita lance com valor positivo', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  /*
  - o resultado de 'wrapper.emitted('novo-lance')' é [[100]], por isso pra pegar o valor usa [0][0]
  na dúvida é só incluir console.log pra ver o que ta saindo!
  */

  test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    console.log(lancesEmitidos)
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})

/*
o componente Lance recebe a props "lanceMinimo", então aqui no teste posso passar ela usando 'propsData'
*/

describe('lance com valor mínimo definido', () => {
  test('aceita lances com valor maior do que o mínimo', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })

    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })


  /*
  a renderização dos componentes é assíncrona no vue
  então para testar se aparece o elemento com a mensagem de erro depois do submit, preciso deixar o código assíncrono
  caso contrário não vai dar tempo dele aparecer e o teste não vai passar
  - 'await wrapper.vm.$nextTick()' vai esperar que o DOM seja atualizado com a mensagem de erro, assim é possível testar!
  */
  test('lança msg de erro quando recebe valor menor do que o mínimo', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })

    const input = wrapper.find('input')
    input.setValue(250)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
    expect(msgErro).toContain(msgEsperada)
  })
})



