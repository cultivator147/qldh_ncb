package ecom.web.qldh.service;

import ecom.web.qldh.model.entity.Item;
import ecom.web.qldh.repository.ItemRepository;
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
    public Page<Item> getListService(int page, int size){
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Sort sort = Sort.by(Sort.Order.asc("dateTime"));
        pageable.getSortOr(sort);
        return itemRepository.findAll(pageable);
    }

    public Page<Item> findByStatus(int status, int page, int size){
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Sort sort = Sort.by(Sort.Order.asc("date_time"));
        pageable.getSortOr(sort);
        Page<Item> itemPage;
        if(status != 0){
            itemPage = itemRepository.findAll(pageable) ;
            return new Page<>() {
                @Override
                public int getTotalPages() {
                    return itemPage.getContent().size() / size;
                }

                @Override
                public long getTotalElements() {
                    return itemPage.getContent().size();
                }

                @Override
                public <U> Page<U> map(Function<? super Item, ? extends U> converter) {
                    return null;
                }

                @Override
                public int getNumber() {
                    return itemPage.getNumber();
                }

                @Override
                public int getSize() {
                    return itemPage.getSize();
                }

                @Override
                public int getNumberOfElements() {
                    return itemPage.getNumberOfElements();
                }

                @Override
                public List<Item> getContent() {
                    List<Item> content = new ArrayList<>(itemPage.getContent());
                    content.removeIf(item -> item.getStatus() != status);
                    return content;
                }

                @Override
                public boolean hasContent() {
                    return itemPage.hasContent();
                }

                @Override
                public Sort getSort() {
                    return itemPage.getSort();
                }

                @Override
                public boolean isFirst() {
                    return itemPage.isFirst();
                }

                @Override
                public boolean isLast() {
                    return itemPage.isLast();
                }

                @Override
                public boolean hasNext() {
                    return itemPage.hasNext();
                }

                @Override
                public boolean hasPrevious() {
                    return itemPage.hasPrevious();
                }

                @Override
                public Pageable nextPageable() {
                    return itemPage.nextPageable();
                }

                @Override
                public Pageable previousPageable() {
                    return itemPage.previousPageable();
                }

                @Override
                public Iterator<Item> iterator() {
                    return itemPage.iterator();
                }
            };
        }else{
            itemPage = itemRepository.findAll(pageable) ;
        }
        return itemPage;
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
