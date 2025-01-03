package ecom.web.qldh.model.entity;

import ecom.web.qldh.util.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "item")
public class Item {
    @Id
    @Column(name = "id")
    @GeneratedValue()
    private Long id;

    @Column(name = "buyer_name")
    private String buyerName;

    @Column(name = "buyer_address")
    private String buyerAddress;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_time")
    private Long dateTime;

    @Column(name = "order_image")
    @Convert(converter = StringListConverter.class)
        private List<String> orderImage = new ArrayList<>();

    @Column(name = "status")
    private Integer status;

    @Column(name = "price")
    private Long price;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "platform")
    private String platform;
}
