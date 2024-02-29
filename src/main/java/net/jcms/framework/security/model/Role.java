package net.jcms.framework.security.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

@Getter
@Setter
public class Role extends BaseModel {

	private String roleAuth;
	private String roleNm;
	private String roleDesc;
	private String roleAuthLike;

}
