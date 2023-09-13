#!/usr/bin/env sh

# Ensure no class files are present
unzip -l JavaSoc.zip | grep -E "\.class" > /dev/null
if [ $? -eq 0 ]; then
    echo "Class files should not be present in submission";
    exit 1;
fi

# Ensure demo.txt is present
unzip -l JavaSoc.zip | grep "demo.txt" > /dev/null
if [ $? -ne 0 ]; then
    echo "demo.txt not present in submission";
    exit 1;
fi

# Ensure report.txt is present
unzip -l JavaSoc.zip | grep "report.txt" > /dev/null
if [ $? -ne 0 ]; then
    echo "report.txt not present in submission";
    exit 1;
fi

# Ensure ClientApp.java is present
unzip -l JavaSoc.zip | grep "ClientApp.java" > /dev/null
if [ $? -ne 0 ]; then
    echo "ClientApp.java not present in submission";
    exit 1;
fi

# Unzip and extract contents
unzip -o JavaSoc.zip > /dev/null

# Compile everything
javac *.java

# Execute Test -> ClientApp.demo()
java Test > output.txt

# convert demo.txt from UTF-16 to UTF-18
iconv -f UTF-8 demo.txt -o /dev/null > /dev/null 2>&1 
if [ $? -ne 0 ]; then
    iconv -f UTF-16LE -t UTF-8 demo.txt -o demo.txt
fi

# check output.txt and demo.txt match
diff -B -w --strip-trailing-cr output.txt demo.txt
if [ $? -ne 0 ]; then
    echo "Code output and demo.txt do not match";
    exit 1;
fi

# check report.txt is within word limit
REPORT=$(cat report.txt | wc -w)
WORDLIMIT=500
if [ $REPORT -ge $WORDLIMIT ]; then
    echo "report.txt should be within 500 words";
    exit 1;
fi

# echo "success"