package net.jcms.framework.util;

import com.navercorp.lucy.security.xss.servletfilter.defender.Defender;
import com.nhncorp.lucy.security.xss.XssPreventer;

public class XssPreventerDefender implements Defender {
    @Override
    public void init(String[] strings) {

    }

    @Override
    public String doFilter(String s) {
        String tempStr = XssPreventer.escape(s);
        return tempStr.replaceAll("&amp;", "&").replaceAll("&#39;","'").replaceAll("&quot;","");
    }
}
