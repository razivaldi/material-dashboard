import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import { useUsersContext } from "@/context/users_context";

export function UserEdit({ handleOpen, setOpen, open, item}) {
  const { updateUser } = useUsersContext();
  const [data, setData] = useState({
    userId : "",
    newName: "",
    newRole: "",
    newEmail: "",
  });

  useEffect(() => {
    setData({
      ...data,
      userId: item._id,
    })
  },[item])
  console.log(data)

  return (
    <>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit User
            </Typography>
            <Typography className="-mb-2" variant="h6">
              New Name
            </Typography>
            <Input
              label="Name"
              size="lg"
              onChange={(e) => setData({ ...data, newName: e.target.value })}
            />
            <Typography className="-mb-2" variant="h6">
              New Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              onChange={(e) => setData({ ...data, newEmail: e.target.value })}
            />
            <Typography className="-mb-2" variant="h6">
              New Role
            </Typography>
            <Select
              label="Role"
              onChange={(e) => setData({ ...data, newRole: e })}
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="flex gap-2 pt-0">
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpen}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              fullWidth
              onClick={() => {
                updateUser(data);
                handleOpen();
              }}
            >
              Confirm
            </Button>
            {/* <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography> */}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
