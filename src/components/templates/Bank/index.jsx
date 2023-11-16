"use client";
import Table from "@/components/atoms/Table";
import AddBankModal from "@/components/organisms/AddBankModal";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { BankContext } from "@/context/BankContext";
import Link from "next/link";

const Bank = () => {
  const {
    isLoaded,
    isSelectedAll,
    bankQuery,
    selectedBankItems,
    deleteBank,
    deleteAllBankItems,
    selectBankItem,
    selectAllBankItems,
  } = useContext(BankContext);

  const bankData = bankQuery.data;

  if (!bankData)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-bs-primary">Loading...</h1>
      </div>
    );

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const isSelected = (bankID) => selectedBankItems.includes(bankID);

  const filteredBankData = bankQuery.data?.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Bank Bengkel Sampah
        </h2>
        <Button
          disabled={!isLoaded}
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Bank
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <Input
          label="Search ..."
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
              disabled={filteredBankData.length === 0 || !isLoaded}
              checked={isSelectedAll}
              onChange={() => {
                selectAllBankItems(!isSelectedAll);
              }}
            />
            <p className="font-bold">Bank ID</p>
            {filteredBankData.length > 0 && isSelectedAll && (
              <Button
                onClick={() => {
                  deleteAllBankItems();
                }}
                color="red"
                size="sm"
              >
                Delete All
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>Nama Bank</Table.Head>
        <Table.Head>
          <div className="mx-auto">
            Jumlah <br />
            Member
          </div>
        </Table.Head>
        <Table.Head>Alamat</Table.Head>
        <Table.Head></Table.Head>
        {filteredBankData &&
          filteredBankData.map((data, index) => {
            let isChecked = isSelected(data.wasteBankID);
            return (
              <Table.Body key={index}>
                <Table.Data>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      disabled={!isLoaded}
                      checked={isSelectedAll || isChecked}
                      onChange={() => {
                        selectBankItem(data.wasteBankID);
                      }}
                    />
                    <p className="font-sm">{data.wasteBankID}</p>
                    {isChecked &&
                      !isSelectedAll && ( // Only show delete button if checked
                        <Button
                          size="sm"
                          color="red"
                          onClick={() => {
                            deleteBank(data.wasteBankID);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                  </div>
                </Table.Data>
                <Table.Data>
                  <p>{data.name}</p>
                </Table.Data>
                <Table.Data>
                  <p className="text-center">{data.members}</p>
                </Table.Data>
                <Table.Data>
                  <p>{data.address}</p>
                </Table.Data>
                <Table.Data>
                  <Link href={`/admin/bank/${data.wasteBankID}`}>
                    <FaExternalLinkAlt />
                  </Link>
                </Table.Data>
              </Table.Body>
            );
          })}
      </Table>
      {/* End of Table */}

      <AddBankModal open={open} handleOpen={handleOpen}></AddBankModal>
    </>
  );
};

export default Bank;
