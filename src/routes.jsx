import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile,  Notifications } from "@/pages/dashboard";
import { Tables } from "@/pages/dashboard/tables";
import { SignIn, SignUp } from "@/pages/auth";
import { SortableTable } from "./pages/dashboard/sortabletable";
import { ProductEditScreen } from "./pages/dashboard/ProductEditScreen";
import { AddProduct } from "./pages/dashboard/Addproduct";
import Orders from "./pages/dashboard/Orders";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Orders",
        path: "/Orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Products",
        path: "/products",
        element: <Tables/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <SortableTable/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit-Product",
        path: "/editproduct",
        element: <ProductEditScreen/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add-Product",
        path: "/add-product",
        element: <AddProduct/>,
      },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
