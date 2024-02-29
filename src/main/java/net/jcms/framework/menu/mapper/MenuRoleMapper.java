package net.jcms.framework.menu.mapper;
 
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.menu.model.MenuRole;
import net.jcms.framework.menu.model.MenuRoleSearch;

@Mapper (value="menuRoleMapper")
public interface MenuRoleMapper extends BaseMapper<MenuRole, MenuRoleSearch> {

}
