export default interface ICreateTransactionDTO {
  transaction_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: string;
  tid: string;
  installments: string;
  order_id: string;
}
