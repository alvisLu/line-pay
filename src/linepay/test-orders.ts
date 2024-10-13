/*
 * 模擬詢訂單
 */
const orders = [
  {
    id: 'e423b64d-45cb-4826-bf57-b7e7b2eab28a',
    amount: 100,
    products: [
      {
        id: 'PEN-B-001',
        name: 'Pen Brown',
        quantity: 1,
        price: 100,
      },
    ],
  },
  {
    id: 'f5a7c3b2-9d81-4e6f-8c2a-1b3d5e7a9f0e',
    amount: 250,
    products: [
      {
        id: 'NB-R-002',
        name: 'Notebook Red',
        quantity: 2,
        price: 125,
      },
    ],
  },
  {
    id: 'a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    amount: 300,
    products: [
      {
        id: 'PEN-G-003',
        name: 'Pen Green',
        quantity: 1,
        price: 150,
      },
      {
        id: 'ERASER-W-001',
        name: 'White Eraser',
        quantity: 3,
        price: 50,
      },
    ],
  },
];
export default orders;
