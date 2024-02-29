package net.jcms.framework.security.mapping;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import net.jcms.framework.security.model.User;
import egovframework.rte.fdl.security.userdetails.EgovUserDetails;
import egovframework.rte.fdl.security.userdetails.jdbc.EgovUsersByUsernameMapping;

public class UserDetailsMapping extends EgovUsersByUsernameMapping {

    /**
     * EgovUserDetailsMapping 생성자
     * @param ds
     * @param usersByUsernameQuery
     */
    public UserDetailsMapping(DataSource ds, String usersByUsernameQuery) {
        super(ds, usersByUsernameQuery);
    }

    /*
     * (non-Javadoc)
     * @see
     * egovframework.rte.fdl.security.userdetails.jdbc
     * .EgovUsersByUsernameMapping
     * #mapRow(java.sql.ResultSet, int)
     */
    /**
     * EgovUsersByUsernameMapping 클래스를 상속받아
     * jdbc-user-service 에서 지정된 users-by-username-query
     * 의 쿼리문을 조회하여 ResultSet에 매핑된다.
     */
    @Override
    protected EgovUserDetails mapRow(ResultSet rs, int rownum) throws SQLException {
        Long userId = rs.getLong ("user_id");
        String userLoginId = rs.getString("user_login_id");
        boolean enabled = true; 
        String password = rs.getString("user_pwd");
        String username = rs.getString("user_nm");
        
        User user = new User ();
        user.setUserId (userId);
        user.setUserLoginId (userLoginId);
        user.setUserNm (username);
        
        return new EgovUserDetails(userLoginId, password, enabled, user);
    }

}

