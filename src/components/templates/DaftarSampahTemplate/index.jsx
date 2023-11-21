"use client";

import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import EditForm from "./EditForm";
import {
  Button,
  Input,
  Option,
  Select,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const TABLE_HEAD = ["Name", "Price", "Waste Type", "Unit", ""];

const DaftarSampahTemplate = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const session = useSession();
  const [openDelete, setOpenDelete] = React.useState("");

  const handleOpenDelete = (id) => {
    setOpenDelete(id);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: parseFloat(0),
      wasteType: "",
      unit: "",
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await axios.post("/api/waste", values).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      } finally {
        actions.resetForm();
      }
      actions.setSubmitting(false);
    },
  });

  const handleDelete = async (id) => {
    try {
      axios
        .delete(`/api/waste/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data.user.accessToken}`,
          },
        })
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavTop label={"Daftar Sampah"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Daftar Sampah di Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Daftar Sampah
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <Input label="Search ..." icon={".."} />
      </div>

      {/* Table */}
      <Card className="mt-10 h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0)
              .reverse()
              .map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.wasteType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {item.unit == null ? "-" : item.unit}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="filled"
                        onClick={() => handleOpenDelete(item.wasteID)}
                        color="red"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="filled"
                        className="ms-3"
                        onClick={() => handleOpenDelete("edit_" + item.wasteID)}
                        color="blue"
                      >
                        Edit
                      </Button>
                      <Dialog
                        open={openDelete === item.wasteID}
                        handler={() => handleOpenDelete(item.wasteID)}
                      >
                        <DialogHeader>
                          Yakin ingin menghapus {item.name}
                        </DialogHeader>
                        <DialogBody>
                          <p>Setelah di hapus, data tidak dapat dikembalikan</p>
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={() => {
                              handleOpenDelete("");
                            }}
                            className="mr-1"
                          >
                            <span>Cancel</span>
                          </Button>
                          <Button
                            variant="gradient"
                            onClick={() => handleDelete(item.wasteID)}
                            color="green"
                          >
                            <span>Confirm</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                      <Dialog
                        size="xl"
                        open={openDelete === "edit_" + item.wasteID}
                        handler={() => handleOpenDelete("edit_" + item.wasteID)}
                      >
                        <DialogHeader>
                          Yakin ingin menghapus {item.name}
                        </DialogHeader>
                        <DialogBody>
                          <EditForm
                            token={session.data?.user?.accessToken}
                            data={item}
                          />
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={() => {
                              handleOpenDelete("");
                            }}
                            className="mr-1"
                          >
                            <span>Cancel</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
      {/* End of Table */}

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="m-3 flex flex-col gap-3 p-8 text-black">
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2"
          >
            <Input
              type="text"
              label="Nama Sampah"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Input
              type="number"
              label="Harga"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              label="Jumlah Unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
            />
            {/* <Select
              name="wasteType"
              label="Tipe sampah"
              value={formik.values.wasteType}
              onChange={formik.handleChange}
            >
              <Option value="ORGANIC">ORGANIC</Option>
              <Option value="INORGANIC">INORGANIC</Option>
            </Select> */}
            <select name="wasteType" onChange={formik.handleChange} id="select">
              <option value="ORGANIC">ORGANIC</option>
              <option value="INORGANIC">INORGANIC</option>
            </select>
            <div className="w-full max-w-sm md:col-span-2">
              <Button type="submit" color="green" fullWidth={true}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DaftarSampahTemplate;
