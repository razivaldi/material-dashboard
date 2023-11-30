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
import { useUsersContext } from "@/context/users_context";
import Modal from "@/components/modal";
import { DialogForm } from "@/components/dialogForm";
import { UserEdit } from "@/components/editUser";
import { useAuthContext } from "@/context/auth_context";

const showAlerts = {
  blue: true,
  green: true,
  orange: true,
  red: true,
};

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

export function SortableTable() {
  const { userState } = useAuthContext();
  const { users, setSelectedRows, selectedRows, deleteUser, users_loading } =
    useUsersContext();

  const handleOpen = () => setOpen((cur) => !cur);
  const [open, setOpen] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const TABLE_HEAD = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.img} alt={name} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {record.name}
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
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString("id-ID");
      },
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (record) => (
        <div>
          <IconButton
            variant="text"
            onClick={() => {
              setSelectedRows(record);
              handleOpen();
              console.log(record);
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

  return (
    <>
      {!userState.role && <Card className="h-full w-full text-center"> Please Login</Card>}
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
            <DialogForm />
            <div className="md:absolute md:right-4">
              <Input label="Search" size="sm" />
            </div>
          </div>
          <DataTable
            columns={TABLE_HEAD}
            data={users}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
          <UserEdit
            handleOpen={handleOpen}
            open={open}
            setOpen={setOpen}
            item={selectedRows}
          />
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            item={selectedRows}
            handleDelete={handleDelete}
            title={"Account"}
          />
        </Card>
      )}
    </>
  );
}
