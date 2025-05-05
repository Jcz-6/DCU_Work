import java.io.FileWriter;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.security.*;

public class Assignment2 {


    public static String convertBytesToHex(byte[] bytes) {
        String bytesToHex = "";

        for (byte b : bytes) {
            bytesToHex += String.format("%02X", b);
        }

        return bytesToHex;
    }

    public static BigInteger GCD(BigInteger a, BigInteger b) {
        if (a.equals(BigInteger.ZERO))
            return b;
        return GCD(b.mod(a), a);
    }

    public static BigInteger[] ExGCD(BigInteger a, BigInteger b) {

        BigInteger s = BigInteger.ZERO;
        BigInteger rem = b;

        BigInteger old_s = BigInteger.ONE;
        BigInteger old_rem = a;

        BigInteger bezout_t = BigInteger.ZERO;

        while (!rem.equals(BigInteger.ZERO)) {
            BigInteger quotient = old_rem.divide(rem);
            
            BigInteger tmpOne = rem;
            rem = old_rem.subtract(quotient.multiply(rem));
            old_rem = tmpOne;

            BigInteger tmpTwo = s;
            s = old_s.subtract(quotient.multiply(s));
            old_s = tmpTwo;
        }

        if (!b.equals(BigInteger.ZERO)){
            bezout_t = (old_rem.subtract(old_s.multiply(a))).divide(b);
        }
        else{
            bezout_t = BigInteger.ZERO;
        }
        
        BigInteger[] result = new BigInteger[3];
        result[0] = old_s;
        result[1] = bezout_t;
        result[2] = old_rem;

        return result;
    }

    public static BigInteger CRT(BigInteger n, BigInteger q, BigInteger p, BigInteger pXq, BigInteger d) {

        BigInteger[] p_inverse = ExGCD(p, q);
        BigInteger[] q_inverse = ExGCD(q, p);

        BigInteger a_q = SquareMultiply(n, d, q);
        //Since Ni = N/ni in this case N/q = p
        BigInteger N_q = p;
        //Since yi = Ni -1 mod ni in this case P-1 mod q
        BigInteger y_q = q_inverse[0].mod(q);
        

        BigInteger a_p = SquareMultiply(n, d, p);
        BigInteger N_p = q;
        BigInteger y_p = p_inverse[0].mod(p);

        return (a_q.multiply(N_q.multiply(y_q)).add(a_p.multiply(N_p.multiply(y_p)))).mod(pXq);
    }

    public static BigInteger CRTI() {

        BigInteger p = new BigInteger("7");
        BigInteger q = new BigInteger("11");
        BigInteger x = new BigInteger("13");

        BigInteger[] p_inverse = ExGCD(q.multiply(x), p);
        BigInteger[] q_inverse = ExGCD(x.multiply(p), q);
        BigInteger[] x_inverse = ExGCD(p.multiply(q), x);

        BigInteger a_p = new BigInteger("5");
        //Since Ni = N/ni in this case N/q = p
        BigInteger N_p = q.multiply(x);
        //Since yi = Ni -1 mod ni in this case P-1 mod q
        BigInteger y_p = p_inverse[0].mod(p);
        

        BigInteger a_q = new BigInteger("3");
        BigInteger N_q = x.multiply(p);
        BigInteger y_q = q_inverse[0].mod(q);

        BigInteger a_x = new BigInteger("10");
        BigInteger N_x = p.multiply(q);
        BigInteger y_x = x_inverse[0].mod(x);

        System.err.println(p_inverse[0].mod(p));
        System.err.println(q_inverse[0].mod(q));
        System.err.println(x_inverse[0].mod(x));


        return (a_q.multiply(N_q.multiply(y_q)).add(a_p.multiply(N_p.multiply(y_p))).add(a_x.multiply(N_x.multiply(y_x)))).mod(x.multiply(q).multiply(p));
    }

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

    public static void main(String[] args) {

    //Code below was used to generate P and Q
    //SecureRandom randomOne = new SecureRandom();
    //SecureRandom randomTwo = new SecureRandom();

    //BigInteger val_P = BigInteger.probablePrime(512, randomOne);
    //BigInteger val_Q = BigInteger.probablePrime(512, randomTwo);

    BigInteger val_P = new BigInteger("dd969696e5e0b9e6e81846543c3da908b31d86313970c652c8250df0a874ad3b897597fe25df8be92d91dd16ddc69efdcc8134bbdb9e95fb45305f06254bd66f", 16);
    BigInteger val_Q = new BigInteger("fe9b0f2844836b7d2b472727753a8e7de0b12d81f6d212cf1147c2a7ec7d32edd9a85bfe5ecb927e25487c03587f44ba79cf04a5639887fb2317d4587ca29225", 16);

    BigInteger val_N = BigInteger.ONE;
    BigInteger phi_N = BigInteger.ONE;

    val_N = val_N.multiply(val_P).multiply(val_Q);
    phi_N = phi_N.multiply((val_P.subtract(BigInteger.ONE))).multiply((val_Q.subtract(BigInteger.ONE)));
    
    BigInteger val_E = new BigInteger("65537");

    BigInteger GCD_Check = GCD(phi_N, val_E);

        if (GCD_Check.equals(BigInteger.ONE)) {
            BigInteger[] d = ExGCD(val_E, phi_N);
            try{
                Path path = Paths.get(args[0]);
        
                byte fileData[] = Files.readAllBytes(path);
        
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                

                byte messageHash[] = digest.digest(fileData);

                BigInteger M = new BigInteger(messageHash);
                BigInteger Signature = CRT(M, val_P, val_Q, val_N, d[0]);
                System.out.print(Signature.toString(16));

                FileWriter fileWriter = new FileWriter("Modulus.txt");
                fileWriter.write(val_N.toString(16)); 
                fileWriter.close();
            }
            catch (NoSuchAlgorithmException e) {
            System.out.println("No such algorithm or padding: " +  e.getMessage());
            } 
            catch (Exception e) {
                System.out.println("Caught error: " + e.getMessage());
            }
        }
        else{
            System.out.println("Not relatively prime");
        }
    }
    //Resources used:
    //https://en.wikipedia.org/wiki/Chinese_remainder_theorem
    //https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
}
