class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };
    }

    padronizacaoString(code) {
        return code
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const ItensNoCarrinho = [];

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            const padronizacaoString = this.padronizacaoString(codigo);
            const item = this.cardapio[padronizacaoString];
            if (!item) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if ((formaDePagamento === 'debito' || formaDePagamento === 'dinheiro' || formaDePagamento === 'credito') &&
                padronizacaoString === 'chantily') {
                const itemPrincipal = ItensNoCarrinho.find(item => item === 'cafe');
                if(!itemPrincipal){
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

            if ((formaDePagamento === 'debito' || formaDePagamento === 'dinheiro' || formaDePagamento === 'credito') &&
                padronizacaoString === 'queijo') {
                const itemPrincipal = ItensNoCarrinho.find(item => item === 'sanduiche');
                if (!itemPrincipal) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }

            total += item.valor * parseInt(quantidade, 10);
            ItensNoCarrinho.push(padronizacaoString);
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
