# 進捗管理ツール 進捗変更ススム君

## 概要
githubのラベルを変更するchrome拡張です。
githubのラベルとtrelloで進捗管理しているプロジェクトのために開発しています。
将来的にはgithubだけでなくtrelloへの命令も実行できるようにします。

## 注意事項
* githubには進捗ラベルをあらかじめ作成してください。
 * 以下4つのラベルを進捗ラベルと呼びます
  * doing
  * accepting
  * reopen
  * done
* githubのアクセストークンを発行しておいてください
* issue または PR のページでしか「進」アイコンは出ません

## インストール方法
1. リポジトリをクローンします
1. chrome://extensions/ を開きます
1. 「パッケージ化されていない拡張機能を読み込む」をクリックします
1. \susumu-kun\WebContent を指定します
1. githubのアクセストークンを設定します
 1. chrome://extensions/ から進捗変更ススム君のオプションを開きます
 1. githubのアクセストークンを指定し、saveしてください
 
## 使い方
1. 進捗を変更したいissue（PRでも可）のページを開きます
 * 例 : https://github.com/y-matsuda/susumu-kun/issues/1
1. アドレスの右側に「進」のアイコンがあるのでクリックします
1. 進捗ボタンをクリックします
1. 「進」のアイコンをクリックし、ススム君を閉じてからページをリロードしてください

## その他
* どなたでもお使いいただけます
* PR、要望大歓迎です