package net.jcms.framework.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
public class AesUtil {

    private SecretKeySpec secretKey;
    private IvParameterSpec IV;

    public AesUtil(String reqSecretKey) throws UnsupportedEncodingException {
        reqSecretKey = md5Encode(reqSecretKey);
        this.secretKey = new SecretKeySpec(reqSecretKey.getBytes("UTF-8"), "AES");
        this.IV = new IvParameterSpec(reqSecretKey.substring(0,16).getBytes());
    }

    // AES CBC 암호화
    public String AesCBCEncode(String plainText) throws Exception {
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, secretKey, IV);
        byte[] encryptionByte = c.doFinal(plainText.getBytes("UTF-8"));
        return Hex.encodeHexString(encryptionByte);
    }

    // AES CBC 복호화
    public String AesCBCDecode(String encodeText) throws Exception {
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.DECRYPT_MODE, secretKey, IV);
        byte[] decodeByte = Hex.decodeHex(encodeText.toCharArray());
        return new String(c.doFinal(decodeByte), "UTF-8");
    }

    // 32byte hash값 생성
    public static String md5Encode(String str) {
        String MD5 = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte byteData[] = md.digest();
            StringBuffer sb = new StringBuffer();

            for(int i=0; i<byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            MD5 = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            MD5 = null;
        }
        return MD5;
    }
}
