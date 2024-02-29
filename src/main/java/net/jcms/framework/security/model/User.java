package net.jcms.framework.security.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

@Getter
@Setter
public class User extends BaseModel {

	private Long userId;
	private String userLoginId;
	private String userNm;
	private String userPwd;
	private String userDi;
	private String addr;
	private int failCnt;
	private String userSt;
	private String userOutRsn;

	private String roleAuth;
	private String inuserYn;

	// private Integer insttId;
	// private String insttNm;
	private String roleNm;
}
