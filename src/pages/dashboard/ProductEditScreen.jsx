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
  const { updateSingleProduct } = useProductsContext();
  const { state } = useLocation("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    productId: state?.product._id || "",
    title: state?.product.title || "",
    price: state?.product.price || "",
    description: state?.product.description || "",
    category: state?.product.category || "",
    stock: state?.product.stock || "",
    shipping: state?.product.shipping || false,
    featured: state?.product.featured || false,
    colors: state?.product.colors || [],
    imageUrl: state?.product.imageUrl || "",
  });

  console.log("porduct", state);

  function handleChange(e) {
    console.log("target file", e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, imageUrl: e.target.files[0] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("productId", data.productId);
    formData.append("stock", data.stock);
    formData.append("shipping", data.shipping);
    formData.append("featured", data.featured);
    formData.append("colors", JSON.stringify(data.colors));

    if (file) {
      formData.append("imageUrl", data.imageUrl);
    }
    updateSingleProduct(formData);
  }
  console.log("data", data);
  console.log("file", file);

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 grid grid-cols-2 gap-6">
            <Input
              size="lg"
              label="Title"
              value={data.title}
              name="title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Input
              size="lg"
              label="Price"
              value={data.price}
              name="price"
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
            <Input
              size="lg"
              label="Stock"
              value={data.stock}
              onChange={(e) => setData({ ...data, stock: e.target.value })}
            />
            <Select
              value={data.category}
              label="Category"
              name="category"
              onChange={(e) => setData({ ...data, category: e })}
            >
              <Option value="Celana">Celana</Option>
              <Option value="Topi">Topi</Option>
              <Option value="T-Shirt">T-Shirt</Option>
            </Select>
            <Textarea
              size="lg"
              color="purple"
              value={data.description}
              label="Description"
              name="description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <div className="flex flex-wrap gap-4">
              <div className="w-30">
                <Input
                  label="Colors-1"
                  name="colors"
                  value={data.colors[0]}
                  onChange={(e) =>
                    setData({
                      ...data,
                      colors: [e.target.value, data.colors[1], data.colors[2]],
                    })
                  }
                />
              </div>
              <div className="w-30">
                <Input
                  label="Colors-2"
                  name="colors"
                  value={data.colors[1]}
                  onChange={(e) =>
                    setData({
                      ...data,
                      colors: [data.colors[0], e.target.value, data.colors[2]],
                    })
                  }
                />
              </div>
              <div className="w-30">
                <Input
                  label="Colors-3"
                  name="colors"
                  value={data.colors[2]}
                  onChange={(e) =>
                    setData({
                      ...data,
                      colors: [data.colors[0], data.colors[1], e.target.value],
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Checkbox
                id="featured"
                checked={data.featured}
                onChange={() => setData({ ...data, featured: !data.featured })}
              />
              <label htmlFor="featured" className="cursor-pointer">
                Featured
              </label>
              <Checkbox
                id="shipping"
                checked={data.shipping}
                onChange={() => setData({ ...data, shipping: !data.shipping })}
              />
              <label htmlFor="shipping" className="cursor-pointer">
                Shipping
              </label>
            </div>

            <input type="file" onChange={handleChange} />

            <img
              className="w-1/2 rounded-lg object-cover object-center"
              src={
                file === null
                  ? `${import.meta.env.VITE_IMG_URL}/${data.imageUrl[0]}`
                  : file
              }
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Add Product
          </Button>
        </form>
      </Card>
    </>
  );
}
