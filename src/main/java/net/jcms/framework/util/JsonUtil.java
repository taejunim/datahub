package net.jcms.framework.util;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonUtil {

    static public <T> T JsonToObject(T obj, String val) throws JsonProcessingException {
        ObjectMapper mp = new ObjectMapper();
        obj = (T) mp.readValue(val, obj.getClass());
        return obj;
    }

    static public <T> String ObjectToJsone(T obj) throws JsonProcessingException {
        ObjectMapper mp = new ObjectMapper();
        mp.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mp.writeValueAsString(obj);
    }

    static public Map<String, Object> JsonToMap(String jStr) throws JsonProcessingException {
        return new ObjectMapper().readValue(jStr, HashMap.class);
    }

    static public String MapToString(Map map) throws JsonProcessingException {
        if(map == null) return null;
        return new ObjectMapper().writeValueAsString(map).replace("\\", "").replace("\"[", "[").replace("]\"", "]");
    }

    static public String ListmapTpString(List<Map<String, Object>> list) {
        if(list == null) return null;
        boolean isFirst = true;
        StringBuilder sb = new StringBuilder();
        sb.append("[ ");
        for(Map m : list) {
            try {
                String d = MapToString(m);
                if(!isFirst) {
                    sb.append(",").append(d);
                } else {
                    isFirst = false;
                    sb.append(d);
                }
            } catch (JsonProcessingException e) {
            }
        }
        sb.append("]");
        return sb.toString();
    }
}
