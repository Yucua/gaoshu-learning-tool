#!/usr/bin/env bash
# 高数学习工具 WebView APK 一键构建（无 Gradle，纯 aapt2/javac/d8/apksigner）
# 依赖：D:/androidtools/{jdk,bt,android.jar}  （JDK17 + build-tools34 + platform-35）
set -e

export JAVA_HOME='D:\androidtools\jdk'
BT="D:/androidtools/bt"
AJ="D:/androidtools/android.jar"
SRC="$(cd "$(dirname "$0")" && pwd)"
WORK="/d/apkbuild"
KS="$SRC/c100-release.jks"
# 密钥密码从环境变量读，不写死在脚本里（脚本要进公开仓库）。
# 本地打包前先 export KSPASS='你的密钥密码'
KSPASS="${KSPASS:-}"
VERSION_CODE="${1:-1}"
VERSION_NAME="${2:-1.0}"

rm -rf "$WORK"; mkdir -p "$WORK/out"
cp -r "$SRC/AndroidManifest.xml" "$SRC/res" "$SRC/src" "$WORK/"
cd "$WORK"

"$BT/aapt2.exe" compile --dir res -o out/res.zip
"$BT/aapt2.exe" link -o out/app-unsigned.apk -I "$AJ" \
  --manifest AndroidManifest.xml -R out/res.zip --java out/gen \
  --min-sdk-version 23 --target-sdk-version 35 \
  --version-code "$VERSION_CODE" --version-name "$VERSION_NAME" --auto-add-overlay

mkdir -p out/classes
"$JAVA_HOME/bin/javac.exe" -encoding UTF-8 -source 8 -target 8 -Xlint:-options \
  -bootclasspath "$AJ" -d out/classes \
  src/com/yucua/gaoshu/MainActivity.java out/gen/com/yucua/gaoshu/R.java

mkdir -p out/dex
"$BT/d8.bat" --lib "$AJ" --min-api 23 --output out/dex out/classes/com/yucua/gaoshu/*.class

cp out/app-unsigned.apk out/app-dex.apk
"$JAVA_HOME/bin/jar" uf out/app-dex.apk -C out/dex classes.dex
"$BT/zipalign.exe" -f -p 4 out/app-dex.apk out/app-aligned.apk

"$BT/apksigner.bat" sign --ks "$KS" --ks-pass "pass:$KSPASS" --key-pass "pass:$KSPASS" \
  --ks-key-alias c100 --out out/app-signed.apk out/app-aligned.apk
"$BT/apksigner.bat" verify --print-certs out/app-signed.apk | head -3

mkdir -p "$SRC/dist"
cp out/app-signed.apk "$SRC/dist/高数学习工具-v$VERSION_NAME.apk"
echo "BUILD_OK -> $SRC/dist/高数学习工具-v$VERSION_NAME.apk"
