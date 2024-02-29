package net.jcms.framework.cd.model;

import net.jcms.framework.base.model.BaseModel;

public class CdDtl extends BaseModel{
	private String cdDtlId;
	private String cdId;
	private String cdDtlNm;
	private String cdDtlLabel;
	private String cdDtlDesc;
	private String cdDtlOrd;
	private String recSt;

	
	public String getCdDtlOrd() {
		return cdDtlOrd;
	}
	public void setCdDtlOrd(String cdDtlOrd) {
		this.cdDtlOrd = cdDtlOrd;
	}
	public String getCdDtlId() {
		return cdDtlId;
	}
	public void setCdDtlId(String cdDtlId) {
		this.cdDtlId = cdDtlId;
	}
	public String getCdId() {
		return cdId;
	}
	public void setCdId(String cdId) {
		this.cdId = cdId;
	}
	public String getCdDtlNm() {
		return cdDtlNm;
	}
	public void setCdDtlNm(String cdDtlNm) {
		this.cdDtlNm = cdDtlNm;
	}
	public String getCdDtlDesc() {
		return cdDtlDesc;
	}
	public void setCdDtlDesc(String cdDtlDesc) {
		this.cdDtlDesc = cdDtlDesc;
	}
	public String getUseSt() {
		return recSt;
	}
	public void setUseSt(String recSt) {
		this.recSt = recSt;
	}
	public String getCdDtlLabel() {
		return cdDtlLabel;
	}
	public void setCdDtlLabel(String cdDtlLabel) {
		this.cdDtlLabel = cdDtlLabel;
	}
}
