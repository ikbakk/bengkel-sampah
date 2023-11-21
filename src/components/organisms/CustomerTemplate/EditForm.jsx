import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

const EditForm = ({ data, token }) => {
  const formik = useFormik({
    initialValues: {
      name: data.name,
      price: data.price,
      wasteType: data.wasteType,
      unit: data.unit,
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await axios
          .put(`/api/customer/${data.wasteID}`, values, {
            "Content Type": "application/json",
            headers: {
              Authorization: `${token}`,
            },
          })
          .then(() => {
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
  return (
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
  );
};

export default EditForm;
