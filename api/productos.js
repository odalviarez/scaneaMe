const products = [
  {
    id: 1,
    name: "RemeraQR moderna negra",
    type: "shirt",
    color: "red",
    stock: [
      { size: "xs", quantity: 10 },
      { size: "s", quantity: 5 },
      { size: "m", quantity: 3 },
      { size: "l", quantity: 12 },
      { size: "xl", quantity: 0 },
      { size: "xxl", quantity: 18 },
    ],
    price: 100,
    image:
      "https://res.cloudinary.com/dxfksb8ua/image/upload/v1666969305/cld-sample-5.jpg",
  },
  {
    id: 2,
    name: "RemeraQR fachera",
    type: "shirt",
    color: "black",
    stock: [
      { size: "xs", quantity: 0 },
      { size: "s", quantity: 3 },
      { size: "m", quantity: 2 },
      { size: "l", quantity: 4 },
      { size: "xl", quantity: 20 },
      { size: "xxl", quantity: 8 },
    ],
    price: 250,
    image:
      "https://res.cloudinary.com/dxfksb8ua/image/upload/v1667588997/pkttnzunfr96itkoiknl.jpg",
  },
  {
    id: 3,
    name: "Pantalon turro",
    color: "blue",
    type: "pants",
    stock: [
      { size: "xs", quantity: 0 },
      { size: "s", quantity: 0 },
      { size: "m", quantity: 0 },
      { size: "l", quantity: 4 },
      { size: "xl", quantity: 2 },
      { size: "xxl", quantity: 8 },
    ],
    price: 10,
    image:
      "https://res.cloudinary.com/dxfksb8ua/image/upload/v1667589327/lrpdpjqmm4xphba56rps.jpg",
  },
  {
    id: 4,
    name: "RemeraQR moderna",
    color: "white",
    type: "shirt",
    stock: [
      { size: "xs", quantity: 10 },
      { size: "s", quantity: 5 },
      { size: "m", quantity: 3 },
      { size: "l", quantity: 12 },
      { size: "xl", quantity: 0 },
      { size: "xxl", quantity: 18 },
    ],
    price: 100,
    image:
      "https://res.cloudinary.com/dxfksb8ua/image/upload/v1666969305/cld-sample-5.jpg",
  },
];

module.exports = products;
