function ProofPayment({ searchParams }: ProofPaymentProps) {
  const page = searchParams.page ?? "1";

  const data_per_page = 10;

  const latestId = payments.reduce((acc, { payment_id }) => {
    return payment_id > acc ? payment_id : acc;
  }, 0);

  const endId = latestId - (+page - 1) * data_per_page;

  const startId = endId - data_per_page;

  const entries = payments
    .filter(({ payment_id }) => payment_id > startId && payment_id <= endId)
    .sort(({ payment_id: a }, { payment_id: b }) => b - a);

  const total_pages = latestId / data_per_page;

  return (
    <>
      <TableUI payments={entries} />
      <PaginationControl searchParams={searchParams} totalPages={total_pages} />
