package net.pm.service.utils;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.util.PropertiesUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

@Slf4j
public class GpsUtil {
    static private String kakaoUrl = PropertiesUtil.getProperty("AppConf.kakaoApi.Url");
    static private final String apiKey = "KakaoAK 1d5b7b9b94825e177dce3cf5a1121824";

    static public String cvtCoordToAddrRegion3(Double x, Double y) {
        if(x==null || y==null) return null;
        return cvtCoordToAddrRegion3(x.toString(), y.toString());
    }
    static public String[] cvtKeywordToCoord(String keyword, String x, String y) {
        try {
            if (x == null) x = "126.56789922282603";
            if (y == null) y = "33.442711073166805";
            String qdata = URLEncoder.encode("query", "UTF-8");
            qdata += "=";
            qdata += URLEncoder.encode(keyword, "UTF-8");
            String link = kakaoUrl + "/v2/local/search/keyword.json?y=" + y + "&x=" + x + "&radius=20000&" + qdata;
            return cvtStrToCoord(link);
        } catch (NullPointerException e) {
            log.error("cvtKeywordToCoord error occurred!");
            return null;
        } catch (UnsupportedEncodingException e) {
            log.error("cvtKeywordToCoord error occurred!");
            return null;
        } catch (Exception e) {
            log.error("cvtKeywordToCoord error occurred!");
            return null;
        }
    }

    static public String[] cvtAddrToCoord(String addr) {
        try {
            String qdata = URLEncoder.encode("query", "UTF-8");
            qdata += "=";
            qdata += URLEncoder.encode(addr, "UTF-8");
            String link = kakaoUrl + "/v2/local/search/address.json?" + qdata;
            return cvtStrToCoord(link);
        } catch (UnsupportedEncodingException e) {
            log.error("cvtAddrToCoord error occurred!");
            return null;
        } catch (Exception e) {
            log.error("cvtAddrToCoord error occurred!");
            return null;
        }
    }

    static public String[] cvtStrToCoord(String link) {
        HttpURLConnection conn = null;
        try {
            conn = getConnection(link);
            if(conn == null) return null;

            if(conn.getResponseCode()==HttpURLConnection.HTTP_OK) {
                BufferedReader br = null;
                try {
                    br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                    String rd;
                    String[] rst = null;
                    while ((rd = br.readLine()) != null) {
                        int idx;
                        if((idx=rd.indexOf("\"x\""))>0) {
                            int end = rd.indexOf(",", idx);
                            if (idx < end) {
                                if(rst == null) rst = new String[3];
                                String fs = rd.substring(idx, end);
                                idx = fs.indexOf(":\"")+2;
                                end = fs.indexOf("\"", idx);
                                if(idx > end) continue;
                                rst[0] = fs.substring(idx, end);
                            }
                        }
                        if((idx=rd.indexOf("\"y\""))>0) {
                            int end = rd.indexOf(",", idx);
                            if (idx < end) {
                                if(rst == null) rst = new String[3];
                                String fs = rd.substring(idx, end);
                                idx = fs.indexOf(":\"")+2;
                                end = fs.indexOf("\"", idx);
                                if(idx > end) continue;
                                rst[1] = fs.substring(idx, end);
                            }
                        }
                        if((idx=rd.indexOf("region_3depth_name"))>0) {
                            int end = rd.indexOf(",", idx);
                            if (idx < end) {
                                if(rst == null) rst = new String[3];
                                String fs = rd.substring(idx, end);
                                idx = fs.indexOf(":\"")+2;
                                end = fs.indexOf("\"", idx);
                                if(idx > end) continue;
                                if(fs.contains(" ")) end = fs.indexOf(" ");
                                rst[2] = fs.substring(idx, end);
                            }
                        }
                        if(rst!=null && rst[0]!=null && rst[1]!=null) return rst;
                    }
                    return null;
                } catch(IOException e) {
                    log.error("cvtStrToCoord error occurred!");
                    return null;
                } finally {
                    try {
                        if (br != null) {
                            br.close();
                        }
                    } catch (IOException e) {
                        log.error("cvtStrToCoord error occurred!");
                    }
                }
            } else return null;

        } catch (MalformedURLException e) {
            log.error("cvtStrToCoord error occurred!");
            return null;
        } catch (IOException e) {
            log.error("cvtStrToCoord error occurred!");
            return null;
        } catch (NullPointerException e) {
            log.error("cvtStrToCoord error occurred!");
            return null;
        } catch (StringIndexOutOfBoundsException e) {
            log.error("cvtStrToCoord error occurred!");
            return null;
        } catch (NumberFormatException e) {
            log.error("cvtStrToCoord error occurred!");
            return null;
        } catch (Exception e) {
            return null;
        } finally {
            if(conn!=null) conn.disconnect();
        }
    }

    static private HttpURLConnection getConnection(String link) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(link);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(3000);
            conn.setRequestProperty("Authorization", apiKey);
            conn.connect();
            return conn;
        } catch (Exception e) {
            return null;
        }
    }
    static public String cvtCoordToAddrRegion3(String x, String y) {
        if(x==null || y==null) return null;
        HttpURLConnection conn = null;
        try {
            String link = kakaoUrl + "/v2/local/geo/coord2regioncode.json?x=" + x + "&y=" + y;
            conn = getConnection(link);
            if(conn == null) return null;
            if(conn.getResponseCode()==HttpURLConnection.HTTP_OK) {
                BufferedReader br = null;
                try {
                    br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                    //StringBuilder sb = new StringBuilder();
                    String rd;
                    while ((rd = br.readLine()) != null) {
                        int idx;
                        if((idx=rd.indexOf("region_3depth_name"))>0) {
                            int end = rd.indexOf(",", idx);
                            if (idx < end) {
                                String fs = rd.substring(idx, end);
                                idx = fs.indexOf(":\"")+2;
                                end = fs.indexOf("\"", idx);
                                if(idx > end) continue;
                                if(fs.contains(" ")) end = fs.indexOf(" ");
                                return fs.substring(idx, end);
                            }
                        }
                    }
                    return null;
                } catch (IOException e) {
                    log.error("cvtCoordToAddrRegion3 error occurred!");
                    return null;
                } finally {
                    try {
                        if (br != null) {
                            br.close();
                        }
                    } catch (IOException e) {
                        log.error("cvtCoordToAddrRegion3 error occurred!");
                    }
                }
            } else return null;

        } catch (MalformedURLException e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } catch (IOException e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } catch (NullPointerException e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } catch (StringIndexOutOfBoundsException e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } catch (NumberFormatException e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } catch (Exception e) {
            log.error("cvtCoordToAddrRegion3 error occurred!");
            return null;
        } finally {
            if(conn!=null) conn.disconnect();
        }
    }
    static public String cvtCoordToAddrRegion3(String coord) {
        if(coord==null || coord.length()<5) return null;
        String[] clist = coord.split(",");
        if(clist.length<2) return null;
        return cvtCoordToAddrRegion3(clist[0].trim(), clist[1].trim());
    }
}
