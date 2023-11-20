import { useProductsContext } from "@/context/products_context";
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
import { useLocation } from "react-router-dom";

export function ProductEditScreen() {
  const {updateSingleProduct} = useProductsContext()
  const {state} = useLocation('')
  const [file, setFile] = useState();
  const [data, setData] = useState({
    productId : state?.productId ,
    title: "",
    price: "",
    description: "",
    category: "",
    image:''
  });

    function handleChange(e) {
        console.log('target file',e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        setData({...data, image:e.target.files[0]})

    }

    function handleSubmit (e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('productId', data.productId);       
        updateSingleProduct(formData)   
    }
    console.log(data);
    console.log('file',file)

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Product
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Title" name="title" onChange={(e) => setData({ ...data, title: e.target.value })}/>
            <Input size="lg" label="Price" name="price" onChange={(e) => setData({ ...data, price: e.target.value })} />
            <Select value={data.category} label="category" name="category" onChange={(e) => setData({ ...data, category: e })}>
              <Option value="Celana">Celana</Option>
              <Option value="Topi">Topi</Option>
              <Option value="T-Shirt">T-Shirt</Option>
            </Select>
            <Textarea  size="lg" color="purple" label="Description" name="description" onChange={(e) => setData({ ...data, description: e.target.value })} />
            <input type="file" onChange={handleChange} />
            <img className="h-45 w-full rounded-lg object-cover object-center" src={file} />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Update
          </Button>
        </form>
      </Card>
    );
  }