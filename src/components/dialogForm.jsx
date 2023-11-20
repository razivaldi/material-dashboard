import React, { useState } from "react";
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
} from "@material-tailwind/react";
import { useAuthContext } from "@/context/auth_context";

export function DialogForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { register } = useAuthContext();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(data);

  return (
    <>
      <Button onClick={handleOpen}>Add User</Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[36rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add User
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input
              label="Name"
              size="lg"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Typography className="-mb-2" variant="h6">
              Password
            </Typography>
            <Input
              label="Password"
              size="lg"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                handleOpen;
                register(data);
              }}
              fullWidth
            >
              Create User
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
