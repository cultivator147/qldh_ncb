import { Flex, Table, Text, Title } from "@mantine/core";
import { StyledImage } from "../common/StyledImage";

export interface OrderDetail {
  buyerId: any;
  buyerName: string;
  buyerAddress: string;
  phoneNumber: string;
  itemName: string;
  itemPrice: any;
  dateTime: any;
  orderImage: string;
  orderStatus: any;
}
export interface TableOrderData {
  page: any;
  size: any;
  items: OrderDetail[];
}
export const TableOrders = (props: TableOrderData) => {
  return (
    <Flex style={{ width: "100%", padding: "12px", overflowY: "scroll" }}>
      <table border={1} width={"100%"} style={{ borderCollapse: "collapse" }}>
        <thead>
          <th>Tên người mua</th>
          <th>SĐT</th>
          <th>Địa chỉ</th>
          <th>Thời gian</th>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá tiền</th>
          <th>Trạng thái đơn hàng</th>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.buyerName}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.phoneNumber}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.buyerAddress}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.dateTime}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.itemName}`}</Text>
                </Flex>
              </td>
              <td
                style={{
                  width: "156px",
                  height: "128px",
                  padding: "8px",
                  border: "1px solid #5ec42f",
                }}
              >
                <StyledImage src={item?.orderImage} />
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.itemPrice}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.orderStatus}`}</Text>
                </Flex>
              </td>
              <td
                style={{
                  width: "10%",
                  padding: "8px",
                  border: "1px solid #a02f2f",
                }}
              >
                <Flex style={{ padding: "4px", gap: "2px" }}>
                  <Text title="Chọn" />
                  <input
                    type="radio"
                    name="selectGroup"
                    onChange={() => {
                      // handleRadioChange(str);
                    }}
                  />
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};
