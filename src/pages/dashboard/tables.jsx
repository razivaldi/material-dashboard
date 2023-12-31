import DataTable from "react-data-table-component";
import React, { useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { useProductsContext } from "@/context/products_context";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth_context";

export function Tables() {
  const { userState } = useAuthContext();
  const {
    products,
    setSelectedRows,
    deleteSomeProducts,
    selectedRows,
    deleteSingleProduct,
  } = useProductsContext();
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteSingleProduct(id);
  };
  const TABLE_HEAD = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={`${import.meta.env.VITE_IMG_URL}/${record.imageUrl[0]}`}
            alt={name}
            size="sm"
          />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {record.title}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {record.email}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(row.price);
      },
      sortable: true,
    },
    {
      name: "Colors",
      selector: (row) =>
        row.colors.map((c) => {
          if (c !== "") {
            return (
              <div
                key={c}
                style={{ backgroundColor: c }}
                className="m-1 inline-flex h-5 w-5 rounded-full border border-black"
              ></div>
            );
          }
        }),
      sortable: true,
    },
    {
      name: "Featured",
      selector: (row) => row.featured,
      sortable: true,
      cell: (record) => (
        <div className="flex items-center gap-3">
          <Chip
            variant="gradient"
            color={record.featured ? "green" : "blue-gray"}
            value={record.featured ? "featured" : "-"}
            className="py-0.5 px-2 text-[11px] font-medium"
          />
        </div>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (record) => (
        <div>
          <IconButton
            variant="text"
            onClick={() => {
              navigate(`/dashboard/editproduct`, {
                state: { product: record },
              });
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>

          <IconButton
            variant="text"
            onClick={() => {
              setShowModal(true);
              setSelectedRows(record);
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log(selectedRows);
  };

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const handleDeleteRows = () => {
    const productId = selectedRows.map((row) => row._id);
    deleteSomeProducts(productId);
    console.log(productId);
  };
  console.log(products);

  return (
    <>
      {!userState.role && <Card className="h-full w-full text-center">Please Login</Card>}
      {userState.role === "user" && (
         <Card className="h-full w-full text-center">You don't have permission</Card>
      )}
      {userState.role === "admin" && (
        <Card className="h-full w-full">
          <div className="ml-4 flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleClearRows}
              className="flex items-center gap-3"
              size="sm"
            >
              Clear Selected Rows
            </Button>
            <Button
              onClick={handleDeleteRows}
              className="flex items-center gap-3"
              size="sm"
            >
              Delete Selected Rows
            </Button>
          </div>

          <DataTable
            columns={TABLE_HEAD}
            data={products}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            item={selectedRows}
            handleDelete={handleDelete}
            title={"Product"}
          />
        </Card>
      )}
    </>
  );
}
