import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

const EditForm = ({ data, token }) => {
  const formik = useFormik({
    initialValues: {
      price: parseFloat(data.price),
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await axios
          .put(`/api/waste/${data.wasteID}/price`, values, {
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
      className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2"
    >
      <Input
        type="number"
        label="Harga"
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
      />
      <div className="w-full max-w-sm md:col-span-2">
        <Button type="submit" color="green" fullWidth={true}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
