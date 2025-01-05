package ecom.web.qldh.page;

import ecom.web.qldh.model.entity.Item;
import lombok.Data;

@Data
public class ItemPerPage extends Item {
    private int rowNum;
    private long totalCount;
}
