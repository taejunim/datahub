package net.jcms.framework.security.model;

import net.jcms.framework.base.model.BaseModel;

public class UserRole extends BaseModel{

	private Long userId;
	private String roleAuth;
	private String roleNm;
	private String roleDesc;

	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getRoleAuth() {
		return roleAuth;
	}
	public void setRoleAuth(String roleAuth) {
		this.roleAuth = roleAuth;
	}
	
	public String getRoleNm() {
		return roleNm;
	}
	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}
	public String getRoleDesc() {
		return roleDesc;
	}
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

}
