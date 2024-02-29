package net.jcms.framework.security.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearch extends User {
	
	private String userLoginIdLike;
	private String userNmLike;

}
