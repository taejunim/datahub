package net.jcms.framework.security.model;

import net.jcms.framework.base.model.BaseModel;

public class ScurRscRole extends BaseModel{
	private String rscId;
	private String rscName;
	private String rscTp;
	private String rscPatn;
	private String rscDesc;
	private String roleAuth;
	
	public String getRscId() {
		return rscId;
	}
	public void setRscId(String rscId) {
		this.rscId = rscId;
	}
	public String getRscName() {
		return rscName;
	}
	public void setRscName(String rscName) {
		this.rscName = rscName;
	}
	public String getRscTp() {
		return rscTp;
	}
	public void setRscTp(String rscTp) {
		this.rscTp = rscTp;
	}
	public String getRscPatn() {
		return rscPatn;
	}
	public void setRscPatn(String rscPatn) {
		this.rscPatn = rscPatn;
	}
	public String getRscDesc() {
		return rscDesc;
	}
	public void setRscDesc(String rscDesc) {
		this.rscDesc = rscDesc;
	}
	public String getRoleAuth() {
		return roleAuth;
	}
	public void setRoleAuth(String roleAuth) {
		this.roleAuth = roleAuth;
	}
}