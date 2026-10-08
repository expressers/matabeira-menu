// Conteúdo transcrito dos menus impressos do Resort Matabeira.
// Preços em Kwanza (Kz). Para actualizar o menu basta editar este ficheiro.

export type MenuItem = {
  name: string
  price: number
  /** ex.: "2 pessoas" */
  serves?: string
}

export type MenuGroup = {
  id: string
  title: string
  items: MenuItem[]
}

export type MenuCategory = {
  id: string
  title: string
  short: string
  subtitle?: string
  section: "restaurante" | "bar"
  /** "dark" = madeira e dourado, "paper" = cartão claro (bebidas) */
  tone: "dark" | "paper"
  groups: MenuGroup[]
}

export const RESORT = {
  name: "Matabeira",
  full: "Resort Matabeira",
  tagline: "O seu refúgio no Mussulo",
  location: "Mussulo – Angola",
  phones: ["927 648 082", "942 236 127"],
  whatsapp: "244927648082",
}

export const MENU: MenuCategory[] = [
  {
    id: "entradas",
    title: "Entradas",
    short: "Entradas",
    section: "restaurante",
    tone: "dark",
    groups: [
      {
        id: "entradas",
        title: "Entradas",
        items: [
          { name: "Couvert", price: 5000 },
          { name: "Gambas ao Alho", price: 15000 },
          { name: "Pica-Pau", price: 10000 },
          { name: "Choco Frito", price: 12000 },
          { name: "Chouriço do Lubango", price: 10000 },
          { name: "Frango à Passarinho", price: 10000 },
          { name: "Hambúrguer", price: 8000 },
          { name: "Torresmo", price: 5000 },
          { name: "Ginguba", price: 4000 },
          { name: "Gamba Gratinada", price: 25000 },
          { name: "Croquete", price: 5000 },
        ],
      },
    ],
  },
  {
    id: "sopas-massas-pizza",
    title: "Sopas · Massas · Pizza",
    short: "Sopas & Massas",
    section: "restaurante",
    tone: "dark",
    groups: [
      {
        id: "sopas",
        title: "Sopas",
        items: [
          { name: "Sopa de Legumes com Batata", price: 4000 },
          { name: "Sopa de Feijão", price: 4000 },
          { name: "Caldo de Peixe", price: 6000 },
          { name: "Caldo Verde", price: 10000 },
        ],
      },
      {
        id: "massas",
        title: "Massas",
        items: [
          { name: "Massa à Bolonhesa", price: 13000 },
          { name: "Massa com Gamba", price: 18000 },
          { name: "Carbonara", price: 16000 },
          { name: "Massa Vegetariana", price: 10000 },
        ],
      },
      {
        id: "pizza",
        title: "Pizza",
        items: [
          { name: "Pizza de Carne", price: 12000 },
          { name: "Pizza de Frango", price: 12000 },
          { name: "Pizza de Bacon", price: 12000 },
          { name: "Pizza de Queijo", price: 12000 },
          { name: "Pizza 4 Estações", price: 15000 },
        ],
      },
    ],
  },
  {
    id: "fajitas-peixes",
    title: "Fajitas · Peixes",
    short: "Fajitas & Peixe",
    subtitle: "Produtos frescos · Serviço de qualidade",
    section: "restaurante",
    tone: "dark",
    groups: [
      {
        id: "fajitas",
        title: "Fajitas",
        items: [
          { name: "Fajita de Carne", price: 8000 },
          { name: "Fajita de Frango", price: 7000 },
          { name: "Fajita Mista", price: 10000 },
        ],
      },
      {
        id: "peixe",
        title: "Peixe & Marisco",
        items: [
          { name: "Choco Grelhado", price: 15000 },
          { name: "Peixe Grelhado do Dia", price: 15000 },
          { name: "Caril de Gambas", price: 16000 },
          { name: "Grelhada Mista do Mar", price: 35000, serves: "2 pessoas" },
          { name: "Lagosta Grelhada", price: 30000 },
          { name: "Arroz de Marisco", price: 35000, serves: "2 pessoas" },
        ],
      },
    ],
  },
  {
    id: "carnes",
    title: "Carnes",
    short: "Carnes",
    section: "restaurante",
    tone: "dark",
    groups: [
      {
        id: "carnes",
        title: "Carnes",
        items: [
          { name: "Picanha", price: 20000 },
          { name: "Grelhada Mista", price: 35000, serves: "2 pessoas" },
          { name: "Churrasco", price: 15000 },
          { name: "Bitoque", price: 15000 },
          { name: "Grelhada Mista Terra e Mar", price: 50000, serves: "4 pessoas" },
          { name: "Porco Assado", price: 15000 },
          { name: "Funge com Molho de Tomate e Carne", price: 12000 },
        ],
      },
      {
        id: "acompanhamentos",
        title: "Acompanhamentos",
        items: [
          { name: "Salada Mista", price: 3500 },
          { name: "Arroz Basmati", price: 2500 },
          { name: "Feijão de Manteiga", price: 3000 },
          { name: "Funge", price: 2500 },
          { name: "Feijão Preto", price: 3000 },
          { name: "Batata Frita", price: 2600 },
          { name: "Batata Doce", price: 2500 },
          { name: "Arroz de Feijão Preto", price: 3500 },
          { name: "Banana Frita", price: 2500 },
          { name: "Banana Frita Madeira", price: 2500 },
          { name: "Molho de Tomate", price: 2000 },
          { name: "Pamonha (Tamales)", price: 4000 },
        ],
      },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    short: "Sobremesas",
    section: "restaurante",
    tone: "dark",
    groups: [
      {
        id: "sobremesas",
        title: "Sobremesas",
        items: [
          { name: "Frutas Frescas do Dia Laminadas", price: 3000 },
          { name: "Pudim (fatia)", price: 3000 },
          { name: "Mousse de Maracujá", price: 3000 },
          { name: "Salada de Fruta", price: 4000 },
        ],
      },
    ],
  },
  {
    id: "cocktails",
    title: "Bebidas & Cocktails",
    short: "Cocktails",
    subtitle: "Bar Tropical · Sabores do Mussulo · Refrescar & Celebrar",
    section: "bar",
    tone: "paper",
    groups: [
      {
        id: "cocktails",
        title: "Cocktails",
        items: [
          { name: "Caipirinha / Caipiroska", price: 7000 },
          { name: "Daiquiri", price: 7500 },
          { name: "Piña Colada", price: 7500 },
          { name: "Mojito", price: 8500 },
          { name: "Margarita", price: 8000 },
          { name: "Mimosa", price: 8000 },
          { name: "Gin", price: 8000 },
          { name: "Tequila", price: 5000 },
          { name: "Vodka", price: 3000 },
        ],
      },
      {
        id: "whisky",
        title: "Whisky",
        items: [
          { name: "Jameson", price: 5000 },
          { name: "Johnnie Walker", price: 5000 },
          { name: "Jack Daniel's", price: 7000 },
          { name: "Cognac / Brandy", price: 5000 },
          { name: "Antiqua", price: 6000 },
        ],
      },
      {
        id: "sangrias",
        title: "Sangrias",
        items: [
          { name: "Sangria de Vinho Tinto", price: 20000 },
          { name: "Sangria de Vinho Branco", price: 20000 },
          { name: "Sangria de Espumante", price: 35000 },
        ],
      },
      {
        id: "espumante",
        title: "Espumante",
        items: [
          { name: "Moscato", price: 25000 },
          { name: "Mateus Rosé", price: 28000 },
          { name: "Graham Beck", price: 35000 },
        ],
      },
      {
        id: "licor",
        title: "Licores",
        items: [
          { name: "Amarula", price: 6000 },
          { name: "Licor Beirão", price: 7000 },
          { name: "Martini", price: 5500 },
          { name: "Tia Maria", price: 15000 },
          { name: "Vinho do Porto", price: 7000 },
        ],
      },
    ],
  },
  {
    id: "frescos",
    title: "Frescos & Cervejas",
    short: "Frescos & Cervejas",
    subtitle: "Águas · Sumos Naturais · Refrigerantes · Cervejas Geladas",
    section: "bar",
    tone: "paper",
    groups: [
      {
        id: "aguas",
        title: "Águas",
        items: [
          { name: "Água Mineral sem Gás 0,5 L", price: 1500 },
          { name: "Água Mineral sem Gás 1,5 L", price: 3000 },
        ],
      },
      {
        id: "sumos",
        title: "Sumos & Refrigerantes",
        items: [
          { name: "Sumo Natural de Frutas", price: 5000 },
          { name: "Batido de Frutas", price: 5000 },
          { name: "Água Tónica", price: 2000 },
          { name: "Sumol de Laranja", price: 2000 },
          { name: "Sumol de Ananás", price: 2000 },
          { name: "Compal em Lata", price: 2200 },
          { name: "Coca-Cola", price: 2000 },
          { name: "Coca-Cola Zero", price: 2000 },
        ],
      },
      {
        id: "cervejas",
        title: "Cervejas",
        items: [
          { name: "Cuca", price: 2000 },
          { name: "Nocal", price: 2000 },
          { name: "Eka", price: 2000 },
          { name: "Fino", price: 2000 },
        ],
      },
    ],
  },
]

export const formatKz = (value: number) =>
  `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kz`

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
