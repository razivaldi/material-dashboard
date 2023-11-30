import { useAuthContext } from "@/context/auth_context";
import { useOrdersContext } from "@/context/orders_context";
import { Card } from "@material-tailwind/react";

export default function Orders() {
  const { orders } = useOrdersContext();
  const { userState } = useAuthContext();

  return (
    <>
      {!userState.role && (
        <Card className="h-full w-full text-center">Please Login</Card>
      )}
      {userState.role === "user" && (
        <Card className="h-full w-full text-center">
          You don't have permission
        </Card>
      )}
      {userState.role === "admin" && (
        <>
          {orders.flatMap((order) => (
            <Card className="m-3 p-2">
              <div className="ml-4">
                <h3 className="text-lg font-bold">{order.userId?.name}</h3>
                <div className="mb-2 grid grid-cols-4">
                  <p className="col-span-2 font-semibold">Product</p>
                  <p className="font-semibold">Quantity</p>
                  <p className="font-semibold">Color</p>
                </div>
              </div>
              {console.log("items", order.items)}
              {order.items.map((item) => {
                return (
                  <div className="ml-4 grid grid-cols-4">
                    <p className="col-span-2">{item.productId.title}</p>
                    <p>{item?.quantity}</p>
                    <div
                      className="h-4 w-4 rounded-full border border-black"
                      style={{ backgroundColor: item?.color }}
                    ></div>
                  </div>
                );
              })}
            </Card>
          ))}
        </>
      )}
    </>
  );
}
