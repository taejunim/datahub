package net.jcms.framework.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@PropertySource("classpath:/config/properties/globals-${spring.profiles.active}.properties")
@PropertySource("classpath:/config/properties/globals-version.properties")
public class PropertiesUtil {
	private static Environment envPrp;

	@Autowired
	public PropertiesUtil(Environment env) { setEnvPrp(env); }
	public static void setEnvPrp(Environment envPrp) { PropertiesUtil.envPrp = envPrp; }

	public static String getProperty(String keyName){
		String value = null;
		try{
			value = envPrp.getProperty(keyName).trim();
		}catch(Exception e){
			log.debug("ERROR ::PropertiesUtil:: EXCEOTION");
		}
		return value;
	}
}
