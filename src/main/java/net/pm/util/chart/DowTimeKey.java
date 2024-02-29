package net.pm.util.chart;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.DayOfWeek;

@Data
@AllArgsConstructor
public class DowTimeKey {
    private DayOfWeek dayOfWeek;
    private Integer hour;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DowTimeKey key = (DowTimeKey) o;

        if (dayOfWeek != key.dayOfWeek) return false;
        return hour != null ? hour == key.getHour() : key.getHour() == null;
    }

    @Override
    public int hashCode() {
        int result = dayOfWeek != null ? dayOfWeek.hashCode() : 0;
        result = 31 * result + (hour != null ? hour.hashCode() : 0);
        return result;
    }
}
