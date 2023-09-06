import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Select,
    Option,
  } from "@material-tailwind/react";
  
import React, { useState } from "react";

export function ProductEditScreen() {

  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Product
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Price" />
            <Select label="Category">
              <Option>Celana</Option>
              <Option>Topi</Option>
              <Option>T-Shirt</Option>
            </Select>
            <Textarea  size="lg" color="purple" label="Description" />
            <input type="file" onChange={handleChange} />
            <img className="h-45 w-full rounded-lg object-cover object-center" src={file} />
          </div>
          <Button className="mt-6" fullWidth>
            Update
          </Button>
        </form>
      </Card>
    );
  }