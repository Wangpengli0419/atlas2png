function splitAtlas() {
    var gm = require('gm');
    let fs = require('fs');
    if(process.argv.length<=2){
        console.error("请查看输入命令是否正确");
    }
    let atlasname = process.argv[2];
    fs.readFile(`./atlas/${atlasname}.png`, function (err, data) {
        if (err) {
            console.error("请查看png是否正确");
            return console.error(err);
        }
        fs.readFile(`./atlas/${atlasname}.atlas`, function (err, data) {
            if (err) {
                console.error("请查看atlas是否正确");
                return console.error(err);
            }
            console.log("都加载完成")
            /**
             * 1.加载图片及配置文件
             * 2.读取配置文件
             * 3.创建图片信息对象
             * 4.裁切图片
             * 5.导出图片到新目录
             */
            let text = JSON.parse(data.toString());//将字符串转换为json对象
            let imgInfo = {};
            fs.exists(`${atlasname}`, function (exists) {
                if (exists) {
                    console.log("文件存在")
                }
                if (!exists) {
                    fs.mkdir(`${atlasname}`, function (error) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('创建目录成功');
                    })
                }
            })
            function copyIt(from, to) {
                fs.writeFileSync(to, fs.readFileSync(from));
            }
            for (let i in text.frames) {
                // i 为图片名称
                // text.frames[i] 为图片信息
                // console.log(text.frames[i]);
                imgInfo['name'] = i;
                let x = text.frames[i].frame.x;
                let y = text.frames[i].frame.y;
                let h = text.frames[i].frame.h;
                let w = text.frames[i].frame.w;
                gm(`./atlas/${atlasname}.png`)
                    .crop(w, h, x, y)
                    .write(`${i}`,
                        function (err) {
                            if (!err) {
                                console.log(`生成${i}成功`);
                                copyIt(`${i}`, `./${atlasname}/${i}`);
                                fs.unlink(`${i}`);
                            }
                            else {
                                console.log(`切图失败`);
                            }
                        }
                    );
            }
        })
    })
}
splitAtlas();
