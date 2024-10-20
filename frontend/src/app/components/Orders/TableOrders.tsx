import { Flex, Table, Text, Title } from "@mantine/core";
import { StyledImage } from "../common/StyledImage";
import { useState } from "react";
import { UpdateItemModal } from "./UpdateItemModal";
import { deleteItem } from "../../api/apis";
import { convertMillisecondsToTime, convertTimeToFacebookStyle } from "../../../utils/Helper";

export interface OrderDetail {
  id: any;
  buyerName: string;
  buyerAddress: string;
  phoneNumber: string;
  itemDescription: string;
  itemName: string;
  price: any;
  dateTime: any;
  orderImage: string[];
  status: any;
}
export interface TableOrderData {
  page: any;
  size: any;
  items: OrderDetail[];
}
export const TableOrders = (props: TableOrderData) => {
  console.log(props?.items[0]);
  console.log(props?.items[0]?.orderImage[0]?.replace(/\]|\"|\\/g,'').replace('[',''));
  const [isShowing, setIsShowing] = useState(false);
  const [editingItem, setEditingItem] = useState<OrderDetail>();
  const onClickShowInsertOrderModal = (item: OrderDetail) => {
    setIsShowing(true);
    setEditingItem(item);
  };
  const onClickDeleteItem = async (item: OrderDetail) => {
    try{
      await deleteItem({
        id:  item.id,
        buyerName: item.buyerName,
        buyerAddress: item.buyerAddress,
        phoneNumber: item.phoneNumber,
        datetime: item.dateTime,
        orderImage: item.orderImage,
        status: item.status,
        price: item.price,
        itemName: item.itemName,
        itemDescription: item.itemDescription
      });
    }catch(e: any){
      console.log(e);
    }
  }
  const onHiden = async () => {
    setIsShowing(false);
  }
  return (
    <Flex style={{ width: "100%", padding: "12px", overflowY: "scroll", justifyContent: 'center'}}>
      <table border={1} width={"80%"} style={{ borderStyle: 'solid', borderColor: '#000000', borderCollapse: 'collapse' }}>
        <thead>
          <th>Tên người mua</th>
          <th>SĐT</th>
          <th>Địa chỉ</th>
          <th>Thời gian</th>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá tiền</th>
          <th>Trạng thái</th>
          <th>Mô tả thêm</th>
          <th>Hành động</th>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr>
                <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.buyerName}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.phoneNumber}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.buyerAddress}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${convertMillisecondsToTime(item.dateTime)}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.itemName}`}</Text>
                </Flex>
              </td>
              <td
                style={{
                  width: "156px",
                  height: "128px",
                  padding: "8px",
                  border: "1px solid #000000",
                }}
              >
                {item?.orderImage.map((img) => (
                  <StyledImage src={img.replace(/\]|\"|\\/g,'').replace('[','')} />
                ))}
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.price}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.status}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${item.itemDescription}`}</Text>
                </Flex>
              </td>
              <td
                style={{
                  width: "10%",
                  padding: "8px",
                  border: "1px solid #000000",
                }}
              >
                <Flex style={{ padding: "4px", gap: "12px",display: 'flex', flexDirection: "column" }}>
                  <button style={{cursor: 'pointer', background: "", fontSize: "1rem", padding: '4px',  }}
                  onClick={() => {onClickShowInsertOrderModal(item)}}
                  >
                    Chỉnh sửa
                  </button>
                  
                  
                  <button style={{cursor: 'pointer', color: "red", fontSize: "1rem", padding: '3px'}}
                  onClick={() => {onClickDeleteItem(item)}}
                  >
                    Xoá
                  </button>
                </Flex>
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      {isShowing && (<UpdateItemModal
                      isShowing={isShowing}
                      hide={onHiden}
                      idInit={editingItem?.id}
                      buyerNameInit={editingItem?.buyerName}
                      buyerAddressInit={editingItem?.buyerAddress}
                      phoneNumberInit={editingItem?.phoneNumber}
                      itemDescriptionInit={editingItem?.itemDescription}
                      itemNameInit={editingItem?.itemName}
                      priceInit={editingItem?.price}
                      dateTimeInit={editingItem?.dateTime}
                      statusInit={editingItem?.status}
                      fileUrlsInit={editingItem?.orderImage}
                    />)}
    </Flex>
  );
};
