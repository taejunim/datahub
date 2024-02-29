package net.config;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import java.util.TimeZone;

@Service
public class InitService implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
}