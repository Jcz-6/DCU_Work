import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;


public class Assignment1 {
    
    public static BigInteger SquareMultiply(BigInteger number, BigInteger exponent, BigInteger modulo) {
        // Left to Right Square + Multiply algorithm
        BigInteger smResult = BigInteger.ONE;
        String binExponent = exponent.toString(2);

        for (int i = 0; i < binExponent.length(); i++) {
            smResult = smResult.multiply(smResult).mod(modulo);

            if (binExponent.charAt(i) == '1') {
                smResult = smResult.multiply(number).mod(modulo);
            }
        }

        return smResult;
    }

    public static String convertBytesToHex(byte[] bytes) {
        String bytesToHex = "";

        for (byte b : bytes) {
            bytesToHex += String.format("%02X", b);
        }

        return bytesToHex;
    }

    public static byte[] addPadding(byte[] fileData) {
        final int blockSize = 16;
        int paddingRequired =   16 - (fileData.length % blockSize);

        if (paddingRequired == 0) {
            paddingRequired = blockSize;
        }

        byte[] paddedFileData = new byte[fileData.length + paddingRequired];
        System.arraycopy(fileData, 0, paddedFileData, 0, fileData.length);
        paddedFileData[fileData.length] = (byte) 128;

        return paddedFileData;
    }

    public static byte[] AesCbcEncrypt(byte[] dataToBeEncrypted, byte[] initialIV, byte[] cypherKey){

        try {
            SecretKeySpec key = new SecretKeySpec(cypherKey, "AES");
            IvParameterSpec iv = new IvParameterSpec(initialIV);
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");

            cipher.init(Cipher.ENCRYPT_MODE, key, iv);
            byte[] encryptedData = cipher.doFinal(dataToBeEncrypted);

            return encryptedData;
        }
        catch (IllegalBlockSizeException | NoSuchAlgorithmException | InvalidKeyException | BadPaddingException | InvalidAlgorithmParameterException | NoSuchPaddingException e) {
                System.out.println("Something went wrong encrypting: " + e.getMessage());
        }
        return null;
    }



    public static void main(String[] args) {
    
    BigInteger moduloP = new BigInteger("b59dd79568817b4b9f6789822d22594f376e6a9abc0241846de426e5dd8f6eddef00b465f38f509b2b18351064704fe75f012fa346c5e2c442d7c99eac79b2bc8a202c98327b96816cb8042698ed3734643c4c05164e739cb72fba24f6156b6f47a7300ef778c378ea301e1141a6b25d48f1924268c62ee8dd3134745cdf7323", 16);
    BigInteger generatorG = new BigInteger("44ec9d52c8f9189e49cd7c70253c2eb3154dd4f08467a64a0267c9defe4119f2e373388cfa350a4e66e432d638ccdc58eb703e31d4c84e50398f9f91677e88641a2d2f6157e2f4ec538088dcf5940b053c622e53bab0b4e84b1465f5738f549664bd7430961d3e5a2e7bceb62418db747386a58ff267a9939833beefb7a6fd68", 16);
    BigInteger valueA = new BigInteger("5af3e806e0fa466dc75de60186760516792b70fdcd72a5b6238e6f6b76ece1f1b38ba4e210f61a2b84ef1b5dc4151e799485b2171fcf318f86d42616b8fd8111d59552e4b5f228ee838d535b4b987f1eaf3e5de3ea0c403a6c38002b49eade15171cb861b367732460e3a9842b532761c16218c4fea51be8ea0248385f6bac0d", 16);
    BigInteger valueB = new BigInteger("247e9d2ad15b79e4b935076ea34a7e8516f7d39f2274ec3faa633af6a2e8afbf3e4a0174e65bfbc159a251a7fd69f1f1195798f192901fdd10673482977163f49977397efea9a07e6e18f515381999dc22ec665ae724dc7a9f3b89e78c10098d8365627b0c4a9966b49f57308880068df8c667b89b69f98d6c3d9be8036a97c1", 16);

    //Code below was used to generate valueB
    //SecureRandom random = new SecureRandom();
    //BigInteger val_b = new BigInteger(1023, random);

    BigInteger publicValueB = SquareMultiply(generatorG, valueB, moduloP);
    BigInteger secretValueS = SquareMultiply(valueA, valueB, moduloP);

    //Code below was is to generate hexedIV
    SecureRandom randomIV = new SecureRandom();
    byte iv[] = new byte[16]; // 128 bits are converted to 16 bytes;
    randomIV.nextBytes(iv);
    String hexedIV = convertBytesToHex(iv);

    try{
        Path path = Paths.get(args[0]);

        byte fileData[] = Files.readAllBytes(path);
        byte paddedData[] = addPadding(fileData);

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte cypherKey[] = digest.digest(secretValueS.toByteArray());

        //System.out.println(fileData.length + " lenght of file with no padding " + fileData.length % 16);
        //System.out.println(paddedData.length + " lenght of file with padding " + paddedData.length % 16);
        
        // Write public valueB to DH.txt
        FileWriter fileWriter = new FileWriter("DH.txt");
        fileWriter.write(publicValueB.toString(16)); 
        fileWriter.close();

        // Write the hexedIV value to IV.txt 
        fileWriter = new FileWriter("IV.txt");
        fileWriter.write(hexedIV.toString());
        fileWriter.close();

        //Encrypt the file Data using AES
        byte encryptedFileData[] = AesCbcEncrypt(paddedData, iv, cypherKey);

        //Convert encrypted data to hex
        String encryptedHexData = convertBytesToHex(encryptedFileData);

        System.out.println(encryptedHexData);
    }
    catch (NoSuchAlgorithmException e) {
    System.out.println("No such algorithm or padding: " +  e.getMessage());
    } 
    catch (Exception e) {
        System.out.println("Caught error: " + e.getMessage());
    }
        

    }
    //Resources used:
    //https://www.geeksforgeeks.org/system-arraycopy-in-java/
    //https://www.daniweb.com/programming/software-development/threads/398796/how-to-output-byte-value-8-bits-in-java
    //https://stackoverflow.com/questions/11918123/how-to-convert-biginteger-value-to-hex-in-java
    //https://stackoverflow.com/questions/5368704/appending-a-byte-to-the-end-of-another-byte
}