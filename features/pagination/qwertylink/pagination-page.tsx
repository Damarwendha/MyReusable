const payments: IPayment[] = [
  {
    payment_id: 14,
    username: "GraceMiller",
    status: "cancelled",
    method: "PayPal",
    amount: 78.9012,
    date: "2024-01-06 19:35:25",
  },
]

function ProofPayment({ searchParams }: ProofPaymentProps) {
  const page = searchParams.page ?? "1";

  const DATA_EACH_PAGE = 10;

  // i want to show the latest data first... thats why this variable exits
  const latestId = payments.reduce((acc, { payment_id }) => {
    return payment_id > acc ? payment_id : acc;
  }, 0);

  // ex. endId = 20
  const endId = latestId - (+page - 1) * DATA_EACH_PAGE;

  // ex. startId = 10
  const startId = endId - DATA_EACH_PAGE;

  // entries show data from startId to endId
  const entries = payments
    .filter(({ payment_id }) => payment_id > startId && payment_id <= endId)
    .sort(({ payment_id: a }, { payment_id: b }) => b - a);

  const total_pages = latestId / DATA_EACH_PAGE;

  return (
    <>
      <TableUI payments={entries} />
      <PaginationControl searchParams={searchParams} totalPages={total_pages} />
