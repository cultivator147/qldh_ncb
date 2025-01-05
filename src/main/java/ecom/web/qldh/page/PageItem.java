package ecom.web.qldh.page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageItem<Object> {
    private int page;
    private int size;
    private long totalElements = 0;
    private long totalPage = 0;
    private long totalMoney = 0;
    private List<Object> content = new ArrayList<>();
}
