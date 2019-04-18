function splitEgretJson() {
    var gm = require('gm');
    let fs = require('fs');
    if(process.argv.length<=2){
        console.error("请查看输入命令是否正确");
    }
    let jsonname = process.argv[2];
    fs.readFile(`./json/${jsonname}.png`, function (err, data) {
        if (err) {
            console.error("请查看png是否正确");
            return console.error(err);
        }
        fs.readFile(`./json/${jsonname}.json`, function (err, data) {
            if (err) {
                console.error("请查看json是否正确");
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
            fs.exists(`${jsonname}`, function (exists) {
                if (exists) {
                    console.log("文件存在")
                }
                if (!exists) {
                    fs.mkdir(`${jsonname}`, function (error) {
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
                let imgname = `${i}.png`;
                let x = text.frames[i].x;
                let y = text.frames[i].y;
                let h = text.frames[i].h;
                let w = text.frames[i].w;
                gm(`./json/${jsonname}.png`)
                    .crop(w, h, x, y)
                    .write(`${imgname}`,
                        function (err) {
                            if (!err) {
                                console.log(`生成${imgname}成功`);
                                copyIt(`${imgname}`, `./${jsonname}/${imgname}`);
                                fs.unlink(`${imgname}`);
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
splitEgretJson();