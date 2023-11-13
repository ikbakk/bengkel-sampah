"use client";
import { Select, Option } from "@material-tailwind/react";
const HistoryStatus = () => {
  return (
    <Select
      variant="outlined"
      label="Pilih status"
    >
      <Option value="all">Semua</Option>
      <Option value="READY">Menunggu Konfirmasi</Option>
      <Option value="PROCESSING">Diproses</Option>
      <Option value="COMPLETED">Selesai</Option>
      <Option value="CANCELED">Dibatalkan</Option>
    </Select>
  );
};

export default HistoryStatus;
