package net.jcms.framework.menu.tag;

import net.jcms.framework.base.tag.BaseTag;
import net.jcms.framework.menu.model.Menu;
import net.jcms.framework.menu.service.MenuService;
import net.jcms.framework.security.model.User;
import net.jcms.framework.util.SessionHelper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.jsp.JspWriter;
import java.io.IOException;
import java.util.List;

/**
 * 모바일 side Menu
 * Depth 2 까지
 * **/
public class MobileSideMenuTag extends BaseTag {

    @Autowired
    private MenuService menuService;

    private Long menuId;

    @Override
    protected int doProcessTag() throws IOException {

        //현재 접속한 메뉴번호를 구한다.
        if(this.pageContext.getRequest().getParameter("currentMenuId") != null)
            menuId = Long.parseLong(this.pageContext.getRequest().getParameter("currentMenuId"));

        JspWriter out = pageContext.getOut ();
        StringBuffer sb = new StringBuffer(5000);

        sb.append("<div class='m-menu-area clear-fix'>");
        sb.append("<ul>");

        if(SessionHelper.getUser() != null) {
            User user = SessionHelper.getUser();
            if(user != null && user.getUserId() > 0) {
                List<Menu> menuList = menuService.selectRoleMenuList(user.getUserId(),false);
                for(Menu menu : menuList) {
                    makeChildMenu(menu, sb);
                }
            }
        }
        sb.append("</ul>");
        sb.append("</div>");

        out.print(sb.toString());
        return SKIP_BODY;
    }


    private void makeChildMenu(Menu menu, StringBuffer sb) {
        if (menu == null) {
            return;
        }
        if (menu.childList == null) {
            return;
        }

        String root = this.getRequestContext().getContextPath();
        if(root == null) root="";


        if(menu.childList.size() > 0 || menu.getUpperMenuId() == null) {
            sb.append("<li>");

            if(menu.getPgm().getPgmUrl() != null)
                sb.append("<a href='"+root+menu.getPgm().getPgmUrl()+"?currentMenuId="+menu.getMenuId()+"' class='menuLeft depth2_item1");
            else  sb.append("<a href='#' class='menuLeft depth2_item1");

            if(menuId != null && (menu.getMenuId().compareTo(menuId) == 0 || searchChildUrlEquals(menu))) {
                sb.append(" on'>");
                sb.append(menu.getMenuNm());
                sb.append("</a>");
                sb.append("<div class='menuRight depth3_item1 on'>");
            } else {
                sb.append("'>");
                sb.append(menu.getMenuNm());
                sb.append("</a>");
                sb.append("<div class='menuRight depth3_item1'>");
            }

            sb.append("<ul>");
            for(Menu childMenu : menu.childList) {
                makeChildMenu(childMenu, sb);
            }
            sb.append("</ul>");
            sb.append("</div>");
            sb.append("</li>");
        } else {
            sb.append("<li>");
            sb.append("<a href='"+root+menu.getPgm().getPgmUrl()+"?currentMenuId="+menu.getMenuId()+"'>");
            sb.append(menu.getMenuNm());
            sb.append("</a>");
            sb.append("</li>");
        }
    }

    /**
     * 하위메뉴중에 선택한 메뉴가 있는지 찾는다.
     * @return true = 하위 메뉴중에 선택한 메뉴가 존재, false = 하위메뉴에 선택한 메뉴가 미존재
     */
    private boolean searchChildUrlEquals(Menu menu) {
        boolean result = false;
        if(menu.getMenuId().compareTo(menuId) == 0) {
            return true;
        }
        for(Menu childMenu : menu.childList) {
            result = searchChildUrlEquals(childMenu);
            if(result) return true;
        }
        return result;
    }
}
