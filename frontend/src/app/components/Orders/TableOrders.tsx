import { Flex, Table, Text, Textarea, Title } from "@mantine/core";
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
  platform: any;
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
        platform: item.platform,
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
  const backgroundColor = (p: string) => {
    if(p == "Tiktok"){
      return "#dfd7c8"
    }
    if(p == "Zalo"){
      return "#5a6bb8"
    }
    if(p == "Instagram"){
      return "#df92cb"
    }
  };
  const statusColor = (p: any) => {
    if(p == 3){
      return "#95ec43"
    }
    if(p == 2){
      return "#e4a554"
    }
    if(p == 1){
      return "#dfc1d7"
    }
  }
  const statusString = (v: any) => {
    if(v == 1){
      return "Chưa đặt hàng";
    }
    if(v == 2){
      return "Đã đặt hàng";
    }
    if(v == 3){
      return "Đã gửi hàng";
    }
  }
  return (
    <Flex style={{ width: "100%", padding: "9px", overflowY: "scroll", justifyContent: 'center'}}>
      <table border={3} width={"90%"} style={{ borderStyle: 'solid', borderColor: '#000000', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead style={{fontSize: '1.4rem', background:"#b8e2b8", color: '#0e0d0d'}}>
          <th>Người mua</th>
          <th>SĐT</th>
          <th>Địa chỉ</th>
          <th>Thời gian</th>
          <th>Tên hàng</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá tiền</th>
          <th>Trạng thái</th>
          <th>Nền tảng</th>
          <th>Ghi chú</th>
          <th>Hành động</th>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr>
                <td style={{width: '10rem', padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <Text>{`${item.buyerName}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <Text>{`${item.phoneNumber}`}</Text>
                </Flex>
              </td>
              <td style={{ padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <Text>{`${item.buyerAddress}`}</Text>
                </Flex>
              </td>
              <td style={{width: '8rem', padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"}>
                  <Text>{`${convertMillisecondsToTime(item.dateTime)}`}</Text>
                </Flex>
              </td>
              <td style={{width: '10rem', padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <Text>{`${item.itemName}`}</Text>
                </Flex>
              </td>
              <td
                style={{
                  width: '24rem', 
                  height: "128px",
                  padding: "8px",
                  border: "1px solid #000000",
                }}
              >
                {item?.orderImage.map((img) => (
                  <StyledImage src={img.replace(/\]|\"|\\/g,'').replace('[','')} />
                ))}
              </td>
              <td style={{width: "8%",  padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <Text>{`${item.price}`}</Text>
                </Flex>
              </td>
              <td style={{width: "10%", padding: "8px", border: "1px solid #000000" ,  background: statusColor(item.status) }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center'}}>
                  <Text>{statusString(item.status)}</Text>
                </Flex>
              </td>
              <td style={{width: "10%", padding: "8px", border: "1px solid #000000" ,  background: backgroundColor(item.platform)}}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center'}}>
                  <Text>{`${item.platform}`}</Text>
                </Flex>
              </td>
            
              <td style={{width: '10rem',  padding: "8px", border: "1px solid #000000" }}>
                <Flex direction={"column"} style={{justifyItems: 'center', alignItems: 'center',}}>
                  <p style={{width: '9rem',
                wordWrap: 'break-word',  
                overflowWrap: 'break-word', 
                backgroundColor: '#f0f0f0', 
                padding: '0.5rem' }}> {item.itemDescription}</p>
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
                      platformInit={editingItem?.platform}
                      fileUrlsInit={editingItem?.orderImage}
                    />)}
    </Flex>
  );
};
