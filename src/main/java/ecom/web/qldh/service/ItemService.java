package ecom.web.qldh.service;

import ecom.web.qldh.model.entity.Item;
import ecom.web.qldh.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    public List<Item> getListService(){
        return itemRepository.findAll();
    }

    public List<Item> findByStatus(int status){
        return itemRepository.findAll().stream().filter(item -> item.getStatus().equals(status)).toList();
    }
    public Item updateOrder(Item item){
        return itemRepository.save(item);
    }
    public Item deleteItem(Item item){
        itemRepository.delete(item);
        return item;
    }
}
