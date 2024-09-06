// list:
// - formatCheckboxData
// - formatRupiah
// - numberWithCommas
// - upperCaseFirstLett
// - censorInformation

/**
 *
 * @param data e.g.: {value-nunu@gmail*com: true, value-08486674867: false}
 * @returns e.g. ["nunu@gmail.com", "08486674867"]
 * @implements  e.g. when register the field register(`pengirim[value-${p.pengirim.replace(/\./g, "*")}]`)
 */
export function formatCheckboxData(data: any) {
  return Object.entries(data)
    .filter(([key, value]) => value)
    .map(([key]) => {
      const extractedValue = key.replace("value-", "").replace("*", ".");
      return extractedValue;
    });
}


export function censorInformation(str: string) {
  // Extract the first two digits and the last four digits
  const firstTwoDigits = str.slice(0, 2);
  const lastFourDigits = str.slice(-4);

  // Replace characters between the first two and last four digits with asterisks
  const censoredText = `${firstTwoDigits}**${"*".repeat(
    str.length - 6
  )}${lastFourDigits}`;

  return censoredText;
}

export function upperCaseFirstLett(str: string) {
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str;
}

export function formatRupiah(angka: string | number, prefix: string): string {
  const number_string = angka.toString().replace(/[^,\d]/g, "");
  const split = number_string.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substring(0, sisa);
  const ribuan = split[0].substring(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
