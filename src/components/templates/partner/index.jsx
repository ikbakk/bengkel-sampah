"use client";

import { useContext, useState } from "react";
import Table from "@/components/atoms/Table";
import { FaSearch } from "react-icons/fa";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { PartnerContext } from "@/context/PartnerContext";

const Partner = () => {
  const {
    isLoaded,
    partnerQuery,
    isSelectedAll,
    selectedPartnerItems,
    selectPartner,
    selectAllPartner,
    deletePartner,
    deleteAllPartner,
  } = useContext(PartnerContext);

  const [searchTerm, setSearchTerm] = useState("");

  const partnerData = partnerQuery?.data;

  if (!partnerData)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-bs-primary">Loading Data...</h1>
      </div>
    );

  const isSelected = (userID) => selectedPartnerItems.includes(userID);

  const filteredPartnerData = partnerData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Mitra Bengkel Sampah
        </h2>
      </div>
      <div className="mt-5 lg:w-64">
        <Input
          label="Cari mitra ..."
          icon={<FaSearch />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        <Table.Head>
          <div className="flex items-center gap-2">
            <Checkbox
              label={<p className="font-bold">Mitra ID</p>}
              disabled={!filteredPartnerData.length === 0 || !isLoaded}
              checked={isSelectedAll}
              onChange={() => {
                selectAllPartner(!isSelectedAll);
              }}
            />
            {filteredPartnerData.length > 0 && isSelectedAll && (
              <Button
                onClick={() => {
                  deleteAllPartner();
                }}
                color="red"
                size="sm"
              >
                Hapus Semua
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>Nama Mitra</Table.Head>
        <Table.Head>Nomor HP</Table.Head>
        <Table.Head>Alamat</Table.Head>
        {filteredPartnerData &&
          filteredPartnerData.map((data, index) => (
            <Table.Body key={index}>
              <Table.Data>
                <div className="flex items-center gap-2">
                  <Checkbox
                    disabled={!isLoaded}
                    label={<p className="font-normal">{index + 1}</p>}
                    checked={isSelectedAll || isSelected(data.userID)}
                    onChange={() => selectPartner(data.userID)}
                  />
                  {isSelected(data.userID) &&
                    !isSelectedAll && ( // Only show delete button if checked
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => deletePartner(data.userID)}
                      >
                        Hapus
                      </Button>
                    )}
                </div>
              </Table.Data>
              <Table.Data>{data.name}</Table.Data>
              <Table.Data>{data.phoneNumber}</Table.Data>
              <Table.Data>{data.address}</Table.Data>
            </Table.Body>
          ))}
      </Table>
      {/* End of Table */}
    </div>
  );
};

export default Partner;
