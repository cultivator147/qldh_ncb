package ecom.web.qldh.repository.jdbc;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
@Slf4j
public class BaseRepository {
    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;
    public Boolean executeSqlDatabase(String queryString, Map<String, Object> mapParams) {
        boolean result = true;
        try {
            jdbcTemplate.update(queryString, mapParams);
        } catch (DataAccessException e) {
            result = false;
        }
        return result;
    }
    public <T> T queryForObject(String queryString, Map<String, Object> mapParam, Class<T> className) {
        try {
            log.info("param {}", mapParam);
            if (className.isAssignableFrom(Long.class) || className.isAssignableFrom(Integer.class) || className.isAssignableFrom(Double.class) || className.isAssignableFrom(String.class)) {
                return jdbcTemplate.queryForObject(queryString, mapParam, className);
            } else {
                return (T) jdbcTemplate.queryForObject(queryString, mapParam, new BeanPropertyRowMapper(className));
            }
        } catch (EmptyResultDataAccessException e) {
            log.error("Error queryForObject {}", e.getMessage());
            return null;
        }
    }
    public <T> List<T> getListData(String queryString, Map<String, Object> mapParam, Class<T> className) {
        try {
            log.info("param {}", mapParam);
            if (className.isAssignableFrom(Long.class) || className.isAssignableFrom(Integer.class) || className.isAssignableFrom(Double.class) || className.isAssignableFrom(String.class)) {
                return jdbcTemplate.queryForList(queryString, mapParam, className);
            } else {
                return jdbcTemplate.query(queryString, mapParam, new BeanPropertyRowMapper(className));
            }
        } catch (EmptyResultDataAccessException e) {
            log.error("Error getListData list {}", e.getMessage());
            return new ArrayList<>();
        }
    }
}
