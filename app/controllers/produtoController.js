const produtoModel = require("../../app/models/produtoModel");

const getAll = async (req, res) => {
   const produto = await produtoModel.getAll();

   const data = produto.map((produto) => ({
      id: produto.id,
      commodity: produto.commodity,
      categoria: produto.categoria,
      categoria_planning: produto.categoria_planning,
      categoria_gpc: produto.categoria_gpc,
      product_group: produto.product_group,
      marca_gpc: produto.marca_gpc,
      cod_produto: produto.cod_produto,
      produto: produto.produto,
      peso_liquido_caixa: produto.peso_liquido_caixa,
      unidades_caixa: produto.unidades_caixa,
      peso_liquido_unitario: produto.peso_liquido_unitario,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const { id } = req.params;

   const produtos = await produtoModel.getOne(id);
   const { commodity, categoria, categoria_planning, categoria_gpc, product_group, marca_gpc, cod_produto, produto, peso_liquido_caixa, unidades_caixa, peso_liquido_unitario } = produtos;
   const data = { commodity, categoria, categoria_planning, categoria_gpc, product_group, marca_gpc, cod_produto, produto, peso_liquido_caixa, unidades_caixa, peso_liquido_unitario };
   return res.status(200).json(data);
};

const filterProduto = async (req, res) => {
   const { produto } = req.params;
   const produtos = await produtoModel.filterProduto(produto);

   if (produtos == undefined) {
      return res.status(404).json({ error: "Produtos não encontrados!" });
   } else {
      return res.status(200).json(produtos);
   }
};

module.exports = { getAll, getOne, filterProduto };
