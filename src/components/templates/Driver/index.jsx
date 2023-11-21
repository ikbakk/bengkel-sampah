"use client";

import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Table from "@/components/atoms/Table";
import axios from "axios";

const DashboardDriver = ({ token, data }) => {
  const [driverData, setDriverData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1

  useEffect(() => {
    setDriverData(data);
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [inputValue, setInputValue] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    driverStatus: "ACTIVE",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingUserID, setDeletingUserID] = useState(null);

  const handleSearch = () => {
    event.preventDefault();
    // Filter data based on the search query
    const filteredDriverData = data.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.phoneNumber.includes(searchQuery),
    );

    setDriverData(filteredDriverData);
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setIsEditing(true);
    setInputValue({
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      email: driver.email,
      // password: driver.password, // Further update if Admin can Edit Password
      address: driver.address,
      driverStatus: driver.driverStatus,
    });
    handleOpen(); // Open the modal
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { name, phoneNumber, email, password, address } =
      event.target.elements;

    const formData = {
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      password: password.value,
      address: address.value,
      role: "DRIVER",
      driverStatus: inputValue.driverStatus,
    };

    try {
      if (isEditing) {
        // If editing, send a PUT request
        await axios.put(`/api/driver/${editingDriver.userID}`, formData, {
          headers: {
            Authorization: token,
          },
        });
        // Update the driver data in the state
        const updatedDriverData = driverData.map((driver) =>
          driver.userID === editingDriver.userID
            ? { ...driver, ...formData }
            : driver,
        );
        setDriverData(updatedDriverData);
      } else {
        // If not editing, send a POST request
        const response = await axios.post("/api/driver", formData, {
          headers: {
            Authorization: token,
          },
        });
        setDriverData([...driverData, response.data]);
      }

      // Clear the input values
      setInputValue({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: "",
        driverStatus: "ACTIVE",
      });

      // Close the modal
      setIsEditing(false);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = (userID) => {
    // Open the confirmation modal
    setDeletingUserID(userID);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/driver/${deletingUserID}`, {
        headers: {
          Authorization: token,
        },
      });

      const updatedDriverData = driverData.filter(
        (driver) => driver.userID !== deletingUserID,
      );
      setDriverData(updatedDriverData);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting driver:", error);
    } finally {
      // Close the confirmation modal
      setDeleteModalOpen(false);
      setDeletingUserID(null);
    }
  };

  return (
    <div>
      <NavTop label={"Driver"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Driver Bengkel Sampah
        </h2>
        <Button
          onClick={() => {
            setIsEditing(false);
            setInputValue({});
            handleOpen();
          }}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Driver
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <form onSubmit={handleSearch}>
          <Input
            label="Search ..."
            icon={
              <button type="submit">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <Table>
        <Table.Head>No.</Table.Head>
        <Table.Head>Nama Driver</Table.Head>
        <Table.Head>No. Telepon</Table.Head>
        <Table.Head>Alamat</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Actions</Table.Head>

        {driverData &&
          driverData.map((driver, index) => (
            <Table.Body key={driver.driverID}>
              <Table.Data>
                <p className="w-max">{index + 1}</p>
              </Table.Data>
              <Table.Data>
                <p className="font-medium">{driver.name}</p>
                <p className="text-xs">{driver.email}</p>
              </Table.Data>
              <Table.Data>
                <p>{driver.phoneNumber}</p>
              </Table.Data>
              <Table.Data>
                <p>{driver.address}</p>
              </Table.Data>
              <Table.Data>
                <span
                  className={`rounded-lg border px-4 py-1 text-xs font-semibold leading-tight ${
                    driver.driverStatus === "ACTIVE"
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {driver.driverStatus}
                </span>
              </Table.Data>
              <Table.Data>
                <Button
                  size="sm"
                  color="orange"
                  variant="outlined"
                  className="mb-2 hover:bg-bs-primary hover:text-white lg:mr-4 xl:mb-0"
                  onClick={() => handleEdit(driver)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="red"
                  variant="outlined"
                  onClick={() => handleDelete(driver.userID)}
                  className="hover:bg-red-500 hover:text-white"
                >
                  Delete
                </Button>
              </Table.Data>
            </Table.Body>
          ))}
      </Table>

      {/* Modals For Add Driver */}
      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="flex flex-col gap-3 m-3 text-black">
          <form
            className="grid gap-4 lg:grid-cols-2"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              label="Nama Driver"
              name="name"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
            <Input
              type="number"
              label="Nomor Telepon"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChange={(e) =>
                setInputValue({ ...inputValue, phoneNumber: e.target.value })
              }
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
            />
            <div className="lg:col-span-2">
              <Textarea
                label="Alamat Driver"
                name="address"
                value={inputValue.address}
                onChange={(e) =>
                  setInputValue({ ...inputValue, address: e.target.value })
                }
              />
            </div>
            <div className="lg:col-span-2">
              <Select
                name="driverStatus"
                value={inputValue.driverStatus}
                onChange={(value) =>
                  setInputValue((prev) => ({ ...prev, driverStatus: value }))
                }
                label="Driver Status"
              >
                <Option value="ACTIVE" className="text-green-500">
                  🟢 ACTIVE
                </Option>
                <Option value="INACTIVE" className="text-red-500">
                  🔴 INACTIVE
                </Option>
              </Select>
            </div>
            <div className="w-full max-w-sm mx-auto lg:col-span-2 lg:max-w-md">
              <Button type="submit" color="green" fullWidth={true}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
      <ModalComponent
        handlerOpen={() => setDeleteModalOpen(false)}
        open={isDeleteModalOpen}
      >
        <div className="flex flex-col items-center justify-center gap-3 m-3 text-black">
          <p className="text-lg font-bold">Confirm Delete</p>
          <p>Are you sure you want to delete this driver?</p>
          <div className="flex gap-4">
            <Button color="red" onClick={confirmDelete}>
              Yes
            </Button>
            <Button color="orange" onClick={() => setDeleteModalOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DashboardDriver;
