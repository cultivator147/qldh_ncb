import React from "react";
import { LeftSideBar } from "../components/sidebar/LeftSideBar";
import { Container, Text } from "@mantine/core";
import { OrderDetail, TableOrders } from "../components/Orders/TableOrders";
const TABLE_DATA: OrderDetail[] = [
  {
    buyerId: 1,
    buyerName: "Ngô chí bình",
    buyerAddress: "New York",
    phoneNumber: "0385354718",
    itemName: "Quần sịp",
    itemPrice: 189000,
    dateTime: 19000,
    orderImage:
      "https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-dep_095240141.jpg",
    orderStatus: 1,
  },
  {
    buyerId: 2,
    buyerName: "Ngô chí bình",
    buyerAddress: "New York",

    phoneNumber: "0385354718",
    itemName: "Quần sịp",
    itemPrice: 189000,
    dateTime: 19000,
    orderImage:
      "https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-dep_095240141.jpg",
    orderStatus: 1,
  },
  {
    buyerId: 3,
    buyerName: "Ngô chí bình",
    phoneNumber: "0385354718",
    buyerAddress: "New York",

    itemName: "Quần sịp",
    itemPrice: 189000,
    dateTime: 19000,
    orderImage:
      "https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-dep_095240141.jpg",
    orderStatus: 1,
  }, 
];
export const HomePage = () => {
  return (
    <Container style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <LeftSideBar />
      <div>
        <TableOrders page={1} size={10} items={TABLE_DATA} />
      </div>
    </Container>
  );
};
