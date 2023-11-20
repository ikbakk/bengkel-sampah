"use client";
import Table from "@/components/atoms/Table";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { MemberContext } from "@/context/MemberContext";
import Image from "next/image";

const BankDetails = ({ data }) => {
  const {
    isLoaded,
    memberQuery,
    deleteMember,
    isSelectedAll,
    selectedMemberItems,
    selectMemberItem,
    selectAllMemberItems,
  } = useContext(MemberContext);

  const [searchTerm, setSearchTerm] = useState("");

  let members = memberQuery.data;

  if (!members) {
    return <p>Loading...</p>;
  }

  const isSelected = (bankID) => selectedMemberItems.includes(bankID);

  const filteredMembers = memberQuery.data?.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <section className="text-bs-font_primary">
        <div className="relative h-[200px] rounded-lg bg-bs-primary lg:h-[150px]">
          <Image
            src={"/assets/images/doodleBackground.svg"}
            width={100}
            height={50}
            className="absolute h-full w-full object-cover  object-center"
            alt="bg-header"
          />
          <div className="absolute inset-0 mx-auto h-full w-[70%] lg:mt-10">
            <div className="m-2 flex flex-col gap-5 rounded-lg bg-white p-5 shadow-lg lg:m-10 lg:flex-col">
              <p className="text-xl font-bold">{data.name}</p>
              <p className="text-base">{data.address}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-24 flex w-full flex-row justify-between">
        <div className="lg:w-64">
          <Input
            label="Search ..."
            icon={<FaSearch />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <Table.Head>
          <div className="flex items-center gap-2">
            <Checkbox
              disabled={filteredMembers?.length === 0 || !isLoaded}
              checked={isSelectedAll}
              onChange={() => {
                selectAllMemberItems(!isSelectedAll);
              }}
            />
            <p className="font-bold">Member ID</p>
            {filteredMembers.length > 0 && isSelectedAll && (
              <Button
                onClick={() => {
                  deleteMember();
                }}
                color="red"
                size="sm"
              >
                Delete All
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>Nama</Table.Head>
        <Table.Head>Nomor HP</Table.Head>
        {filteredMembers &&
          filteredMembers.map((data, index) => {
            let isChecked = isSelected(data.memberID);
            return (
              <Table.Body key={index}>
                <Table.Data>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      disabled={!isLoaded}
                      checked={isSelectedAll || isChecked}
                      onChange={() => {
                        selectMemberItem(data.memberID);
                      }}
                    />
                    <p className="font-sm">{data.memberID}</p>
                    {isChecked && !isSelectedAll && (
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => {
                          deleteMember(data.memberID);
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
                  <p>{data.phoneNumber}</p>
                </Table.Data>
              </Table.Body>
            );
          })}
      </Table>
    </>
  );
};

export default BankDetails;
