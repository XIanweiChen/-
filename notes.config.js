const fs= require('fs');
// let name = []
// let dirs = fs.readdir('./')
// name= [...dirs]
// console.log(name)
// dirs.forEach(dir=>{

// })

const read = function(path){
    return new Promise((resolve,reject)=>{
        fs.readdir(path,(err,data)=>{
            if (err) {
                reject(err);
            } else{
                resolve(data);
            }
        });
    });
};

// function readdir(path){
// 	return new Promise((resolve,reject)=>{
// 		fs.stat(path,(err, stats)=>{
//             if (err) {
//                 reject(err);
//             } else{
//                 var isFile = stats.isFile();//是文件
//                 var isDir = stats.isDirectory();//是文件夹
//                 if(isFile){
//                 	resolve(path)
//                 }
//                 if(isDir){
//                 	readByAsync(path)
//                     // readdir(path);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
//                 }
//             }
// 		})
// 	})
// }

function compare(a,b){
    for (let i in a){
        if(a[i].charCodeAt()>b[i].charCodeAt()){
            return true
        }
    }
}
console.log(compare('一','二'))
function bubblesort(arg){
    for(let i= 0;i<arg.length-1;i++){
        for(let j=0;j<arg.length-1-i;j++){
             // console.log(compare(arg[j],arg[j+1]))
            if(compare(arg[j],arg[j+1])){
                // console.log(1)
                [arg[j],arg[j+1]] = [arg[j+1],arg[j]]
            }
        }
    }
}
// let ca = ['五','四','一','二']
// bubblesort(ca)
// console.log(ca)

async function readByAsync(path){
	let res = {}
    let dirs = await read(path);
    dirs.forEach(async dir=>{
    	// console.log((path+dir))
    	let stat = fs.lstatSync(path+dir);
    	if(stat.isDirectory()){
	    	res[dir] = []
    	}
    })


    for(i in res){
    	// console.log(path+i+'/'+"dasdasd")
    	let files = await read(path+i+'/');
    	files.forEach(file=>{
    		if(file.split('.').slice(-1) =='md'){
                 res[i].push(file.split('.')[0]+".html")
    		}
    	})
    }
        // console.log(res)
        for(let arg in res){
            console.log(res[arg])
            bubblesort(res[arg])
        }
        console.log(res)
        
}

readByAsync('./')

// var fs = require('fs');
// var path = require('path');//解析需要遍历的文件夹
// var filePath = path.resolve('./');
// //调用文件遍历方法
// fileDisplay(filePath);
// //文件遍历方法
// async function fileDisplay(filePath){
// 	let dirs = [];

//     //根据文件路径读取文件，返回文件列表
//     await fs.readdir(filePath,function(err,files){
//         if(err){
//             console.warn(err)
//         }else{
//             //遍历读取到的文件列表
//             files.forEach(async function(filename){
// 	            // name.push(files)
// 	            // console.log('111'+filename)
//                 //获取当前文件的绝对路径
//                 var filedir = path.join(filePath, filename);
//                 //根据文件路径获取文件信息，返回一个fs.Stats对象
//                 await fs.stat(filedir,function(eror, stats){
//                     if(eror){
//                         console.warn('获取文件stats失败');
//                     }else{
//                     	 // console.log('222'+filedir)
//                         var isFile = stats.isFile();//是文件
//                         var isDir = stats.isDirectory();//是文件夹
//                         if(isFile){
//                         	// name.push(filename)
//                             console.log(filePath,filedir);
// 　　　　　　　　　　　　　　　　　// 读取文件内容
//                         }
//                         if(isDir){
//                         	// console.log('333'+filedir)
//                             fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
//                         }
//                     }
//                 })
//             });
//         }
//     });
//     console.log(res)
// }


//     for root,dirs,files in os.walk(r"D:\test"):
//         for file in files:
//             #获取文件所属目录
//             print(root)
//             #获取文件路径
//             print(os.path.join(root,file))

// // console.log(name)
