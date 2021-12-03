#!/usr/bin/env node
var name = process.argv[2] || 'auto-commit';
var shell = require("shelljs");
var exec = shell.exec;
var echo = shell.echo;

if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  shell.exit(1);
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo('-e',"\033[0;33m Error: Git commit failed \033[0m");
  shell.exit(1);
}
if (exec('git push').code !== 0) {
  let _push = exec('git push')
  if(_push.code === 128){
    let newAfter = _push.stderr.match(/git.*/)
    // echo('-e',"\033[0;33m 新分支，请执行 \033[0m"+`${newAfter}`+"\033[0;33m 在远端建立新分支 \033[0m");
    echo('-e',"\033[0;33m 新分支，即将执行 \033[0m"+`${newAfter}`+"\033[0;33m 在远端建立新分支 \033[0m");
    // 推送到新分支
    if(exec(`git push --set-upstream origin ${newAfter}`).code !== 0){
      echo('-e',"\033[0;33m Error: Git push failed \033[0m");
      shell.exit(1);
    }
    shell.exit(1);
  }else{
    echo('-e',"\033[0;33m Error: Git push failed \033[0m");
    shell.exit(1);
  }
}

//绿色字体2
echo('-e',"\033[0;32m git push success \033[0m"+`备注:${name}`);