package ecom.web.qldh.service;

import ecom.web.qldh.model.entity.Item;
import ecom.web.qldh.page.ItemPerPage;
import ecom.web.qldh.page.PageItem;
import ecom.web.qldh.repository.ItemRepository;
import ecom.web.qldh.repository.jdbc.ItemJDBCRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final ItemJDBCRepository itemJDBCRepository;
    public PageItem<ItemPerPage> getListService(int page, int size, int itemStatus, int statisticStatus, String platform){
        return itemJDBCRepository.getPageItem(page, size, itemStatus, statisticStatus, platform);
    }


    public Item updateOrder(Item item){
        item.setDateTime(System.currentTimeMillis());
        return itemRepository.save(item);
    }
    public Item insertOrder(Item item){
        item.setId(null);
        item.setDateTime(System.currentTimeMillis());
        return itemRepository.save(item);
    }
    public Item deleteItem(Item item){
        itemRepository.delete(item);
        return item;
    }
}
