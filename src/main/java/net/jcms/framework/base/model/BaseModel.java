package net.jcms.framework.base.model;

import java.util.Date;
import java.util.List;

public class BaseModel {
	private Integer start;
	private Integer length;
	
	private String sort;
	private String sortOrd;
	
	private Boolean pagingYn;
	public List<String> groupbyList;
	public List<String> selectList;
	
	private Long regId;
	private Date regDt; 
	private Long updId;
	private Date updDt;
	private Long delId;
	private Date delDt;
	private String recSt;
	
	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getSortOrd() {
		return sortOrd;
	}

	public void setSortOrd(String sortOrd) {
		this.sortOrd = sortOrd;
	}

	public Date getRegDt() {
		return regDt;
	}

	public void setRegDt(Date regDt) {
		this.regDt = regDt;
	}

	public Date getUpdDt() {
		return updDt;
	}

	public void setUpdDt(Date updDt) {
		this.updDt = updDt;
	}

	public Date getDelDt() {
		return delDt;
	}

	public void setDelDt(Date delDt) {
		this.delDt = delDt;
	}

	public Boolean getPagingYn() {
		return pagingYn;
	}

	public void setPagingYn(Boolean pagingYn) {
		this.pagingYn = pagingYn;
	}

	public Long getRegId() {
		return regId;
	}

	public void setRegId(Long regId) {
		this.regId = regId;
	}

	public Long getUpdId() {
		return updId;
	}

	public void setUpdId(Long updId) {
		this.updId = updId;
	}

	public Long getDelId() {
		return delId;
	}

	public void setDelId(Long delId) {
		this.delId = delId;
	}

	public String getRecSt() {
		return recSt;
	}

	public void setRecSt(String recSt) {
		this.recSt = recSt;
	}
}
