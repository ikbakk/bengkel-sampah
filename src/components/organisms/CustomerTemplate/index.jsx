"use client";

import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditForm from "./EditForm";

const TABLE_HEAD = ["Name", "Role", "Phone Number", "Address", ""];

const CustomerTemplate = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const session = useSession();
  console.log();
  const [openDelete, setOpenDelete] = React.useState("");

  const handleOpenDelete = (id) => {
    setOpenDelete(id);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      password: "",
      address: "",
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await axios.post("/api/auth/register", values).then(() => {
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
        .delete(`/api/customer/${id}`, {
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
      <NavTop label={"Kustomer"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Kustomer Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Kustomer
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
                        {item.role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.phoneNumber}
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
                        {item.address == null ? "-" : item.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="filled"
                        onClick={() => handleOpenDelete(item.customerID)}
                        color="red"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="filled"
                        className="ms-3"
                        onClick={() =>
                          handleOpenDelete("edit_" + item.customerID)
                        }
                        color="blue"
                      >
                        Edit
                      </Button>
                      <Dialog
                        open={openDelete === item.customerID}
                        handler={() => handleOpenDelete(item.customerID)}
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
                            onClick={() => handleDelete(item.customerID)}
                            color="green"
                          >
                            <span>Confirm</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                      <Dialog
                        size="xl"
                        open={openDelete === "edit_" + item.customerID}
                        handler={() =>
                          handleOpenDelete("edit_" + item.customerID)
                        }
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
        <div className="m-3 flex flex-col gap-3 text-black">
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-3"
          >
            <Input
              type="text"
              label="Nama Customer"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              label="Nomor Telepon"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="w-full md:col-span-3">
              <Textarea
                label="Alamat Customer"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className="w-full max-w-sm md:col-span-3">
              <Button type="submit" color="green" fullWidth={true}>
                {formik.isSubmitting ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default CustomerTemplate;
